"use client";

import { answer, type ChatOption, type ChatReply, type ChatRequest } from "@/lib/chat";
import { cn } from "@/lib/utils";
import { IconArrowUp, IconMessageCircle, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Msg = { from: "bot" | "user"; text: string };

const STATIC = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";

async function ask(req: ChatRequest): Promise<ChatReply> {
  if (STATIC) return answer(req);
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as ChatReply;
  } catch {
    return answer(req);
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [options, setOptions] = useState<ChatOption[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && msgs.length === 0) {
      void ask({ action: "start" }).then((r) => {
        setMsgs([{ from: "bot", text: r.reply }]);
        setOptions(r.options);
      });
    }
  }, [open, msgs.length]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  async function send(req: ChatRequest, label: string) {
    if (busy) return;
    setBusy(true);
    setMsgs((m) => [...m, { from: "user", text: label }]);
    setOptions([]);
    const r = await ask(req);
    setMsgs((m) => [...m, { from: "bot", text: r.reply }]);
    setOptions(r.options);
    setBusy(false);
    if (r.goToForm) {
      setOpen(false);
      document.getElementById("gorusme")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label="Okul asistanı"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(560px,calc(100dvh-144px))] w-[min(384px,calc(100vw-32px))] flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-float sm:right-6"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
              <div>
                <p className="t-body font-bold text-ink">Okul asistanı</p>
                <p className="t-label normal-case tracking-normal text-muted">Okul seçimi ve görüşme</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-transparent text-ink hover:bg-surface"
                aria-label="Kapat"
              >
                <IconX size={18} stroke={1.75} />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-md px-4 py-2 t-body",
                    m.from === "bot" ? "bg-surface text-ink" : "ml-auto bg-ink text-paper",
                  )}
                >
                  {m.text}
                </div>
              ))}
              {options.length ? (
                <div className="flex flex-wrap gap-2">
                  {options.map((o) => (
                    <button
                      key={o.action}
                      type="button"
                      onClick={() => send({ action: o.action }, o.label)}
                      className="h-10 rounded-full border border-line bg-paper px-4 t-body font-bold text-ink hover:border-brand hover:text-brand"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const t = input.trim();
                if (!t) return;
                setInput("");
                void send({ message: t }, t);
              }}
              className="shrink-0 border-t border-line p-3"
            >
              <div className="flex h-12 items-center gap-2 rounded-full border border-line bg-paper pl-4 pr-1 focus-within:border-brand">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={300}
                  placeholder="Sorunuzu yazın"
                  className="h-full min-w-0 flex-1 bg-transparent t-body text-ink outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-brand bg-brand text-paper disabled:opacity-40"
                  aria-label="Gönder"
                >
                  <IconArrowUp size={18} stroke={2} />
                </button>
              </div>
              <p className="mt-2 px-4 t-label normal-case tracking-normal text-muted">
                Asistan vize ve öğrenci izni konusunda tavsiye vermez.
              </p>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Asistanı kapat" : "Okul asistanını aç"}
        className="fixed bottom-6 right-4 z-50 flex h-12 min-w-12 items-center justify-center gap-2 rounded-full border border-ink bg-ink px-4 t-body font-bold text-paper shadow-float hover:bg-ink/90 sm:right-6 sm:px-6"
        aria-expanded={open}
      >
        {open ? <IconX size={20} stroke={1.75} /> : <IconMessageCircle size={20} stroke={1.75} />}
        <span className="hidden sm:inline">{open ? "Kapat" : "Okul asistanı"}</span>
      </button>
    </>
  );
}
