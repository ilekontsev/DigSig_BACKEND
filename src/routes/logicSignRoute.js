const router = require("express").Router();
const logicSignKeysController = require("../controllers/logicSignKeysController");

router.post("/saveKey", logicSignKeysController.saveKeyAndMethod);
router.get("/getPublicKey", logicSignKeysController.getPublicKey);

module.exports = router;
