import React from 'react'
import markdown from './markdown'
import isReactComponent from './is-react-component'

const validComponent = a => a !== null
const PROP_TAG = '()'
const PROP_ATTR = 'href'

function baseComponent(proto, frag, key) {
    const { text, prop } = frag
    if (proto === undefined) {
        return text
    }
    const props = { key }
    if (prop !== null) {
        props[PROP_ATTR] = prop
    }

    if (typeof proto === 'string') {
        props.className = proto
        return React.createElement('span', props, text)
    }
    if (isReactComponent(proto)) {
        return React.createElement(proto, props, text)
    }
    if (React.isValidElement(proto)) {
        return React.cloneElement(proto, props, text)
    }
    return null
}

function applyMarkdown(spec) {
    if (spec == null) {
        return string => string
    }
    const marks = Object.keys(spec)
    return string => {
        if (string != null) {
            return markdown(string, marks, PROP_TAG)
                .map((frag, key) =>
                    baseComponent(spec[frag.mark], frag, key))
                .filter(validComponent)
        }
        return null
    }
}

function useStyle(style, spec) {
    if (spec == null) {
        return null
    }
    if (style == null) {
        return spec
    }
    let result = {}
    Object.keys(spec).forEach(prop => {
        let styleProp = style[spec[prop]]
        if (styleProp !== undefined) {
            result[prop] = styleProp
        }
    })
    return result
}

export default applyMarkdown
export { useStyle }
