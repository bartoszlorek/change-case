import React from 'react';
import classNames from 'classnames';
import { bind } from './reactness';
import style from './style.css';

import ShortcutItem from './shortcuts-item';

class Shortcuts extends React.Component {
    constructor(props) {
        super(props);
        bind(this, [
            'handelActive',
        ]);
        this.state = {
            active: null
        }
    }

    handelActive(itemSlug) {
        this.setState((prevState) =>
            ({ active: prevState.active !== itemSlug && itemSlug || null })
        );
    }

    render() {
        let { methods } = this.props;
        return (
            <div className={style.wrap}>
                <p className={style.description}>
                    <b>Keyboard Shortcuts:</b>
                </p>
                <div>
                    {methods && methods.map(method =>
                        <ShortcutItem
                            key={method[0]}
                            slug={method[0]}
                            name={method[1]}
                            active={this.state.active === method[0]}
                            setActive={this.handelActive}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default Shortcuts;