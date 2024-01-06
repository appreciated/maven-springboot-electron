import path from "path";
import electron from 'electron';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
let languageSet = false;
let loadedLanguage;
const app = electron.app ? electron.app : electron.remote.app;

export class translations {
    constructor() {
        if (!languageSet) {
            if (fs.existsSync(path.join(__dirname, app.getLocale() + '.json'))) {
                loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, app.getLocale() + '.json'), 'utf8'));
                languageSet = true;
            } else {
                loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, 'en.json'), 'utf8'));
            }
        }
    }

    __(phrase) {
        let translation = loadedLanguage[phrase];
        if (translation === undefined) {
            translation = phrase;
        }
        return translation;
    }
}

export default translations;