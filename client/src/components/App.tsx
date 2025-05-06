import {useState} from 'react';
import "../styles/App.css"
import Header from './Header';
import NewEntryForm from './NewEntryForm';
import JournalEntryDisplayBlock from './JournalEntryDisplayBlock';

function App() {

	type JournalEntry = {
		itemDate: string;
		timeConsumed: string;
		itemDesc: string;
		consumedLocation: string;
		consumptionCompany: string;
		feelingPrior: string;
		feelingPost: string;
		selfTalk: string;
		otherComment: string;
	};

	const [journalEntrys, setJournalEntrys] = useState<JournalEntry[]>([])

	function addEntry(newEntry: JournalEntry){
    setJournalEntrys(prevEntries => {
      return [...prevEntries, newEntry]
    })
  }

	function deleteEntry(id: number)
  {
    setJournalEntrys(prevEntrys => {
      return prevEntrys.filter((entry, index)=>{ return index !== id;})
    })
  }
	return (
		<div className="App">
			<Header />
			<NewEntryForm createEntry = {addEntry}/>
			{journalEntrys.map((entry, index) => 
			<JournalEntryDisplayBlock
			key={index}
			id={index}
			itemDate= {entry.itemDate}
			timeConsumed={entry.timeConsumed}
			itemDesc={entry.itemDesc}
			consumedLocation={entry.consumedLocation}
			consumptionCompany={entry.consumptionCompany}
			feelingPrior={entry.feelingPrior}
			feelingPost={entry.feelingPost}
			selfTalk={entry.selfTalk}
			otherComment={entry.otherComment}
			deleteEntry={deleteEntry} />)}
		</div>
	);
}

export default App;
