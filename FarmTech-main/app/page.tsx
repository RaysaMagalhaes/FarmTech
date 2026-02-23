"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  MilkIcon as Cow,
  DollarSign,
  Droplets,
  Heart,
  Menu,
  Settings,
  Users,
  Wheat,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Import all page components
import DashboardPage from "@/components/pages/dashboard-page"
import RebanhoPage from "@/components/pages/rebanho-page"
import ProducaoPage from "@/components/pages/producao-page"
import AlimentacaoPage from "@/components/pages/alimentacao-page"
import SaudePage from "@/components/pages/saude-page"
import ReproducaoPage from "@/components/pages/reproducao-page"
import FinanceiroPage from "@/components/pages/financeiro-page"
import FuncionariosPage from "@/components/pages/funcionarios-page"
import ConfiguracoesPage from "@/components/pages/configuracoes-page"

export default function FarmDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard")

  const menuItems = [
    { icon: BarChart3, label: "Dashboard" },
    { icon: Cow, label: "Rebanho" },
    { icon: Droplets, label: "Produção" },
    { icon: Wheat, label: "Alimentação" },
    { icon: Heart, label: "Saúde" },
    { icon: Calendar, label: "Reprodução" },
    // { icon: DollarSign, label: "Financeiro" },
    // { icon: Users, label: "Funcionários" },
    // { icon: Settings, label: "Configurações" },
  ]

  const renderActivePage = () => {
    switch (activeMenuItem) {
      case "Dashboard":
        return <DashboardPage />
      case "Rebanho":
        return <RebanhoPage />
      case "Produção":
        return <ProducaoPage />
      case "Alimentação":
        return <AlimentacaoPage />
      case "Saúde":
        return <SaudePage />
      case "Reprodução":
        return <ReproducaoPage />
      // case "Financeiro":
      //   return <FinanceiroPage />
      // case "Funcionários":
      //   return <FuncionariosPage />
      // case "Configurações":
      //   return <ConfiguracoesPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-[#F7F3E5] shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}
      >
        <div className="flex items-center h-16 px-6 border-b">
          <img src="favicon2.png" alt="FarmTech" style={{
            height: "50px",
            width: "50px",
          }}/>
          <h1 className="text-xl font-bold text-green-900">FarmTech</h1>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveMenuItem(item.label)
                setSidebarOpen(false) // Close sidebar on mobile after selection
              }}
              className={`flex items-center w-full px-6 py-3 text-sm font-medium transition-colors text-left ${
                activeMenuItem === item.label
                  ? "bg-green-100 text-green-800 border-r-2 border-green-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#F7F3E5] shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
              <h2 className="text-2xl font-semibold text-green-900">{activeMenuItem}</h2>
            </div>
            {/* <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-100 text-green-800" onClick={() => {
                location.href = "/login"
              }}>
                Login
              </Badge>
            </div> */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#fff] p-6">{renderActivePage()}</main>
      </div>
    </div>
  )
}
