import React from 'react';
import classNames from 'classnames';


export default class Result extends React.Component {
    render() {
        return <li className={classNames({'is-active': this.props.selected})}>
            <a href={this.props.result.fields.url}>{this.props.result.fields.title}</a>
        </li>;
    }
}
