'use strict'

const mongojs = require('mongojs')

module.exports = function (options) {
  const seneca = this
  const dbQueue = mongojs(options.MONGODB_URI || 'localhost/queue')
  const queue = dbQueue.collection(options.MONGODB_COLLECTION_NAME || 'queue')

  const addDocument = function (args, callback) {
    const payload = args.data

    payload.timeStamp = new Date().getTime()

    queue.save(payload, (error, document) => {
      if (error) {
        callback(error, null)
      } else {
        seneca.act({role: 'info', info: 'queue', msg: 'add', data: document})
        callback(null, document)
      }
    })
  }

  const deleteDocument = function (args, callback) {
    const queueId = mongojs.ObjectId(args.queueId)

    queue.remove({'_id': queueId}, (error, document) => {
      if (error) {
        callback(error, null)
      } else {
        seneca.act({role: 'info', info: 'queue', msg: 'delete', data: document})
        callback(null, document)
      }
    })
  }

  const getNextDocument = function (args, callback) {
    queue.find({}).sort({timeStamp: 1}).limit(1, (error, document) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, document)
      }
    })
  }

  seneca.add('role:queue, cmd:add', addDocument)
  seneca.add('role:queue, cmd:next', getNextDocument)
  seneca.add('role:queue, cmd:delete', deleteDocument)

  return {
    name: options.TAG || 'tfk-seneca-queue-mongodb'
  }
}
