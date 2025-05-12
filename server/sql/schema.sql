CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  f_name TEXT NOT NULL,
  l_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE entrys (
  id SERIAL NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_date DATE NOT NULL,
  time_consumed TIME NOT NULL,
  item_desc TEXT NOT NULL,
  consumed_location TEXT NOT NULL,
  consumption_company TEXT NOT NULL,
  feeling_prior TEXT NOT NULL,
  feeling_post TEXT NOT NULL,
  self_talk TEXT NOT NULL,
  other_comment TEXT,
  PRIMARY KEY (user_id, id)
);