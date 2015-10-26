import React from 'react';
import { connect } from 'react-redux';

import Input from './input';
import Results from './results';

import { setQuery as baseSetQuery, activateSelection, nextSelection, previousSelection } from '../actions';


function curry(fn, ...args) {
    return (...nArgs) => fn.apply(this, [...args, ...nArgs])
}


class SearchForm extends React.Component {
    render() {

        const { dispatch, query, results, api, selection } = this.props;
        let setQuery = curry(baseSetQuery, api);

        return (
        <div onKeyUp={this.handleKeyUp.bind(this)}>
            <form className="search-and-submit" onSubmit={this.handleSubmit.bind(this)}>
                <Input ref="input" value={query} onChange={(value) => dispatch(setQuery(value))} />
            </form>
            <Results results={results} selection={selection.current} />
        </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        return false;
    }

    handleKeyUp(e) {

        switch (e.which) {
            case 13:
            e.preventDefault();
            this.props.dispatch(activateSelection());
            break;
            case 38:
            e.preventDefault();
            this.props.dispatch(previousSelection());
            break;
            case 40:
            e.preventDefault();
            this.props.dispatch(nextSelection());
            break;

            default:
            // do nothing
        }
    }
}

export default connect(state => state)(SearchForm);
