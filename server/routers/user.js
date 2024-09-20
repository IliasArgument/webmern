const express = require("express");
const router = express.Router();
const userHandlers = require("../controllers/user.js");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware.js");

router.post(
  "/auth/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userHandlers.register
);
router.post("/auth/sign_in", userHandlers.login);
router.post("/auth/logout", userHandlers.logout);
router.get("/auth/refresh", userHandlers.refresh);
router.post("/auth/forgot-password", userHandlers.forgot);
router.post("/auth/reset-password/:id/:token", userHandlers.reset);

router.get("/auth/users", userHandlers.getUsers);

module.exports = router;
