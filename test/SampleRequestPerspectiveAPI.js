// From the official documentation at https://developers.perspectiveapi.com/s/docs-sample-requests

const {google} = require('googleapis')
require('dotenv').config()

CONTENT = 'Hey, you\'re an embulant dog'

// Create a .env file and get your GOOGLE_API_KEY.
API_KEY = process.env.GOOGLE_API_KEY
DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1'

google.discoverAPI(DISCOVERY_URL).then(client => {
    const analyzeRequest = {
        comment: {
            text: CONTENT,
        },
        requestedAttributes: {
            TOXICITY: {},
        },
    }

    console.info(`Input Text : ${analyzeRequest.comment.text}`)

    client.comments.analyze(
        {
            key: API_KEY,
            resource: analyzeRequest,
        },
        async (err, response) => {
            if (err) throw err
            let ScoreValue = response.data.attributeScores.TOXICITY.summaryScore.value
            await console.log(`TOXICITY Score : ${ScoreValue}`)
            console.table(JSON.stringify(response.data, null, 2))
        })
}).catch(err => {
    throw err
})
