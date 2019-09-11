const { google } = require('googleapis');

const GCP_SCOPES = [
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/dialogflow'
];

const agentsCredentials = process.env.DIALOGFLOW_CREDENTIALS ?
    require(`${process.cwd()}/${process.env.DIALOGFLOW_CREDENTIALS}`) :
    require(`${process.cwd()}/credentials.json`);
const projectId = agentsCredentials.project_id;

const jwtClient = new google.auth.JWT(agentsCredentials.client_email, null, agentsCredentials.private_key, GCP_SCOPES);

google.options({
    auth: jwtClient
});

const dialogflowClient = google.dialogflow('v2');
const intentsClient = dialogflowClient.projects.agent.intents;
const sessionClient = dialogflowClient.projects.agent.sessions;

const getIntentsList = () => {
    return new Promise((resolve, reject) => {
        intentsClient.list({
            languageCode: 'es',
            parent: `projects/${projectId}/agent`,
            intentView:'INTENT_VIEW_FULL'
        }).then(dialogflowIntents => {
            const intents = dialogflowIntents.data.intents;
            resolve(intents);
        }).catch(err => console.error(err));
    });
}

const getIntent = intentName => {
    return new Promise((resolve, reject) => {
        intentsClient.get({
            name: intentName
        }).then(intentData => {
            resolve(intentData);
        });
    });
}

const intentToDM = dialogflowIntent => {
    const dm = {
        intent: null,
        trainingPhrases: [],
        responses: []
    };

    dm.intent = dialogflowIntent.displayName;
    if (dialogflowIntent.trainingPhrases) {
        dialogflowIntent.trainingPhrases.forEach(phrase => {
            let text = '';

            phrase.parts.forEach(part => {
                text += part.text;
            });

            dm.trainingPhrases.push(text);
        });
    }

    if (Array.isArray(dialogflowIntent.messages) && 
        dialogflowIntent.messages[0] &&
        dialogflowIntent.messages[0].text &&
        dialogflowIntent.messages[0].text.text) {
            dm.responses = dialogflowIntent.messages[0].text.text;
        } 

    return dm;
}

module.exports = {
    getIntentsList,
    intentToDM
};