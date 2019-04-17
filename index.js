const express = require("express");
const app = express();
const db = require("./utils/db");
const s3 = require("./s3");
const config = require("./config.json");

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(require("body-parser").json());
app.use(express.static("public"));

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    console.log("req.file: ", req.file.filename);
    console.log(req.body);

    if (req.file) {
        const url = config.s3Url + req.file.filename;
        db.putInTable(
            url,
            req.body.username,
            req.body.title,
            req.body.description
            // Date.now()
        )
            .then(data => {
                req.file = data.rows[0].id;
            })
            .catch(err => {
                console.log("err in putInTable:", err);
            });

        res.json({
            success: true,
            url
        });
    } else {
        res.json({
            success: false
        });
    }
});

app.get("/imageboard", (req, res) => {
    db.getPics().then(({ rows }) => {
        res.json(rows);
    });
});

app.get("/imageboard", function(res) {
    console.log(res);
    app.images = res.data;
});

app.get("/image/:id", function(req, res) {
    console.log(req.params.id);
    db.getPicId(req.params.id).then(({ data }) => {
        // console.log(data);
        res.json(data);
    });
});

app.listen(8080, () => {
    console.log("I am listening to your blabber!");
});
