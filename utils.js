function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = {
  handleResponse
}