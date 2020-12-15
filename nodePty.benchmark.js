const { spawn } = require('node-pty')
const { performance } = require('perf_hooks')

for (let i = 0; i < 5; i++) {
  const s = performance.now()
  const term = spawn('/bin/bash', ['-i'])
  const e = performance.now()
  console.log({ spawn: e - s })

  let i = 0
  term.onData((data) => {
    if (++i == 1) {
      const e2 = performance.now()
      console.log({ data: e2 - s })
    }
    console.log({ data: data.toString() })
  })
}

setTimeout(() => {
  process.exit(0)
}, 15000)