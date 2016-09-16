var express = require('express');
var router = express.Router();
var accountkit = require ('node-account-kit');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { state: accountkit.getRandomState () });
});

router.post ('/', function (req, res, next) {
    accountkit.getUserData (res, req.body.accountKitState, req.body.accountKitCode, function(resp) {
      res.setHeader ("Set-Cookie", "resp="+JSON.stringify(resp));
      res.render('index', {state: ''});
    });
});

module.exports = router;
