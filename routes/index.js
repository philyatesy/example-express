var express = require('express');
var app = express();
var router = express.Router();
const LaunchDarkly = require('launchdarkly-node-client-sdk');
var featureEnabled, newFeatureEnabled;
var UserId = Math.floor((Math.random() * 100) + 1);

var user = {
  key: UserId
};
const ldClient = LaunchDarkly.initialize('60410e583766640ddd6438fb', user);

ldClient.on('ready', () => {
  console.log("It's now safe to request feature flags");
  const showFeature = ldClient.variation("feature-flag-for-demo", false);
  featureEnabled = showFeature
    console.log('FeatureEnabledVariable',featureEnabled);
  
  if (showFeature) {
    console.log("FeatureEnabled for ", UserId);
  } else {
    console.log("FeatureDisabled for ", UserId);
  }
});


router.get('/:id', function (req, res, next) { 

if(req.params.id !== null){
  console.log('USER ID IS NOT NULL - Request ID:', req.params.id)
  var NewUserId = req.params.id
  var newUser = {
  key: NewUserId
  };

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
    
    console.log('Rendering Index New User');
    res.render('index', { title: 'New User', flag: newFeatureEnabled, user: NewUserId });
});
    
}
})

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Rendering Index Default');
  res.render('index', { title: 'Express', flag: featureEnabled, user: UserId });
});




module.exports = router;
