const timetableService = require("../services/timetable.service");

const validDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const getTimetable = (req, res) => {
    try {
        const {
            day,
            subject,
            subjectCode,
            faculty,
            type,
        } = req.query;

        if (
            day &&
            !validDays.includes(day)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid day",
            });
        }

        const timetable =
            timetableService.getTimetable({
                day,
                subject,
                subjectCode,
                faculty,
                type,
            });

        return res.status(200).json({
            success: true,
            count: timetable.length,
            data: timetable,
        });

    } catch (error) {
        console.error(
            "Timetable error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch timetable",
        });
    }
};

module.exports = {
    getTimetable,
};