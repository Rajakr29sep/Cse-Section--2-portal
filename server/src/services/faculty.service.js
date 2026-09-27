const facultyService = require("../services/faculty.service");

const getFaculty = (req, res) => {
  try {
    const faculty = facultyService.getAllFaculty();

    return res.status(200).json({
      success: true,
      count: faculty.length,
      data: faculty,
    });
  } catch (error) {
    console.error("Faculty error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch faculty",
    });
  }
};

module.exports = {
  getFaculty,
};
