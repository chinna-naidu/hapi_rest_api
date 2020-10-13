const { Server } = require("@hapi/hapi");
const Jwt = require("jsonwebtoken");
const Boom = require("@hapi/boom");
const path = require("path");
const inert = require("@hapi/inert");

//routes
const UserRoutes = require("./routes/user");
const PostRoutes = require("./routes/post");

const init = async () => {
  const server = new Server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: true,
      files: {
        relativeTo: path.join(__dirname, "public"),
      },
    },
  });

  server.auth.scheme("jwt_scheme", (server, options) => {
    return {
      authenticate: (request, h) => {
        const token = request.raw.req.headers.authorization;
        if (!token) {
          throw Boom.notAcceptable("token not found", request);
        }
        try {
          const decodedToken = Jwt.verify(token, "dark_knight");
          return h.authenticated({
            credentials: {
              userid: decodedToken.userid,
            },
          });
        } catch (err) {
          throw Boom.unauthorized(err.message);
        }
      },
    };
  });

  server.auth.strategy("jwt_auth", "jwt_scheme");
  await server.register(inert);

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
      },
    },
  });

  await server.register(UserRoutes);
  await server.register(PostRoutes);

  await server.start();

  console.log(server.info.uri);
};

try {
  init();
} catch (err) {
  console.log(err);
}
