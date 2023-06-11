// Customizing Token Location
// A custom function for extracting the token from a request can be specified with the getToken option. This is useful if you need to pass the token through a query parameter or a cookie. You can throw an error in this function and it will be handled by express-jwt.

// app.use(
//   jwt({
//     secret: "hello world !",
//     algorithms: ["HS256"],
//     credentialsRequired: false,
//     getToken: function fromHeaderOrQuerystring(req) {
//       if (
//         req.headers.authorization &&
//         req.headers.authorization.split(" ")[0] === "Bearer"
//       ) {
//         return req.headers.authorization.split(" ")[1];
//       } else if (req.query && req.query.token) {
//         return req.query.token;
//       }
//       return null;
//     },
//   })
// );  dokumentacija za prevzemanje na cookies