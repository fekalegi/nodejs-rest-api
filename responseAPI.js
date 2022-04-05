/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
 exports.success = (data) => {
    return {
      status: "Success",
      code: 200,
      data
    };
  };
  
  /**
   * @desc    Send any error response
   *
   * @param   {string} message
   * @param   {number} statusCode
   */
  exports.error = (status, data, statusCode) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
  
    if (!findCode) statusCode = 500;
    else statusCode = findCode;
  
    return {
        status,
        code: statusCode,
        data
    };
  };