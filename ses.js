const aws = require("aws-sdk");

let secrets;

if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1", //has to match our settings in SES AWS setup
});

exports.sendEmail = function (recipient, message, subject) {
    return ses
        .sendEmail({
            Source: "<beldihasa1@gmail.com>",
            Destination: {
                ToAddresses: [recipient],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("it worked! email was sent"))
        .catch((err) => console.log("error in ses.sendEmail()", err));
};
