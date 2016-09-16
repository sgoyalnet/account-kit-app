var express = require('express');
var router = express.Router();
var accountkit = require ('node-account-kit');

router.get('/', function(req, res, next) {
    accountkit.deleteUser(req.query.id, function(resp){
		res.send (resp);
	});
});
module.exports = router;