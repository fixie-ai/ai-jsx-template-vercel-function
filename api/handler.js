import { jsx as _jsx, jsxs as _jsxs } from "ai-jsx/jsx-runtime";
import { createRenderContext } from "ai-jsx";
import { ChatCompletion, SystemMessage, UserMessage, } from "ai-jsx/core/completion";
import { LogImplementation } from "ai-jsx/core/log";
class ConsoleLogger extends LogImplementation {
    log(level, element, renderId, obj, msg) {
        const args = [`[${level}]`];
        args.push(`<${element.tag.name}>`, renderId);
        if (msg) {
            args.push(msg);
        }
        if (obj) {
            args.push(obj);
        }
        console.log(...args);
    }
}
function App({ query }) {
    return (_jsxs(ChatCompletion, { children: [_jsx(SystemMessage, { children: "You are an agent that only asks rhetorical questions." }), _jsx(UserMessage, { children: query })] }));
}
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
        const rendered = await createRenderContext({
            logger: new ConsoleLogger(),
        }).render(_jsx(App, { query: query }));
        response.status(200).send(rendered);
    }
    catch (e) {
        response.status(500).send(e.message);
    }
}
