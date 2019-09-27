module.exports = {
  outputDir: '../laravel6/public',

  pages: {
    app: {
      entry: 'src/main.js',

      template: 'templates/index.html',

      // relative to outputDir
      filename: '../resources/views/app.blade.php',
    },
  },

  publicPath: '/',
};
