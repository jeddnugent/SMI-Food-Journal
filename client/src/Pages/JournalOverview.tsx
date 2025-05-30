import { useEffect } from "react";
import type { Entry } from "../interfaces/Entry";
import { useEntries, useUser } from "../contexts/UserContext";


import EntryListItemExtended from "../components/EntryListItemExtended";


function JournalOverview() {
	const { loading } = useUser();
	const { entries, refreshEntries, refreshSpecifcEntry, deleteEntry } = useEntries();

	useEffect(() => {
		if (loading === false) {
			refreshEntries();
		}
	}, [loading]);

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
			<h1>Journal Overview</h1>
			<ul className='EntryList'>
				{Array.isArray(entries)
					? entries.map((jorunalEntry: Entry, index) => (
						<EntryListItemExtended
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
	);
}

export default JournalOverview;