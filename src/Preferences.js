define(function (require, exports, module) {
    "use strict";

    var _                   = brackets.getModule("thirdparty/lodash");
    var PreferencesManager  = brackets.getModule("preferences/PreferencesManager");

    var Strings             = require("../strings");

    var prefix = "tangere.preview";
    var prefs = PreferencesManager.getExtensionPrefs(prefix);

    var defaultPreferences = {
        enabled: {
            type: "boolean",
            value: false,
            options: {
                name: Strings.PREF_ENABLED_NAME,
                description: Strings.PREF_ENABLED_DESC
            }
        }, 
		dark: {
            type: "boolean",
            value: true,
            options: {
                name: Strings.PREF_DARK_NAME,
                description: Strings.PREF_DARK_DESC
            }
        }
    };

    _.each(defaultPreferences, function (definition, key) {
        prefs.definePreference(key, definition.type, definition.value, definition.options);
    });
    prefs.save();

    function togglePref(key, optVal) {
        var state = prefs.get(key);
		if(optVal != undefined) state = !optVal;
        prefs.set(key, !state);
        prefs.save();
        return !state;
    }

    function getSettings() {
        var prefValues = {};
        Object.keys(defaultPreferences).forEach(function (value) {
            if (value !== "enabled" && value !== "sidebar") {
                prefValues[value] = prefs.get(value);
            }
        });
        return prefValues;
    }

    function get(key) {
        return prefs.get(key);
    }

    module.exports = {
        get: get,
        getSettings: getSettings,
        togglePref: togglePref
    };
});
