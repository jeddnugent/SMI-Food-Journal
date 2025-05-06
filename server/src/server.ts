import express, { Request, Response, NextFunction } from "express";
import Entry from './interfaces/Entry';

//TODO: Replace test data with SQL backend
//TODO: Adapt code with express routes
//TODO: Create services file for buisness logic and to tap into SQL
//TODO: possibly change interfaces to modles, need to check style guides for file structure hiracrchy
//TODO: Add .env file for Server side secrets
//TODO: Add in proper Auth

import testEntries from './test/data';

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Express!');
});

//GET an entry of a specific ID
app.get("/entry/:user/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const user: string = req.params.user;
  const foundEntry = testEntries.find((entry) => entry.id === id && entry.user === user);

  if (!foundEntry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.json(foundEntry);
});

//GET all entries for a user
app.get("/entry/:user", (req: Request, res: Response) => {
  const user: string = req.params.user;
  const foundEntries: Entry[] = testEntries.filter((entry) => entry.user === user);

  if (foundEntries.length < -1) {
    res.status(404).json({ error: "Entries not found" });
    return;
  }

  res.json(foundEntries);


  if (testEntries.length < -1) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.json(testEntries);
});

// POST New Entry
app.post("/entry", (req: Request, res: Response) => {
  const id: number = parseInt(req.body.id);
  const {
    user,
    itemDate,
    timeConsumed,
    itemDesc,
    consumedLocation,
    consumptionCompany,
    feelingPrior,
    feelingPost,
    selfTalk,
    otherComment } = req.body;

  //TODO: Add validation for new user

  const newEntry: Entry = {
    user,
    id,
    itemDate,
    timeConsumed,
    itemDesc,
    consumedLocation,
    consumptionCompany,
    feelingPrior,
    feelingPost,
    selfTalk,
    otherComment,
  };

  testEntries.push(newEntry);

  console.log(newEntry);
  res.sendStatus(200);

});

//PATCH Update Entry
app.patch("/entry/:user/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const user: string = req.params.user;
  const exsistingEntry = testEntries.find((entry) => entry.id === id && entry.user === user);

  const {
    itemDate,
    timeConsumed,
    itemDesc,
    consumedLocation,
    consumptionCompany,
    feelingPrior,
    feelingPost,
    selfTalk,
    otherComment } = req.body;

  //TODO: Add Validation

  if (!exsistingEntry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  const updatedEntry: Entry = {
    user,
    id,
    itemDate: itemDate || exsistingEntry.itemDate,
    timeConsumed: timeConsumed || exsistingEntry.timeConsumed,
    itemDesc: itemDesc || exsistingEntry.itemDesc,
    consumedLocation: consumedLocation || exsistingEntry.consumedLocation,
    consumptionCompany: consumptionCompany || exsistingEntry.consumptionCompany,
    feelingPrior: feelingPrior || exsistingEntry.feelingPrior,
    feelingPost: feelingPost || exsistingEntry.feelingPost,
    selfTalk: selfTalk || exsistingEntry.selfTalk,
    otherComment: otherComment || exsistingEntry.otherComment,
  };

  //TODO: Move this logic
  const searchId = testEntries.findIndex(entry => entry.id === id);
  testEntries[searchId] = updatedEntry;

  res.json(updatedEntry);
});

//DELETE Specifc Entry
app.delete("/entry/:user/:id", (req: Request, res: Response) => {
  const user: string = req.params.user;
  const id: number = parseInt(req.params.id);

  //TODO: Replace with SQL logic
  const deletedIndex = testEntries.findIndex((entry) => entry.id === id && entry.user === user);
  if (deletedIndex > -1) {
    const deletedJoke = testEntries.find((entry) => entry.id === id && entry.user === user);
    testEntries.splice(deletedIndex, 1);
    res.status(200).json(deletedJoke);
  }
  else {
    res.status(404).json("Entry at this index could not be found");
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

