// PORT is replaced by `jest-dom` server
const port = '$PORT';

const socket = new WebSocket(`ws://localhost:${port}`);

socket.addEventListener('message', async ({ data }) => {
  // handleMessage(JSON.parse(data))
  const message = JSON.parse(data);
  switch (message.type) {
    case 'reload':
      location.reload();
      break;

    default:
      throw new Error(`Unknown message: ${message}`);
  }
  console.log('received: ', data);
});
