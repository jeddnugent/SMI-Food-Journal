import { useState, useEffect } from "react";
import type { Entry } from "../interfaces/Entry";
import { getAllUserEntrys, postNewEntry, deleteEntry } from '../api/entrys';


import EntryListItemExtended from "../components/EntryListItemExtended";


function JournalOverview() {

	const [journalEntrys, setJournalEntrys] = useState<Entry[]>([]);

	//TODO: Replace hardcoded UserID with data after login completetion 
	const USERID = "11111111-1111-1111-1111-111111111111";
	async function fetchAllUserData() {
		try {
			const result = await getAllUserEntrys(USERID);
			if (result.data.length > 0) {
				const userData: Entry[] = result.data;
				setJournalEntrys(userData);
			}
		} catch (error) {
			console.error('API fetchAllUserData Error:', error);
		}
	}


	useEffect(() => {
		//TODO: Replace USERID with current user data
		fetchAllUserData();
	}, []);


	async function deleteEntryTapped(id: number) {
		console.log(id);
		try {
			setJournalEntrys(prevEntrys => {
				return prevEntrys.filter((entry) => { return entry.id !== id; });
			});
			// TODO: Replace USERID
			await deleteEntry(USERID, id);
			await fetchAllUserData();
		} catch (error) {
			console.error('API deleteEntry Error:', error);
		}
	}


	return (
		<div>
			<h1>Journal Overview</h1>
			<ul className='EntryList'>
				{Array.isArray(journalEntrys)
					? journalEntrys.map((jorunalEntry: Entry, index) => (
						<EntryListItemExtended
							key={index}
							entry={jorunalEntry}
							deleteEntry={deleteEntryTapped}
							updateEntryList={fetchAllUserData}
						/>
					))
					: <p>No entries found or loading...</p>
				}
			</ul>
		</div>
	);
}

export default JournalOverview;