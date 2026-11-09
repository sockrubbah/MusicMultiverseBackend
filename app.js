const { createSongs, getSongs } = require("./server");
const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3001;

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