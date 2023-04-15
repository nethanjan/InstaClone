require("dotenv").config();
const PORT = process.env.NODE_DOCKER_PORT || 5000;
const app = require("./server.js");

app.listen(PORT, () => {
	console.log(`Server is listening at port: ${PORT}`);
});
