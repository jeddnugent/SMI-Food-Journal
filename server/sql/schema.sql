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
  "itemDate" DATE NOT NULL,
  "timeConsumed" TIME NOT NULL,
  "itemDesc" TEXT NOT NULL,
  "consumedLocation" TEXT NOT NULL,
  "consumptionCompany" TEXT NOT NULL,
  "feelingPrior" TEXT NOT NULL,
  "feelingPost" TEXT NOT NULL,
  "selfTalk" TEXT NOT NULL,
  "otherComment" TEXT,
  PRIMARY KEY (user_id, id)
);