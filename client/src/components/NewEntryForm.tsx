import { useState } from "react";
import "../styles/App.css";
import LabelTextArea from "./LabelTextArea";
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import "../styles/NewEntryForm.css";

function NewEntryForm(props: { createEntry: Function }) {

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
				<div className="container">
					<div>
						<h1>New Journal Entry</h1>
					</div>
					<div className="timeDateContainer">
						<div className="item1">
							<label htmlFor="itemDate">Date </label>
							<input type="date" id="itemDate" name="itemDate" onChange={handleTextAreaChanged} value={newEntry.itemDate} />
						</div>
						<div className="item2">
							<label>Time Consumed </label>
							<input type="time" id="timeConsumed" name="timeConsumed" onChange={handleTextAreaChanged} value={newEntry.timeConsumed} />
						</div>
					</div>
					<LabelTextArea className="itemDesc" onChange={handleTextAreaChanged} value={newEntry.itemDesc} minRows={1} labelText="Food/Drink Description" />
					<LabelTextArea className="consumedLocation" onChange={handleTextAreaChanged} value={newEntry.consumedLocation} minRows={1} labelText="Where were you when you ate / drank this?" />
					<LabelTextArea className="consumptionCompany" onChange={handleTextAreaChanged} value={newEntry.consumptionCompany} minRows={1} labelText="Who were you with at the time?" />
					<LabelTextArea className="feelingPrior" onChange={handleTextAreaChanged} value={newEntry.feelingPrior} minRows={2} labelText="How were you feeling emotionally prior to eating / drinking? (Note: Hungry is not an emotion)" />
					<LabelTextArea className="feelingPost" onChange={handleTextAreaChanged} value={newEntry.feelingPost} minRows={2} labelText="How did you feel emotionally after eating / drinking?" />
					<LabelTextArea className="selfTalk" onChange={handleTextAreaChanged} value={newEntry.selfTalk} minRows={2} labelText="What did you say to yourself before and after you ate/drank?" />
					<LabelTextArea className="otherComment" onChange={handleTextAreaChanged} value={newEntry.otherComment} minRows={1} labelText="Other Comments" />
				</div>
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