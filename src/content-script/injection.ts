import {
  camelCase,
  constantCase,
  dotCase,
  lowerCase,
  noAccents,
  noCase,
  paramCase,
  pascalCase,
  sentenceCase,
  snakeCase,
  titleCase,
  toggleCase,
  upperCase,
} from '../methods/v2';
import {HandshakeMessage, HandshakeResponse, MethodMessage} from '../messages';
import {asyncMessageHandler} from '../helpers';
import {createSelection} from './selection';
import {composeMethod} from './composition';
import type {MethodName, MethodType} from '../methods/types';

const definedMethods: Record<MethodName, MethodType> = {
  camelCase,
  constantCase,
  dotCase,
  lowerCase,
  noAccents,
  noCase,
  paramCase,
  pascalCase,
  sentenceCase,
  snakeCase,
  titleCase,
  toggleCase,
  upperCase,
};

chrome.runtime.onMessage.addListener(
  asyncMessageHandler<HandshakeMessage, HandshakeResponse>(
    'change_case_handshake',
    async () => ({injected: true})
  )
);

chrome.runtime.onMessage.addListener(
  asyncMessageHandler<MethodMessage>('change_case_method', async ({name}) => {
    const method = definedMethods[name as MethodName];
    if (method === undefined) {
      return;
    }

    const selection = createSelection();
    if (!selection || selection.collapsed) {
      return;
    }

    console.log(selection);
    const composedMethod = await composeMethod(method);
    selection.textContent(composedMethod);
  })
);
