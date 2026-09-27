const express = require("express");

const { askSectionAI } = require("../controllers/section-ai.controller");

const router = express.Router();

router.post("/", askSectionAI);

module.exports = router;
