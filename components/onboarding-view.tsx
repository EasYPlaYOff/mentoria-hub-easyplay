"use client"

import { useState, type ReactNode } from "react"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  GraduationCap,
  Target,
  Tags,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useStore, type Goal } from "@/lib/store"
import type { Category } from "@/lib/opportunities"

const GRADES = ["8 класс", "9 класс", "10 класс", "11 класс"]
const INTERESTS: Category[] = ["STEM", "Бизнес", "Программирование"]
const GOALS: Goal[] = [
  "Поступление в вуз",
  "Участие в хакатонах/олимпиадах",
  "Поиск стажировок",
]

export function OnboardingView() {
  const { user, completeOnboarding } = useStore()
  const [step, setStep] = useState(1)
  const [grade, setGrade] = useState<string | null>(null)
  const [interests, setInterests] = useState<Category[]>([])
  const [goal, setGoal] = useState<Goal | null>(null)

  const toggleInterest = (cat: Category) => {
    setInterests((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  const canContinue =
    (step === 1 && grade) ||
    (step === 2 && interests.length > 0) ||
    (step === 3 && goal)

  const finish = () => {
    if (grade && interests.length > 0 && goal) {
      completeOnboarding(grade, interests, goal)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            Привет, {user?.name}! Настроим твой профиль
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Шаг {step} из 3
          </p>
          <div className="mx-auto mt-4 flex max-w-xs gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  s <= step ? "bg-primary" : "bg-secondary",
                )}
              />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-7 sm:p-9">
          {step === 1 && (
            <Step
              icon={<GraduationCap className="size-5" aria-hidden="true" />}
              title="В каком ты классе?"
            >
              <div className="grid grid-cols-2 gap-3">
                {GRADES.map((g) => (
                  <SelectButton
                    key={g}
                    active={grade === g}
                    onClick={() => setGrade(g)}
                  >
                    {g}
                  </SelectButton>
                ))}
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step
              icon={<Tags className="size-5" aria-hidden="true" />}
              title="Выбери свои интересы"
              hint="Можно выбрать несколько"
            >
              <div className="flex flex-col gap-3">
                {INTERESTS.map((cat) => (
                  <SelectButton
                    key={cat}
                    active={interests.includes(cat)}
                    onClick={() => toggleInterest(cat)}
                  >
                    {cat}
                  </SelectButton>
                ))}
              </div>
            </Step>
          )}

          {step === 3 && (
            <Step
              icon={<Target className="size-5" aria-hidden="true" />}
              title="Какая твоя главная цель?"
            >
              <div className="flex flex-col gap-3">
                {GOALS.map((g) => (
                  <SelectButton
                    key={g}
                    active={goal === g}
                    onClick={() => setGoal(g)}
                  >
                    {g}
                  </SelectButton>
                ))}
              </div>
            </Step>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-0"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Назад
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canContinue}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
              >
                Далее
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={finish}
                disabled={!canContinue}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
              >
                <Check className="size-4" aria-hidden="true" />
                Сохранить и войти
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function Step({
  icon,
  title,
  hint,
  children,
}: {
  icon: ReactNode
  title: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex rounded-xl bg-primary/15 p-2.5 text-primary">
          {icon}
        </span>
        <div>
          <h2 className="text-lg font-semibold leading-tight">{title}</h2>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

function SelectButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-between gap-2 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-background text-foreground hover:border-primary/50",
      )}
    >
      <span>{children}</span>
      {active && <Check className="size-4 text-primary" aria-hidden="true" />}
    </button>
  )
}
