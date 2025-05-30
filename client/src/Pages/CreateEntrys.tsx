import { useEffect } from 'react';
import NewEntryForm from '../components/NewEntryForm';
import type { Entry } from '../interfaces/Entry';
import EntryListItem from '../components/EntryListItem';
import { useUser, useEntries } from '../contexts/UserContext';

import "../styles/CreateEntrys.css";

function CreateEntrys() {
	const { loading } = useUser();
	const { todayEntries, refreshEntries, refreshSpecifcEntry, deleteEntry, addEntry } = useEntries();

	useEffect(() => {
		if (loading === false) {
			refreshEntries();
		}
	}, [loading]);

	async function addEntryTapped(newEntry: Entry) {
		try {
			addEntry(newEntry);
		} catch (error) {
			console.error('API postNewEntry Error:', error);
		}

	}

	async function deleteEntryTapped(id: number) {
		try {
			deleteEntry(id);
		} catch (error) {
			console.error('API deleteEntry Error:', error);
		}
	}

	async function updateEntryTapped(updatedEntry: Entry) {
		try {
			refreshSpecifcEntry(updatedEntry);
		}
		catch (error) {
			console.error('API entryListEdited Error:', error);
		}
	}

	return (
		<div>
			<div className="NewEntryContainer">
				<div className="NewEntryForm">
					<NewEntryForm createEntry={addEntryTapped} />
				</div>
				<div>
					<h3>Today's Entrys</h3>
					<ul className='EntryList'>
						{Array.isArray(todayEntries) && todayEntries.length > 0
							? todayEntries.map((jorunalEntry: Entry, index) => (
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