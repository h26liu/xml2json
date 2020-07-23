const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path"); // used for manipulation with path
const fs = require("fs-extra"); // classic file stream
const xml2js = require("xml2js");

// services
const datetimeService = require("../services/datetime.service");

// multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/xml_original");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
// file type filter
const fileFilter = (req, file, cb) => {
    cb(null, true);
};
// upload object
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

router.get("/", function (req, res) {
    return res.json({ data: "Hello Convert API" });
});

router.post("/xml", upload.single("file"), function (req, res) {
    const file = req.file;

    const xmlpath = path.join(__dirname, `../public/xml_original/`); // register the output path
    fs.ensureDir(xmlpath); // make sure the path exits

    fs.readFile(`${xmlpath}${file.originalname}`, function (err, data) {
        let parser = new xml2js.Parser();
        parser
            .parseStringPromise(data)
            .then(function (result) {
                console.log(result);
                res.send({ code: 200, data: JSON.stringify(result) });
            })
            .catch(function (err) {
                // Failed
                console.log(err);
                res.send({ code: 500, data: err });
            });
    });

    // fs.readFile(`${xmlpath}${filename}`, function (err, data) {
    //     let parser = new xml2js.Parser();
    //     parser
    //         .parseStringPromise(data)
    //         .then(function (result) {
    //             console.log(result);
    //             res.send({ code: 200, data: JSON.stringify(result) });
    //         })
    //         .catch(function (err) {
    //             // Failed
    //             console.log(err);
    //             res.send({ code: 500, data: err });
    //         });
    // });
});

module.exports = router;
