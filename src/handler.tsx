import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createRenderContext, Element } from "ai-jsx";
import {
  ChatCompletion,
  SystemMessage,
  UserMessage,
} from "ai-jsx/core/completion";
import { LogImplementation, LogLevel } from "ai-jsx/core/log";

class ConsoleLogger extends LogImplementation {
  log(
    level: LogLevel,
    element: Element<any>,
    renderId: string,
    obj: unknown | string,
    msg?: string
  ) {
    const args = [`[${level}]`] as unknown[];
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

function App({ query }: { query: string }) {
  return (
    <ChatCompletion>
      <SystemMessage>
        You are an agent that only asks rhetorical questions.
      </SystemMessage>
      <UserMessage>{query}</UserMessage>
    </ChatCompletion>
  );
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
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
    }).render(<App query={query} />);
    response.status(200).send(rendered);
  } catch (e: any) {
    response.status(500).send(e.message);
  }
}
