require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const imageKit = require("imagekit");
const router = require("./routes/index");
const errorMiddleware = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use("/api", router);
app.use(errorMiddleware);

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
