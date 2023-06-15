import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as LLMx from "ai-jsx";
import {
  ChatCompletion,
  SystemMessage,
  UserMessage,
} from "ai-jsx/core/completion";
import { PinoLogger } from "ai-jsx/core/log";
import { pino } from "pino";

function App({query}: {query: string}) {
  return (
    <ChatCompletion>
      <SystemMessage>
        You are an agent that only asks rhetorical questions.
      </SystemMessage>
      <UserMessage>{query}</UserMessage>
    </ChatCompletion>
  );
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

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  let query = request.query.q;
  if (!query) {
    response.status(400).send('Missing query parameter "q"')
    return;
  }
  // The querystring parser returns an array if there are multiple values for a key.
  if (Array.isArray(query)) {
    query = query[0];
  }
  try {
    const rendered = await LLMx.createRenderContext({
      logger: new PinoLogger(pinoStdoutLogger),
    }).render(<App query={query} />)
    response.status(200).send(rendered)
  } catch (e: any) {
    response.status(500).send(e.message)
  }
}