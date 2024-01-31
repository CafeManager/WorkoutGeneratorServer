"use strict";

const jsonschema = require("jsonschema");

const User = require("../models/user");
const Workout = require("../models/workout");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

router.get("/last30/:username", async function (req, res, next) {
    try {
        const username = req.params.username;
        const data = await Workout.getLast30Days(username);

        return res.json({ data });
    } catch (err) {
        return next(err);
    }
});

router.get("/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
        const data = await Workout.getExerciseFromSession(id);
        console.log(data);

        return res.json({ data });
    } catch (err) {
        return next(err);
    }
});

router.post("/register", async function (req, res, next) {
    try {
        const newUser = await User.register({ ...req.body, isCoach: false });
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

router.post("/add-session", async function (req, res, next) {
    try {
        const workRes = await Workout.addSession(req.body);

        return res.status(201).json({ response: 201 });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
