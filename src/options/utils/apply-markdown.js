import React from 'react';
import markdown from './markdown';

function applyMarkdown(style, spec) {
    let marks = spec && Object.keys(spec);

    return string => {
        if (!string) {
            return null;
        }
        return markdown(string, marks).map(
            (item, index) => {
                let name = spec && spec[item.mark];
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