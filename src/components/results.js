import React from 'react';

import Result from './result';


export default class Results extends React.Component {
    render() {
        return (
        <ul className="search-results">
        {this.props.results.map((result, index) => {
            return <Result  key={result.ref} selected={index == this.props.selection} result={result} />;
        })}
        </ul>
        );
    }
}
