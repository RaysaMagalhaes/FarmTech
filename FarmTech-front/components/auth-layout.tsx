import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">{children}</div>
}
