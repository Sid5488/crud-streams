const notFound = (_, response) => {
  response.statusCode = 404;

  return response.end({ message: 'not found' });
};

export { notFound };