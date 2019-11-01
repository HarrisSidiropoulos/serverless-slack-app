const { text } = require('micro')
const { parse } = require('querystring')
const evaluateIncomingJS = require('../lib/eval')

module.exports = async (req, res) => {
  // Parse code received through req
  const body = parse(await text(req))
  let result, attachments

  try {
    // Pass code to function imported through eval
    result = evaluateIncomingJS(body.text, 2500)
  } catch (error) {
    // Capture any errors
    result = error.message
    attachments = [{ text: error.stack }]
  }

  const message = '\`' + body.text + '\`: ' + result
  const response_type = 'in_channel'

  res.writeHead(200, { 'Content-Type': 'application/json' })
  // Create response object and send result back to Slack
  res.end(JSON.stringify({ response_type, text: message, attachments }))
}