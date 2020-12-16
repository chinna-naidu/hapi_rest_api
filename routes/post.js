const Joi = require("@hapi/joi");
const PostController = require("../controllers/post");

module.exports = {
  name: "PostRoutes",
  version: "1.0",
  register: (server, options) => {
    server.route({
      method: "POST",
      path: "/post",
      options: {
        auth: "jwt_auth",
        payload: {
          output: "stream",
          allow: "multipart/form-data",
          multipart: true,
          maxBytes: 1048576 * 10,
        },
      },
      handler: PostController.createPost,
    });

    server.route({
      method: "PATCH",
      path: "/post/{postid}",
      options: {
        auth: "jwt_auth",
        payload: {
          output: "stream",
          allow: "multipart/form-data",
          multipart: true,
          maxBytes: 1048576 * 10,
        },
      },
      handler: PostController.updatePost,
    });

    server.route({
      method: "GET",
      path: "/post/{postid}",
      options: {
        auth: "jwt_auth",
      },
      handler: PostController.getOnePost,
    });

    server.route({
      method: "GET",
      path: "/post",
      options: {
        auth: "jwt_auth",
      },
      handler: PostController.getAllPosts,
    });

    server.route({
      method: "DELETE",
      path: "/post/{postid}",
      options: {
        auth: "jwt_auth",
      },
      handler: PostController.deletePost,
    });

    server.route({
      method: "GET",
      path: "/user/post/{id}",
      // options: {
      //   auth: "jwt_auth",
      // },
      handler: PostController.getPostsOfUser,
    });

    server.route({
      method: "GET",
      path: "/user/post",
      // options: {
      //   auth: "jwt_auth",
      // },
      handler: PostController.getUsersWithPosts,
    });
  },
};
