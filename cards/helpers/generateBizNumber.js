const { createError } = require("../../utils/handleErrors");
const Card = require("../models/mongodb/Card");
const _ = require("lodash");

const generateBizNumber = async () => {
    let cardsCount = await Card.find().countDocuments();
    if (cardsCount === 9_000_000) {
        createError("bizNumber", new Error("you reached to the maximum cards count"))
    }
    let random;
    do {
        random = _.random(1_000_000, 9_999_999);
    } while (await isBizNumberExists(random));
    return random;
}

const isBizNumberExists = async (bizNumber) => {
    try {
        const card = await Card.findOne({ bizNumber });
        return Boolean(card);
    } catch (error) {
        createError("mongoose", error)
    }
}

module.exports = { generateBizNumber, isBizNumberExists };