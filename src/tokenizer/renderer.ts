import {tokenizer} from './tokenizer';
import type {Token} from './token';

export type RendererHandler = (token: Token) => string;
export type RendererFilter = (token: Token) => string | boolean;

const defaultFilter = () => true;

export function renderTokens(
  tokens: Token[],
  handler: RendererHandler,
  filter: RendererFilter = defaultFilter
) {
  let output = '';
  for (const token of tokens) {
    const text = handler(token);
    const cond = filter(token);

    if (cond) {
      output += cond === true ? text : cond;
    }
  }
  return output;
}

export function renderString(source: string, handler: RendererHandler) {
  return renderTokens(tokenizer(source), handler);
}
