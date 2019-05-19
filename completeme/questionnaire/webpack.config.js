const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const CleanPlugin = require("clean-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const path = require("path")

module.exports = (env, argv) => {
    const mode = argv.mode || "development"
    const production = argv.mode === "production"

    var config = {
        context: __dirname,
        devtool: "inline source-map",
        entry: "./index.jsx",
        output: {
            filename: "bundle.[hash:8].js",
            path: path.resolve(__dirname, "dist", mode),
            publicPath: "/",
            hotUpdateMainFilename: ".hot/[hash].json"
        },
        resolve: {
            alias: {
                Assets: path.resolve(__dirname, "assets"), 
                Components: path.resolve(__dirname, "components"), 
                Containers: path.resolve(__dirname, "containers"), 
                Styles: path.resolve(__dirname, "styles"), 
                Util: path.resolve(__dirname, "util")
            },
            extensions: [".jsx", ".js", ".json", "scss", "css", "*"]
        },
        target: "web",
        devServer: {
            compress: true,
            contentBase: "./dist",
            inline: true,
            historyApiFallback: true,
            hot: true,
            publicPath: "/",
            overlay: {
                errors: true,
                warnings: true
            },
            port: 9200,
            proxy: {},
            writeToDisk: true
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: "babel-loader",
                    options: {presets: ["@babel/react"], babelrc: false, cacheDirectory: true}
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        production ? MiniCssExtractPlugin.loader : "style-loader", 
                        {
                            loader: "css-loader", 
                            options: {camelCase: true, importLoaders: 1, modules: true}
                        }, 
                        {
                            loader: "sass-loader", 
                            options: {sourceMap: false}
                        }
                    ]
                }, 
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {loader: "url-loader", options: {limit: 8192}},
                        {loader: "file-loader", options: {limit: 8192, name: "[name].[ext]", outputPath: "assets"}}
                    ]
                }
            ]
        },
        plugins: [
            new CleanPlugin([path.resolve(__dirname, "dist", mode)]),
            new MiniCssExtractPlugin({filename: production ? "bundle.[hash:8].css" : "bundle.css"}),
            new HtmlPlugin({
                filename: "./index.html", 
                favicon: path.resolve(__dirname, "assets/favicon.ico"), 
                template: path.resolve(__dirname, "templates/index.html")
            }),
            new CopyWebpackPlugin([
                {from: "assets", to: "assets", test: /\.png$/,}
            ])
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({ cache: true, parallel: true, terserOptions: {extractComments: "all", compress: {drop_console: true}}}),
                new OptimizeCSSAssetsPlugin({})
            ]
        }        
    }

    return config
}
