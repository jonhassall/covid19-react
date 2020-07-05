const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    externals: {
        charts: 'google'
    }
});

mix.js('resources/js/app.js', 'public/js')
    .react('resources/js/react.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');


