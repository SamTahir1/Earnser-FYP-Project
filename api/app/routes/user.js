
let Usercontroller = require("../controllers/user.controller");

module.exports = function(app) {

  app.get("/api/users/all", Usercontroller.allUsers);


};