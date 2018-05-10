const PluginError = require('plugin-error')
const through = require('through2')
const po2json = require('po2json')
const Vinyl = require('vinyl')

const pluginName = 'gulp-po2json'

module.exports = (config) => {
  config = Object.assign({
    stringify: true,
    format: 'jed1.x'
  }, config)

  return through.obj(function (file, enc, cb) {
    const { contents } = file

    if (file.isNull()) {
      this.push(file)
      return cb()
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(pluginName, 'Streaming not supported'))
      return cb()
    }

    // Update to last vinyl version
    file = new Vinyl({
      cwd: file.cwd,
      base: file.base,
      path: file.path
    })
    file.extname = '.json'

    const domain = file.stem
    try {
      const outputContents = po2json.parse(contents, Object.assign({}, config, {domain}), 'utf8')
      file.contents = Buffer.from(outputContents)
    } catch (err) {
      this.emit('error', new PluginError(pluginName, err))
      return cb()
    }

    this.push(file)
    cb()
  })
}
