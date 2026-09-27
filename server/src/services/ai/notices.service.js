const fetchNotices = async () => {
  const url = "https://www.ipu.ac.in/notices_usict.php";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Notice page returned ${response.status}`);
    }

    const html = await response.text();

    return {
      source: "USICT Official Notices",
      url,
      content: html,
    };
  } catch (error) {
    console.error("Notice fetch error:", error.message);

    throw new Error("Unable to fetch USICT notices");
  }
};

module.exports = {
  fetchNotices,
};
