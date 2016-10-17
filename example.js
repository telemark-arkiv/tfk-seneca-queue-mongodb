'use strict'

const seneca = require('seneca')()
const senecaQueue = require('./index')
const queueOptions = {
  TAG: 'seneca-queue-test',
  MONGODB_URI: 'localhost/queuetest',
  MONGODB_COLLECTION_NAME: 'senecaque'
}

seneca.add('role:info, info:queue', args => {
  console.log(args)
})

seneca.use(senecaQueue, queueOptions)

seneca.listen(8000)
