import { useState, useEffect } from 'react';
import "../styles/App.css"
import Header from '../components/Header';
import NewEntryForm from '../components/NewEntryForm';
import JournalEntryDisplayBlock from '../components/JournalEntryDisplayBlock';
import { getAllUserEntrys } from '../api/entrys';
import Entry from '../interfaces/Entry';

function App() {

	//Test userId untill signUp is implmented
	const USERID = "11111111-1111-1111-1111-111111111111";

	const [journalEntrys, setJournalEntrys] = useState<Entry[]>([])

	async function fetchAllUserData(userid: string) {
		try {
			const result = await getAllUserEntrys(userid);
			if (result.data.length > 0) {
				const userData: Entry[] = result.data;
				setJournalEntrys(userData);
			}
		} catch (error) {
			console.error('API Error:', error);
		}
	}

	useEffect(() => {
		fetchAllUserData(USERID);
	}, []);

	function addEntry(newEntry: Entry) {
		setJournalEntrys(prevEntries => {
			return [...prevEntries, newEntry]
		})
	}

	function deleteEntry(id: number) {
		setJournalEntrys(prevEntrys => {
			return prevEntrys.filter((entry, index) => { return index !== id; })
		})
	}
	return (
		<div className="App">
			<Header />
			<NewEntryForm createEntry={addEntry} />
			{
				journalEntrys.map((entry, index) =>
					<JournalEntryDisplayBlock
						key={index}
						id={entry.id}
						itemDate={entry.item_date}
						timeConsumed={entry.time_consumed}
						itemDesc={entry.item_desc}
						consumedLocation={entry.consumed_location}
						consumptionCompany={entry.consumption_company}
						feelingPrior={entry.feeling_prior}
						feelingPost={entry.feeling_post}
						selfTalk={entry.self_talk}
						otherComment={entry.other_comment}
						deleteEntry={deleteEntry} />)}
		</div>
	);
}

export default App;
