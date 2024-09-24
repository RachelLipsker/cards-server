const cors = require("cors")

const corsMiddleware = cors({
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501", "http://localhost:5173", "https://cards2project.onrender.com"]
})

module.exports = corsMiddleware;