import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Peer } from 'peerjs'

import { useUserStore } from './user'
import { useStreamStore } from './stream'

export const useCallStore = defineStore('call', () => {
  // State variable
  const userStore = useUserStore()
  const streamStore = useStreamStore()

  let peer
  let connection

  const status = ref('idle')
  const callerID = ref('')
  const foreignStream = ref()

  // Actions
  function initialize() {
    peer = new Peer(
      userStore.userData.id,
      {
        host: 'trinitygames.xyz',
        path: '/peer',
        port: 80,
        key: 't3peer',
      },
      3,
    )

    peer.on('open', (id) => {
      console.log('Connected to Peer server with id: ' + id)
    })

    peer.on('call', (call) => {
      // store the connection
      connection = call

      // log call
      console.log('Incoming call from ' + call.peer)

      // store the ID of the caller
      callerID.value = call.peer

      // set the status to calling
      status.value = 'incoming'

      // store the call
      connection = call

      // set a timeout
      setTimeout(() => {
        // if the status is still incoming
        if (status.value == 'incoming') {
          // set the status to idle
          status.value = 'idle'

          // close the connection
          call.close()
        }
      }, 15000)
    })
  }

  async function answerCall() {
    let call = connection

    // start a video stream
    await streamStore.start()

    // answer the call
    call.answer(streamStore.stream)

    // when the call is answered
    call.on('stream', (stream) => {
      // set the status to connected
      status.value = 'connected'

      // store the foreign stream
      foreignStream.value = stream
    })

    // when the call is closed
    call.on('close', () => {
      // set the status to idle
      status.value = 'idle'

      // stop the video stream
      streamStore.stop()
    })
  }

  async function call(id) {
    // set the status to calling
    status.value = 'calling'

    // store the caller id
    callerID.value = id

    // start a video stream
    await streamStore.start()

    // log call
    console.log('Calling ' + id)

    // call the peer
    const peerCall = peer.call(id, streamStore.stream)

    // when the call is answered
    peerCall.on('stream', (stream) => {
      // log the answer
      console.log('Answered by ' + id)

      // set the status to connected
      status.value = 'connected'

      // store the call
      connection = peerCall

      // store the foreign stream
      foreignStream.value = stream
    })

    // when the call is closed
    peerCall.on('close', () => {
      // set the status to idle
      status.value = 'idle'

      // stop the video stream
      streamStore.stop()
    })

    // on eror
    peerCall.on('error', (err) => {
      // log the error
      console.log('Call error: ' + err)

      // set the status to idle
      status.value = 'idle'
    })

    // set a timeout
    setTimeout(() => {
      // if the status is still calling
      if (status.value == 'calling') {
        // set the status to idle
        status.value = 'idle'

        // close the connection
        peerCall.close()
      }
    }, 15000)
  }

  function disconnect() {
    // close the connection
    if (connection) {
      connection.close()
    }

    // set the status to idle
    status.value = 'idle'

    // stop the video stream
    streamStore.stop()
  }

  // return
  return {
    status,
    callerID,
    foreignStream,
    call,
    initialize,
    disconnect,
    answerCall,
  }
})
