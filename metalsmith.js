var Metalsmith = require('metalsmith')

var app = Metalsmith(__dirname)
  .source('./_src')
  .destination('./public')
  .use(require('metalsmith-sense-sass')())
  .use(require('metalsmith-jstransformer')())
  .use(require('metalsmith-paths')())

if (module.parent) {
  module.exports = app
} else {
  app.build(function (err) {
    if (err) throw err
  })
}
