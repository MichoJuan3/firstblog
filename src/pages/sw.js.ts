export const prerender = true;

export function GET() {
  const body = `self.options = {
    "domain": "3nbf4.com",
    "zoneId": 11668559
  }
  self.lary = ""
  importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw')`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}