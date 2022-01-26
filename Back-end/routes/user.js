const express = require("express");
const userCtrl = require("../controllers/user");
const router = express.Router();

router.use((req, res, next)=> {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.post("/diagram", userCtrl.execDiagram);

module.exports = router;
