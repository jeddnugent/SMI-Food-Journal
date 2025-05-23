import express, { Request, Response, NextFunction } from "express";
import pg from 'pg';
import dotnev from "dotenv";

import type { Entry } from './interfaces/Entry';
import User from "./interfaces/User";

import cors from 'cors';
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";

//TODO: Adapt code with express routes
//TODO: Create services file for buisness logic and to tap into SQL
//TODO: possibly change interfaces to modles, need to check style guides for file structure hiracrchy
//TODO: Add in proper Auth

// Add dynamic env assignment
dotnev.config({
  path: `.env.development`
});

const app = express();
const PORT = process.env.PORT;
const saltRounds = process.env.SALTROUNDS ? parseInt(process.env.SALTROUNDS) : 10;

app.use(cors({
  origin: 'http://localhost:3000',  // Allow only localhost:3000
  credentials: true
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET!.toString(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //one day cookie
    }
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
});

db.connect();


//User Logic

app.get("/failedLogin", (req, res) => {
  res.json("Not authenticated");
});


app.get("/authenticateUser", (req, res) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    res.json(req.user);
    res.json("YOU ARE VALID TWIN");
  } else {
    res.redirect("/failedLogin");
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});


app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/authenticateUser",
    failureRedirect: "/failedLogin",
  })
);


app.post("/register", async (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      //user already exsits
      res.status(409).json({ error: 'Email provided is aleady being used' });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (f_name, l_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [fName, lName, email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("register success");
            res.redirect("/authenticateUser");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//Entry Logic

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
app.post("/entry/:userId", async (req: Request, res: Response) => {
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
  const entry: Entry = req.body;

  try {
    await db.query
      ("UPDATE entrys SET item_date = $3, time_consumed = $4, item_desc = $5, consumed_location = $6, consumption_company = $7, feeling_prior = $8, feeling_post = $9, self_talk = $10, other_comment = $11 WHERE user_id = $1 AND id = $2",
        [userId, id, entry.item_date, entry.time_consumed, entry.item_desc, entry.consumed_location, entry.consumption_company, entry.feeling_prior, entry.feeling_post, entry.self_talk, entry.other_comment]);
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
  const userId: string = req.params.userId;
  const id: number = parseInt(req.params.id);
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

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user: Express.User, cb: (err: any, user?: Express.User | false | null) => void) => {
  cb(null, user);
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

