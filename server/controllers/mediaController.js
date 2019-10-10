const express = require('express');
const app = express();
const path = require('path');
const pool = require('../db');

module.exports = {
  postMedia: (req, res, next) => {
    const dbQuery = `INSERT INTO WatchList (id, name, media) VALUES ($1, $2, $3)`;
    const { id, name, media } = req.body;
    const valuesArr = [id, name, media];
    pool.query(dbQuery, valuesArr);
    return next();
  }
};
