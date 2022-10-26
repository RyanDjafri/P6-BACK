const { app, express } = require("./server");
const { saucesRouter } = require("./routes/sauces");
const { authRouter } = require("./routes/auth");
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
// Connection to database
require("./db/mongo");

// Middleware
app.use(bodyParser.json());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
    frameguard: false,
  })
);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/sauces", saucesRouter);
app.use("/api/auth", authRouter);

//Routes
app.get("/", (req, res) => res.send("Hello World!"));

// Listen
app.use("/images", express.static(path.join(__dirname, "images")));
app.listen(port, () => console.log("Listening on port " + port));
