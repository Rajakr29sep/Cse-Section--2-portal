const facultyService = require("../services/faculty.service");

const getFaculty = async (req, res) => {
    const faculty = await facultyService.getAllFaculty();

    res.json({
        success: true,
        data: faculty
    });
};

module.exports = { getFaculty };