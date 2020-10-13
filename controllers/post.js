const Boom = require("@hapi/boom");
const Post = require("../models/post");
const User = require("../models/user");
const deleteFile = require("../util/deleteFile");
const writeFile = require("../util/writeFile");

exports.createPost = async (request, h) => {
  const title = request.payload.title;
  const description = request.payload.description;
  const image = request.payload.image;
  if (!title) {
    throw Boom.notAcceptable("title can't be empty");
  }
  if (!description) {
    throw Boom.notAcceptable("description can't be empty");
  }
  if (!image) {
    throw Boom.notAcceptable("image can't be empty");
  }
  const filepath = await writeFile(image._data, image.hapi.filename);
  const userid = request.auth.credentials.userid;
  const user = await User.query().findById(userid);
  const post = await user.$relatedQuery("posts").insert({
    title: title,
    description: description,
    image: filepath,
  });
  return h.response(post).code(200);
};

exports.getAllPosts = async (request, h) => {
  const posts = await Post.query();
  return h.response(posts).code(200);
};

exports.getOnePost = async (request, h) => {
  const postid = +request.params.postid;
  const post = await Post.query().findById(postid);
  return h.response(post).code(200);
};

exports.updatePost = async (request, h) => {
  const title = request.payload.title;
  const description = request.payload.description;
  const image = request.payload.image;
  const postid = +request.params.postid;
  const userid = +request.auth.credentials.userid;
  const post = await Post.query().findById(postid);
  if (!title) {
    throw Boom.notAcceptable("title can't be empty");
  }
  if (!description) {
    throw Boom.notAcceptable("description can't be empty");
  }
  if (!image) {
    throw Boom.notAcceptable("image can't be empty");
  }
  if (post.user_id !== userid) {
    throw Boom.notAcceptable("user not allowed to update post");
  }
  const filepath = await writeFile(image._data, image.hapi.filename);
  deleteFile(post.image);
  const updatedPost = await Post.query().findById(postid).patch({
    title: title,
    description: description,
    image: filepath,
  });
  return h
    .response({
      id: updatedPost,
      title: title,
      description: description,
      image: filepath,
    })
    .code(200);
};

exports.deletePost = async (request, h) => {
  const postid = +request.params.postid;
  const userid = +request.auth.credentials.userid;
  const post = await Post.query().findById(postid);
  if (post.user_id !== userid) {
    throw Boom.notAcceptable("user not allowed to delete post");
  }
  deleteFile(post.image);
  await Post.query().deleteById(postid);
  return h.response(post).code(200);
};
