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
            className="fixed bottom-24 right-4 z-50 flex h-[min(560px,calc(100dvh-140px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_60px_-20px_rgba(29,27,25,0.35)] sm:right-6"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <div>
                <p className="text-[15px] font-semibold text-ink">Okul asistanı</p>
                <p className="text-[13px] text-ink-3">Okul seçimi ve görüşme için</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-full text-ink-2 hover:bg-paper-2"
                aria-label="Kapat"
              >
                <IconX size={18} stroke={1.75} />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed",
                    m.from === "bot" ? "bg-paper-2 text-ink" : "ml-auto bg-ink text-white",
                  )}
                >
                  {m.text}
                </div>
              ))}
              {options.length ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {options.map((o) => (
                    <button
                      key={o.action}
                      type="button"
                      onClick={() => send({ action: o.action }, o.label)}
                      className="h-9 rounded-full border border-ink/15 bg-white px-4 text-[13px] font-semibold text-ink hover:border-maple hover:text-maple"
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
              <div className="flex h-11 items-center gap-2 rounded-full border border-ink/15 bg-paper pl-4 pr-1 focus-within:border-maple">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={300}
                  placeholder="Sorunuzu yazın"
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-3"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-maple bg-maple text-white disabled:opacity-40"
                  aria-label="Gönder"
                >
                  <IconArrowUp size={18} stroke={2} />
                </button>
              </div>
              <p className="mt-2 px-2 text-[11px] leading-snug text-ink-3">
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
        className="fixed bottom-5 right-4 z-50 flex h-14 min-w-14 items-center justify-center gap-2 rounded-full border border-ink bg-ink px-4 sm:pr-5 text-[15px] font-semibold text-white shadow-lg hover:bg-ink/90 sm:right-6"
        aria-expanded={open}
      >
        {open ? <IconX size={20} stroke={1.75} /> : <IconMessageCircle size={20} stroke={1.75} />}
        <span className="hidden sm:inline">{open ? "Kapat" : "Okul asistanı"}</span>
      </button>
    </>
  );
}
