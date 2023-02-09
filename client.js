const {CLIENT} = require("./custom-client");

// Define the request data
const request = {
  type: "getData",
  payload: {
    id: 12345,
  },
};

// Send the request to the server using the custom protocol
CLIENT.sendRequest(request, 12345, "localhost")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
