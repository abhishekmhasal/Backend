const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

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

async function getPostDeatailController(req,res) {
  
  
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
    post
  });
}
module.exports = { postCreate, getPostController,getPostDeatailController };
