const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');
const { VueLoaderPlugin } = require("vue-loader");
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isServer = process.env.WEBPACK_TARGET === 'node';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const serverConfig = {
    entry: './src/entry-server.js',
    resolve: {
        alias: {
            'axios-client': './axios-server.js'
        }
    },
    target: 'node',
    plugins: [
        new VueSSRServerPlugin(),
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env': 'production',
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest',
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: true,
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                },
            }),
        ],
    },
    externals: nodeExternals({ whitelist: /\.css$/ }),
    // Avoids bundling external dependencies, so node can load them directly from node_modules/
    externals: Object.keys(require('./package.json').dependencies),
    optimization: {
        splitChunks: false,
    },
    output: {
        // Outputs node-compatible modules instead of browser-compatible.
        libraryTarget: 'commonjs2',
        globalObject: "this"
    },
    module: {
        //noParse: /es6-promise\.js$/, // avoid webpack shimming process

    },
    // We can remove the devServer block.
    performance: {
        hints: false
    },
    devtool: 'source-map'
};

const cilentConfig = {
    entry: './src/entry-client.js',
    resolve: {
        alias: {
            'axios-client': './axios-client.js',
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    target: 'web',
    node: false,
    plugins: [
        // new SWPrecachePlugin({
        //     cacheId: 'kipslms',
        //     filename: 'service-worker.js',
        //     filepath: 'dist/service-worker.js',
        //     staticFileGlobs: [
        //         'dist/*',
        //         'dist/**/*'
        //     ],
        //     stripPrefix: 'dist/',
        //     maximumFileSizeToCacheInBytes: 524288,
        //     minify: 'true',
        //     //dontCacheBustUrlsMatching: /./,
        //     dontCacheBustUrlsMatching: /\.\w{8}\./,
        //     staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/]
        // }),
        // strip dev-only code in Vue source
        //{ src: '~/plugins/vuex-persist', ssr: false },
        new webpack.DefinePlugin({
            'process.env': 'production',
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new VueSSRClientPlugin(),
        new CompressionPlugin({
            test: /\.(js|css|html)$/,
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            deleteOriginalAssets: false,
            cache: true,
        })
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest',
        },
        splitChunks: {
            //chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    // name(module) {
                    //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                    //     return `kips.${packageName.replace('@', '')}`;
                    // },
                },
            },
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: true,
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                },
            }),
        ],
    },
    output: {
        globalObject: "this"
    },
    module: {
        rules: [
            { test: /\.css$/ },
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader',
            //     options: {
            //         // enable CSS extraction
            //         extractCSS: true
            //     }
            // },
            // {
            //     test: /\.css$/i,
            //     use: ['style-loader', 'css-loader'],
            // },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
    // resolve: {
    //     alias: {
    //         'vue$': 'vue/dist/vue.esm.js'
    //     }
    // },
    // resolve:{
    //   alias: {
    //     'create-api': createApiFile
    //   }
    // }
};

module.exports = {
    outputDir: path.join(__dirname, isServer ? './.bundle' : './dist'),
    //publicPath: '/',
    // pwa: {
    //     workboxOptions: {
    //         directoryIndex: 'null'
    //     }
    // },
    configureWebpack: isServer ? serverConfig : cilentConfig,
    chainWebpack: config => {
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        config.plugins
            .delete('split-vendor')
            .delete('split-vendor-async')
            .delete('split-manifest')
            .delete('inline-manifest')
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                merge(options, {
                    optimizeSSR: true
                })
            })
    },
    //transpileDependencies: ['vuex-persist', 'bootstrap', 'bootstrap-vue'],
    productionSourceMap: true,
    css: {
        // extract CSS in components into a single CSS file (only in production)
        // can also be an object of options to pass to extract-text-webpack-plugin
        extract: false,

        // enable CSS source maps?
        sourceMap: true
    },
};