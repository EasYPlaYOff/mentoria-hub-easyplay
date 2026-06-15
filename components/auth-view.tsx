"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import {
  GraduationCap,
  Mail,
  Lock,
  User as UserIcon,
  Sparkles,
  KeyRound,
  ShieldCheck,
} from "lucide-react"
import { useStore, ADMIN_CODE } from "@/lib/store"

export function AuthView() {
  const { register } = useStore()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [orgCode, setOrgCode] = useState("")

  const isValidAdmin = orgCode.trim() === ADMIN_CODE

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || password.length < 4) {
      setError("Заполни все поля. Пароль — минимум 4 символа.")
      return
    }
    if (showCode && orgCode.trim() && !isValidAdmin) {
      setError("Неверный код организации.")
      return
    }
    setError("")
    register(
      name.trim(),
      email.trim(),
      password,
      isValidAdmin ? "admin" : "student",
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2">
        {/* Brand side */}
        <div className="hidden flex-col justify-between bg-gradient-to-br from-primary/20 to-accent/10 p-10 lg:flex">
          <div className="flex items-center gap-2">
            <span className="inline-flex rounded-xl bg-primary p-2 text-primary-foreground">
              <GraduationCap className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold">Mentoria Hub</span>
          </div>
          <div>
            <h2 className="text-balance text-3xl font-bold leading-tight">
              Образовательные возможности Казахстана в одном месте
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Олимпиады, хакатоны, акселераторы и асинхронные курсы для
              школьников 8–11 классов. Строй портфолио и поступай туда, куда
              мечтаешь.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            Бесплатно для всех учеников
          </div>
        </div>

        {/* Form side */}
        <div className="p-8 sm:p-10">
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <span className="inline-flex rounded-xl bg-primary p-2 text-primary-foreground">
              <GraduationCap className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold">Mentoria Hub</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Создай профиль</h1>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Зарегистрируйся, чтобы получить персональные рекомендации.
          </p>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <Field
              icon={<UserIcon className="size-4" aria-hidden="true" />}
              label="Имя"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Айгерим"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </Field>

            <Field
              icon={<Mail className="size-4" aria-hidden="true" />}
              label="Email"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </Field>

            <Field
              icon={<Lock className="size-4" aria-hidden="true" />}
              label="Пароль"
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </Field>

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Создать профиль
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

function Field({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </span>
      <span className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-3 text-muted-foreground focus-within:border-primary">
        {icon}
        {children}
      </span>
    </label>
  )
}
