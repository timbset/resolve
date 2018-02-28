import statsConfig from './stats_config'

export default (buildName, err, stats) => {
  const time = '(' + new Date().toTimeString().split(' ')[0] + ')'
  // eslint-disable-next-line
  console.log(buildName, time, stats.toString(statsConfig))
  if (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}
