const mix = require('laravel-mix');
const webpack = require('webpack')
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
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ]
})
mix.ts('resources/js/App.ts', 'public/js').vue().sourceMaps();
mix.sass('resources/sass/app.scss', 'public/css');
mix.graphql();
mix.options({
    postCss: [tailwindcss('./tailwind.config.js')]
})
mix.version();
