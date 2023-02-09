const net = require("net");

// Import the encryption and decryption functions
// import { encrypt, decrypt } from "./encryption";

// Define the delimiter for separating messages in the protocol
const delimiter = "\n";

// Define the encoding for the messages in the protocol
const encoding = "utf8";

class Server {
  static startServer(port) {
    // Create a socket server
    const server = net.createServer((socket) => {
      // Handle incoming data from the client
      let incomingData = "";
      socket.on("data", (data) => {
        incomingData += data.toString();
        const messages = incomingData.split(delimiter);
        console.log('====================================');
        console.log(messages);
        console.log('====================================');

        // Process all complete messages
        for (const message of messages.slice(0, -1)) {
          // Decrypt the request data
          // const decryptedRequest = JSON.parse(decrypt(message));
          const decryptedRequest = JSON.parse(message);

          // Process the request
          const response = decryptedRequest;

          // Encrypt the response data
          // const encryptedResponse = encrypt(JSON.stringify(response));
          const encryptedResponse = JSON.stringify(response);

          // Send the encrypted response to the client
          socket.write(encryptedResponse + delimiter, encoding);
        }

        // Save any incomplete message for the next chunk of data
        incomingData = messages[messages.length - 1];
      });
    });

    // Listen on the specified port
    server.listen(port, () => {
      console.log(`Custom protocol server listening on port ${port}`);
    });
  }

  // ... processRequest method remains the same
}

exports.SERVER = Server;
