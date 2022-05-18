const router = require("express").Router();
const { route } = require("express/lib/application");
const logicSignKeysController = require("../controllers/logicSignKeysController");

router.post("/saveKey", logicSignKeysController.saveKeyAndMethod);
router.get("/getPublicKey", logicSignKeysController.getPublicKey);
router.post("/checkPublicKey", logicSignKeysController.checkPublicKey);
router.post("/updateCountSignFiles", logicSignKeysController.countSignFiles);
router.delete("/deleteKey", logicSignKeysController.deleteKeyUser);
router.get('/getAllPublicKey', logicSignKeysController.getAllPublicKey)
module.exports = router;
