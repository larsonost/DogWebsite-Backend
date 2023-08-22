import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };
  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = async (req, res) => {
    const username = req.body.data.username;
    const user = await usersDao.findUserByUsername(username);

    if (!user) {
      res.sendStatus(404);
    } else {
      const userId = user._id;
      const updateData = {
        firstName: req.body.firstName,
      };
      await usersDao.updateUser(userId, updateData);
      res.sendStatus(200);
    }
  };

  //Chen
  const follow = async (req, res) => {
    const userId = req.session["currentUser"]._id;
    const targetUserId = req.params.uid;
    await usersDao.followUser(userId, targetUserId);
    res.sendStatus(200);
  };

  const unfollow = async (req, res) => {
    const userId = req.session["currentUser"]._id;
    const targetUserId = req.params.uid;
    await usersDao.unfollowUser(userId, targetUserId);
    res.sendStatus(200);
  };
  const getFollowingUsers = async (req, res) => {
    const userId = req.params.uid;
    const users = await usersDao.getFollowingUsers(userId);
    res.json(users);
  };

  const getFollowersOfUser = async (req, res) => {
    const userId = req.params.uid;
    const users = await usersDao.getFollowersOfUser(userId);
    res.json(users);
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users/:uid", update);
  app.post("/api/users/:uid/follow", follow);
  app.post("/api/users/:uid/unfollow", unfollow);
  app.get("/api/users/:uid/following", getFollowingUsers);
  app.get("/api/users/:uid/followers", getFollowersOfUser);
};
export default AuthController;
