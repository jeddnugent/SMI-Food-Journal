CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text UNIQUE NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE "entrys" (
  "id" serial PRIMARY KEY,
  "createdBy" integer NOT NULL,
  "itemDate" date NOT NULL,
  "timeConsumed" time NOT NULL,
  "itemDesc" text NOT NULL,
  "consumedLocation" text NOT NULL,
  "consumptionCompany" text NOT NULL,
  "feelingPrior" text NOT NULL,
  "feelingPost" text NOT NULL,
  "selfTalk" text NOT NULL,
  "otherComment" text
);

ALTER TABLE "entrys" ADD CONSTRAINT "user_entries" FOREIGN KEY ("createdBy") REFERENCES "users" ("userId");
