const resources = require("../../../data/resources.json");

const getResources = (type) => {
    return resources[type] || [];
};

module.exports = {
    getResources,
};