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
			<h4>{props.itemDate.substring(0, 10)} {props.timeConsumed.substring(0, 5)} Entry</h4>
			<table>
				<thead>
					<tr>
						<td>Descripton: </td>
						<td>{props.itemDesc}</td>
					</tr>
					<tr>
						<td>Location: </td>
						<td>{props.consumedLocation}</td>
					</tr>
					<tr>
						<td>Company: </td>
						<td>{props.consumptionCompany}</td>
					</tr>
					<tr>
						<td>Feelings Prior: </td>
						<td>{props.feelingPrior}</td>
					</tr>
					<tr>
						<td>Feelings Post: </td>
						<td>{props.feelingPost}</td>
					</tr>
					<tr>
						<td>Self Talk: </td>
						<td>{props.selfTalk}</td>
					</tr>
					<tr>
						<td>Other Comment: </td>
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