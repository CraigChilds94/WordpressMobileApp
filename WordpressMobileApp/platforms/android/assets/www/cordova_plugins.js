cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.statusbar/www/statusbar.js",
        "id": "org.apache.cordova.statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/uk.co.ilee.socialmessage/www/socialmessage.js",
        "id": "uk.co.ilee.socialmessage.SocialMessage",
        "clobbers": [
            "socialmessage"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.statusbar": "0.1.3",
    "uk.co.ilee.socialmessage": "0.2.6"
}
// BOTTOM OF METADATA
});