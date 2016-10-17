'use strict'

const addDocument = require('./lib/add-document')
const getNextDocument = require('./get-next-document')
const deleteDocument = require('./lib/delete-document')

module.exports = function (options) {
  const seneca = this

  seneca.add('role:queue, cmd:add', addDocument)
  seneca.add('role:queue, cmd:next', getNextDocument)
  seneca.add('role:queue, cmd:delete', deleteDocument)

  return {
    name: options.TAG || 'tfk-seneca-queue-mongodb'
  }
}
