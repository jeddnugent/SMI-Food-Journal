import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import "../styles/EntryListItem.css";


function EntryListItem(props: {
	id: number;
	itemDate: string;
	timeConsumed: string;
	itemDesc: string;
	consumedLocation: string;
	consumptionCompany: string;
	feelingPrior: string;
	feelingPost: string;
	selfTalk: string;
	otherComment: string;
	editEntry: Function;
	deleteEntry: Function;
}) {

	console.log(props.id, props.timeConsumed)
	console.log(props.id, props.itemDate)


	const dateShortend = props.itemDate ? props.itemDate.substring(0, 10): "";
	const timeShortend = props.timeConsumed ? props.timeConsumed.substring(0, 5): "";


	return (
		<div>
			<li>
				<div className="EntryListItem-container">
					{/* <div className="textContainer"> */}
					<div className="itemName">{props.itemDesc}</div>
					<div className="time">{timeShortend}</div>
					<div className="date">{dateShortend}</div>
					{/* </div> */}
					<div className="buttonContainer">
						<button className="edit">
							<EditIcon />
						</button>
						<button onClick={() => { props.deleteEntry(props.id) }}>
							<DeleteIcon />
						</button>
					</div>
				</div>
			</li>
		</div>
	)
}



export default EntryListItem;