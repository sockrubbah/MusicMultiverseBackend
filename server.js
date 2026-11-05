const mongoose = require("mongoose");
require("dotenv").config();
//testdb is name of database, it will automatically make it
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to mongodb..."))
    .catch((err) => console.error("could not connect ot mongodb...", err));

const schema = new mongoose.Schema({
    song_name: String,
    song_artist: String,
    song_genre: String,
    song_picture: String,
    curation: {
        time: String,
        username: String,
        user_picture: String
    }
});

async function createSong() {
    const result = await song.save();
    console.log(result);
}

//this creates a Message class in our app
const Song = mongoose.model("Song", schema);
const song = new Song({
    "song_name": "Silver Soul",
    "song_artist": "Echo Lake",
    "song_genre": "Shoegaze / Dreampop",
    "song_picture": "images/silver-soul.svg",
    "curation": {
        "time": "2h ago",
        "username": "@Sander_D",
        "user_picture": "images/sander-d.svg"
    }
});

createSong();