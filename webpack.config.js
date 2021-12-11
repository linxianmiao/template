const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');


module.exports = () => {

    const distPath = path.resolve(process.cwd(), 'dist');
    const publicPath = '/';
    const babelConfig = getBabelConfig();
    const webfontsPaths = [ path.join(process.cwd(), 'public/images/svgs/*.svg') ];
    const webfontsConfig = getWebfontsConfig(webfontsPaths);
    const config = {
        
        mode: 'development',
        devtool: 'eval-cheap-module-source-map',
        entry:{
            app: './view/App.tsx',
        },
        devServer: {
            static: {
              directory: path.join(__dirname, 'dist'),
            },
            historyApiFallback: true,
            compress: true,
            port: 9000,
        },
        output: {
            path: distPath,
            filename: 'js/[name].[fullhash].js',
            publicPath,
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
            modules: [
                'node_modules'
            ]
        },

        module: {
            rules: [
                webfontsConfig,
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader?cacheDirectory',
                            options: babelConfig
                        }
                    ]
                },

                {
                    test: /\.tsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader?cacheDirectory',
                            options: babelConfig
                        }
                    ]
                },

                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { url: false, }}, 'sass-loader'],
                },

                {
                    test: /\.(jpg|jpeg|png|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[ext]',
                            limit: 2048,
                        },
                    },
                },

                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ]
        },

        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['dist'],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'public/robots.txt' },
                    { from: 'public/images', to: 'images' },
                    { from: 'public/fonts', to: 'fonts' },
                    { from: 'public/locales', to: 'locales', force: true },
                ]
            }),
            new WebpackManifestPlugin({
                fileName: 'asset-manifest.json',
            }),
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require(path.join(distPath, 'dll-manifest.json'))
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: 'index.html',
            }),
            new HtmlWebpackPlugin({
                chunks: ['app'],
                publicPath:'/',
                scriptLoading: 'defer',
                template: './public/index.html',
                filename: 'index.html',
            }),
            new MiniCssExtractPlugin({
                filename: "css/[name].[fullhash].css",
                chunkFilename: 'css/[id].[fullhash].css',
            }),
            new HtmlWebpackTagsPlugin({ 
                append: false,
                useHash: true,
                tags: ['js/vendors.dll.js'], 
            })
        ],

    }

    return config
}
function getBabelConfig() {
    
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                    "targets": {
                        "firefox": "70",
                        "chrome": "78",
                        "safari": "12",
                    },
                    "useBuiltIns": false
                }
            ],
            '@babel/preset-react',
            '@babel/preset-typescript'
        ],
        plugins: [
            [
                require.resolve('babel-plugin-named-asset-import'),
                {
                    loaderMap: {
                        svg: {
                            ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                    },
                },
            ],
            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
            ['@babel/plugin-proposal-class-properties', {}],
            ['@babel/plugin-syntax-dynamic-import', {}]
        ]
    };
}
function getWebfontsConfig(filePathArr) {
    return {
        test: /font.js/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'webfonts-loader',
                options: {
                    files: filePathArr,
                    fontName: 'icons',
                    types: ['woff', 'woff2', 'ttf', 'svg'],
                    classPrefix: 'i-',
                    baseSelector: '.icons',
                    embed: true,
                }
            }
        ]
    };
}