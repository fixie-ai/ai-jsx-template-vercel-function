// @ts-expect-error
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse, streamToResponse } from 'ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
 
// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
 
// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';
 
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Extract the `prompt` from the body of the request
 
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    stream: true,
    prompt: 'List 20 dog names',
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  // const str = new StreamingTextResponse(stream);
  streamToResponse(stream, res);
}