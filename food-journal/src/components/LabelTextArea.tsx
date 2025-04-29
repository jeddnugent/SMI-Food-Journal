import React from "react";
import TextareaAutosize from '@mui/material/TextareaAutosize';


function LabelTextArea(props: {
	className: string;
	labelText: string;
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>
	value: string;
}) {
	return (
		<div>
			<div className="entryLabel">
				<label htmlFor={props.className}>{props.labelText}</label>
			</div>
			<TextareaAutosize
				className={props.className}
				name={props.className}
				id={props.className}
				minRows={1}
				style={{ width: 200 }}
				onChange={props.onChange}
				value={props.value}
			/>
		</div>
	);
}


export default LabelTextArea;