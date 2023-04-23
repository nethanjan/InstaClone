const CognitoExpress = require("cognito-express");

const cognitoExpress = new CognitoExpress({
	region: process.env.COGNITO_REGION,
	cognitoUserPoolId: process.env.COGNITO_USER_POOL,
	tokenUse: "access",
});

function auth(req, res, next) {
	let accessTokenFromClient = req.headers["authorization"];

	if (!accessTokenFromClient) return res.status(401).send("Invalid access");

	if (!accessTokenFromClient.split(" ")[0] === "Bearer")
		return res.status(401).send("Invalid access");

	const token = req.headers.authorization.split(" ")[1];
	cognitoExpress.validate(token, function (err, response) {
		if (err) return res.status(401).send(err);
		res.locals.user = response;
		next();
	});
}

module.exports = auth;
