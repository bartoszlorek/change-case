import React from 'react'
import renderer from 'react-test-renderer'
import applyMarkdown from '../../src/.utils/react/apply-markdown'

describe('apply-markdown.js', () => {
    it('should return fn that returns whole string', () => {
        expect(applyMarkdown()('dog')).toBe('dog')
        expect(applyMarkdown(null)('cat')).toBe('cat')
    })

    it('should handle string property', () => {
        let mark = applyMarkdown({
            '*': 'important'
        })
        let wrap = renderer.create(<div>{mark('to *be*')}</div>),
            result = wrap.toJSON().children

        expect(result).toEqual([
            'to ',
            {
                type: 'span',
                props: {
                    className: 'important'
                },
                children: ['be']
            }
        ])
    })

    it('should handle react element property', () => {
        let mark = applyMarkdown({
            '*': <i />
        })
        let wrap = renderer.create(<div>{mark('to *be*')}</div>),
            result = wrap.toJSON().children

        expect(result).toEqual([
            'to ',
            {
                type: 'i',
                props: {},
                children: ['be']
            }
        ])
    })

    it('should handle functional component property', () => {
        const Component = ({ children }) => (
            <b className="important">{children}</b>
        )
        let mark = applyMarkdown({
            '*': Component
        })
        let wrap = renderer.create(<div>{mark('to *be*')}</div>),
            result = wrap.toJSON().children

        expect(result).toEqual([
            'to ',
            {
                type: 'b',
                props: {
                    className: 'important'
                },
                children: ['be']
            }
        ])
    })

    it('should handle class component property', () => {
        class Component extends React.Component {
            render() {
                return <b className="important">{this.props.children}</b>
            }
        }
        let mark = applyMarkdown({
            '*': Component
        })
        let wrap = renderer.create(<div>{mark('to *be*')}</div>),
            result = wrap.toJSON().children

        expect(result).toEqual([
            'to ',
            {
                type: 'b',
                props: {
                    className: 'important'
                },
                children: ['be']
            }
        ])
    })

    it('should handle composition component property', () => {
        const Component = ({ children }) => (
            <b className="important">{children}</b>
        )
        let mark = applyMarkdown({
            '*': <Component />
        })
        let wrap = renderer.create(<div>{mark('to *be*')}</div>),
            result = wrap.toJSON().children

        expect(result).toEqual([
            'to ',
            {
                type: 'b',
                props: {
                    className: 'important'
                },
                children: ['be']
            }
        ])
    })
})
