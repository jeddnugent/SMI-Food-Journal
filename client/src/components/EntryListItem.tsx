import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import EditDialogBox from "../components/EditDialogBox";
import type { Entry } from "../interfaces/Entry";

import "../styles/EntryListItem.css";


function EntryListItem(props: {
	entry: Entry;
	deleteEntry: (id: number) => void;
	updateEntryList: () => void;
}) {

	const dateShortend = props.entry.item_date ? props.entry.item_date.substring(0, 10) : "";
	const timeShortend = props.entry.time_consumed ? props.entry.time_consumed.substring(0, 5) : "";

	const [editOpen, setEditOpen] = useState(false);

	const handleEditOpen = () => {
		console.log("edit tapped");
		setEditOpen(true);
	};

	const handleEditClose = () => {
		setEditOpen(false);
	};


	return (
		<div>
			<li>
				<div className="EntryListItem-container">
					<div className="itemName">{props.entry.item_desc}</div>
					<div className="time">{timeShortend}</div>
					<div className="date">{dateShortend}</div>
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



export default EntryListItem;