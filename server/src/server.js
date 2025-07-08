import express from "express";
import dotnev from "dotenv";

import cors from 'cors';
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import pool from "./db.js";

// Add dynamic env assignment
dotnev.config({
  path: `.env.development`
});

const app = express();
const PORT = process.env.PORT;
const saltRounds = process.env.SALTROUNDS ? parseInt(process.env.SALTROUNDS) : 10;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET.toString(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: process.env.NODE_ENV == "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, //one day cookie (Might change to a week for use case)
    }
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

const db = pool;

//dummy express route 

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

//User Logic

app.post('/user/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      res.status(200).send('Logged out');
    });
  });
});

app.get('/user/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.post('/user/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    req.login(user, err => {
      if (err) return next(err);
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

app.post("/user/register", async (req, res) => {
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
            res.redirect('/user/check-auth');
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
app.get("/entry/:userId/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.params.userId;
  try {
    const result = await db.query("SELECT * FROM entrys WHERE id = $1 AND user_id = $2", [id, userId]);
    const foundEntry = result.rows;

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
app.get("/entry/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await db.query("SELECT * FROM entrys WHERE user_id = $1", [userId]);
    const foundEntries = result.rows;
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


//GET all entries for a user given a specific date
app.get("/entry/date/:userId/:date", async (req, res) => {
  const userId = req.params.userId;
  const date = req.params.date;
  try {
    const result = await db.query("SELECT * FROM entrys WHERE user_id = $1 AND item_date = $2", [userId, date]);
    const foundEntries = result.rows;
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
app.post("/entry/:userId", async (req, res) => {
  const userId = req.params.userId;
  const entry = req.body;

  //TODO: Add validation for new user

  try {
    await db.query("INSERT INTO entrys (user_id, item_date, time_consumed, item_desc, consumed_location, consumption_company, feeling_prior, feeling_post, self_talk, other_comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [userId, entry.item_date, entry.time_consumed, entry.item_desc, entry.consumed_location, entry.consumption_company, entry.feeling_prior, entry.feeling_post, entry.self_talk, entry.other_comment]);
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
app.put("/entry/:userId/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.params.userId;
  const entry = req.body;

  try {
    await db.query
      ("UPDATE entrys SET item_date = $3, time_consumed = $4, item_desc = $5, consumed_location = $6, consumption_company = $7, feeling_prior = $8, feeling_post = $9, self_talk = $10, other_comment = $11 WHERE user_id = $1 AND id = $2",
        [userId, id, entry.item_date, entry.time_consumed, entry.item_desc, entry.consumed_location, entry.consumption_company, entry.feeling_prior, entry.feeling_post, entry.self_talk, entry.other_comment]);
    res.status(200).json("Entry Updated");
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
app.delete("/entry/:userId/:id", async (req, res) => {
  const userId = req.params.userId;
  const id = parseInt(req.params.id);
  try {
    await db.query("DELETE FROM entrys WHERE user_id = $1 AND id = $2", [userId, id]);
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
passport.deserializeUser((user, cb) => {
  cb(null, user);
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

