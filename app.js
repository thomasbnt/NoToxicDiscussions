const core = require('@actions/core')
const github = require('@actions/github')
const {google} = require('googleapis')

const PERSPECTIVE_DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1'

// TODO : core.getInput not work properly (?)
const PERSPECTIVE_API_KEY = core.getInput('PERSPECTIVE_API_KEY')
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')

async function run() {
    try {

        if (PERSPECTIVE_API_KEY === null) {
            core.setFailed(`PERSPECTIVE_API_KEY is required. Please set it as input.\nNeed a API Key ? https://developers.perspectiveapi.com/s/docs-enable-the-api`)
            return
        }

        const context = github.context.payload
        console.info(context)

        function CheckTheContentWithPerspectiveAPI(Content) {
            /*
            *
            *   context.comment.body - type: ARRAY
            *     Get the body of the new comment.
            *   response.data.attributeScores.TOXICITY.summaryScore.value - type: STRING
            *     Get the final value of the TOXICITY of the comment.
            *
            *
            *
            *   This example of this script was taken from https://developers.perspectiveapi.com/s/docs-sample-requests and edited for this Action.
             */
            google.discoverAPI(PERSPECTIVE_DISCOVERY_URL).then(client => {
                const analyzeRequest = {
                    comment: {
                        text: Content,
                    },
                    requestedAttributes: {
                        TOXICITY: {},
                    },
                }
                client.comments.analyze({
                    key: PERSPECTIVE_API_KEY,
                    resource: analyzeRequest,
                    languages: ["en"]
                }, async (err, response) => {
                    if (err) throw err
                    let ScoreValue = response.data.attributeScores.TOXICITY.summaryScore.value
                    await console.log(`TOXICITY Score : ${ScoreValue}`)
                    //console.log(JSON.stringify(response.data, null, 2))
                    if(ScoreValue >= .9) {
                        console.log("ACTION ! ")
                        
                        /* 
                        *  Not working. Please GitHub add this fonctionnality.
                        *  context.octokit.discussion.createComment({body: "Hello"})
                        * 
                        */
                    }

                    return response.data.attributeScores.TOXICITY.summaryScore.value
                })
            })
        }

        if (!context.discussion.locked) {
            if (context.action === 'created' && context.discussion.comments === 0) {
                console.info(`New discussion created : ${context.discussion.title}\nThis link is ${context.discussion.html_url}`)

                CheckTheContentWithPerspectiveAPI(context.comment.body)

            } else if (context.discussion.comments >= 1) {
                console.info(`New comment created : ${context.comment.body}`)
                CheckTheContentWithPerspectiveAPI(context.comment.body)

            } else {
            }
        } else {
            console.info('This discussion is locked. This Action can sleep more time.')
        }

    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
