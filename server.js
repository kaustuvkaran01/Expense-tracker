const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const transactions = require("./routes/transactions");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactions);

// app.get("/", (req, res) => res.send("Hello"));

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} at : ${PORT}`.yellow.bold
	)
);
