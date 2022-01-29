const AccessControl = require("accesscontrol");

let grantsObject = {
  admin: {
    profile: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  user: {
    profile: {
      //"create:own": ["*"],
      "read:own": ["*", "!password", "!_id", "!date"],
      "update:own": ["*"],
      //"delete:own": ["*"],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = { roles };
