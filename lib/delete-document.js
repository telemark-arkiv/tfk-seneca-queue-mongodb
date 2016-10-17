'use strict'

const mongojs = require('mongojs')
const envs = process.env
const dbQueue = mongojs(envs.TFK_SENECA_QUEUE_MONGODB_URI || 'localhost/queue')
const queue = dbQueue.collection('queue')

module.exports = function deleteDocument (args, callback) {
  const seneca = this
  const queueId = mongojs.ObjectId(args.queueId)

  queue.remove({'_id': queueId}, function (error, document) {
    if (error) {
      callback(error, null)
    } else {
      seneca.act({role: 'info', info: 'queue', msg: 'delete', data: document})
      callback(null, document)
    }
  })
}
