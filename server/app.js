const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")

const app = express();
app.use(cors());

const axios = require("axios");

app.get("/api/avatar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.multiavatar.com/${id}`, {
      headers: { Accept: "image/svg+xml" },
    });
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(response.data);
  } catch (error) {
    console.error("Avatar fetch error:", error.message);
    res.status(500).send("Error fetching avatar");
  }
});

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB Connection Successful")
})
.catch((err) => {
    console.log(err.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
})