// It executes content scripts from extension manifest,
// to make them work immediately upon installation.

import {exec} from './executable-tab';

const ALL_URLS = '<all_urls>';

function isMatched(tab, scripts) {
  if (tab.url == null) {
    return true;
  }
  return scripts.some(({matches}) => {
    if (matches == null || !matches.length) {
      return true;
    }
    return matches.some(match => {
      if (match === ALL_URLS) {
        return true;
      }
      return new RegExp(match).test(tab.url);
    });
  });
}

function injectScripts(tab, scripts) {
  if (!isMatched(tab, scripts)) {
    return;
  }
  exec(tab)
    .catch(err => console.warn(err))
    .then(id =>
      scripts.forEach(({js, all_frames}) => {
        if (js == null) {
          return;
        }
        js.forEach(file =>
          chrome.tabs.executeScript(id, {
            allFrames: !!all_frames,
            file
          })
        );
      })
    );
}

function initializeScripts() {
  let scripts = chrome.runtime.getManifest().content_scripts;
  if (scripts == null) {
    return;
  }
  chrome.tabs.query({}, tabs =>
    tabs.forEach(tab => injectScripts(tab, scripts))
  );
}

export default initializeScripts;
