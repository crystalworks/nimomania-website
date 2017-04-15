'use strict';

const Metalsmith   = require('metalsmith');
const autoprefixer = require('metalsmith-autoprefixer');
const assets       = require('metalsmith-assets');
const browsersync  = require('metalsmith-browser-sync');
const imagemin     = require('metalsmith-imagemin');
const handlebars   = require('handlebars');
const layouts      = require('metalsmith-layouts');
const markdown     = require('metalsmith-markdown');
const permalinks   = require('metalsmith-permalinks');
const sass         = require('metalsmith-sass');

const dir = {
    base:   __dirname + '/',
    source: './src/',
    dest:   './build/'
}

Metalsmith(dir.base)
    .source(dir.source)
    .destination(dir.dest)
    .clean(true)
    .use(autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'IE >= 9']
    }))
    .use(sass({
        outputDir:   'css',
        outputStyle: 'compressed'
    }))
    .use(imagemin({
        optimizationLevel: 3,
        svgoPlugins: [{ removeViewBox: false }]
    }))
    .use(markdown())
    .use(permalinks())
    .use(layouts({
        engine:    'handlebars',
        default:   'layout.html',
        directory: 'layouts',
        partials:  'partials',
        pattern:   '**/*.html'
    }))
    .use(assets({
        source: 'assets',
    }))
    .use(browsersync({
        server: dir.dest,
        files:  ['src/**/*', 'layouts/**/*', 'partials/**/*']
    }))
    .build((err) => {
        if (err) throw err

        console.log('Successfully build metalsmith');
    });
