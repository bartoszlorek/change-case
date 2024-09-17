import {HandshakeMessage, HandshakeResponse, MethodMessage} from '../messages';
import type {MethodName} from '../methods';

type ContextMenuItemType = {
  name: MethodName;
  text: string;
};

const contextMenuItems: Array<null | ContextMenuItemType> = [
  {name: 'upperCase', text: 'UPPERCASE'},
  {name: 'lowerCase', text: 'lowercase'},
  {name: 'titleCase', text: 'Title Case'},
  {name: 'sentenceCase', text: 'Sentence case'},
  null,
  {name: 'camelCase', text: 'camelCase'},
  {name: 'pascalCase', text: 'PascalCase'},
  {name: 'constantCase', text: 'CONSTANT_CASE'},
  null,
  {name: 'paramCase', text: 'param-case'},
  {name: 'snakeCase', text: 'snake_case'},
  {name: 'dotCase', text: 'dot.case'},
  null,
  {name: 'toggleCase', text: 'tOGGLE cASE'},
  {name: 'noAccents', text: 'no accents'},
  {name: 'noCase', text: 'no case'},
];

chrome.runtime.onInstalled.addListener(details => {
  contextMenuItems.forEach((item, index) => {
    if (item === null) {
      chrome.contextMenus.create({
        contexts: ['editable'],
        id: `${index}_separator`,
        type: 'separator',
      });
    } else {
      chrome.contextMenus.create({
        contexts: ['editable'],
        id: item.name,
        title: item.text,
      });
    }
  });

  if (details.reason === 'install') {
    chrome.runtime.openOptionsPage();
  }
});

async function sendMethodMessage(tabId: number, name: string) {
  try {
    const response = await chrome.tabs.sendMessage<
      HandshakeMessage,
      HandshakeResponse
    >(tabId, {
      type: 'change_case_handshake',
    });

    if (!response.injected) {
      throw 'not_injected';
    }
  } catch {
    // sending a message to not injected
    // content-script will throw an error

    try {
      await chrome.scripting.executeScript({
        target: {tabId},
        files: ['content-script.js'],
      });

      const lastError = chrome.runtime.lastError;
      if (lastError) {
        throw lastError;
      }
    } catch (error) {
      // Google prevents scripting on certain pages and domains
      // TODO: open the dedicated page with the error message
      console.log(error);
    }
  }

  chrome.tabs.sendMessage<MethodMessage>(tabId, {
    type: 'change_case_method',
    name,
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab?.id && info.selectionText) {
    sendMethodMessage(tab.id, info.menuItemId as string);
  }
});

chrome.commands.onCommand.addListener((command, tab) => {
  const name = command.replace(/^\d+_/, '');
  if (tab.id && contextMenuItems.some(a => a?.name === name)) {
    sendMethodMessage(tab.id, name);
  }
});
