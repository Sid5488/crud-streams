const readRequest = async (request) => {
  let body = '';

  request.on('data', function (chunk) {
    body += chunk;
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

  return data;
};

export { readRequest };
