import { createContext, useState, useContext } from "react";
import { type PropsWithChildren, type ReactNode, useEffect } from "react";
import type { User } from "../interfaces/User";
import { checkAuth } from "../api/users";
import { getAllUserEntrys, updateEntry, getAllUserEntrysDate, deleteUserEntry, postNewEntry } from "../api/entrys";
import type { Entry } from "../interfaces/Entry";

type UserContextValue = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	loading: boolean;
	error: Error | null;
};

type EntryContextValue = {
	entries: Entry[] | null;
	setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>;
	todayEntries: Entry[] | null;
	setTodayEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>;
	refreshEntries: () => Promise<void>;
	deleteEntry: (id: number) => Promise<void>;
	addEntry: (entry: Entry) => Promise<void>;
	refreshSpecifcEntry: (entry: Entry) => Promise<void>;
};



const UserContext = createContext<UserContextValue | undefined>(undefined);
const EntryContext = createContext<EntryContextValue | undefined>(undefined);



type UserProviderProps = PropsWithChildren;

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [entries, setEntries] = useState<Entry[] | null>(null);
	const [todayEntries, setTodayEntries] = useState<Entry[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);



	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userResult = await checkAuth();
				setUser(userResult.data);
				console.log("Context User", user);

				const entryResult = await getAllUserEntrys(user!.id);
				if (entryResult.data.length > 0) {
					const userData: Entry[] = entryResult.data;
					setEntries(userData);
				}

				const currentDate = new Date().toISOString().split('T')[0];
				const todayEntryResult = await getAllUserEntrysDate(user!.id, currentDate);
				if (todayEntryResult.data.length > 0) {
					const userData: Entry[] = todayEntryResult.data;
					setTodayEntries(userData);
				}
			} catch (err: any) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);


	const refreshEntries = async () => {
		if (!user) return;
		try {
			const result = await getAllUserEntrys(user.id);
			if (result.data.length > 0) {
				const userData: Entry[] = result.data;
				setEntries(userData);
			}

			const currentDate = new Date().toISOString().split('T')[0];
			const todayEntryResult = await getAllUserEntrysDate(user!.id, currentDate);
			console.log("entryResult", todayEntryResult);
			if (todayEntryResult.data.length > 0) {
				const userData: Entry[] = todayEntryResult.data;
				setTodayEntries(userData);
			}
		} catch (error) {
			console.error('API refreshEntries Error:', error);
		}
	};

	const refreshSpecifcEntry = async (entry: Entry) => {
		if (!user) return;
		if (!entries) return;
		try {
			setEntries(entries.map(exsitingEntry =>
				exsitingEntry.id === entry.id ? { ...exsitingEntry, ...entry } : entry));
			await updateEntry(user.id, entry.id!, entry);
			refreshEntries();
		} catch (error) {
			console.error('API refreshSpecifcEntry Error:', error);
		}
	};

	const addEntry = async (entry: Entry) => {
		if (!user) return;
		try {
			await postNewEntry(user.id, entry);
			await refreshEntries();
		} catch (error) {
			console.error('API postNewEntry Error:', error);
		}
	};

	const deleteEntry = async (id: number) => {
		if (!user) return;
		if (!entries) return;
		try {
			setEntries(prevEntrys => {
				return prevEntrys!.filter((entry) => { return entry.id !== id; });
			});
			if (todayEntries && todayEntries?.length > 0) {
				setTodayEntries(prevEntrys => {
					return prevEntrys!.filter((entry) => { return entry.id !== id; });
				});
			}
			await deleteUserEntry(user.id, id);
			refreshEntries();
		} catch (error) {
			console.error('API deleteEntry Error:', error);
		}
	};




	return (
		<UserContext.Provider value={{ user, setUser, loading, error }}>
			<EntryContext.Provider value={{ entries, setEntries, refreshEntries, refreshSpecifcEntry, deleteEntry, addEntry, todayEntries, setTodayEntries }}>
				{children}
			</EntryContext.Provider>
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error("useUser must be used within UserProvider");
	return context;
};

export const useEntries = () => {
	const context = useContext(EntryContext);
	if (!context) throw new Error("useEntries must be used within UserProvider");
	return context;
};


export default UserContext;