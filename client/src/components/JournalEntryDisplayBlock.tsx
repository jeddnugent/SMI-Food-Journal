import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/JournalEntryDisplayBlock.css";


function JournalEntryDisplayBlock(props: {
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
	deleteEntry: Function;
}) {
	return (
		<div className="JornalDisplay">
			<h4>{props.itemDate.substring(0, 10)} {props.timeConsumed.substring(0, 5)}</h4>
			<table>
				<thead>
					<tr>
						<th>Descripton: </th>
						<td>{props.itemDesc}</td>
					</tr>
					<tr>
						<th>Location: </th>
						<td>{props.consumedLocation}</td>
					</tr>
					<tr>
						<th>Company: </th>
						<td>{props.consumptionCompany}</td>
					</tr>
					<tr>
						<th>Feelings Prior: </th>
						<td>{props.feelingPrior}</td>
					</tr>
					<tr>
						<th>Feelings Post: </th>
						<td>{props.feelingPost}</td>
					</tr>
					<tr>
						<th>Self Talk: </th>
						<td>{props.selfTalk}</td>
					</tr>
					<tr>
						<th>Other Comment: </th>
						<td>{props.otherComment}</td>
					</tr>
				</thead>
			</table>
			<button onClick={() => { props.deleteEntry(props.id) }}>
				<DeleteIcon />
			</button>
		</div>
	);
}


export default JournalEntryDisplayBlock;