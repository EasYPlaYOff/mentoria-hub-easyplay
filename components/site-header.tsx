"use client"

import { useState } from "react"
import { GraduationCap, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type Tab = "home" | "courses" | "catalog" | "dashboard" | "admin"

const tabs: { id: Tab; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "courses", label: "Курсы" },
  { id: "catalog", label: "Каталог" },
  { id: "dashboard", label: "Личный кабинет" },
  { id: "admin", label: "Админка" },
]

type SiteHeaderProps = {
  active: Tab
  onChange: (tab: Tab) => void
  savedCount: number
}

export function SiteHeader({ active, onChange, savedCount }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSelect = (tab: Tab) => {
    onChange(tab)
    setMobileOpen(false)
  }

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

        <nav className="hidden items-center gap-1 md:flex">
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
              {tab.label}
              {tab.id === "dashboard" && savedCount > 0 && (
                <span className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                  {savedCount}
                </span>
              )}
            </button>
          ))}
        </nav>

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
                {tab.label}
                {tab.id === "dashboard" && savedCount > 0 && (
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                    {savedCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
