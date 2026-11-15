const { createSongs, getSongs } = require("./server");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const { createSongs, getSongs, addSong } = require("./server");
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

createSongs().catch(console.error);

const submissionSchema = Joi.object({
    title: Joi.string().trim().max(200).required(),

    artist: Joi.string().trim().max(200).allow("").default(""),

    spotify_url: Joi.string()
        .trim()
        .max(2048)
        .uri({ scheme: ["https"] })
        .pattern(
            /^https:\/\/open\.spotify\.com\/(?:intl-[a-zA-Z-]+\/)?track\/[a-zA-Z0-9]{22}\/?(?:\?[^#\s]*)?$/
        )
        .required()
        .messages({
            "string.pattern.base":
                "Please enter a standard Spotify song link."
        }),

    description: Joi.string().trim().max(3000).required(),

    genres: Joi.array()
        .items(
            Joi.string().valid(
                "Ambient",
                "Post-Punk",
                "IDM",
                "Shoegaze",
                "Hyperpop"
            )
        )
        .unique()
        .max(5)
        .default([]),

    descriptors: Joi.array()
        .items(Joi.string().trim().max(50).required())
        .max(20)
        .default([])
}).required();

createSongs().catch(console.error);

app.get("/api/songs", async function (req, res) {
    try {
        const songs = await getSongs();
        res.json(songs);
    } catch (error) {
        console.error("Could not load songs:", error);

        res.status(500).json({
            message: "Could not load songs."
        });
    }
});

app.get("/api/songs", async function (req, res) {
    try {
        const songs = await getSongs();
        res.json(songs);
    } catch (error) {
        console.error("Could not load songs:", error);

        res.status(500).json({
            message: "Could not load songs."
        });
    }
});

app.post("/api/songs", async function (req, res) {
    const { error, value } = submissionSchema.validate(req.body, { abortEarly: false
    });

    if (error) {
        return res.status(400).json({
            message: error.details.map((detail) => detail.message).join(" ")
        });
    }

    try {
        const song = await addSong(value);
        return res.status(201).json(song);
    } catch (error) {
        console.error("Could not save song:", error);
        return res.status(500).json({ message: "Could not save your song."
        });
    }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});