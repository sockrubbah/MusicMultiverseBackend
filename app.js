const { createSongs, getSongs } = require("./server");
const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3001;

async function createSongs() {
    const count = await Song.countDocuments();
    if (count === 0) {
        const result = await Song.insertMany(songs);
        console.log(`${result.length} songs inserted.`);
    } else {
        console.log("Songs already exist in the database.");
    }
}

app.get("/api/songs", async function (req, res) {
    try {
        const songs = await getSongs();
        res.json(songs);
    } catch (error) {
        console.error("Could not load songs:", error);
        res.status(500).send("Could not load songs");
    }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});