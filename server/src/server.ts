import express, { Request, Response, NextFunction } from "express";
import pg from 'pg';
import Entry from './interfaces/Entry';
import dotnev from "dotenv";

//TODO: Replace test data with SQL backend
//TODO: Adapt code with express routes
//TODO: Create services file for buisness logic and to tap into SQL
//TODO: possibly change interfaces to modles, need to check style guides for file structure hiracrchy
//TODO: Add in proper Auth

import testEntries from './test/data';

// Add dynamic env assignment
dotnev.config({
  path: `.env.development`
});

const db = new pg.Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
});

db.connect();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET an entry of a specific ID
app.get("/entry/:userId/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const userId: number = parseInt(req.params.userId);
  const result = await db.query("SELECT * FROM entrys WHERE id = $1 AND userId = $2", [id, userId]);
  const foundEntry: Entry[] = result.rows;

  if (!foundEntry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.json(foundEntry);
});

//GET all entries for a user
app.get("/entry/:userId", async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);
  try {
    const result = await db.query("SELECT * FROM entrys WHERE userId = $1", [userId]);
    const foundEntries: Entry[] = result.rows;
    if (foundEntries.length < -1) {
      res.status(404).json({ error: "This user has no entrys recorded" });
      return;
    }
    res.json(foundEntries);
  } catch (error) {
    console.log(error);
  }
});

// POST New Entry
app.post("/entry", async (req: Request, res: Response) => {
  const userId: number = parseInt(req.body.userId);
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

  //TODO: Add validation for new user

  try {
    await db.query("INSERT INTO entrys (title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [userId, itemDate, timeConsumed, itemDesc, consumedLocation, consumptionCompany, feelingPrior, feelingPost, selfTalk, otherComment]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

//PATCH Update Entry
app.patch("/entry/:userId/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const userId: string = req.params.userId;
  const {
    itemDate,
    timeConsumed,
    itemDesc,
    consumedLocation,
    consumptionCompany,
    feelingPrior,
    feelingPost,
    selfTalk,
    otherComment 
  } = req.body;

  
  //TODO: Add Validation

  if (!exsistingEntry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  const updatedEntry: Entry = {
    id,
    createdBy,
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

