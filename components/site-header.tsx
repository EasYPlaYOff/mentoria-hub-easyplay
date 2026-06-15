"use client"

import { useState } from "react"
import { GraduationCap, Menu, X, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { useT, LANGUAGES } from "@/lib/i18n"

export type Tab = "home" | "courses" | "catalog" | "dashboard" | "admin"

const tabDefs: { id: Tab; labelKey: string }[] = [
  { id: "home", labelKey: "nav.home" },
  { id: "courses", labelKey: "nav.courses" },
  { id: "catalog", labelKey: "nav.catalog" },
  { id: "dashboard", labelKey: "nav.dashboard" },
  { id: "admin", labelKey: "nav.admin" },
]

type SiteHeaderProps = {
  active: Tab
  onChange: (tab: Tab) => void
  savedCount: number
}

function LangSwitcher() {
  const { lang, setLang } = useStore()
  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-card p-0.5">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
            lang === l.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

export function SiteHeader({ active, onChange, savedCount }: SiteHeaderProps) {
  const { user, logout } = useStore()
  const t = useT()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Admin tab is hidden unless the user holds the admin role.
  const tabs = tabDefs.filter(
    (tab) => tab.id !== "admin" || user?.role === "admin",
  )

  const handleSelect = (tab: Tab) => {
    onChange(tab)
    setMobileOpen(false)
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?"

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => handleSelect("home")}
          className="flex items-center gap-2"
        >
          <span className="inline-flex rounded-xl bg-primary p-2 text-primary-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Mentoria Hub
          </span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelect(tab.id)}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active === tab.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(tab.labelKey)}
                {tab.id === "dashboard" && savedCount > 0 && (
                  <span className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                    {savedCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="ml-2 border-l border-border pl-3">
            <LangSwitcher />
          </div>
          <div className="ml-2 flex items-center gap-2 border-l border-border pl-3">
            <span
              className="inline-flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary"
              title={user?.name ?? ""}
            >
              {initials}
            </span>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="size-4" aria-hidden="true" />
              {t("nav.logout")}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="inline-flex rounded-lg p-2 text-foreground md:hidden"
          aria-label="Открыть меню"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            <div className="flex items-center justify-between px-3 py-3">
              <span className="text-sm font-medium text-muted-foreground">
                Язык / Language
              </span>
              <LangSwitcher />
            </div>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelect(tab.id)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors",
                  active === tab.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(tab.labelKey)}
                {tab.id === "dashboard" && savedCount > 0 && (
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                    {savedCount}
                  </span>
                )}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                logout()
              }}
              className="mt-1 flex items-center gap-2 rounded-lg border-t border-border px-3 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Выйти ({user?.name})
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}
