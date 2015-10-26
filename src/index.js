import React from 'react';  //eslint-disable-line
import ReactDOM from 'react-dom';
import dorsal from 'dorsal';

import { Provider } from 'react-redux';

import SearchForm from './components/form';
import store from './store';
import API from './api';


dorsal.registerPlugin('search-form', {
    create: function(options) {
        ReactDOM.render(
            <Provider store={store}>
                <SearchForm api={new API(options.data.indexUrl)} />
            </Provider>,
            options.el
        );

        return options.el;
    },

    destroy: function() {
        ReactDOM.unmountComponentAtNode(options.instance);
    }
});

dorsal.wire(document, 'search-form');
