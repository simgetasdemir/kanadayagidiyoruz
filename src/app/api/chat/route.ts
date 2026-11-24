import { answer, type ChatRequest } from "@/lib/chat";

export async function POST(request: Request) {
  let body: ChatRequest = {};
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return Response.json({ error: "Geçersiz istek" }, { status: 400 });
  }
  const message = typeof body.message === "string" ? body.message.slice(0, 500) : undefined;
  const action = typeof body.action === "string" ? body.action.slice(0, 40) : undefined;
  return Response.json(answer({ message, action }));
}
