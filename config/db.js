const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});
		console.log(
			`MongoDB Connected : ${conn.connection.host}`.cyan.underline.bold
		);
	} catch (err) {
		console.error(err);
	}
};

module.exports = connectDB;
