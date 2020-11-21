const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db");
const { hash, compare } = require("./bc");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const s3Url = "https://s3.amazonaws.com/pimento-imgboard/";

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

//////////////////////////////////////// MIDDLEWARE ////////////////////////////////////////

app.use(
    cookieSession({
        secret: "whatever I want my secret to be",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(compression());
app.use(express.json());
app.use(express.static("./public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//////////////////////////////////////// LOGGED IN ROUTES ///////////////////////////////////////
app.get("/api/user", (req, res) => {
    console.log("ACCESSED GET /api/user route ");
    let { userId } = req.session;
    if (userId) {
        db.getUserInfo(userId)
            .then(({ rows }) => {
                // console.log("rows in GET /user", rows);
                res.json({
                    success: true,
                    rows: rows[0],
                });
            })
            .catch((err) => {
                "err in GET /user with getUserInfo()", err;
                res.json({
                    success: false,
                    errorMsg: "Server error: Could not find user details",
                });
            });
    } else {
        //user is not logged in
        res.redirect("/");
    }
});

app.post(`/api/createList`, async (req, res) => {
    console.log("ACCESSED POST /api/createList route ");
    // console.log("values from req.body", req.body);
    const { userId } = req.session;
    const { title, description, file } = req.body;
    try {
        let { rows } = await db.createList(title, description, file, userId);
        console.log("rows", rows);
        // let list = rows;
        res.json({
            rows,
        });
    } catch (err) {
        console.log("err in POST / api / createList", err);
    }
});
app.get(`/api/getList`, async (req, res) => {
    console.log("ACCESSED GET /api/getList route ");
    // console.log("values from req.body", req.body);
    const { userId } = req.session;
    // const { title, description, file } = req.body;
    try {
        let { rows } = await db.getList(userId);
        console.log("rows in getList", rows);
        // let list = rows;
        res.json({
            rows,
        });
    } catch (err) {
        console.log("err in GET /api/getList", err);
    }
});

//////////////////////////////////////// LOGGED OUT ROUTES ///////////////////////////////////////
app.get("/welcome", (req, res) => {
    console.log("ACCESSED GET /welcome route ");
    console.log("req.session at /welcome", req.session);
    let { userId } = req.session;
    console.log("userId at /welcome", userId);

    if (userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log("ACCESSED  POST /register route");
    const { first, last, email, password } = req.body;
    if (first !== "" && last !== "" && email !== "" && password !== "") {
        db.getPwByEmail(email)
            .then((results) => {
                if (results.rows.length === 0) {
                    hash(password)
                        .then((hashedPw) => {
                            db.createUser(first, last, email, hashedPw)
                                .then(({ rows }) => {
                                    console.log(
                                        "results in POST /register",
                                        rows
                                    );
                                    req.session.userId = rows[0].id;
                                    res.json({ success: true });
                                })
                                .catch((err) => {
                                    console.log(
                                        "error with createUser() in POST /register",
                                        err
                                    );
                                    res.json({
                                        success: false,
                                        error: "Please fill in all fields",
                                    });
                                });
                        })
                        .catch((err) => {
                            console.log(
                                "error with hasingPw() in POST /register",
                                err
                            );
                            res.json({
                                success: false,
                                error: "Please fill in all fields",
                            });
                        });
                } else {
                    res.json({
                        success: false,
                        error: "Email already in use, try another",
                    });
                }
            })
            .catch((err) => {
                console.log("error in /register with getPwByEmail()", err);
                res.json({
                    success: false,
                    error: "Error, please try again",
                });
            });
    } else {
        console.log("all input fields must be populated");
        res.json({
            success: false,
            error: "Please fill in all fields",
        });
    }
});

app.post("/login", (req, res) => {
    console.log("ACCESSED  POST /login route");
    // console.log("req.session at POST /login", req.session);

    const { email, password } = req.body;
    console.log("req.session at POST /login", req.session);

    if (email !== "" && password !== "") {
        db.getPwByEmail(email)
            .then(({ rows }) => {
                let hashedPw = rows[0].password;
                compare(password, hashedPw)
                    .then((match) => {
                        if (match) {
                            req.session.userId = rows[0].id;
                            res.json({ success: true });
                        } else {
                            console.log("Incorrect email and/or password");
                            res.json({
                                success: false,
                                error:
                                    "Incorrect credentials, please try again",
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("err in POST /login compare", err);
                        res.json({
                            success: false,
                            error: "Incorrect credentials, please try again",
                        });
                    });
            })
            .catch((err) => {
                console.log("err in POST /login with getPwByEmail()", err);
                res.json({
                    success: false,
                    error: "Incorrect credentials, please try again",
                });
            });
    } else {
        console.log("all input fields must be populated");
        res.json({
            success: false,
            error: "Incorrect credentials, please try again",
        });
    }
});

app.post("/reset/start", (req, res) => {
    console.log("ACCESSED POST /reset/start route ");
    const { email } = req.body;

    db.getPwByEmail(email)
        .then(({ rows }) => {
            if (rows.length === 1) {
                // generate random resetCode
                const resetCode = cryptoRandomString({
                    length: 6,
                });
                // insert resetCode + email into database
                db.addResetCode(resetCode, email)
                    .then(() => {
                        // send Email to user containing the code
                        let recipient = email;
                        let message = `Please navigate back to our site and use the code ${resetCode} to reset you password`;
                        let subject = `${resetCode}: Your Password Reset Code`;
                        ses.sendEmail(recipient, message, subject)
                            .then(() => {
                                res.json({
                                    success: true,
                                });
                            })
                            .catch((err) => {
                                console.log(
                                    "error in POST /reset/start with ses.sendEmail()",
                                    err
                                );
                            });
                    })
                    .catch((err) => {
                        console.log(
                            "error in POST /reset/start with addSecretCode()",
                            err
                        );
                    });
            } else {
                console.log("Please enter a valid email");
                res.json({
                    success: false,
                    errorStart: "Please enter a valid email",
                });
            }
        })
        .catch((err) => {
            console.log("error in POST /reset/start with getPwByEmail()", err);
        });
});

app.post("/reset/verify", (req, res) => {
    console.log("ACCESSED POST /reset/verify route ");
    const { email, code, password } = req.body;

    if (code !== "" && password !== "") {
        db.getCodeByEmail(email)
            .then((response) => {
                if (response.rows[0].code == code) {
                    hash(password)
                        .then((hashedPw) => {
                            db.updatePassword(hashedPw, email)
                                .then(({ rows }) => {
                                    console.log(
                                        "rows in POST /reset/verify",
                                        rows
                                    );
                                    res.json({ success: true });
                                })
                                .catch((err) => {
                                    console.log(
                                        "error with updatePassword() in POST /reset/verify",
                                        err
                                    );
                                    res.json({
                                        success: false,
                                        errorVerify:
                                            "Unable to update password, please try again",
                                    });
                                });
                        })
                        .catch((err) => {
                            console.log(
                                "error with hashingPw() in POST /register",
                                err
                            );
                        });
                } else {
                    res.json({
                        success: false,
                        errorVerify:
                            "Unable to update password, please try again",
                    });
                }
            })
            .catch((err) => {
                console.log(
                    "error in POST /reset/verify with getCodeByEmail()/invalid code",
                    err
                );
            });
    } else {
        res.json({
            success: false,
            errorVerify: "Unable to update password, please try again",
        });
    }
});

app.get("/api/logout", (req, res) => {
    console.log("ACCESSED GET /api/logout route ");

    req.session = null;
    res.redirect("*");
});

//it is important that the * route is the LAST GET route
app.get("*", function (req, res) {
    console.log("ACCESSED catch-all * route ");
    console.log("req.session at *", req.session);
    let { userId } = req.session;
    if (!userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log(
        "<><><><><><><><><><><><><><><>| TOP 9 RUNNING |<><><><><><><><><><><><><><><>"
    );
});
