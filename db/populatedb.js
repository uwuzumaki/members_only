#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS member (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR (255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) not NULL,
  member_status BOOLEAN NOT NULL DEFAULT FALSE,
  admin_status BOOLEAN NOT NULL DEFAULT FALSE
  );
  
CREATE TABLE IF NOT EXISTS posts (
  post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  poster_id INTEGER REFERENCES member(user_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  contents TEXT NOT NULL
  );
`;

const main = async () => {
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
};

main();
