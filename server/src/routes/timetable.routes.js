const express = require("express");

const { getTimetable } = require("../controllers/timetable.controller");

const router = express.Router();

router.get("/", getTimetable);

module.exports = router;
