function successResponse(res, data, message = "OK", status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

function errorResponse(res, message = "Något gick fel", status = 500, error = null) {
  return res.status(status).json({
    success: false,
    message,
    error,
  });
}

module.exports = {
  successResponse,
  errorResponse,
};