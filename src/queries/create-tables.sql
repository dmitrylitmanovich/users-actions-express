CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "email" varchar UNIQUE,
  "hash" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "actions" (
  "id" int PRIMARY KEY,
  "actiontype" varchar,
  "timestamp" timestamp,
  "user_id" int
);

ALTER TABLE "actions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
