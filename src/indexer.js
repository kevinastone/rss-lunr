import fs from 'fs';
import lunr from 'lunr';
import FeedParser from 'feedparser';
import striptags from 'striptags';


export default class Indexer {
    constructor() {
        this.index = lunr(function() {

            this.ref('id');
            this.field('url', {store: true, index: false});
            this.field('title', {boost: 10, store: true});
            this.field('content');
        });
    }

    indexItem(item) {

        document = {
            id: item.link,
            url: item.link,
            title: item.title,
            content: striptags(item.description)
        }

        this.index.add(document)
    }

    index(feedFilename, outputFilename) {

        let feedparser = new FeedParser(),
            self = this;

        console.log(`Indexing ${feedFilename}`)

        fs.createReadStream(feedFilename).pipe(feedparser)

        feedparser.on('error', (error) => console.error(error));

        feedparser.on('readable', function() {
            let item;

            while (item = this.read()) {
                self.indexItem(item);
            }
        });

        feedparser.on('end', () => {

            console.log(`Saving index to ${outputFilename}`);
            fs.writeFileSync(outputFilename, JSON.stringify(self.save()));
        });

    }

    save() {
        return this.index.toJSON();        
    }
}
