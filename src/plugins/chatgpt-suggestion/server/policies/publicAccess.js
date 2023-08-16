module.exports = async (ctx, next) => {
  // Allow access to the route for any role
  await next();
};
