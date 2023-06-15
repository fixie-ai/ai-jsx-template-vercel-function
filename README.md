# AI.JSX Hello World Vercel Serverless Function

This is a simple [AI.JSX](https://ai-jsx.com) project that demonstrates how to use the `ai-jsx`
package to create a simple AI-powered application.

The AI.JSX app is served via a Vercel function.

## Demoing this app
```
curl 'https://ai-jsx-template-vercel-function.vercel.app/api/handler?q="what%20are%20beans"'

Do you even need me to tell you what beans are when they are already such a ubiquitous and versatile food item used in countless cuisines around the world?
```

## Building and running the app

1. Fork/clone this repo.
1. Run `npm install`.
1. Set env var `OPENAI_API_KEY`, which you can obtain from the [OpenAI API dashboard](https://platform.openai.com/account/api-keys) .
1. Run `npm start`.
1. In a separate process, run `npm run demo`.

You'll see output like:
```
Do beans not provide a good source of protein and fiber?
```
