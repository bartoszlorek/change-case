import React from 'react'
import markdown from './markdown'
import isReactComponent from './is-react-component'

function applyMarkdown(spec) {
    if (spec == null) {
        return string => string
    }

    let marks = Object.keys(spec)
    return (string) => {
        if (string == null) {
            return null
        }
        return markdown(string, marks)
            .map((item, index) => {
                if (item.mark === null) {
                    return item.text
                }

                let value = spec[item.mark]
                if (typeof value === 'string') {
                    return React.createElement(
                        'span', {
                            key: index,
                            className: value
                        },  item.text
                    )
                }
                if (isReactComponent(value)) {
                    return React.createElement(
                        value, {
                            key: index
                        },  item.text
                    )
                }
                if (React.isValidElement(value)) {
                    return React.cloneElement(
                        value, {
                            key: index
                        },  item.text
                    )
                }
                return false
            })
            .filter(a => a !== false)
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
