const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGE_PRIVATE_KEY,
});

async function postCreate(req, res) {
  console.log(req.body, req.file);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "gallery",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });
  res.status(201).json({
    meassage: "post create sucessfully",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;
  const posts = await postModel.find({
    user: userId,
  });
  res.status(200).json({
    meassage: " posts fetched fucessfully",
    posts,
  });
}

async function getPostDeatailController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      meassage: " you have no Post Id ",
    });
  }

  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      meassage: " Forbiddin Content",
    });
  }
  res.status(200).json({
    meassage: " Post fetched Sucessfuly...",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      meassage: " post not found",
    });
  }

  const isalreadylike = await likeModel.findOne({
    post: postId,
    user: username,
  });
  if (isalreadylike) {
    return res.status(404).json({
      meassage: "You can not like again ",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });
  res.status(201).json({
    meassage: " post like sucessfully",
    like,
  });
}
module.exports = {
  postCreate,
  getPostController,
  getPostDeatailController,
  likePostController,
};
