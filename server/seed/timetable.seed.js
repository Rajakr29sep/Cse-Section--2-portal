require("dotenv").config();

const connectDB = require("../src/config/db");
const Timetable = require("../src/models/timetable.model");
const timetableData = require("./timetable.data");

const seedTimetable = async () => {
  try {
    await connectDB();

    await Timetable.deleteMany({});

    await Timetable.insertMany(timetableData);

    console.log("Timetable data inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error("Timetable seeding failed:", error);

    process.exit(1);
  }
};

seedTimetable();
