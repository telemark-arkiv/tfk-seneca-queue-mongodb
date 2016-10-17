'use strict'

const mongojs = require('mongojs')
const envs = process.env
const dbQueue = mongojs(envs.TFK_SENECA_QUEUE_MONGODB_URI || 'localhost/queue')
const queue = dbQueue.collection('queue')

module.exports = function addDocument (args, callback) {
  const seneca = this
  const payload = args.data

  payload.timeStamp = new Date().getTime()

  queue.save(payload, function (error, document) {
    if (error) {
      callback(error, null)
    } else {
      seneca.act({role: 'info', info: 'queue', msg: 'add', data: document})
      callback(null, document)
    }
  })
}
