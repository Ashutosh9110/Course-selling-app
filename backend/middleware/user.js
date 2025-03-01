const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require("../config")


function userMiddleware (req, res, next) {

    const token = req.headers.token
    const decoded = jwt.verify(token, JWT_USER_PASSWORD)

    if(decoded) {
        req.userId = decoded.id
        next()
    } else {
        res.status(403).json({
            message: "Wrong credentials"
        })
    }
}

module.exports = {
    userMiddleware
}




// can you explain these two lines?

//         req.userId = decoded.id; //
//         next();

// req.userId = decoded.id;
// The jwt.verify(token, JWT_USER_PASSWORD) function decodes the JWT (JSON Web Token) and returns the payload, which usually contains user-related data.
// decoded.id is assumed to be the id of the user that was stored in the token when it was created.
// By assigning decoded.id to req.userId, the middleware makes the user’s ID accessible in subsequent request handlers (i.e., any route handlers or middlewares that run after this one).
// 2. next();
// The next() function is used in Express middleware to pass control to the next middleware function in the request-response cycle.
// If the token is valid and the user is authenticated, next() ensures that the request continues to the intended route or another middleware.
// What This Means in Practice
// After this middleware runs, any route that executes afterward can access req.userId to identify the authenticated user.

// For example, if you have an Express route like this:


// app.get("/profile", userMiddleware, (req, res) => {
//     res.json({ message: "Welcome!", userId: req.userId });
// });


// When a request comes in, userMiddleware will verify the token.
// If successful, req.userId will contain the user's ID.
// The "/profile" route handler can then use req.userId to fetch user-specific data.