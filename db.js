"use strict";

/** Database setup for house scraper. */

const { Client } = require("pg");
const {getDatabaseUri } = require("./config");



const db = new Client({
  connectionString: getDatabaseUri()
});

db.connect()
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Failed to connect to database:", err));

module.exports = db;


