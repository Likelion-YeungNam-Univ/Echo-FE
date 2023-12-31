const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

// 환경변수 가져오기
const env = JSON.stringify(
  dotenv.config({ path: path.resolve(__dirname, '.env') }).parsed,
);

// 번들링 모드 설정
const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

// 설정
const config = {
  // 엔트리 파일 설정
  entry: './src/index.js',
  // 아웃풋 파일 출력 설정
  output: {
    // 경로
    path: path.resolve(__dirname, 'build'),
    // 빌드(컴파일, 번들링 등) 결과 파일 브라우저 캐싱(Cachinig)
    filename: '[name].[contenthash].js',
    // 모든 요청에 대해서 루트 경로(/)를 기준으로 파일을 찾도록 수정
    publicPath: '/',
    // 이전 빌드 결과물 삭제
    clean: true,
  },
  devServer: {
    // dev server 구동 시 자동으로 chrome browser 오픈
    open: true,
    // 외부 IP 접속 허용
    allowedHosts: 'all',
    // 브라우저에서 요청한 URL에 대해 해당 URL 경로에 대한 파일이 없을 경우, 설정한 fallback 경로에 있는 파일을 제공하는 옵션
    historyApiFallback: true,
    // gzip 압축 활성화
    compress: true,
    host: '0.0.0.0',
    port: 3000,
  },
  module: {
    rules: [
      {
        // Babel 파일 로더 설정
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // CSS, SCSS 파일 로더 설정
        test: /\.(css)$/,
        use: [stylesHandler, 'css-loader'],
      },
      {
        // 이미지 포멧: PNG, JP(E)G, GIF, SVG
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // 절대 경로 별칭 등록
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@jsons': path.resolve(__dirname, 'src/jsons'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },

    // 생략 가능한 확장자
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // index.html 설정
    new HtmlWebpackPlugin({
      // 템플릿 설정
      template: './public/index.html',
      // 압축 설정
      minify: true,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    // 최소 번들 크기 설정
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 20000,
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    // 압축
    minimize: isProduction,
    // 모듈 ID 생성 방식
    moduleIds: 'deterministic',
    // 런타임 코드를 하나의 파일로 생성
    runtimeChunk: 'single',
    // 코드 분할을 설정하는 옵션
    splitChunks: {
      // 어떻게 분할할지에 대한 설정
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    // 미니마이저
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // 무손실 최적화 옵션
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: 'http://www.w3.org/2000/svg' },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  devtool: isProduction ? false : 'eval-source-map',
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';

    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
    config.plugins.push(new ESLintPlugin());
  }

  return config;
};
