import React from 'react';
import applyMarkdown from '../../.utils/react/apply-markdown';
import style from '../style.css';
import bem from '../bem';

const markdown = applyMarkdown(style, {
    '*': 'important',
    '"': 'quote'
});

export default function ({ title, description, children }) {
    return (
        <div className={bem('wrap')}>
            <p className={bem('description')}>
                {title && <b>{title}: </b>}{markdown(description)}
            </p>
            {children}
        </div>
    )
}