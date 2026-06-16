"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { SiteHeader, type Tab } from "@/components/site-header"
import { AuthView } from "@/components/auth-view"
import { OnboardingView } from "@/components/onboarding-view"
import { HomeView } from "@/components/home-view"
import { CoursesLearning } from "@/components/courses-learning"
import { CoursesView } from "@/components/courses-view"
import { DashboardView } from "@/components/dashboard-view"
import { AdminView } from "@/components/admin-view"
import { P2PView } from "@/components/p2p-view"
import { VolunteerView } from "@/components/volunteer-view"

export default function Page() {
  const { hydrated, user, savedIds } = useStore()
  const [activeTab, setActiveTab] = useState<Tab>("home")

  // Avoid flash of wrong screen before localStorage is read
  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <span className="text-sm">Загрузка…</span>
      </main>
    )
  }

  if (!user) {
    return <AuthView />
  }

  if (!user.onboarded) {
    return <OnboardingView />
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader
        active={activeTab}
        onChange={setActiveTab}
        savedCount={savedIds.length}
      />

      {activeTab === "home" && (
        <HomeView
          onStart={() => setActiveTab("courses")}
          onExplore={() => setActiveTab("catalog")}
        />
      )}
      {activeTab === "courses" && <CoursesLearning />}
      {activeTab === "catalog" && <CoursesView />}
      {activeTab === "p2p" && <P2PView />}
      {activeTab === "volunteer" && <VolunteerView />}
      {activeTab === "dashboard" && (
        <DashboardView onExplore={() => setActiveTab("catalog")} />
      )}
      {activeTab === "admin" && (
        <AdminView onViewCatalog={() => setActiveTab("catalog")} />
      )}

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          Mentoria Hub — образовательные возможности для школьников Казахстана.
        </div>
      </footer>
    </main>
  )
}
