#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = ``;

const main = async () => {
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
};

main();
