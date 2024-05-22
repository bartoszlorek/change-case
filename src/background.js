import message from '@utils/chrome/message';
import {isExecutableTab} from '@utils/chrome/executable-tab';
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

  const handleMethod = (tab, name) => {
    isExecutableTab(tab)
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
      })
      .catch(error => {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: './assets/icon128.png',
          title: 'Change Case',
          message: error,
        });
      });
  };

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

  setDefaults({
    updateNotification: true,
  });

  initializeState({
    [STATE.INSTALL]: () => true,
    [STATE.UPDATE]: data => data.updateNotification,
  });
});
