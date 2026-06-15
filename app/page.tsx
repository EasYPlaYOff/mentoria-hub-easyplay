"use client"

import { useState } from "react"
import { SiteHeader, type Tab } from "@/components/site-header"
import { HomeView } from "@/components/home-view"
import { CoursesView } from "@/components/courses-view"
import { DashboardView } from "@/components/dashboard-view"
import { AdminView } from "@/components/admin-view"

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [savedIds, setSavedIds] = useState<number[]>([])

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader
        active={activeTab}
        onChange={setActiveTab}
        savedCount={savedIds.length}
      />

      {activeTab === "home" && (
        <HomeView onStart={() => setActiveTab("courses")} />
      )}
      {activeTab === "courses" && (
        <CoursesView savedIds={savedIds} onToggleSave={toggleSave} />
      )}
      {activeTab === "dashboard" && (
        <DashboardView
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onExplore={() => setActiveTab("courses")}
        />
      )}
      {activeTab === "admin" && <AdminView savedIds={savedIds} />}

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          Mentoria Hub — образовательные возможности для школьников Казахстана.
        </div>
      </footer>
    </main>
  )
}
