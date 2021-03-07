var express = require('express');
var router = express.Router();
const LaunchDarkly = require('launchdarkly-node-client-sdk');
var newFeatureEnabled;


/* GET users listing. */
router.get('/users/:id', function (req, res, next) {    
  console.log('users :', req.params.id)
  var NewUserId = req.params.id
  var newUser = {
  key: NewUserId
  };

    var ldClient = LaunchDarkly.initialize('60410e583766640ddd6438fb', user);

ldClient.identify(newUser).then(() => {
    
  console.log("New user's flags available");
  
  var showNewFeature = ldClient.variation("feature-flag-for-demo", false);
    newFeatureEnabled = showNewFeature
    console.log('FeatureEnabledVariable', newFeatureEnabled);
  
  if (newFeatureEnabled) {
    console.log("FeatureEnabled for ", NewUserId);
  } else {
    console.log("FeatureDisabled for ", NewUserId);
  }
}); 
  
    
    res.render('index', { title: 'New User', flag: newFeatureEnabled, user: NewUserId });
})

module.exports = router;
