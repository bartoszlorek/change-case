import React from 'react';
import markdown from './markdown';

function applyMarkdown(style, spec) {
    if (style == null || spec == null) {
        return string => string;
    }
    let marks = Object.keys(spec);
    return (string) => {
        if (string == null) {
            return null;
        }
        return markdown(string, marks).map(
            (item, index) => {
                let name = spec[item.mark];
                return (
                    <span
                        key={index}
                        className={style[name]}>
                        {item.text}
                    </span>
                )
            }
        );
    }
}

export default applyMarkdown;