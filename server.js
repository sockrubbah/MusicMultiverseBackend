const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));

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

const Song = mongoose.model("Song", schema);

const songs = [
    {
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
            text: "",
            likes: 0,
            comment_count: 0,
            reposts: 0
        },
        comments: []
    },
    {
        song_name: "Broken Code",
        song_artist: "Hex Unit",
        song_genre: "IDM / Breakcore",
        song_picture: "images/broken-code.svg",
        song_of_the_day: false,
        song_description: "",
        post: {
            username: "@null_pointer",
            user_picture: "images/null-pointer.svg",
            time: "4h ago",
            text: "",
            likes: 0,
            comment_count: 0,
            reposts: 0
        },
        comments: []
    },
    {
        song_name: "Overload",
        song_artist: "Sega Blue",
        song_genre: "Hyperpop / Bubblegum",
        song_picture: "images/overload.svg",
        song_of_the_day: false,
        song_description: "",
        post: {
            username: "@hyper_active",
            user_picture: "images/hyper-active.svg",
            time: "6h ago",
            text: "",
            likes: 0,
            comment_count: 0,
            reposts: 0
        },
        comments: []
    },
    {
        song_name: "Midnight In Neon",
        song_artist: "Aurora Veil",
        song_genre: "Dream Pop",
        song_picture: "images/sotd.svg",
        song_of_the_day: true,
        song_description: "A hauntingly beautiful track that blends dreamy synth textures with ethereal vocals. Midnight in Neon captures that rare feeling of wandering through a city that is somehow both electric and serene.",
        post: {
            username: "@stellarwaves",
            user_picture: "",
            time: "",
            text: "",
            likes: 0,
            comment_count: 0,
            reposts: 0
        },
        comments: []
    },
    {
        song_name: "Neon Drift",
        song_artist: "Vapor Space",
        song_genre: "Ambient Techno",
        song_picture: "images/neon-drift.svg",
        song_of_the_day: false,
        song_description: "",
        post: {
            username: "@Nite_Glow",
            user_picture: "images/nite-glow.svg",
            time: "",
            text: "This new ambient techno piece from Tokyo's underground is stellar. Pure architectural synthesizer lines. Ideal for late-night code runs.",
            likes: 42,
            comment_count: 9,
            reposts: 14
        },
        comments: []
    },
    {
        song_name: "Weight of Water",
        song_artist: "Slow Drift",
        song_genre: "Slowcore / Sadcore",
        song_picture: "images/weight-of-water.svg",
        song_of_the_day: false,
        song_description: "",
        post: {
            username: "@Fuzz_Lord",
            user_picture: "images/fuzz-lord.svg",
            time: "",
            text: "The guitar tones on this slowcore track are heavier than a lead blanket. Fans of Codeine and Duster, look no further.",
            likes: 89,
            comment_count: 18,
            reposts: 31
        },
        comments: []
    },
    {
        song_name: "Dream Theory",
        song_artist: "Prism",
        song_genre: "Ethereal Ambient",
        song_picture: "images/dream-theory.svg",
        song_of_the_day: false,
        song_description: "",
        post: {
            username: "",
            user_picture: "",
            time: "",
            text: "Deeply cinematic. The way the pads dissolve is perfect.",
            likes: 0,
            comment_count: 0,
            reposts: 0
        },
        comments: []
    },
    {
        song_name: "Static Wind",
        song_artist: "The Dead Air",
        song_genre: "Post-Punk",
        song_picture: "images/static-wind.svg",
        song_of_the_day: false,
        song_description: "",
        post: {
            username: "",
            user_picture: "",
            time: "",
            text: "Incredible bassline, feels straight out of Manchester 1981.",
            likes: 0,
            comment_count: 0,
            reposts: 0
        },
        comments: []
    }
];

async function createSongs() {
    const count = await Song.countDocuments();
    if (count === 0) {
        const result = await Song.insertMany(songs);
        console.log(`${result.length} songs inserted.`);
    } else {
        console.log("Songs already exist in the database. Skipping seed.");
    }
}

async function getSongs() {
    return await Song.find();
}

module.exports = { createSongs, getSongs };