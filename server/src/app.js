const express = require("express");
const cors = require("cors");

const timetableRoutes = require("./routes/timetable.routes");
const facultyRoutes = require("./routes/faculty.routes");
const sectionAIRoutes = require("./routes/section-ai.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CSE Section 2 Backend is running",
  });
});

app.use("/api/section-ai", sectionAIRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/timetable", timetableRoutes);
module.exports = app;
