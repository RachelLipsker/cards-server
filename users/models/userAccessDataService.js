const User = require("./mongodb/User");
const _ = require("lodash");
const { generationAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comparePasswords } = require("../helpers/bcrypt");

const config = require("config");
const DB = config.get("DB");

const registerUser = async (newUser) => {
    if (DB == "mongodb") {
        try {
            newUser.password = generateUserPassword(newUser.password);
            let user = new User(newUser);
            user = await user.save();
            return _.pick(user, ["_id", "email", "name"]);
        } catch (error) {
            createError("Mongoose", error);
        }
    }
};

const loginUser = async (email, password) => {
    if (DB == "mongodb") {
        try {
            const userFromDb = await User.findOne({ email });
            if (!userFromDb) {
                createError("Authentication Error", new Error("Invalid email or password"));
            }
            if (!comparePasswords(password, userFromDb.password)) {
                createError("Authentication Error", new Error("Invalid email or password"));
            };
            const token = generationAuthToken(userFromDb);
            return token;
        } catch (error) {
            createError("Mongoose", error);
        }
    }
};

const getUser = async (userId) => {
    if (DB == "mongodb") {
        try {
            let user = await User.findById(userId);
            return user;
        } catch (error) {
            createError("Mongoose", error);
        }
    }
};


const getUsers = async () => {
    if (DB == "mongodb") {
        try {
            let users = await User.find();
            return users;
        } catch (error) {
            createError("Mongoose", error);
        }
    }
};

module.exports = { registerUser, getUser, getUsers, loginUser };