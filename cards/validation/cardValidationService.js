const validateCardWithJoi = require("./joi/validationCardWithJoi");
const config = require("config");
const validator = config.get("VALIDATOR");

const validateCard = (card) => {
    if (validator === "joi") {
        const { error } = validateCardWithJoi(card);
        if (error) return error.details[0].message;
        return "";
    }
};

module.exports = validateCard;