const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");


async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername == followeeUsername) {
    return res.status(400).json({
      meassage: " can not follow yourself",
    });
  }

  const targetuser = await userModel.findOne({
    username: followeeUsername,
  });

  if (!targetuser) {
    return res.status(404).json({
      meassage: " user not found",
    });
  }

  const isAlresdyFollwing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if (isAlresdyFollwing) {
    return res.status(200).json({
      meassage: ` your already  following ${followeeUsername}`,
      follows: isAlresdyFollwing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });
  res.status(201).json({
    meassage: `you are now following ${followeeUsername}`,
    follows: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      meassage: `you are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);
  res.status(200).json({
    meassage: ` You have unfollowed ${followeeUsername}`,
  });
}



module.exports = { followUserController, unfollowUserController };
