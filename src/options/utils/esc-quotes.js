import React from 'react';

function escQuotes(string) {
    if (!string) {
        return null;
    }
    let parts = string.trim().split('"');
    if (parts.length < 3) {
        return string;
    }
    let atStart = +(parts[0] === '');
    if (parts[0] === '') {
        parts.shift();
    }
    if (parts[parts.length - 1] === '') {
        parts.pop();
    }
    return parts.map((part, index) => index % 2 === atStart
        ? <span key={index}>{part}</span>
        : <i key={index}>{part}</i>
    )
}

export default escQuotes;