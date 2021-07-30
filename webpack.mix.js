const mix = require('laravel-mix');
const path = require('path');
const tailwindcss = require('tailwindcss');

// mix.browserSync({
//     proxy: process.env.APP_URL,
//     notify: false
// });

class GraphQl {
    webpackRules() {
        return {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
        };
    }
}
mix.extend('graphql', new GraphQl());
mix.alias({
    '@api': path.join(__dirname, 'resources/js/api')
})
mix.webpackConfig({

})
mix.ts('resources/js/app.ts', 'public/js').vue();
mix.sass('resources/sass/app.scss', 'public/css');
mix.graphql();
mix.options({
    postCss: [tailwindcss('./tailwind.config.js')]
})
mix.version();
