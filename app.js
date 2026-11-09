const { createSongs, getSongs } = require("./server");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.get("/api/songs", function (req, res) {
    const staticSongs = [
        {
            _id: "1",
            song_name: "Test Track Alpha",
            artist: "Digger 99",
            comments: [{ _id: "c1", username: "acid_jerk", text: "Heavy bassline!" }]
        },
        {
            _id: "2",
            song_name: "Ambient Submarine",
            artist: "Shoegazer",
            comments: []
        }
    ];

    res.json(staticSongs);
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});