const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);
exports.getPics = function getPics() {
    let q = `SELECT * FROM images`;
    return db.query(q);
};
exports.putInTable = function putInTable(url, username, title, description) {
    let q = `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4)  RETURNING *`;
    let params = [url, username, title, description];
    return db.query(q, params);
};
exports.getPicId = function getPicId(id) {
    let q = `SELECT * FROM images WHERE $1 = id `;
    let params = [id];
    return db.query(q, params);
};
