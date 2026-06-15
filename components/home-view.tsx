"use client"

import Image from "next/image"
import {
  ArrowRight,
  Sparkles,
  Clock,
  Compass,
  Trophy,
} from "lucide-react"

type HomeViewProps = {
  onStart: () => void
}

const reasons = [
  {
    icon: Compass,
    title: "Всё в одном месте",
    text: "Олимпиады, хакатоны, акселераторы и курсы Казахстана собраны на одной платформе.",
  },
  {
    icon: Clock,
    title: "Асинхронное обучение",
    text: "Учись в своём темпе — материалы и дедлайны всегда под рукой, без привязки ко времени.",
  },
  {
    icon: Trophy,
    title: "Реальные результаты",
    text: "Гранты, призовые места и портфолио для поступления в топовые вузы страны и мира.",
  },
]

export function HomeView({ onStart }: HomeViewProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <section className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
            Для школьников 8–11 классов
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Все образовательные возможности и асинхронное обучение для
            школьников Казахстана в одном месте
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Mentoria Hub помогает найти олимпиады, хакатоны и менторские
            программы, чтобы строить сильное портфолио и поступать туда, куда
            мечтаешь.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Начать обучение
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border">
            <Image
              src="/hero-students.png"
              alt="Школьники учатся вместе на платформе Mentoria Hub"
              width={800}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12 lg:py-16">
        <h2 className="text-balance text-3xl font-bold tracking-tight">
          Почему Mentoria Hub?
        </h2>
        <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Мы создали платформу для учеников 8–11 классов, чтобы образование за
          пределами школы было доступным, понятным и вдохновляющим.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                <reason.icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
