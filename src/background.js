import message from './.utils/chrome/message';
import executableTab from './.utils/chrome/executable-tab';
import getCurrentTab from './.utils/chrome/get-current-tab';
import createMenu from './.utils/chrome/create-menu';
import setDefaults from './.utils/chrome/set-defaults';

import {
  listenStates,
  INSTALL_STATE,
  UPDATE_STATE
} from './.utils/chrome/extension-state';

import {
  methodNames,
  upperCase,
  lowerCase,
  titleCase,
  sentenceCase,
  camelCase,
  pascalCase,
  constantCase,
  paramCase,
  snakeCase,
  dotCase,
  toggleCase,
  noAccents,
  noCase
} from './constants';

const exec = executableTab();

const handleMethod = (tab, name) =>
  exec(tab)
    .catch(error => alert(error))
    .then(id => {
      chrome.tabs.executeScript(
        id,
        {
          file: 'content-script.js'
        },
        () => {
          message.toTab(id, {
            type: 'CHANGE_CASE',
            name
          });
        }
      );
    });

const handleClick = name => (info, tab) => {
  if (info.selectionText) {
    handleMethod(tab, name);
  }
};

createMenu(
  [
    [upperCase.name, upperCase.text],
    [lowerCase.name, lowerCase.text],
    [titleCase.name, titleCase.text],
    [sentenceCase.name, sentenceCase.text],
    null,
    [camelCase.name, camelCase.text],
    [pascalCase.name, pascalCase.text],
    [constantCase.name, constantCase.text],
    null,
    [paramCase.name, paramCase.text],
    [snakeCase.name, snakeCase.text],
    [dotCase.name, dotCase.text],
    null,
    [toggleCase.name, toggleCase.text],
    [noAccents.name, noAccents.text],
    [noCase.name, noCase.text]
  ],
  item => ({
    title: item[1],
    onclick: handleClick(item[0])
  }),
  {
    contexts: ['editable']
  }
);

setDefaults({
  updateNotification: true
});

listenStates({
  [INSTALL_STATE]: () => true,
  [UPDATE_STATE]: data => data.updateNotification
});

chrome.commands.onCommand.addListener(command => {
  let name = command.replace(/^\d+_/, '');
  if (methodNames.indexOf(name) !== -1) {
    getCurrentTab().then(tab => handleMethod(tab, name));
  }
});

// after 2.2.0 update - remove this code in the future
// blacklist is depreciated, instead use ignoreList
chrome.storage.sync.get('blacklist', data => {
  if (data.blacklist !== undefined) {
    chrome.storage.sync.set({ignoreList: data.blacklist});
    chrome.storage.sync.remove('blacklist');
  }
});
