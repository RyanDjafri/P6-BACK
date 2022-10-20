const { app, express } = require("./server");
const { saucesRouter } = require("./routes/sauces");
const { authRouter } = require("./routes/auth");
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");

// Connection to database
require("./db/mongo");

// Middleware
app.use(bodyParser.json());
app.use("/api/sauces", saucesRouter);
app.use("/api/auth", authRouter);

//Routes
app.get("/", (req, res) => res.send("Hello World!"));

// Listen
app.use("/images", express.static(path.join(__dirname, "images")));
app.listen(port, () => console.log("Listening on port " + port));
