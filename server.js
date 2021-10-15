const LRU = require('lru-cache');
const fs = require('fs');
const express = require('express');
const server = express();
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const compression = require('compression');

//const favicon = require('serve-favicon')
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./.bundle/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync('./dist/index.template.html', 'utf-8'),
    clientManifest
})

const encodeResToGzip = contentType => (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', contentType);

    next();
};

const checkForHTML = req => {
    const url = req.url.split('.');
    const extension = url[url.length - 1];

    if (['/'].indexOf(extension) > -1) {
        return true; //compress only .html files sent from server
    }

    return false;
};

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}

server.use(compression({ filter: shouldCompress }));//.use(compression({ threshold: 0 }))
//server.use(favicon('./public/logo-48.png'))
server.use('/js', express.static(path.join(__dirname, './dist/js')));
server.use('/css', express.static(path.join(__dirname, './dist/css')));
//server.get("/*.js", encodeResToGzip('text/javascript'));
//server.get("/*.css", encodeResToGzip('text/css'));

//server.use(express.static('static'));
//server.use(express.static('static-removed-in-future'));
server.use('/assets', express.static(path.join(__dirname, './dist/assets')));

//server.use('/service-worker.js', serve('./dist/service-worker.js'))

const microCache = new LRU({
    max: 100,
    maxAge: 1000 * 60 // 1 min.
});

const isCacheable = req => {
    // implement logic to check if the request is user-specific.
    // only non-user-specific pages are cache-able
    return true;
};


server.get('*',async (req, res) => {
    let cacheable = isCacheable(req);
    
    if (cacheable) {
        const hit = microCache.get(req.url)
        if (hit) {
            return res.end(hit)
        }
    }

    const ctx = {
        url: req.url,
        title: 'KipsLMS',
        meta: `<meta data-n-head content="Home" name="KipsLMS">`,
        cookie: req.headers['cookie']
    };

    if (req.url.includes('.css')) {
        res.status(404).end('Internal Server Error');

        return;
    }

    renderer.renderToString(ctx, (err, html) => { 
        if (err) {
            res.status(500).end('Internal Server Error');
            console.log(err);
            return;
        };

        res.status(200);
        res.end(html);

        if (cacheable) {
            microCache.set(ctx.url, html)
        }
    })
});

//server.listen(9090);
//console.log(process.env.NODE_ENV)
server.listen(process.env.PORT || 8080);//9090
