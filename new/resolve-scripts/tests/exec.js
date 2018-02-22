import { exec as nativeExec } from 'child_process'

export default function exec(cmd, env) {
  return new Promise((resolve, reject) => {
    nativeExec(
      cmd.replace('resolve-scripts', 'node bin/resolve-scripts.js') +
        ' --print-config',
      { env },
      (err, stdout) => (!err ? resolve(JSON.parse(stdout)) : reject(err))
    )
  })
}
