const mongoose = require("mongoose");

//testdb is name of database, it will automatically make it
mongoose
    .connect("mongodb+srv://solomander81_db_user:vdKuVnAuV5AptmlA@cluster0.vzdu1w3.mongodb.net/")
    .then(() => console.log("Connected to mongodb..."))
    .catch((err) => console.error("could not connect ot mongodb...", err));

const schema = new mongoose.Schema({
    name: String,
});

async function createSong() {
    const result = await song.save();
    console.log(result);
}

//this creates a Message class in our app
const Song = mongoose.model("Song", schema);
const song = new Song({
    "_id": 2,
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