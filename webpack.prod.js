const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {

    mode: 'production',
    output: { // El output le dice a web pack que elimine los archivos que habían en dist
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {
        // Las reglas se aplican en orden
        rules: [
            //Sirven para decirle que hacer con los distintos tipos de archivo
            {
                //Es la condición que debe cumplir, se usan expresiones regulares
                test: /\.html$/i, // Le dice a webpack que aplique esta regla si es un archivo .html
                loader: 'html-loader',
                options: {
                    // Disables attributes processing
                    sources: false,
                    minimize: false,
                },
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },
    //Aquí se ejecuta la instancia que hemos creado antes para que copie el index html de la carpeta src a dist para cuando se suba a producción
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css', // El hash ayuda a que los clientes no mantengan el archivo en caché
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets/", to: "assets/" }
            ],
        }),
    ]
}