import React from "react";
import TextareaAutosize from '@mui/material/TextareaAutosize';


function LabelTextArea(props: {
	className: string;
	labelText: string;
	minRows: number;
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
	value: string;
}) {
	return (
		<div className="row">
			<div className="col-35">
				<label htmlFor={props.className}>{props.labelText}</label>
			</div>
			<div className="col-65">
				<TextareaAutosize
					className={props.className}
					name={props.className}
					id={props.className}
					minRows={props.minRows}
					style={{ width:"100%"}}
					onChange={props.onChange}
					value={props.value}
				/>
			</div>
		</div>
	);
}


export default LabelTextArea;