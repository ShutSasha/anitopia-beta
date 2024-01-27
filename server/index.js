require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = require("./routes/index");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api", router);

const start = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.b0tz7ut.mongodb.net/`
		);

		//запуск серва
		app.listen(PORT, () => {
			console.log(`server started on PORT ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
