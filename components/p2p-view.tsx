"use client"

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react"
import {
  CalendarClock,
  Check,
  MessageCircle,
  Send,
  User as UserIcon,
  HeartHandshake,
} from "lucide-react"
import { useStore } from "@/lib/store"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type ChatMessage = {
  id: string
  from: "student" | "volunteer"
  text: string
}

export function P2PView() {
  const { lessons, enrolledLessonIds, enrollLesson } = useStore()
  const t = useT()

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex rounded-xl bg-primary/15 p-2.5 text-primary">
          <HeartHandshake className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t("p2p.title")}
          </h1>
        </div>
      </div>
      <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        {t("p2p.subtitle")}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Schedule */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <CalendarClock className="size-5 text-primary" aria-hidden="true" />
            <h2 className="text-lg font-bold tracking-tight">
              {t("p2p.scheduleTitle")}
            </h2>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t("p2p.scheduleSubtitle")}
          </p>

          <ul className="mt-5 flex flex-col gap-3">
            {lessons.map((lesson) => {
              const enrolled = enrolledLessonIds.includes(lesson.id)
              return (
                <li
                  key={lesson.id}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {lesson.subject}
                    </span>
                    <h3 className="mt-2 text-balance font-semibold leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <UserIcon className="size-4" aria-hidden="true" />
                        {lesson.volunteerName}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock className="size-4" aria-hidden="true" />
                        {lesson.time}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => enrollLesson(lesson.id)}
                    disabled={enrolled}
                    className={cn(
                      "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                      enrolled
                        ? "cursor-default bg-primary/15 text-primary"
                        : "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
                    {enrolled ? (
                      <>
                        <Check className="size-4" aria-hidden="true" />
                        {t("p2p.enrolled")}
                      </>
                    ) : (
                      t("p2p.enroll")
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Chat */}
        <VolunteerChat />
      </div>
    </section>
  )
}

function VolunteerChat() {
  const t = useT()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greeting", from: "volunteer", text: t("p2p.chatGreeting") },
  ])
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, typing])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      { id: `s-${Date.now()}`, from: "student", text },
    ])
    setInput("")
    setTyping(true)
    // Simulate a volunteer answering 2 seconds later.
    timerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `v-${Date.now()}`, from: "volunteer", text: t("p2p.volunteerReply") },
      ])
      setTyping(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-lg font-bold tracking-tight">
          {t("p2p.chatTitle")}
        </h2>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {t("p2p.chatSubtitle")}
      </p>

      <div
        ref={scrollRef}
        className="mt-4 flex h-72 flex-col gap-3 overflow-y-auto rounded-xl border border-border bg-background p-4"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex flex-col",
              m.from === "student" ? "items-end" : "items-start",
            )}
          >
            <span className="mb-1 text-xs font-medium text-muted-foreground">
              {m.from === "student" ? t("p2p.you") : "MentoriaBot"}
            </span>
            <span
              className={cn(
                "max-w-[85%] text-pretty rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                m.from === "student"
                  ? "rounded-br-sm bg-primary text-primary-foreground"
                  : "rounded-bl-sm bg-muted text-foreground",
              )}
            >
              {m.text}
            </span>
          </div>
        ))}
        {typing && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("p2p.chatPlaceholder")}
          className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Send className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{t("p2p.send")}</span>
        </button>
      </form>
    </div>
  )
}
