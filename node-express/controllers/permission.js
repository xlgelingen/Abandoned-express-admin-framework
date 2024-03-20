const PermissionModel = require('./../models/permissions.js');
const Permission = new PermissionModel();

const permissionlController = {
  index: async function(req, res, next) {
    try {
      const permissions = await Permission.all()
      res.json({code:200,data: { code:200,permissions:permissions} })
    } catch (e) {
      res.json({code:0, data: { code:0, e:e.message}})
    }
  },
}

module.exports = permissionlController;