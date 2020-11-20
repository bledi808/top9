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
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

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

//session cookie used to see the cookie om the site
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("ACCESSED POST /upload route ");

    const { userId } = req.session;
    const { filename } = req.file;
    const url = s3Url + filename;
    if (req.file) {
        db.uploadProfilePic(url, userId)
            .then(({ rows }) => {
                console.log("POST /upload response", rows[0].url);
                res.json(rows[0].url);
            })
            .catch((err) => {
                console.log(
                    "error in POST /upload with uploadProfilePic()",
                    err
                );
                res.json({
                    success: false,
                    errorMsg: "Server error: Could not upload profile picture",
                });
            });
    } else {
        res.json({
            success: false,
            errorMsg: "Please select a file",
        });
    }
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("ACCESSED POST /upload route ");
    const { userId } = req.session;
    const { filename } = req.file;
    const url = s3Url + filename;
    if (req.file) {
        db.uploadProfilePic(url, userId)
            .then(({ rows }) => {
                console.log("POST /upload response", rows[0].url);
                res.json(rows[0].url);
            })
            .catch((err) => {
                console.log(
                    "error in POST /upload with uploadProfilePic()",
                    err
                );
                res.json({
                    success: false,
                    errorMsg: "Server error: Could not upload profile picture",
                });
            });
    } else {
        res.json({
            success: false,
            errorMsg: "Please select a file",
        });
    }
});

// INCOMPLETE - DELETE images from S3 for userId - s3, db all done...this is last bit required
// app.post("/delete/image", s3.delete, (req, res) => {
//     const { userId } = req.session;
//     const { key } = req.file;
//     // get all urls for UserId from images db
//     // then run the following command to get the key from teh URLs - const key = rows.link.split("/")[4];
//     // then work out how instruct S3 to delete the list of keys for the UserID ???? MISSING LINK
// })

app.get("/delete/image", (req, res) => {
    console.log("ACCESSED POST /delete/image route");
    const { userId } = req.session;
    db.deleteImage(userId)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in /delete/image with deleteImage()", err);
            res.json({ success: false, error: "Image could not be removed" });
        });
});

app.post("/bio", (req, res) => {
    console.log("ACCESSED POST /bio route ");
    const { userId } = req.session;
    const { draftBio } = req.body;

    db.updateBio(draftBio, userId)
        .then(({ rows }) => {
            console.log("POST /bio response", rows[0].bio);
            res.json(rows[0].bio);
        })
        .catch((err) => {
            console.log("error in POST /bio with uploadProfilePic()", err);
            res.json({
                success: false,
                errorMsg: "Sever error: Unable to update bio succesfully",
            });
        });
});

app.get("/api/user/:id", (req, res) => {
    console.log("ACCESSED GET /user/:id route ");
    const { id } = req.params;
    const { userId } = req.session;
    console.log("{id} in user/:id:", id);

    // if(user id exists in database) //add condition for non-existing users
    db.getUserInfo(id)
        .then(({ rows }) => {
            if (rows[0]) {
                console.log("rows[0] in GET /user/:id:", rows[0]);
                res.json({
                    userId: userId,
                    rows: rows[0],
                    success: true,
                });
            } else {
                console.log("user does not exist");
                res.json({
                    errorMsg: "User does not exist",
                    success: false,
                });
            }
        })
        .catch((err) => {
            "err in GET /user with getPwByEmail()", err;
            res.json({
                success: false,
                errorMsg: "Server error: Could not find user details",
            });
        });
});

app.get("/api/users", (req, res) => {
    console.log("ACCESSED GET /api/users route");

    db.findPeople()
        .then(({ rows }) => {
            console.log("res from findPeople()", rows);
            res.json({
                success: true,
                rows,
            });
        })
        .catch((err) => {
            console.log("err in /api/:users with findPeople()", err);
        });
});

app.get(`/api/users/:search`, (req, res) => {
    console.log("ACCESSED GET /api/:search route");
    console.log("req.params in api/search", req.params);
    const { search } = req.params;

    db.findMatchingPeople(search)
        .then(({ rows }) => {
            if (rows.length != 0) {
                console.log("res from findMatchingPeople()", rows);
                res.json({
                    success: true,
                    rows,
                });
            } else {
                res.json({
                    success: false,
                    error: "No users found",
                });
            }
        })
        .catch((err) => {
            console.log("err in /api/:users with findMatchingPeople()", err);
        });
});

app.get(`/api/friendStatus/:otherId`, async (req, res) => {
    console.log("ACCESSED GET /api/friendStatus/:otherId route");
    const { otherId } = req.params;
    const { userId } = req.session;

    try {
        let { rows } = await db.checkFriendStatus(userId, otherId);
        if (rows.length == 0) {
            res.json({
                status: "Send Friend Request",
            });
        } else if (!rows[0].accepted && rows[0].sender_id == userId) {
            res.json({
                status: "Cancel Friend Request",
            });
        } else if (!rows[0].accepted && rows[0].sender_id == otherId) {
            res.json({
                status: "Accept Friend Request",
            });
        } else if (rows[0].accepted) {
            res.json({
                status: "Remove Friend",
            });
        }
    } catch (err) {
        console.log(
            "err in /api/friendStatus/:otherId with checkFriendStatus",
            err
        );
    }
});

