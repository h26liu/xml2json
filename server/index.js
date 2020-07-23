const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "XMLHttpRequest, name, size, x-file-id, x-start-byte, Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    console.log(`${datetimeService.getCurrentDatetime()} ¯\_(ツ)_/¯`);
    next();
});

// services
const datetimeService = require("./services/datetime.service");

// routes
const convertRoutes = require("./routes/convert.routes");

app.use("/api/convert", convertRoutes);

// START THE SERVER
// =============================================================================
app.listen(port, () => {
    console.log(
        `${datetimeService.getCurrentDatetime()} MAGIC HAPPENS ON ${port}`
    );
});

app.use(express.static("public"));
