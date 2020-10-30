const path = require("path")
const electron = require('electron')
const fs = require('fs');
let languageSet = false;
var loadedLanguage;
let app = electron.app ? electron.app : electron.remote.app

module.exports = i18n;

function i18n() {
    if (!languageSet) {
        if (fs.existsSync(path.join(__dirname, app.getLocale() + '.json'))) {
            loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, app.getLocale() + '.json'), 'utf8'))
            languageSet = true;
        } else {
            loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, 'en.json'), 'utf8'))
        }
    }
}

i18n.prototype.__ = function (phrase) {
    let translation = loadedLanguage[phrase]
    if (translation === undefined) {
        translation = phrase
    }
    return translation
}