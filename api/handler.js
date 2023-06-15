import * as LLMx from "ai-jsx";
import { ChatCompletion, SystemMessage, UserMessage, } from "ai-jsx/core/completion";
import { PinoLogger } from "ai-jsx/core/log";
import { pino } from "pino";
function App({ query }) {
    return (LLMx.createElement(ChatCompletion, null,
        LLMx.createElement(SystemMessage, null, "You are an agent that only asks rhetorical questions."),
        LLMx.createElement(UserMessage, null, query)));
}
const pinoStdoutLogger = pino({
    name: "ai-jsx",
    level: process.env.loglevel ?? "debug",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
});
export default async function handler(request, response) {
    let query = request.query.q;
    if (!query) {
        response.status(400).send('Missing query parameter "q"');
        return;
    }
    // The querystring parser returns an array if there are multiple values for a key.
    if (Array.isArray(query)) {
        query = query[0];
    }
    try {
        const rendered = await LLMx.createRenderContext({
            logger: new PinoLogger(pinoStdoutLogger),
        }).render(LLMx.createElement(App, { query: query }));
        response.status(200).send(rendered);
    }
    catch (e) {
        response.status(500).send(e.message);
    }
}
