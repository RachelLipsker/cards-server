const Card = require("../../cards/models/mongodb/Card");
const { generateUserPassword } = require("../../users/helpers/bcrypt");
const User = require("../../users/models/mongodb/User")

const initialUsers = [
    {
        name: {
            first: "Ell",
            middle: "",
            last: "Vis"
        },
        phone: "0512345567",
        email: "ellvis@email.com",
        password: generateUserPassword("Abc123456!"),
        image: {
            url: "",
            alt: "umage"
        },
        address: {
            state: "IL",
            country: "Israel",
            city: "Arad",
            street: "Shoham",
            houseNumber: 5,
            zip: 8920435
        },
        isBusiness: false
    },
    {
        name: {
            first: "Avi",
            middle: "",
            last: "Cohen"
        },
        phone: "0512345568",
        email: "avi12345@email.com",
        password: generateUserPassword("Abc123456!"),
        image: {
            url: "",
            alt: "image"
        },
        address: {
            state: "IL",
            country: "Israel",
            city: "Ashdod",
            street: "Calanyot",
            houseNumber: 9,
            zip: 8920475
        },
        isBusiness: true
    },
    {
        name: {
            first: "Moshe",
            middle: "",
            last: "Meir"
        },
        phone: "0512345569",
        email: "moshe123770@email.com",
        password: generateUserPassword("Abc123456!"),
        image: {
            url: "",
            alt: "image"
        },
        address: {
            state: "IL",
            country: "Israel",
            city: "Rheovot",
            street: "hamelchim",
            houseNumber: 9,
            zip: 8920430
        },
        isBusiness: true,
        isAdmin: true
    }
]

const initialCards = [{
    title: "second card",
    subtitle: "this is the second card",
    description: "this is the second card in the database",
    phone: "050-0000000",
    email: "secondcard@gmail.com",
    web: "https://www.test.co.il",
    image: {
        url: "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
        alt: "business card image",
    },
    address: {
        state: "",
        country: "test",
        city: "test",
        street: "test",
        houseNumber: 3,
        zip: 0,
    },
    bizNumber: 3305967,
    user_id: "670241b0b43aa56d86f087f5",
},
{
    title: "inon genish",
    subtitle: "create card 3.1",
    description: "welcome",
    phone: "05463216971",
    email: "dvir123@gmail.com",
    web: "",
    image: {
        url: "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
        alt: "business card image",
    },
    address: {
        state: "",
        country: "israel",
        city: "eliat",
        street: "isrotel",
        houseNumber: 11,
        zip: 0,
    },
    bizNumber: 8625120,
    "likes": [],
    user_id: "670241b0b43aa56d86f087f1",
},
{
    title: "new",
    subtitle: "new 1",
    description: "jhg",
    phone: "0500000000",
    email: "asd@asd.com",
    web: "",
    image: {
        url: "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
        alt: "business card image",
    },
    address: {
        state: "",
        country: "asd",
        city: "asd",
        street: "asd",
        houseNumber: 222,
        zip: 12,
    },
    bizNumber: 8232356,
    "likes": [],
    user_id: "670241b0b43aa56d86f087f5",
},]

const insertInitialData = async () => {
    const countUsers = await User.countDocuments();
    if (countUsers < 3) {
        await User.insertMany(initialUsers);
        console.log("initial users inserted");

    }

    const countCards = await Card.countDocuments();
    if (countCards < 3) {
        await Card.insertMany(initialCards);
        console.log("initial cards inserted");

    }
}

module.exports = insertInitialData;
