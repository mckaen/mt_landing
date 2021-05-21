const develop = process.argv.indexOf( 'production' ) == -1,
    { join } = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin')

console.log( 'DEVELOP: ', develop)

module.exports = env => {
	const buildConfig = {
		entry: [ './src/index.js' ],
		output: {
			path: join( __dirname, 'dist' ),
			filename: develop ? '[name].js' : '[name].[fullhash].js'
		},
		module: { rules: [] },
		optimization: {},
		plugins: [],
		performance: { hints: false },
		mode: develop ? 'development' : 'production',
		devtool: develop ? 'source-map' : false,
		resolve: {
			modules: [ 'node_modules' ],
			extensions: [ '.js', '.scss' ]
		},
		target: 'web',
		externals: [],
        devServer: {
            compress: false,
            port: 9000,
            hot: true,
            index: join( __dirname, 'dist', 'index.html' ),
            stats: 'errors-only',
            writeToDisk: true,
            historyApiFallback: true
        }
	}

    buildConfig.module.rules.push({
		test: /\.(png|jpe?g|gif|woff2|eot|woff)$/i,
		use: {
			loader: 'file-loader'
		}
	})
    buildConfig.module.rules.push({
		test: /\.(js)$/i,
		use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    [ '@babel/preset-env', { targets: "defaults" }]
                ]
            }
		}
	})

    if ( !develop ) {
        buildConfig.plugins.push( new MiniCssExtractPlugin({
			filename: '[name].[fullhash].css'
		}) )
    }

    buildConfig.module.rules.push({
		test: /\.(c|sa|sc)ss$/i,
		use: [
            develop ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					sourceMap: develop
				}
			},
			'postcss-loader',
			{
				loader: 'sass-loader',
				options: {
					sourceMap: develop
				}
			}
		]
	})

	buildConfig.plugins.push( new HtmlWebpackPlugin({
		filename: 'index.html',
		template: './src/index.html',
		minify: {
            collapseWhitespace: !develop 
        },
        inject: 'body'
	}) )

    buildConfig.plugins.push( new CleanWebpackPlugin() )
    return buildConfig
}