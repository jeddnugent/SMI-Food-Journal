import { useState } from "react";
import "../styles/App.css";
import LabelTextArea from "./LabelTextArea";
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

function NewEntryForm(props: { createEntry: Function}) {

	const [newEntry, setNewEntry] = useState({
		itemDate: "",
		timeConsumed: "",
		itemDesc: "",
		consumedLocation: "",
		consumptionCompany: "",
		feelingPrior: "",
		feelingPost: "",
		selfTalk: "",
		otherComment: "",
	})

	function handleTextAreaChanged(event: { target: { name: string; value: string; }; }) {
		const { name, value } = event.target;
		setNewEntry(currentEntry => {
			return ({ ...currentEntry, [name]: value });
		})
	}

	function onAddClicked(event: React.MouseEvent<HTMLButtonElement>) {
		props.createEntry(newEntry)
		setNewEntry({
			itemDate: "",
			timeConsumed: "",
			itemDesc: "",
			consumedLocation: "",
			consumptionCompany: "",
			feelingPrior: "",
			feelingPost: "",
			selfTalk: "",
			otherComment: "",
		});
		event.preventDefault();
	}



	return (
		<div >
			<form className="journalForm">

				<div>
					<label htmlFor="itemDate">Date </label>
					<input type="date" id="itemDate" name="itemDate" onChange={handleTextAreaChanged} value={newEntry.itemDate}/>
					<label>TIME CONSUMED </label>
					<input type="time" id="timeConsumed" name="timeConsumed" onChange={handleTextAreaChanged} value={newEntry.timeConsumed}/>
				</div>


				<LabelTextArea className="itemDesc" onChange={handleTextAreaChanged} value={newEntry.itemDesc} labelText="FOOD/DRINK DESCRIPTION" />
				<LabelTextArea className="consumedLocation" onChange={handleTextAreaChanged} value={newEntry.consumedLocation} labelText="WHERE WERE YOU WHEN YOU ATE/DRANK THIS?" />
				<LabelTextArea className="consumptionCompany" onChange={handleTextAreaChanged} value={newEntry.consumptionCompany} labelText="WHO WERE YOU WITH AT THE TIME?" />
				<LabelTextArea className="feelingPrior" onChange={handleTextAreaChanged} value={newEntry.feelingPrior} labelText="HOW WERE YOU FEELING EMOTIONALLY PRIOR TO EATING/DRINKING? (NOTE HUNGRY IS NOT AN EMOTION)" />
				<LabelTextArea className="feelingPost" onChange={handleTextAreaChanged} value={newEntry.feelingPost} labelText="HOW DID YOU FEEL EMOTIONALLY AFTER EATING/DRINKING?" />
				<LabelTextArea className="selfTalk" onChange={handleTextAreaChanged} value={newEntry.selfTalk} labelText="WHAT DID YOU SAY TO YOURSELF BEFORE AND AFTER YOU ATE/DRANK?" />
				<LabelTextArea className="otherComment" onChange={handleTextAreaChanged} value={newEntry.otherComment} labelText="OTHER COMMENTS" />
				<Zoom in={true}>
					<Fab onClick={onAddClicked}>
						<AddIcon />
					</Fab>
				</Zoom>


			</form>
		</div>
	);
}

export default NewEntryForm;