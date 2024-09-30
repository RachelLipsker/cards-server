const { createError } = require("../../utils/handleErrors");
const Card = require("./mongodb/Card");
const config = require("config");
const DB = config.get("DB");


const createCard = async (newCard) => {
    if (DB == "mongodb") {
        try {
            let card = new Card(newCard);
            card = await card.save();
            return card;
        } catch (error) {
            createError("mongoose", error);
        }
    }
};

const getCards = async () => {
    if (DB == "mongodb") {
        try {
            let cards = await Card.find();
            return cards;
        } catch (error) {
            createError("mongoose", error);
        }
    }
};

const getCard = async (cardId) => {
    if (DB == "mongodb") {
        try {
            let card = await Card.findById(cardId);
            return card;
        } catch (error) {
            createError("mongoose", error);
        }
    }
}

const getMyCards = async (userId) => {
    if (DB == "mongodb") {
        try {
            let cards = await Card.find({ user_id: userId });
            return cards;
        } catch (error) {
            createError("mongoose", error);
        }
    }
}

const updateCard = async (cardId, newCard) => {
    if (DB == "mongodb") {
        try {
            let card = await Card.findByIdAndUpdate(cardId, newCard, { new: true });
            return card;
        } catch (error) {
            createError("mongoose", error);
        }
    }
}

const deleteCard = async (cardId) => {
    if (DB == "mongodb") {
        try {
            let card = await Card.findByIdAndDelete(cardId);
            return card;
        } catch (error) {
            createError("mongoose", error);
        }
    }
}

const likeCard = async (cardId, userId) => {
    if (DB == "mongodb") {
        try {
            let card = await Card.findById(cardId);
            if (!card)
                createError("mongoose", new Error("A card with this ID cannot be found in the database"));

            if (card.likes.includes(userId)) {
                let newLikesArray = card.likes.filter((id) => id != userId);
                card.likes = newLikesArray;
            } else {
                card.likes.push(userId);
            }
            await card.save();
            return card;
        } catch (error) {
            createError("mongoose", error);
        }
    }
};
module.exports = { createCard, getCards, getCard, getMyCards, updateCard, deleteCard, likeCard };