# What is this?
Gets dialogflow content and generates a NLP.js model that replicates its functionality.

# Commands

```sh
npx dialogflow-to-nlpjs train
npx dialogflow-to-nlpjs test
npx dialogflow-to-nlpjs expose
```
# How to use

## Train

Create a Dialogflow credential key and rename it as `credentials.json` or export it as environment variable:

```sh
DIALOGFLOW_CREDENTIALS=my_json_credentials.json npx dialogflow-to-nlpjs train
```
Note: You have to run this command with the file in the same folder

At the end, you will have a ``dialogflow_model.nlp`` on ``model`` folder.

## Use

`npx dialogflow-to-nlpjs use "text example"`

Gets analysis info of your text

## Test

`npx dialogflow-to-nlpjs test`

Allows to test a conversation using your model. Example:

```
Enter a text: hola
Result:
- [intent]: adf.smalltalk.hola
- [score]: 1.
Enter a text: que tal
Result:
- [intent]: adf.smalltalk.quetal
- [score]: 1.
Enter a text: cuentame un chiste
Result:
- [intent]: adf.smalltalk.chiste
- [score]: 1.
```

## Expose

`npx dialogflow-to-nlpjs expose`

Exposes the model as REST API.

Here you have an example of request:

```
- Type: POST
- Endpoint: http://localhost:3000/resolve
- Body: { "text": "hola" }
- Header: Content-Type: application/json
```