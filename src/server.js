const Express = require('express')
const bodyParser = require('body-parser')
const commandParser = require('./commandParser')

const app = new Express()
app.use(bodyParser.urlencoded({
    extended: true
}))

const {
    SLACK_TOKEN: slackToken, PORT } = process.env

if (!slackToken) {
    console.error('missing environment variables SLACK_TOKEN')
    process.exit(1)
}

const port = PORT || 8080;

app.post('/', (req, res) => {
    receivedCommand = commandParser(req.body.text);
    var tempResponse = {
        response_type: "ephemeral",
        text: "",
        attachments: [{
            color: "green",
            text: "I have created your spoiler alert. Press the 'Send' button to share it with your mates!",
            callback_id: "spoiler_sent",
            actions: [{
                name: "@" + req.body.user_name,
                text: "Send Spoiler",
                type: "button",
                value: JSON.stringify(receivedCommand)
            }]
        }]
    };

    return res.json(tempResponse);
})


app.post('/callback', (req, res) => {
    var _payload = JSON.parse(req.body.payload);
    var spoilerResponse;
    switch (_payload.callback_id) {
        case "spoiler_sent":
            var spoilerContent = JSON.parse(_payload.actions[0].value);
            spoilerResponse = {
                response_type: "in_channel",
                replace_original: false,
                text: "",
                attachments: [{
                    color: "danger",
                    callback_id: "spoiler_opened",
                    text: _payload.actions[0].name + " wrote a spoiler about " + spoilerContent.movie + ".",
                    actions: [{
                        name: "read",
                        text: "Show Spoiler",
                        type: "button",
                        value: spoilerContent.spoiler
                    }]
                }]
            };
            break;
        case "spoiler_opened":
            spoilerResponse = {
                response_type: "ephemeral",
                replace_original: false,
                text: _payload.actions[0].value
            };
            break;
        default:
            break;
    }

    return res.json(spoilerResponse);
})

app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
})