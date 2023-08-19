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

  const update = (req, res) => {
    const username = req.body.data.username
    const updateInfo = req.body;
    const user = usersDao.findUserByUsername(username);
    if (!user) {
      res.sendStatus(404)
    } else {
      const userId = user._id;
      usersDao.updateUser(userId, updateInfo);
      res.sendStatus(200);
    }
  };

  const getUserById = async (req, res) => {
    console.log("got here")
    const { id } = req.params;
    // const user = users.find((user) => user._id === id);
    const user = await usersDao.findUserById(id);
    res.json(user);
  };
  
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users/:uid", update);
  app.get("/api/users/:id", getUserById);
};
export default AuthController;