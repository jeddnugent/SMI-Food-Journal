import express, { Request, Response, NextFunction } from "express";
import pg from 'pg';
import Entry from './interfaces/Entry';
import dotnev from "dotenv";

//TODO: Adapt code with express routes
//TODO: Create services file for buisness logic and to tap into SQL
//TODO: possibly change interfaces to modles, need to check style guides for file structure hiracrchy
//TODO: Add in proper Auth

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
  const userId: string = req.params.userId;
  try {
    const result = await db.query("SELECT * FROM entrys WHERE id = $1 AND user_id = $2", [id, userId]);
    const foundEntry: Entry[] = result.rows;

    if (foundEntry.length === 0) {
      res.status(404).json({ error: "Entry not found" });
      return;
    }

    res.json(foundEntry);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Database Error:', error.message);
      res.status(400).json({ error: error.message });
    } else {
      console.error('Unexpected error type:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

//GET all entries for a user
app.get("/entry/:userId", async (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  try {
    const result = await db.query("SELECT * FROM entrys WHERE user_id = $1", [userId]);
    const foundEntries: Entry[] = result.rows;
    if (foundEntries.length < -1) {
      res.status(404).json({ error: "This user has no entrys recorded" });
      return;
    }
    res.json(foundEntries);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Database Error:', error.message);
      res.status(400).json({ error: error.message });
    } else {
      console.error('Unexpected error type:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

// POST New Entry
app.post("/entry", async (req: Request, res: Response) => {
  const userId: string = req.body.userId;
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
    await db.query("INSERT INTO entrys (user_id, item_date, time_consumed, item_desc, consumed_location, consumption_company, feeling_prior, feeling_post, self_talk, other_comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [userId, itemDate, timeConsumed, itemDesc, consumedLocation, consumptionCompany, feelingPrior, feelingPost, selfTalk, otherComment]);
    res.sendStatus(200);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Database Error:', error.message);
      res.status(400).json({ error: error.message });
    } else {
      console.error('Unexpected error type:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

//PATCH Update Entry
app.put("/entry/:userId/:id", async (req: Request, res: Response) => {
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

  try {
    await db.query
      ("UPDATE entrys SET item_date = $3, time_consumed = $4, item_desc = $5, consumed_location = $6, consumption_company = $7, feeling_prior = $8, feeling_post = $9, self_talk = $10, other_comment = $11 WHERE user_id = $1 AND id = $2",
        [userId, id, itemDate, timeConsumed, itemDesc, consumedLocation, consumptionCompany, feelingPrior, feelingPost, selfTalk, otherComment]);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Database Error:', error.message);
      res.status(400).json({ error: error.message });
    } else {
      console.error('Unexpected error type:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

//DELETE Specifc Entry
app.delete("/entry/:userId/:id", async (req: Request, res: Response) => {
  const userId: string = req.params.user;
  const id: number = parseInt(req.params.id);
  ;
  try {
    await db.query("DELETE FROM entrys WHERE user_id = $1 AND id = $2", [userId, id]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Database Error:', error.message);
      res.status(400).json({ error: error.message });
    } else {
      console.error('Unexpected error type:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

