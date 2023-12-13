"use strict";

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
// const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

router.post("/token", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
});

router.post("/register", async function (req, res, next) {
    try {
        const newUser = await User.register({ ...req.body, isAdmin: false });
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

router.get("/test", async function (req, res, next) {
    try {
        return res.status(201).json({ response: 201 });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
