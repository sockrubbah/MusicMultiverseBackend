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
    song_of_the_day: Boolean,
    song_description: String,
    post: {
        username: String,
        user_picture: String,
        time: String,
        text: String,
        likes: Number,
        comment_count: Number,
        reposts: Number
    },
    comments: [
        {
            username: String,
            user_picture: String,
            time: String,
            text: String
        }
    ]
});

async function createSong() {
    const result = await song.save();
    console.log(result);
}

//this creates a Message class in our app
const Song = mongoose.model("Song", schema);
const song = new Song({
    song_name: "Silver Soul",
    song_artist: "Echo Lake",
    song_genre: "Shoegaze / Dreampop",
    song_picture: "images/silver-soul.svg",
    song_of_the_day: false,
    song_description: "",
    post: {
        username: "@Sander_D",
        user_picture: "images/sander-d.svg",
        time: "2h ago",
        text: "One of my favorite tracks!",
        likes: 0,
        comment_count: 1,
        reposts: 0
    },
    comments: [
        {
            username: "@example_user",
            user_picture: "",
            time: "1h ago",
            text: "Love this song!"
        }
    ]
});

async function createSong() {
    const result = await song.save();
    console.log(result);
}

async function getSongs() {
    const songs = await Song.find();
    return songs;
}

module.exports = { createSong, getSongs };