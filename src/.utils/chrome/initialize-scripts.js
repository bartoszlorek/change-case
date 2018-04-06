// It executes content scripts from extension manifest,
// to make them work immediately upon installation.

import { exec } from './executable-tab'

function isMatched(tab, scripts) {
    if (tab.url == null) {
        return true
    }
    return scripts.some(({ matches }) => {
        if (matches == null || !matches.length) {
            return true
        }
        return matches.some(match => (
            new RegExp(match).test(tab.url)
        ))
    })
}

function injectScripts(tab, scripts) {
    if (!isMatched(tab, scripts)) {
        return
    }
    exec(tab)
        .then(() => {
            scripts.forEach(({ js, all_frames }) => {
                if (js == null) {
                    return
                }
                js.forEach(file =>
                    chrome.tabs.executeScript(tab.id, {
                        allFrames: !!all_frames,
                        file
                    })
                )
            })
        })
        .catch(err => console.warn(err))
}

function initializeScripts() {
    let scripts = chrome.runtime.getManifest().content_scripts
    if (scripts == null) {
        return
    }
    chrome.tabs.query({}, tabs =>
        tabs.forEach(tab => injectScripts(tab, scripts))
    )
}

export default initializeScripts
