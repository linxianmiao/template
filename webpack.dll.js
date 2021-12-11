const path = require('path');
const webpack = require('webpack');


const vendors = [
    "mobx",
    "react",
    "react-dom",
    "react-jss",
    "react-router",
    "react-router-dom",
    "prop-types",
    "mobx-react-lite",
    "mobx-react-router",
];


module.exports = () => {
    return {
        mode: process.env.NODE_ENV,
        
        entry: {
            vendors
        },

        output: {
            path: path.join(process.cwd(), 'dist/js'),
            filename: '[name].dll.js',
            library: '[name]_lib',
        },

        plugins: [
            new webpack.DllPlugin({
                path: path.join(process.cwd(), 'dist', 'dll-manifest.json'),
                name: '[name]_lib'
            })
        ]
    };
};