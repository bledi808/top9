// where our db queries live
var spicedPg = require("spiced-pg"); // middleman or client
var db = spicedPg(
    process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/top9"
); // port 5432 is the standard db port

//insert registration details into users table
module.exports.createUser = (first, last, email, password) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `,
        [first, last, email, password]
    );
};

// SELECT to get user info by email address (in post /login)
module.exports.getPwByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

//Get user info from users table
module.exports.getUserInfo = (userId) => {
    return db.query(`SELECT * FROM users WHERE id=$1`, [userId]);
};

// INSERT into new table (reset_codes) the secret code you generated with the help of cryptoRandomString
module.exports.addResetCode = (code, email) => {
    return db.query(
        `
        INSERT INTO reset_codes (code, email)
        VALUES($1,$2)
    `,
        [code, email]
    );
};

// SELECT that finds code in the new table that matches the email address and is less than 10 minutes old
module.exports.getCodeByEmail = (email) => {
    return db.query(
        `
        SELECT code
        FROM reset_codes
        WHERE email=$1
        AND CURRENT_TIMESTAMP - timestamp <= '10 minutes'
        ORDER BY id DESC
        LIMIT 1;
        `,
        [email]
    );
};

// UPDATE password of user's table by email address
module.exports.updatePassword = (password, email) => {
    return db.query(
        `
        UPDATE users
        SET password=$1
        WHERE email = $2
    `,
        [password, email]
    );
};

// Update Profile pic
module.exports.uploadProfilePic = (profile_img, userId) => {
    return db.query(
        `
        UPDATE users
        SET profile_img=$1
        WHERE id=$2
        RETURNING *
        `,
        [profile_img, userId]
    );
};

//insert registration details into users table
module.exports.createList = (list_name, description, cover, userId) => {
    return db.query(
        `
        INSERT INTO lists (list_name, description, cover, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `,
        [list_name, description, cover, userId]
    );
};

module.exports.completeList = (listId) => {
    return db.query(
        `
        UPDATE lists
        SET complete=true
        WHERE id=$1
        RETURNING *
        `,
        [listId]
    );
};

module.exports.addToFavourites = (listId, userId) => {
    return db.query(
        `
        INSERT INTO favourites 
        (list_id, user_id)
        VALUES($1,$2)
        RETURNING *
        `,
        [listId, userId]
    );
};

module.exports.getFavourites = (userId) => {
    return db.query(
        `
        SELECT favourites.id AS id, lists.id AS list_id, list_name, description, cover, lists.created_at  
        FROM favourites
        INNER JOIN lists
        ON (lists.id = favourites.list_id)
        WHERE favourites.user_id=$1
        ORDER BY favourites.id
        `,
        [userId]
    );
};

module.exports.displayList = (listId) => {
    return db.query(
        `
        SELECT lists.id AS list_id, list_items.id AS item_id, list_name, description, item_order, url
        FROM list_items
        INNER JOIN lists
        ON (lists.id = list_items.list_id)
        WHERE lists.id = $1  
        ORDER BY item_id
        DESC LIMIT 9;
    `,
        [listId]
    );
};

//latest lists
module.exports.getLatestLists = () => {
    return db.query(
        `
        SELECT * FROM lists
        WHERE complete=true
        ORDER BY id
        DESC LIMIT 6;
        `
    );
};

// search lists by name
module.exports.searchListName = (str) => {
    return db.query(
        `
        SELECT * FROM lists
        WHERE (complete=true AND list_name ILIKE $1) 
        ORDER BY list_name
        ASC LIMIT 6
        `,
        [str + "%"]
    );
};

// //get image 1 from list_items for list_id
// module.exports.getCover = (str) => {
//     return db.query(
//         `
//         SELECT * FROM lists
//         WHERE (complete=true AND list_name ILIKE $1)
//         ORDER BY list_name
//         ASC LIMIT 6
//         `,
//         [str + "%"]
//     );
// };

// search lists by username

//Insert individual items into list_items, items will be tied together by list_id
module.exports.addItems = (list_id, item_order, url, user_id) => {
    return db.query(
        `
        INSERT INTO list_items (list_id,item_order, url, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `,
        [list_id, item_order, url, user_id]
    );
};

// delete profile image
module.exports.deleteImage = (userId) => {
    return db.query(
        `
        UPDATE users
        SET profile_img = null
        WHERE id=$1
        `,
        [userId]
    );
};

module.exports.getNextPreviousListId = (listId) => {
    return db.query(
        `
        SELECT id ,
        (SELECT id FROM lists
            WHERE (complete=true AND id > $1)
            ORDER BY id ASC
            LIMIT 1) 
                AS "nextId",
        (SELECT id FROM lists
            WHERE (complete=true AND id < $1)
            ORDER BY id DESC
            LIMIT 1) 
                AS "previousId"
        FROM lists
        WHERE id=$1`,
        [listId]
    );
};

// //check friendship status
// module.exports.checkFriendStatus = (userId, otherId) => {
//     return db.query(
//         `
//         SELECT * FROM friendships
//         WHERE (recipient_id = $1 AND sender_id = $2)
//         OR (recipient_id = $2 AND sender_id = $1)
//         `,
//         [userId, otherId]
//     );
// };

// //INSERT - runs when you send a friend request
// module.exports.sendFriendRequest = (userId, otherId) => {
//     return db.query(
//         `
//         INSERT INTO friendships
//         (sender_id, recipient_id)
//         VALUES($1, $2);
//         `,
//         [userId, otherId]
//     );
// };

// module.exports.cancelFriendRequest = (userId, otherId) => {
//     return db.query(
//         `
//         DELETE FROM friendships
//         WHERE sender_id=$1 AND recipient_id=$2
//         `,
//         [userId, otherId]
//     );
// };

// module.exports.acceptFriendRequest = (userId, otherId) => {
//     return db.query(
//         `
//         UPDATE friendships
//         SET accepted=true
//         WHERE sender_id=$2 AND recipient_id=$1
//         `,
//         [userId, otherId]
//     );
// };

// module.exports.removeFriend = (userId, otherId) => {
//     return db.query(
//         `
//         DELETE FROM friendships
//         WHERE sender_id=$1 AND recipient_id=$2
//         OR sender_id=$2 AND recipient_id=$1
//         `,
//         [userId, otherId]
//     );
// };

// // Get Friends, receivedRequests and sentRequests

// module.exports.getFriends = (userId) => {
//     return db.query(
//         `
//         SELECT users.id, first, last, url, accepted, sender_id, recipient_id
//         FROM friendships
//         JOIN users
//         ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
//         OR (accepted = false AND sender_id = $1 AND recipient_id = users.id)
//         OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
//         OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
//         `,
//         [userId]
//     );
// };

//chatHistory - get last 10 chat messages
// module.exports.getChatHistory = () => {
//     return db.query(
//         `
//         SELECT users.id AS user_id, first, last, url, chat.id AS chat_id, message, sender_id, chat.timestamp
//         FROM chat
//         JOIN users
//         ON (sender_id=users.id)
//         ORDER BY chat.id DESC
//         LIMIT 10;
//         `
//     );
// };

// insert new message to chat history
// module.exports.insertMessage = (message, senderId) => {
//     return db.query(
//         `
//         INSERT INTO chat
//         (message, sender_id)
//         VALUES($1,$2)
//         RETURNING *
//         `,
//         [message, senderId]
//     );
// };

// delete account
// module.exports.deleteAccount = (userId) => {
//     return db.query(
//         `
//         DELETE FROM users
//         WHERE id=$1
//         `,
//         [userId]
//     );
// };
