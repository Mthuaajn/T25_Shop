const sessionModel = require('../models/session.m');
module.exports = {
  authentication: async (req, res, next) => {
    try {
      const sessionID = req.headers.sessionid || "null";
      const data = await sessionModel.GetOneSession(sessionID);
      if (data != undefined) {
        const parsedSession = JSON.parse(data.session);
        req.session.isAuthenticated = parsedSession.isAuthenticated || false;
        req.session.idUser = parsedSession.idUser;
        req.session.username = parsedSession.username;
        req.session.role = parsedSession.role
        req.session.cookie.maxAge = 10 *60* 60 * 1000;
      }
      if (req.session.isAuthenticated) {
        return next();
      }
      else {
        return res.json("You don't login !");
      }
    } catch (error) {
      next(error);
    }
  },
  authorization: async (req, res, next) => {
    if (req.session.isAuthenticated && req.session.role) {


      let originalUrl = req.originalUrl;
      let role = req.session.role;
      if (originalUrl.startsWith(`/${role}`)) {
        next();
      } else {
        return res.status(403).send("You don't have permission to access this page");
      }
    }
  }
};