import React from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';


export default class SearchInput extends React.Component {
    render() {
        return <input
            type="search"
            name="query"
            placeholder="Search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            className={classNames({'is-active': !!this.props.value})}
            value={this.props.value}
            onChange={this.handleInput.bind(this)}
            onFocus={this.handleFocus.bind(this)}
        />;
    }

    handleInput(event) {
        this.props.onChange(event.target.value);
    }

    handleFocus() {
        let el = ReactDOM.findDOMNode(this);

        if (!el) {
            return;
        }
        setTimeout(() => el.select());
    }
}
