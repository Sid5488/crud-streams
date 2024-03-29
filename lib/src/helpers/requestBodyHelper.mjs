/**
 * @param {HttpRequest} request 
 * @returns request body sent;
 */
const readRequest = async (request) => {
  try {
    let body = '';

    request.setEncoding('utf8');
    request.on('data', function (chunk) {
      body += chunk.toString();
    });

    request.on('error', function(e) {
      console.log('problem with request:', e.message);
    });

    const data = new Promise((resolve, reject) => {
      request.on('end', () => {
        if(!body) {
          reject(undefined);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });

    return await data;
  } catch(error) {
    if (error === undefined) return undefined;

    throw new Error("Error:body::", error);
  }
};

export { readRequest };
