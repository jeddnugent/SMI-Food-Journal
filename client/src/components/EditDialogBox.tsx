import { useState, Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LabelTextArea from './LabelTextArea';

import type { Entry } from '../interfaces/Entry';

export default function FormDialog(props: {
  editOpen: boolean;
  entry: Entry;
  handleClose: () => void;
  handleOpen: () => void;
  updateEntryList: (entry: Entry) => void;
}) {



  const [updatedEntry, setUpdatedEntry] = useState<Entry>(props.entry);

  function handleTextAreaChanged(event: { target: { name: string; value: string; }; }) {
    const { name, value } = event.target;
    if (name === "itemDate") {
      console.log("Date at input" + value);
    }
    setUpdatedEntry(currentEntry => {
      return ({ ...currentEntry, [name]: value });
    });
  }

  async function onSubmit() {
    console.log(updatedEntry);
    //TODO: Replace test user data
    props.updateEntryList(updatedEntry);
    props.handleClose();
  }
  return (
    <Fragment>
      <Dialog
        open={props.editOpen}
        onClose={props.handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              onSubmit();
              props.handleClose();
            },
          },
        }}
        scroll={"paper"}
      >
        <DialogTitle>Edit Journal Entry</DialogTitle>
        <DialogContent>
          <label htmlFor="item_date">Date </label>
          <input type="date" id="item_date" name="item_date" onChange={handleTextAreaChanged} value={updatedEntry.item_date} />
          <label>Time Consumed </label>
          <input type="time" id="time_consumed" name="time_consumed" onChange={handleTextAreaChanged} value={updatedEntry.time_consumed} />
          <LabelTextArea className="item_desc" onChange={handleTextAreaChanged} value={updatedEntry.item_desc} minRows={1} labelText="Food/Drink Description" />
          <LabelTextArea className="consumed_location" onChange={handleTextAreaChanged} value={updatedEntry.consumed_location} minRows={1} labelText="Where were you when you ate / drank this?" />
          <LabelTextArea className="consumption_company" onChange={handleTextAreaChanged} value={updatedEntry.consumption_company} minRows={1} labelText="Who were you with at the time?" />
          <LabelTextArea className="feeling_prior" onChange={handleTextAreaChanged} value={updatedEntry.feeling_prior} minRows={1} labelText="How were you feeling emotionally prior to eating / drinking? (Note: Hungry is not an emotion)" />
          <LabelTextArea className="feeling_post" onChange={handleTextAreaChanged} value={updatedEntry.feeling_post} minRows={1} labelText="How did you feel emotionally after eating / drinking?" />
          <LabelTextArea className="self_talk" onChange={handleTextAreaChanged} value={updatedEntry.self_talk} minRows={1} labelText="What did you say to yourself before and after you ate/drank?" />
          <LabelTextArea className="other_comment" onChange={handleTextAreaChanged} value={updatedEntry.other_comment} minRows={1} labelText="Other Comments" />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
