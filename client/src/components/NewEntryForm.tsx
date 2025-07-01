import { useState } from "react";
import "../styles/App.css";
import LabelTextArea from "./LabelTextArea";

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import "../styles/NewEntryForm.css";
import type { Entry } from "../interfaces/Entry";

function NewEntryForm(props: { createEntry: (entry: Entry) => void }) {

	const [newEntry, setNewEntry] = useState<Entry>({
		item_date: "",
		time_consumed: "",
		item_desc: "",
		consumed_location: "",
		consumption_company: "",
		feeling_prior: "",
		feeling_post: "",
		self_talk: "",
		other_comment: "",
	});

	function handleTextAreaChanged(event: { target: { name: string; value: string; }; }) {
		const { name, value } = event.target;
		setNewEntry(currentEntry => {
			return ({ ...currentEntry, [name]: value });
		});
	}

	function onAddClicked(event: React.MouseEvent<HTMLButtonElement>) {
		props.createEntry(newEntry);
		setNewEntry({
			item_date: "",
			time_consumed: "",
			item_desc: "",
			consumed_location: "",
			consumption_company: "",
			feeling_prior: "",
			feeling_post: "",
			self_talk: "",
			other_comment: "",
		});
		event.preventDefault();
	}

	return (
		<div>
			<form className="journalForm">
				<div className="NewEntryForm-container">
					<div>
						<h1>New Journal Entry</h1>
					</div>
					<div className="timeDateContainer">
						<div>
							<label htmlFor="item_date">Date </label>
							<input type="date" id="item_date" name="item_date" onChange={handleTextAreaChanged} value={newEntry.item_date} />
						</div>
						<div>
							<label>Time Consumed </label>
							<input type="time" id="time_consumed" name="time_consumed" onChange={handleTextAreaChanged} value={newEntry.time_consumed} />
						</div>
					</div>
					<LabelTextArea className="item_desc" onChange={handleTextAreaChanged} value={newEntry.item_desc} minRows={1} labelText="Food/Drink Description" />
					<LabelTextArea className="consumed_location" onChange={handleTextAreaChanged} value={newEntry.consumed_location} minRows={1} labelText="Where were you when you ate / drank this?" />
					<LabelTextArea className="consumption_company" onChange={handleTextAreaChanged} value={newEntry.consumption_company} minRows={1} labelText="Who were you with at the time?" />
					<LabelTextArea className="feeling_prior" onChange={handleTextAreaChanged} value={newEntry.feeling_prior} minRows={2} labelText="How were you feeling emotionally prior to eating / drinking? (Note: Hungry is not an emotion)" />
					<LabelTextArea className="feeling_post" onChange={handleTextAreaChanged} value={newEntry.feeling_post} minRows={2} labelText="How did you feel emotionally after eating / drinking?" />
					<LabelTextArea className="self_talk" onChange={handleTextAreaChanged} value={newEntry.self_talk} minRows={2} labelText="What did you say to yourself before and after you ate/drank?" />
					<LabelTextArea className="other_comment" onChange={handleTextAreaChanged} value={newEntry.other_comment} minRows={1} labelText="Other Comments" />
				</div>


				<Fab onClick={onAddClicked}>
					<AddIcon />
				</Fab>



			</form>
		</div>
	);
}

export default NewEntryForm;