const net = require("net");

// Import the encryption and decryption functions
// import { encrypt, decrypt } from "./encryption";

// Define the delimiter for separating messages in the protocol
const delimiter = "\n";

// Define the encoding for the messages in the protocol
const encoding = "utf8";

class Client {
  static sendRequest(request, port, host) {
    return new Promise((resolve, reject) => {
      // Encrypt the request data
      // const encryptedRequest = encrypt(JSON.stringify(request));
      const encryptedRequest = JSON.stringify(request);

      // Create a socket client
      const client = net.createConnection({ port, host }, () => {
        // Send the encrypted request to the server through the socket
        client.write(encryptedRequest + delimiter, encoding);
      });

      // Handle incoming data from the server
      let incomingData = "";
      client.on("data", (data) => {
        incomingData += data.toString();
        const messages = incomingData.split(delimiter);

        // Process all complete messages
        for (const message of messages.slice(0, -1)) {
          // Decrypt the response data
          // const decryptedResponse = JSON.parse(decrypt(message));
          const decryptedResponse = JSON.parse(message);

          // Resolve the Promise with the decrypted response
          resolve(decryptedResponse);

          // End the connection
          client.end();
        }

        // Save any incomplete message for the next chunk of data
        incomingData = messages[messages.length - 1];
      });

      // Handle errors
      client.on("error", (error) => {
        reject(error);
      });
    });
  }
}

exports.CLIENT = Client;
