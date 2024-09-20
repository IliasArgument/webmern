const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const crypto = require("crypto");
const { COOKIE_SETTINGS } = require("../constants");
const userService = require("../services/user-service");
const { validationResult } = require("express-validator");
const createError = require("http-errors");
const UserDto = require("../dtos/user-dto");
const nodemailer = require("nodemailer");
const UserModel = require("../models/user");
const tokenService = require("../services/token-service");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userDate = await userService.registration(email, password, name);
    console.log(userDate, 'userDates')
    res.cookie("refreshToken", userDate.refreshToken, {
      maxAge: 30 * 24 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userDate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.login(email, password);
    // generate token and add to cookies
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return res.json({ ...userData, status: 200 });
  } catch (e) {
    res.status(400).json({ error: e.message });
    // next(e);
  }
};

// Refresh token
exports.refresh = async (req, res) => {
  // // Verify refresh token
  // // Generate secret key (optional, consider environment variables for production)
  // // Generate new tokens
  // // Update user with new refresh token
  // res.json({ accessToken, refreshToken: newRefreshToken });
  try {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 1000,
      httpOnly: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const token = userService.logout(refreshToken);
    console.log("logout");
    res.clearCookie("refreshToken");
    res.json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {}
};

exports.forgot = async (req, res, next) => {
  try {
    console.log(process.env.GMAIL_CLIENT_ID, 'process.env env')
    const { email } = req.body;
    if (!email) {
      return res.json({ Status: "Invalid email" });
    }
    const { user, tokens } = await userService.forgot(email);
    // guide: https://www.youtube.com/watch?v=k-6KFSnaFTU
    // Насройка OAuth2 клиента

    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID, // Вставьте ваш CLIENT_ID из Google Cloud Console
      process.env.GMAIL_CLIENT_SECRET, // Вставьте ваш CLIENT_SECRET из Google Cloud Console
      "https://developers.google.com/oauthplayground" // Убедитесь, что этот URL правильный
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN, // Вставьте ваш REFRESH_TOKEN
    });

    // Получение токена доступа
    const accessToken = await oauth2Client.getAccessToken();

    // Создание транспортера Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ilakoles96@gmail.com", // Вставьте ваш email
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Определение параметров письма
    const mailOptions = {
      from: "ilakoles96@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `http://localhost:3000/auth/reset/${user.id}/${tokens.accessToken}`,
    };

    // Отправка письма
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        return res.send({ Status: "Success" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.reset = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    // Проверка на наличие значений id, token, и password
    if (!id || !token || !password) {
      return res.status(400).json({
        status: "error",
        message: "Missing required parameters: id, token, or password",
      });
    }
    const result = await userService.reset(token, password, id);
    // Возвращаем успешный ответ
    return res.json({
      status: "success",
      message: "Password has been reset successfully",
      user: result.user,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};
