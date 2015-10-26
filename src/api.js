import axios from 'axios';
import lunr from 'lunr';

let promises = {};


function getIndex(url) {

    if (promises[url]) {
        return promises[url];
    }

    promises[url] = 
    axios.get(url).then((response) => {
        return lunr.Index.load(response.data);
    });
    return promises[url];

}

export default class SearchAPI {
    constructor(url) {
        this.indexUrl = url;
    }

    search(query) {
        return getIndex(this.indexUrl).then((index) => index.search(query));
    }
}
