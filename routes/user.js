const Joi = require("@hapi/joi");
const UserController = require("../controllers/user");

module.exports = {
  name: "userRoutes",
  version: "1.0",
  register: (server, options) => {
    server.route({
      method: "POST",
      path: "/login",
      handler: UserController.login,
      options: {
        validate: {
          payload: Joi.object({
            username: Joi.string()
              .min(1)
              .error(new Error("username cam't be empty")),
            password: Joi.string()
              .min(6)
              .error(
                new Error(
                  "password must be graterthan or equal to 6 characters"
                )
              ),
          }),
        },
      },
    });
    server.route({
      method: "POST",
      path: "/signup",
      handler: UserController.signup,
      options: {
        validate: {
          payload: Joi.object({
            username: Joi.string()
              .min(1)
              .error(new Error("username cam't be empty")),
            password: Joi.string()
              .min(6)
              .error(
                new Error(
                  "password must be graterthan or equal to 6 characters"
                )
              ),
            email: Joi.string()
              .email()
              .error(new Error("please enter a valid email")),
          }),
        },
      },
    });
  },
};