app.post(`/api/friendStatus/button`, async (req, res) => {
    console.log("ACCESSED POST /api/friendStatus/button route");
    let { buttonText, otherId } = req.body;
    let { userId } = req.session;

    if (buttonText == "Send Friend Request") {
        try {
            await db.sendFriendRequest(userId, otherId);
            res.json({ status: "Cancel Friend Request" });
        } catch (err) {
            console.log("err in POST .../button with sendFriendRequest", err);
        }
    } else if (buttonText == "Cancel Friend Request") {
        try {
            await db.cancelFriendRequest(userId, otherId);
            res.json({ status: "Send Friend Request" });
        } catch (err) {
            console.log("err in POST .../button with cancelFriendRequest", err);
        }
    } else if (buttonText == "Accept Friend Request") {
        try {
            await db.acceptFriendRequest(userId, otherId);
            res.json({ status: "Remove Friend", id: otherId });
        } catch (err) {
            console.log("err in POST .../button with acceptFriendRequest", err);
        }
    } else if (buttonText == "Remove Friend") {
        try {
            await db.removeFriend(userId, otherId);
            res.json({ status: "Send Friend Request", id: otherId });
        } catch (err) {
            console.log("err in POST .../button with removeFriend", err);
        }
    }
});

app.get(`/api/getFriends`, async (req, res) => {
    console.log("ACCESSED GET /api/getFriends route");
    const { userId } = req.session;

    try {
        let { rows } = await db.getFriends(userId);
        let receivedRequests = rows.filter(function (user) {
            return !user.accepted && user.sender_id != userId;
        });
        let sentRequests = rows.filter(function (user) {
            return !user.accepted && user.sender_id == userId;
        });

        // console.log("sentRequests in GET /api/getFriends route", sentRequests);
        // console.log(
        //     "receivedRequests in GET /api/getFriends route",
        //     receivedRequests
        // );
        res.json({
            rows,
            sentRequests,
            receivedRequests,
        });
    } catch (err) {
        console.log("err in /api/getFriends with getFriends", err);
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

// app.post("/reset/start", (req, res) => {
//     console.log("ACCESSED POST /reset/start route ");
//     const { email } = req.body;

//     db.getPwByEmail(email)
//         .then(({ rows }) => {
//             if (rows.length === 1) {
//                 // generate random resetCode
//                 const resetCode = cryptoRandomString({
//                     length: 6,
//                 });
//                 // insert resetCode + email into database
//                 db.addResetCode(resetCode, email)
//                     .then(() => {
//                         // send Email to user containing the code
//                         let recipient = email;
//                         let message = `Please navigate back to our site and use the code ${resetCode} to reset you password`;
//                         let subject = `${resetCode}: Your Password Reset Code`;
//                         ses.sendEmail(recipient, message, subject)
//                             .then(() => {
//                                 res.json({
//                                     success: true,
//                                 });
//                             })
//                             .catch((err) => {
//                                 console.log(
//                                     "error in POST /reset/start with ses.sendEmail()",
//                                     err
//                                 );
//                             });
//                     })
//                     .catch((err) => {
//                         console.log(
//                             "error in POST /reset/start with addSecretCode()",
//                             err
//                         );
//                     });
//             } else {
//                 console.log("Please enter a valid email");
//                 res.json({
//                     success: false,
//                     errorStart: "Please enter a valid email",
//                 });
//             }
//         })
//         .catch((err) => {
//             console.log("error in POST /reset/start with getPwByEmail()", err);
//         });
// });

// app.post("/reset/verify", (req, res) => {
//     console.log("ACCESSED POST /reset/verify route ");
//     const { email, code, password } = req.body;

//     if (code !== "" && password !== "") {
//         db.getCodeByEmail(email)
//             .then((response) => {
//                 if (response.rows[0].code == code) {
//                     hash(password)
//                         .then((hashedPw) => {
//                             db.updatePassword(hashedPw, email)
//                                 .then(({ rows }) => {
//                                     console.log(
//                                         "rows in POST /reset/verify",
//                                         rows
//                                     );
//                                     res.json({ success: true });
//                                 })
//                                 .catch((err) => {
//                                     console.log(
//                                         "error with updatePassword() in POST /reset/verify",
//                                         err
//                                     );
//                                     res.json({
//                                         success: false,
//                                         errorVerify:
//                                             "Unable to update password, please try again",
//                                     });
//                                 });
//                         })
//                         .catch((err) => {
//                             console.log(
//                                 "error with hashingPw() in POST /register",
//                                 err
//                             );
//                         });
//                 } else {
//                     res.json({
//                         success: false,
//                         errorVerify:
//                             "Unable to update password, please try again",
//                     });
//                 }
//             })
//             .catch((err) => {
//                 console.log(
//                     "error in POST /reset/verify with getCodeByEmail()/invalid code",
//                     err
//                 );
//             });
//     } else {
//         res.json({
//             success: false,
//             errorVerify: "Unable to update password, please try again",
//         });
//     }
// });

// app.get("/api/delete/account", (req, res) => {
//     console.log("ACCESSED POST /delete/account route");
//     const { userId } = req.session;
//     db.deleteAccount(userId)
//         .then(() => {
//             // res.json({ success: true });
//             req.session = null;
//             res.redirect("*");
//         })
//         .catch((err) => {
//             console.log("error in /delete/image with deleteAccount()", err);
//             res.json({
//                 success: false,
//                 error: "Account could not be , try again",
//             });
//         });
// });

// app.get("/api/logout", (req, res) => {
//     req.session = null;
//     res.redirect("*");
// });

//it is important that the * route is the LAST GET route
app.get("*", function (req, res) {
    console.log("ACCESSED catch-all * route ");
    // console.log("req.session at *", req.session);
    let { userId } = req.session;
    if (!userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log(
        "<><><><><><><><><><><><><><><>| TOP 9 RUNNING |<><><><><><><><><><><><><><><>"
    );
});
