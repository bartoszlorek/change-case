import React from 'react';
import style from '../style.css';

function escQuotes(string) {
    if (!string) {
        return null;
    }
    if (string.indexOf('"') < 0) {
        return string;
    }
    string = string.trim();
    let atStart = +(string[0] === '"'),
        parts = string.split('"');

    if (parts[0] === '') {
        parts.shift();
    }
    if (parts[parts.length - 1] === '') {
        parts.pop();
    }
    return parts.map((part, index) => {
        let isQuote = index % 2 !== atStart;
        if (isQuote) {
            return <i key={index}>{part}</i>;
        }
        return <span key={index}>{part}</span>;
    });
}

function isReactComponent(value) {
    return !!value && typeof value.type === 'function';
}

export default function (props) {
    let { title, description, children, data, onData } = props;

    return (
        <div className={style.wrap}>
            <p className={style.description}>
                {title && <b>{title}: </b>}{escQuotes(description)}
            </p>
            {React.Children.map(children,
                child => {
                    if (isReactComponent(child)) {
                        return React.cloneElement(child, {
                            data,
                            onData
                        })
                    }
                    return child;
                }
            )}
        </div>
    )
}