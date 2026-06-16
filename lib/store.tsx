"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  opportunities as seedOpportunities,
  type Category,
  type Opportunity,
} from "@/lib/opportunities"

export type Goal =
  | "Поступление в вуз"
  | "Участие в хакатонах/олимпиадах"
  | "Поиск стажировок"

export type Role = "student" | "volunteer" | "admin"

export type Lang = "kz" | "ru" | "en"

export type Lesson = {
  id: string
  title: string
  volunteerName: string
  time: string
  subject: string
}

export type HelpRequest = {
  id: string
  studentName: string
  subject: string
  question: string
  status: "open" | "responded"
}

export type User = {
  name: string
  email: string
  password: string
  role: Role
  grade: string | null
  interests: Category[]
  goal: Goal | null
  onboarded: boolean
}

type PersistedState = {
  user: User | null
  savedIds: number[]
  progress: Record<string, boolean>
  opportunities: Opportunity[]
  telegramConnected: boolean
  lang: Lang
  lessons: Lesson[]
  enrolledLessonIds: string[]
  helpRequests: HelpRequest[]
}

const STORAGE_KEY = "mentoria-hub-state"

export const ADMIN_CODE = "MENTORIA_ADMIN_2026"

const seedLessons: Lesson[] = [
  {
    id: "l1",
    title: "Разбор сложных задач по математике (ЕНТ)",
    volunteerName: "Данияр",
    time: "Сегодня, 18:00",
    subject: "Математика",
  },
  {
    id: "l2",
    title: "Основы Python для начинающих",
    volunteerName: "Аружан",
    time: "Завтра, 16:30",
    subject: "Программирование",
  },
  {
    id: "l3",
    title: "IELTS Writing: как писать эссе на 7+",
    volunteerName: "Тимур",
    time: "Суббота, 14:00",
    subject: "Английский язык",
  },
]

const seedHelpRequests: HelpRequest[] = [
  {
    id: "r1",
    studentName: "Алия",
    subject: "Физика",
    question: "Не понимаю законы Ньютона, можешь объяснить на примерах?",
    status: "open",
  },
  {
    id: "r2",
    studentName: "Ерлан",
    subject: "Математика",
    question: "Нужна помощь с производными перед контрольной завтра.",
    status: "open",
  },
  {
    id: "r3",
    studentName: "Камила",
    subject: "Химия",
    question: "Как правильно балансировать уравнения реакций?",
    status: "open",
  },
]

const defaultState: PersistedState = {
  user: null,
  savedIds: [],
  progress: {},
  opportunities: seedOpportunities,
  telegramConnected: false,
  lang: "ru",
  lessons: seedLessons,
  enrolledLessonIds: [],
  helpRequests: seedHelpRequests,
}

