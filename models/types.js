"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Type {
    /** Create a type (from data), update db, return new type data.
     *
     * data should be { id, name, amount }
     *
     * Returns { name, amount}
     *
     * Throws BadRequestError if type already in database
     * */

    static async create({ name}) {

        //on conflict asks to perform update instead of insert if there is already that name
        //do not update set increments amount of column by 1- if column already exists
        //if column doesnt exist, a new row will be inserted with an initial amount of 1
        const result = await db.query(`
                  INSERT INTO types (name, amount)
                  VALUES ($1, $2)
                  ON CONFLICT (name)
                  DO UPDATE SET amount = types.amount + 1
                  RETURNING
                      name,
                      id,
                      amount`, [name,]
        );
        const types = result.rows[0];

        return types;
    }

  
  

    /** Find all companies (optional filter on searchFilters).
     *
     * searchFilters (all optional):
     * - type (will find case-insensitive, partial matches)
     * - color
     * - isSold boolean
     * - maxprice 
     *
     * Returns [{ }, ...]
     * */

    static async findAll() {

        const typesRes = await db.query(`
          SELECT * 
          FROM types
          ORDER BY name`);

        return typesRes.rows;
    }

  

    

}


module.exports = Type;
