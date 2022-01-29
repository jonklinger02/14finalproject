const { roles } = require("../config/roles");

exports.grantAccess = function (action, response) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(400).json({ error: "You don't have permissions" });
      }
      res.locals.permission = permission;

      next();
    } catch {
      next();
    }
  };
};
