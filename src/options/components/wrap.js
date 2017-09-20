import React from 'react';
import applyMarkdown from '../../.utils/react/apply-markdown';
import style from '../style.css';

const markdown = applyMarkdown(style, {
    '*': 'important',
    '"': 'quote'
});

export default function (props) {
    let { title, description, children } = props;

    return (
        <div className={style['wrap']}>
            <p className={style['description']}>
                {title && <b>{title}: </b>}{markdown(description)}
            </p>
            {children}
        </div>
    )
}