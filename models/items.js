"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Item {
    /** Create a item (from data), update db, return new type data.
     *
     * data should be {title, type_id, color, website, image_url, link, date_added, is_sold_price }
     *
     * Returns { title, amount}
     *
     * Throws BadRequestError if type already in database
     * */

    static async create({ newItem }) {
        const duplicateCheck = await this.get(newItem);

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate company: ${handle}`);
        }

        const { title, type_id, color, website, image_url, link, date_added, is_sold_price } = newItem;

        const result = await db.query(`
                  INSERT INTO items (title, 
                    type_id, 
                    color, 
                    website,
                    image_url,
                    link,
                    date_added,
                    is_sold,
                    price)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                  RETURNING
                      title,
                      color,
                      website,
                      image_url,
                      link,
                      date_added,
                      is_sold,
                      price`, [title,
            type_id,
            color,
            website,
            image_url,
            link,
            date_added,
            is_sold_price]
        );
        const item = result.rows[0];

        return item;
    }

    /** Create WHERE clause for filters, to be used by functions that query
     * with filters.
     *
     * searchFilters (all optional):
     * - price
     * - isSold boolean
     * - color (will find case-insensitive, partial matches)
     * 
     *
     * Returns {
     *  where: "WHERE name ILIKE $1 AND color ILIKE $2 AND is_sold = $3 AND price <= $4",
     *  vals: ['%couch%','%black%', 'false', 200]
     * }
     */

    static _filterWhereBuilder({ type_id, color, isSold, maxPrice }) {
        let whereParts = [];
        let vals = [];

        if (type_id) {
            vals.push(`%${type_id}%`);
            whereParts.push(`title ILIKE $${vals.length}`);
        }
        if (color) {
            vals.push(`%${color}%`);
            whereParts.push(`color ILIKE $${vals.length}`);
        }

        if (isSold !== undefined) {
            vals.push(isSold);
            whereParts.push(`is_sold = $${vals.length}`);
        }

        if (maxPrice) {
            vals.push(price);
            whereParts.push(`price <= $${vals.length}`);
        }

        const where = (whereParts.length > 0) ?
            "WHERE " + whereParts.join(" AND ")
            : "";

        return { where, vals };
    }
    /** Given a item title, return data about item.
 *
 * Returns { }
 *
 * Throws NotFoundError if not found.
 **/

    static async get(title) {
        const itemRes = await db.query(`
        SELECT id,
            title, 
            type_id, 
            color, 
            website,
            image_url,
            link,
            date_added,
            is_sold,
            price
        FROM items
        JOIN types on items.type_id = types.id
        WHERE title = $1`, [title]);

        const item = itemRes.rows[0];

        if (!item) throw new NotFoundError(`No item: ${item}`);

        return item;
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

    static async findAll(searchFilters = {}) {
        // console.log("before");
        const { type_id, color, isSold, maxPrice } = searchFilters;

        const { where, vals } = this._filterWhereBuilder({
            type_id, color, isSold, maxPrice
        });
        // console.log("before2");

        const itemsRes = await db.query(`
          SELECT title,
                color,
                website,
                link,
                image_url,
                date_added,
                price,
                is_sold
          FROM items
          JOIN types on items.type_id = types.id
          ${where}
          ORDER BY date_added`, vals);
        // console.log("after");
        //   console.log("items", itemsRes);

        return itemsRes.rows;
    }



    /** Updates item as sold
     *
     *
     * Returns {id, title}
     *
     * Throws NotFoundError if not found.
     */

    static async update(itemId) {

        const result = await db.query(
            `UPDATE items
            SET is_sold = true
            WHERE id = $1`,
            [itemId]
        );
        const item = result.rows[0];

        if (!item) throw new NotFoundError(`No item: ${item}`);

        return item;
    }

    /** Delete given item from database; returns undefined.
     *
     * Throws NotFoundError if item not found.
     **/

    static async remove(itemId) {
        const result = await db.query(`
          DELETE
          FROM items
          WHERE id = $1
          RETURNING id, title`, [itemId]);
        const item = result.rows[0];

        if (!item) throw new NotFoundError(`No item: ${item}`);
    }
}


module.exports = Item;
