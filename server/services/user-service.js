const UserModel = require("../models/user");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const createError = require("http-errors");
const nodemailer = require("nodemailer");

class UserService {
  async registration(email, password, name) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(400, `User existing!`);
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create new user (without refreshToken for now)
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(400, `Invalid email or password`);
    }
    // hash password
    const isValidPassword = await bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      throw createError(400, `Invalid email or password`);
    }
    // Create new user (without refreshToken for now)
    const userDto = new UserDto(user);
    userDto.isActivated = true;
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Unauthorized, error 401");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new Error("Unauthorized, error 401");
    }
    const user = await UserModel.findById(userData.id);
    //generate new tokens with fresh data
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async forgot(email, password) {

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      throw createError(400, `User not existed`);
    }

    
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    
    const result = await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      tokens: tokens,
      user: userDto,
    };
  }

  async reset(token, password, id) {
    // Валидация токена
    const decoded = tokenService.validateAccessToken(token);

    if (!decoded) {
      throw createError(400, `Invalid token`);
    }

    // Проверяем, что токен соответствует пользователю
    if (decoded.id !== id) {
      throw createError(403, `Token does not match user`);
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true } // Возвращаем обновленный документ пользователя
    );
    if (!user) {
      throw createError(404, `User not found`);
    }
    return {
      user: new UserDto(user),
    };
  }
}

module.exports = new UserService();
