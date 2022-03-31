const FileManegerPlugin = require("filemanager-webpack-plugin-fixed");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  outputDir: "dist",
  publicPath: "/",
  assetsDir: "static",
  pages: {
    home: {
      template: "public/index.html",
      entry: "src/pages/main_home.js",
      filename: "home.html",
      minify: false,
    },
    content_list: {
      template: "public/index.html",
      entry: "src/pages/content_list.js",
      filename: "content_list.html",
      minify: false,
    },
    post_detail: {
      template: "public/index.html",
      entry: "src/pages/post_detail.js",
      filename: "post_detail.html",
      minify: false,
    },
    post_form: {
      template: "public/index.html",
      entry: "src/pages/post_form.js",
      filename: "post_form.html",
      minify: false,
    },
    post_list: {
      template: "public/index.html",
      entry: "src/pages/post_list.js",
      filename: "post_list.html",
      minify: false,
    },
  },

  configureWebpack: {
    plugins: [
      new FileManegerPlugin({
        onstart: {
          delete: ["../data-room/static/**/", "../data-room/templates/**/"],
        },
        onEnd: {
          copy: [
            { source: "dist/static", destination: "../data-room/static/" },
            {
              source: "dist/favicon.ico",
              destination: "../data-room/static/img/",
            },
            {
              source: "dist/home.html",
              destination: "../data-room/templates/",
            },
            {
              source: "dist/content*.html",
              destination: "../data-room/templates/contents/",
            },
            {
              source: "dist/post*.html",
              destination: "../data-room/templates/posts/",
            },
          ],
        },
      }),
    ],
  },
});
