/**
 * Util functions for HTTP requests.
 * GET, POST, PUT, DELETE and PATCH
 * Based on Axios - https://www.npmjs.com/package/axios
 */

const axios = require('axios');
const qs = require('qs');

/**
 * Returns an object with Content-Type as application/json and Authorization Bearer token.
 * @param {String} accessToken - The token value
 * @return {Object} request Headers
 */
const getApplicationJsonHeadersWithToken = (accessToken) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
};

/**
 * Returns an object with Content-Type as application/json.
 * @return {Object} request Headers
 */
const getApplicationJsonHeaders = () => {
    return {
        'Content-Type': 'application/json'
    }
};

/**
 * Returns an object with Content-Type as application/x-www-form-urlencoded
 * @return {Object} request Headers
 */
const getUrlEncodedHeaders = () => {
    return {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
};

/**
 * Returns a query string from object.
 * Based on qs parser.
 * @param {Object} obj query params
 * @param {Object} options stringfy options
 * @return {String} query string
 */
const getQueryString = (obj, options = null) => {
    return qs.stringify(obj, options);
};

/**
* Perform a HTTP request using axios.
* This function expects an Object with at least method, url and data properties.
* @param {Object} requestConfig requestConfig eg: { method: 'GET', url: 'http://localhost', data: { key: 12345 }}
* @return {Object} request response data
*/
const sendRequest = async (requestConfig) => {
    if (!requestConfig) throw JSON.stringify({ error: 'Request config is null or undefined.' });
    return await axios({
        method: requestConfig.method || 'GET',
        timeout: requestConfig.timeout || 3000,
        ...requestConfig
    }).catch(error => {
        if (error.response) {
            error = {
                message: 'The request was made and the server responded with a status code.',
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
                request: error.config.data,
                url: error.response.config.url
            };
        } else if (error.request) {
            error = {
                message: 'The request was made but no response was received.',
                request: error.request,
            };
        } else {
            error = {
                message: `Something happened in setting up the request that triggered an Error.\n${error.message}`,
            };
        }
        throw error;
    });
};

module.exports = {
    getApplicationJsonHeadersWithToken: getApplicationJsonHeadersWithToken,
    getApplicationJsonHeaders: getApplicationJsonHeaders,
    getUrlEncodedHeaders: getUrlEncodedHeaders,
    getQueryString: getQueryString,
    sendRequest: sendRequest
};