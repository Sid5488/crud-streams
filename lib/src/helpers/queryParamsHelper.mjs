import querystring from "querystring";
import url from "url";

/**
 * @param {HttpRequest} request 
 * @returns request body sent;
 */
const readQueryParams = async (request) => {
  const parsed = url.parse(request.url);
  const query = querystring.parse(parsed.query);

  return query;
};

export { readQueryParams };
