import React from 'react';
import classNames from 'classnames';
import { bind } from '../react-utils';
import style from '../style.css';

import ShortcutItem from './shortcuts-item';

class Shortcuts extends React.Component {
    constructor(props) {
        super(props);
        bind(this, [
            'handelActive',
            'handleAssign'
        ]);
        this.state = {
            active: null,
            keys: {}
        }
    }

    handelActive(methodName) {
        this.setState((prevState) => {
            let active = null;
            if (methodName && methodName !== prevState.active) {
                active = methodName;
            }
            return { active }
        });
    }

    handleAssign(method) {
        this.setState((prevState) => {
            let newKeys = {};
            newKeys[method.name] = method.code;
            return {
                keys: Object.assign({},
                    prevState.keys,
                    newKeys
                )
            }
        });
    }

    render() {
        let { methods } = this.props;
        return (
            <div className={style.wrap}>
                <p className={style.description}>
                    <b>Keyboard Shortcuts:</b> press <i>Delete</i> to remove assignment
                </p>
                <div>
                    {methods && methods.map(method =>
                        <ShortcutItem
                            key={method.name}
                            data={method}
                            code={this.state.keys[method.name]}
                            active={this.state.active === method.name}
                            onClick={this.handelActive}
                            onAssign={this.handleAssign}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default Shortcuts;