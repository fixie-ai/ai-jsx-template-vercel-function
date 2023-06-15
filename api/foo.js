export default function handler(request, response) {
  const { name } = request.query;
  return response.end(`Hello ${name}!`);
}