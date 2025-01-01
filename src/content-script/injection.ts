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
} from '../methods/v3';
import {HandshakeMessage, HandshakeResponse, MethodMessage} from '../messages';
import {asyncMessageHandler} from '../helpers';
import {createSelection} from './selection';
import {composeMethod} from './composition';
import type {MethodName, MethodHandler} from '../methods/types';

const definedHandlers: Record<MethodName, () => MethodHandler> = {
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
    const createHandler = definedHandlers[name as MethodName];
    if (createHandler === undefined) {
      return;
    }

    const selection = createSelection();
    if (!selection || selection.collapsed) {
      return;
    }

    console.log(selection);
    const composedMethod = await composeMethod(createHandler());
    selection.textContent(composedMethod);
  })
);
