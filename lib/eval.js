const { VM } = require('vm2')

module.exports = (str, timeout = 1000) => {
  const sandboxedEnvironment = new VM({
    sandbox: {},
    timeout
  })
  return sandboxedEnvironment.run(str)
}