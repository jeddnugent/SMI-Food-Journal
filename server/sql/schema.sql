CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "fName" TEXT NOT NULL,
  "lName" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" text NOT NULL
);

CREATE TABLE "entrys" (
  "id" SERIAL NOT NULL,
  "user_id" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "itemDate" date NOT NULL,
  "timeConsumed" time NOT NULL,
  "itemDesc" text NOT NULL,
  "consumedLocation" text NOT NULL,
  "consumptionCompany" text NOT NULL,
  "feelingPrior" text NOT NULL,
  "feelingPost" text NOT NULL,
  "selfTalk" text NOT NULL,
  "otherComment" text,
  PRIMARY KEY (user_id, id)
);