let requestCount = 0;

let currentDate = new Date()
  .toISOString()
  .slice(0, 10);

const DAILY_LIMIT = 200;

const checkAndConsumeRequest = () => {
  const today = new Date()
    .toISOString()
    .slice(0, 10);

  // New day → reset counter
  if (today !== currentDate) {
    currentDate = today;
    requestCount = 0;
  }

  // Limit reached
  if (requestCount >= DAILY_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      limit: DAILY_LIMIT,
    };
  }

  // Consume one request
  requestCount++;

  return {
    allowed: true,
    remaining: DAILY_LIMIT - requestCount,
    limit: DAILY_LIMIT,
  };
};

const getRequestStatus = () => {
  const today = new Date()
    .toISOString()
    .slice(0, 10);

  if (today !== currentDate) {
    currentDate = today;
    requestCount = 0;
  }

  return {
    used: requestCount,
    remaining: DAILY_LIMIT - requestCount,
    limit: DAILY_LIMIT,
  };
};

module.exports = {
  checkAndConsumeRequest,
  getRequestStatus,
};