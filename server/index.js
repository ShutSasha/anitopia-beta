require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
	try {
		await sequelize.authenticate(); // тут устанавливается подключение к бд
		await sequelize.sync(); // будет сверять бд с схемой данных
		//запуск серва
		app.listen(PORT, () => {
			console.log(`server started on PORT ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