type StoreContextValue = PersistedState & {
  hydrated: boolean
  register: (
    name: string,
    email: string,
    password: string,
    role?: Role,
  ) => void
  completeOnboarding: (
    grade: string,
    interests: Category[],
    goal: Goal,
  ) => void
  logout: () => void
  toggleSave: (id: number) => void
  removeSave: (id: number) => void
  setLessonCompleted: (lessonId: string) => void
  addOpportunity: (opp: Omit<Opportunity, "id">) => void
  connectTelegram: () => void
  setLang: (lang: Lang) => void
  enrollLesson: (lessonId: string) => void
  addLesson: (lesson: Omit<Lesson, "id">) => void
  respondToRequest: (requestId: string) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(defaultState)
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistedState>
        setState({
          user: parsed.user
            ? { role: "student", ...parsed.user }
            : null,
          savedIds: parsed.savedIds ?? [],
          progress: parsed.progress ?? {},
          // merge seed with any custom opportunities saved by the admin
          opportunities:
            parsed.opportunities && parsed.opportunities.length > 0
              ? parsed.opportunities
              : seedOpportunities,
          telegramConnected: parsed.telegramConnected ?? false,
          lang: parsed.lang ?? "ru",
          lessons:
            parsed.lessons && parsed.lessons.length > 0
              ? parsed.lessons
              : seedLessons,
          enrolledLessonIds: parsed.enrolledLessonIds ?? [],
          helpRequests:
            parsed.helpRequests && parsed.helpRequests.length > 0
              ? parsed.helpRequests
              : seedHelpRequests,
        })
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true)
  }, [])

  // Persist on every change (after hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore quota errors
    }
  }, [state, hydrated])

  const register = useCallback(
    (name: string, email: string, password: string, role: Role = "student") => {
      setState((prev) => ({
        ...prev,
        user: {
          name,
          email,
          password,
          role,
          grade: null,
          interests: [],
          goal: null,
          onboarded: false,
        },
      }))
    },
    [],
  )

  const completeOnboarding = useCallback(
    (grade: string, interests: Category[], goal: Goal) => {
      setState((prev) =>
        prev.user
          ? {
              ...prev,
              user: { ...prev.user, grade, interests, goal, onboarded: true },
            }
          : prev,
      )
    },
    [],
  )

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, user: null }))
  }, [])

  const toggleSave = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      savedIds: prev.savedIds.includes(id)
        ? prev.savedIds.filter((x) => x !== id)
        : [...prev.savedIds, id],
    }))
  }, [])

  const removeSave = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      savedIds: prev.savedIds.filter((x) => x !== id),
    }))
  }, [])

  const setLessonCompleted = useCallback((lessonId: string) => {
    setState((prev) => ({
      ...prev,
      progress: { ...prev.progress, [lessonId]: true },
    }))
  }, [])

  const addOpportunity = useCallback((opp: Omit<Opportunity, "id">) => {
    setState((prev) => {
      const nextId =
        prev.opportunities.reduce((max, o) => Math.max(max, o.id), 0) + 1
      return {
        ...prev,
        opportunities: [{ id: nextId, ...opp }, ...prev.opportunities],
      }
    })
  }, [])

  const connectTelegram = useCallback(() => {
    setState((prev) => ({ ...prev, telegramConnected: true }))
  }, [])

  const setLang = useCallback((lang: Lang) => {
    setState((prev) => ({ ...prev, lang }))
  }, [])

  const enrollLesson = useCallback((lessonId: string) => {
    setState((prev) => ({
      ...prev,
      enrolledLessonIds: prev.enrolledLessonIds.includes(lessonId)
        ? prev.enrolledLessonIds
        : [...prev.enrolledLessonIds, lessonId],
    }))
  }, [])

  const addLesson = useCallback((lesson: Omit<Lesson, "id">) => {
    setState((prev) => ({
      ...prev,
      lessons: [{ id: `l-${Date.now()}`, ...lesson }, ...prev.lessons],
    }))
  }, [])

  const respondToRequest = useCallback((requestId: string) => {
    setState((prev) => ({
      ...prev,
      helpRequests: prev.helpRequests.map((r) =>
        r.id === requestId ? { ...r, status: "responded" } : r,
      ),
    }))
  }, [])

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      hydrated,
      register,
      completeOnboarding,
      logout,
      toggleSave,
      removeSave,
      setLessonCompleted,
      addOpportunity,
      connectTelegram,
      setLang,
      enrollLesson,
      addLesson,
      respondToRequest,
    }),
    [
      state,
      hydrated,
      register,
      completeOnboarding,
      logout,
      toggleSave,
      removeSave,
      setLessonCompleted,
      addOpportunity,
      connectTelegram,
      setLang,
      enrollLesson,
      addLesson,
      respondToRequest,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}

// --- Helpers ---

const RU_MONTHS: Record<string, number> = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
}

export function parseDeadline(deadline: string): number {
  // expects "25 июня 2026"
  const parts = deadline.trim().split(/\s+/)
  if (parts.length === 3) {
    const day = Number(parts[0])
    const month = RU_MONTHS[parts[1].toLowerCase()]
    const year = Number(parts[2])
    if (!Number.isNaN(day) && month !== undefined && !Number.isNaN(year)) {
      return new Date(year, month, day).getTime()
    }
  }
  return Number.MAX_SAFE_INTEGER
}

export type { Opportunity, Category }
