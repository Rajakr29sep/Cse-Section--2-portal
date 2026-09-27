const express = require("express");

const { getFaculty } = require("../controllers/faculty.controller");

const router = express.Router();

router.get("/", getFaculty);

module.exports = router;
