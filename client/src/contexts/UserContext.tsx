import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { User } from "../interfaces/User";

type UserContextType = [User | null, React.Dispatch<React.SetStateAction<User | null>>];
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error('useUser must be used within a UserProvider');
	return context;
};

export default UserContext;