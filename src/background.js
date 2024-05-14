import message from '@utils/chrome/message';
import executableTab from '@utils/chrome/executable-tab';
import getCurrentTab from '@utils/chrome/get-current-tab';
import setDefaults from '@utils/chrome/set-defaults';
import {STATE, initializeState} from '@utils/chrome/extension-state';

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
  noCase,
} from './constants';

chrome.runtime.onInstalled.addListener(() => {
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
    [noCase.name, noCase.text],
  ].forEach((item, index) => {
    const common = {
      contexts: ['editable'],
    };

    if (item === null) {
      chrome.contextMenus.create({
        ...common,
        id: `${index}_separator`,
        type: 'separator',
      });
    } else {
      chrome.contextMenus.create({
        ...common,
        id: item[0],
        title: item[1],
      });
    }
  });

  const exec = executableTab();
  const handleMethod = (tab, name) =>
    exec(tab)
      .catch(error => alert(error))
      .then(tabId => {
        chrome.scripting
          .executeScript({
            target: {tabId},
            files: ['content-script.js'],
          })
          .then(() => {
            message.toTab(tabId, {
              type: 'CHANGE_CASE',
              name,
            });
          });
      });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.selectionText) {
      handleMethod(tab, info.menuItemId);
    }
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

  setDefaults({
    updateNotification: true,
  });

  initializeState({
    [STATE.INSTALL]: () => true,
    [STATE.UPDATE]: data => data.updateNotification,
  });
});
