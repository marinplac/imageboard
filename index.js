const express = require("express");
const app = express();
const db = require("./utils/db");
app.use(require("body-parser").json());
app.use(express.static("./public"));

app.get("/imageboard", (req, res) => {
    db.getPics().then(({ rows }) => {
        res.json(rows);
    });
});

app.get("/imageboard", function(res) {
    console.log(res);
    app.images = res.data;
});

app.listen(8080, () => {
    console.log("It's listening!");
});
