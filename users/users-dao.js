import usersModel from "./users-model.js";

export const findAllUsers = () => usersModel.find();
export const findUserById = (id) => usersModel.findById(id);
export const findUserByUsername = (username) =>
  usersModel.findOne({ username });
export const findUserByCredentials = (username, password) =>
  usersModel.findOne({ username, password });
export const createUser = (user) => usersModel.create(user);
export const updateUser = (id, user) =>
  usersModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => usersModel.deleteOne({ _id: id });

//Chen
export const followUser = async (userId, targetUserId) => {
  // Add targetUserId to the following list of userId
  await usersModel.findByIdAndUpdate(userId, {
    $addToSet: { following: targetUserId },
  });

  // Add userId to the followers list of targetUserId
  await usersModel.findByIdAndUpdate(targetUserId, {
    $addToSet: { followers: userId },
  });
};

export const unfollowUser = async (userId, targetUserId) => {
  // Remove targetUserId from the following list of userId
  await usersModel.findByIdAndUpdate(userId, {
    $pull: { following: targetUserId },
  });

  // Remove userId from the followers list of targetUserId
  await usersModel.findByIdAndUpdate(targetUserId, {
    $pull: { followers: userId },
  });
};

export const getFollowingUsers = async (userId) => {
  const user = await usersModel.findById(userId).populate("following");
  return user.following;
};

export const getFollowersOfUser = async (userId) => {
  const user = await usersModel.findById(userId).populate("followers");
  return user.followers;
};
