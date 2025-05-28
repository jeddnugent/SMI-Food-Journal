import { useState, useEffect } from 'react';
import NewEntryForm from '../components/NewEntryForm';
import { postNewEntry, deleteEntry, getAllUserEntrysDate, updateEntry } from '../api/entrys';
import type { Entry } from '../interfaces/Entry';
import EntryListItem from '../components/EntryListItem';

import "../styles/CreateEntrys.css";

function CreateEntrys() {
	const USERID = "11111111-1111-1111-1111-111111111111";

	const [journalEntrys, setJournalEntrys] = useState<Entry[]>([]);

	function getCurrentDate() {
		return new Date().toISOString().split('T')[0];
	}

	async function fetchAllUserData() {
		try {
			const currentDate = getCurrentDate();
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

	async function updateEntryTapped(updatedEntry: Entry) {
		try {
			//Check entry is still the current date
			const currentDate = getCurrentDate();
			console.log(currentDate, updatedEntry.item_date);
			if (updatedEntry.item_date === currentDate) {
				setJournalEntrys(journalEntrys.map(entry =>
					entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry));
				//TODO: Replace hardcoded USERID
				await updateEntry(USERID, updatedEntry.id!, updatedEntry);
				await fetchAllUserData();
			}
			else {
				await updateEntry(USERID, updatedEntry.id!, updatedEntry);
				deleteEntryTapped(updatedEntry.id!);
			}

		} catch (error) {
			console.error('API entryListEdited Error:', error);
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
									updateEntryList={updateEntryTapped}
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