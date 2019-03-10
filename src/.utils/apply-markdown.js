import * as React from 'react';
import markdown from './markdown';

const PROP_TAG = '()';
const PROP_ATTR = 'href';

function baseComponent(proto, frag, key) {
  const {text, prop} = frag;

  if (proto === undefined) {
    return text;
  }

  const props = {key};
  if (prop !== null) {
    props[PROP_ATTR] = prop;
  }

  if (typeof proto === 'string') {
    props.className = proto;
    return <span {...props}>{text}</span>;
  }

  const Component = proto;
  return <Component {...props}>{text}</Component>;
}

function applyMarkdown(spec) {
  if (spec == null) {
    return string => string;
  }

  const marks = Object.keys(spec);
  return string => {
    if (string != null) {
      return markdown(string, marks, PROP_TAG).map((frag, key) =>
        baseComponent(spec[frag.mark], frag, key)
      );
    }
    return null;
  };
}

function useStyle(style, spec) {
  if (spec == null) {
    return null;
  }
  if (style == null) {
    return spec;
  }

  const result = {};
  Object.keys(spec).forEach(prop => {
    let styleProp = style[spec[prop]];
    if (styleProp !== undefined) {
      result[prop] = styleProp;
    }
  });
  return result;
}

export default applyMarkdown;
export {useStyle};
