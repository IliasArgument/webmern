const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const option = {
  socketTimeoutMS: 30000,
  // keepAlive: true,
  // reconnectTries: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Подключение к MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mydb", option);

// Получение объекта подключения
const db = mongoose.connection;

// Событие 'error' возникает при ошибке подключения
db.on("error", (error) => {
  console.error("Ошибка подключения:", error);
});

// Событие 'open' возникает при успешном подключении
db.once("open", () => {
  console.log("Подключение к MongoDB успешно!");

  // Здесь вы можете выполнять операции с базой данных, такие как запросы и т. д.
});
app.use(cookieParser());
app.use(cors(corsOptions));
// Middleware для body-parser
app.use(bodyParser.json());

// Обработчик ошибок
console.log('/index')
app.use((error, req, res, next) => {
  // Установка кода состояния ответа
  res.status(error.status || 500);

  // Отправка ответа
  console.log(error, error.status, 'index,js')
  res.json({ error: error.message });
});


// Подключение маршрутов
app.use("/api", require("./routers/students"));
app.use("/api", require("./routers/user"));

// Запуск сервера
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
