import chalk from 'chalk'

import statsConfig from './constants/stats_config'

export default function showBuildInfo(buildName, err, stats) {
  // eslint-disable-next-line
  console.log('[', chalk.green(buildName), ']', stats.toString(statsConfig))
  if (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}
