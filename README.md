# Change Case

Chrome extension providing multiple methods to change text case. Supports simple HTML input text fields, textarea and content editable (WYSIWYG HTML editors like TinyMCE). The most cases are based on [change-case](https://github.com/blakeembrey/change-case) by Blake Embrey.

## Available methods:
- UPPERCASE
- lowercase
- Title Case
- Sentence case
- camelCase
- PascalCase
- CONSTANT_CASE
- param-case
- snake_case
- dot.case
- tOGGLE cASE
- no case

## Limitation
- input `type="email"` (doesn't support selection start/end)
- undo/redo in editors based on `contentEditable`
- some unidirectional data flow apps override changes
