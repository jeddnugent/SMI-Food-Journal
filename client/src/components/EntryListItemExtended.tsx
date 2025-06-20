import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import EditDialogBox from "../components/EditDialogBox";
import type { Entry } from "../interfaces/Entry";

import "../styles/EntryListItemExtended.css";


function EntryListItemExtended(props: {
	entry: Entry;
	deleteEntry: (id: number) => void;
	updateEntryList: (entry: Entry) => void;
}) {

	const dateShortend = props.entry.item_date ? props.entry.item_date.substring(0, 10) : "";
	const timeShortend = props.entry.time_consumed ? props.entry.time_consumed.substring(0, 5) : "";

	const [editOpen, setEditOpen] = useState(false);

	const handleEditOpen = () => {
		setEditOpen(true);
	};

	const handleEditClose = () => {
		setEditOpen(false);
	};


	return (
		<div>
			<li>
				<div className="EntryListItemExtended-container">
					<div className="itemName">{props.entry.item_desc}</div>
					<div className="time">{timeShortend}</div>
					<div className="date">{dateShortend}</div>
					<div className="consumedLocation">{props.entry.consumed_location}</div>
					<div className="consumptionCompany">{props.entry.consumption_company}</div>
					<div className="feelingPrior">{props.entry.feeling_prior}</div>
					<div className="feelingPost">{props.entry.feeling_post}</div>
					<div className="otherComment">{props.entry.other_comment}</div>
					<div className="buttonContainer">
						<button onClick={handleEditOpen}>
							<EditIcon />
						</button>
						<button onClick={() => { props.deleteEntry(props.entry.id ?? 0); }}>
							<DeleteIcon />
						</button>
					</div>
				</div>
			</li>
			<EditDialogBox entry={props.entry} editOpen={editOpen} handleClose={handleEditClose} handleOpen={handleEditOpen} updateEntryList={props.updateEntryList} />
		</div>
	);
}



export default EntryListItemExtended;