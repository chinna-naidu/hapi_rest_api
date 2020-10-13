const Jwt = require("jsonwebtoken");
const Boom = require("@hapi/boom");
const User = require("../models/user");

exports.login = async (request, h) => {
  const username = request.payload.username;
  const password = request.payload.password;
  try {
    const user = await User.query().findOne("name", "=", username);
    if (!user) {
      throw Boom.notAcceptable("Invalid username");
    } else if (user.password != password) {
      throw Boom.notAcceptable("Invalid Password");
    } else {
      const token = Jwt.sign(
        {
          userid: user.id,
          email: user.email,
        },
        "dark_knight"
      );
      return h
        .response({
          token: token,
          message: "login successfull",
        })
        .code(200);
    }
  } catch (err) {
    throw Boom.boomify(err);
  }
};

exports.signup = async (request, h) => {
  const username = request.payload.username;
  const password = request.payload.password;
  const email = request.payload.email;
  try {
    const user = await User.query().insert({
      name: username,
      password: password,
      email: email,
    });
    return h.response(user).code(200);
  } catch (err) {
    console.log(err);
    throw Boom.boomify(err, { statusCode: 500 });
  }
};
