/*
 * @Author: liutong
 * @Date: 2023-01-04 13:36:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 15:42:05
 * @Descripttion:
 * @FilePath: \ic_web\vue.config.js
 */
const baseUrl = "http://8.142.169.72:9018";
const path = require("path");

const sourceMap = process.env.NODE_ENV === "development";
module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // chainWebpack: () => {},
  configureWebpack: config => {
    console.log(`===process.env.NODE_ENV===`, process.env.NODE_ENV);
    // 避免js缓存
    config.output.chunkFilename = 'js/[chunkhash:8].js';
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置.
      config.mode = "production";
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
        alias: {
          vue$: "vue/dist/vue.js",
          "@": path.resolve(__dirname, "./src")
        }
      }
    });
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: sourceMap,

  pages: {
    index: {
      // 页面入口
      entry: "src/main.js",
      // 模板来源
      template: "./public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "IC卡售水管理系统",
      // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk
      chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`
    // 输出文件名会被推导为 `subpage.html`
    subpage: "src/main.js"
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {
  //   iconPaths: {
  //     // favicon32: "./src/assets/favicon.ico",
  //     // favicon16: "./src/assets/favicon.ico",
  //     // appleTouchIcon: "./src/assets/favicon.ico",
  //     // maskIcon: "./src/assets/favicon.ico",
  //     // msTileImage: "./src/assets/favicon.ico"
  //   }
  // },
  // webpack-dev-server 相关配置
   devServer: {
    open:false,
    host: "localhost",
    port: 5006,
    https: false,
    hotOnly: false,
    proxy: {
      // 设置代理
      // proxy all requests starting with /api to jsonplaceholder
      "/": {
        target: baseUrl,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "": ""
        }
      },
    }
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
