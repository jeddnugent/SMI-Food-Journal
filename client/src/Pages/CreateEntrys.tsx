import { useState, useEffect } from 'react';
import NewEntryForm from '../components/NewEntryForm';
import JournalEntryDisplayBlock from '../components/JournalEntryDisplayBlock';
import { getAllUserEntrys, postNewEntry, deleteEntry } from '../api/entrys';
import Entry from '../interfaces/Entry';
import EntryListItem from '../components/EntryListItem';
import "../styles/CreateEntrys.css"





function CreateEntrys() {
	const USERID = "11111111-1111-1111-1111-111111111111";
	const [time, setTime] = useState(new Date().getTime().toString());

	const [journalEntrys, setJournalEntrys] = useState<Entry[]>([])

	async function fetchAllUserData(userid: string) {
		try {
			const result = await getAllUserEntrys(userid);
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
		fetchAllUserData(USERID);
		setTime(new Date().getTime().toString());
		console.log(time);
	}, []);

	async function addEntry(newEntry: Entry) {
		//TODO: Replace USERID with current user data
		console.log(newEntry)
		try {
			await postNewEntry(USERID, newEntry);
			setJournalEntrys(prevEntries => {
				return [...prevEntries, newEntry]
			})
			await fetchAllUserData(USERID);
		} catch (error) {
			console.error('API postNewEntry Error:', error);
		}

	}

	async function deleteEntryTapped(id: number) {
		console.log(id);
		try {
			setJournalEntrys(prevEntrys => {
				return prevEntrys.filter((entry) => { return entry.id !== id; })
			})
			// TODO: Replace USERID
			await deleteEntry(USERID, id);
			await fetchAllUserData(USERID);
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


				{/* {
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
						deleteEntry={deleteEntryTapped} />
				// )} */}
				<div>
					<h3>Today's Entrys</h3>
					<ul className='EntryList'>
						{
							journalEntrys.map((entry, index) =>
								<EntryListItem
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
									editEntry={deleteEntryTapped}
									deleteEntry={deleteEntryTapped} />
							)}

					</ul>
				</div>
			</div>
		</div>
	);
};


export default CreateEntrys;