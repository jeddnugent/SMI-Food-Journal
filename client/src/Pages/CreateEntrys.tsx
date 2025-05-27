import { useState, useEffect } from 'react';
import NewEntryForm from '../components/NewEntryForm';
import JournalEntryDisplayBlock from '../components/JournalEntryDisplayBlock';
import { postNewEntry, deleteEntry, getAllUserEntrysDate } from '../api/entrys';
import type { Entry } from '../interfaces/Entry';
import EntryListItem from '../components/EntryListItem';
import EditDialogBox from "../components/EditDialogBox";

import "../styles/CreateEntrys.css";





function CreateEntrys() {
	const USERID = "11111111-1111-1111-1111-111111111111";

	const [journalEntrys, setJournalEntrys] = useState<Entry[]>([]);

	async function fetchAllUserData() {
		try {
			const currentDate = new Date().toISOString().split('T')[0];
			const result = await getAllUserEntrysDate(USERID, currentDate);
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

	async function addEntry(newEntry: Entry) {
		//TODO: Replace USERID with current user data
		console.log(newEntry);
		try {
			await postNewEntry(USERID, newEntry);
			setJournalEntrys(prevEntries => {
				return [...prevEntries, newEntry];
			});
			await fetchAllUserData();
		} catch (error) {
			console.error('API postNewEntry Error:', error);
		}

	}

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
			<div className="NewEntryContainer">
				<div className="NewEntryForm">
					<NewEntryForm createEntry={addEntry} />
				</div>
				<div>
					<h3>Today's Entrys</h3>
					<ul className='EntryList'>
						{Array.isArray(journalEntrys)
							? journalEntrys.map((jorunalEntry: Entry, index) => (
								<EntryListItem
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
			</div>
		</div>
	);
};


export default CreateEntrys;