process.env.NODE_ENV = ''

const webpack = require('webpack')
const webpackConf = require('./webpack.lib.conf')
const ora = require('ora')
const chalk = require('chalk')

const spinner = ora('building start').start()

webpack(webpackConf, function (error, stats) {
  spinner.stop()
  if (error) throw error
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
})
