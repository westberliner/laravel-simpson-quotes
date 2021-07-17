const mix = require('laravel-mix');

mix.browserSync({
    proxy: process.env.APP_URL,
    notify: false
});
mix.ts('resources/js/app.ts', 'public/js').vue();
mix.postCss('resources/css/app.css', 'public/css', [
    //
]);
