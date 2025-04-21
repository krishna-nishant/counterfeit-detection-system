"use client"

import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Layout({ children, title = "Admin Dashboard" }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    { text: "Dashboard", icon: "dashboard", path: "/" },
    { text: "Generate QR Codes", icon: "qr_code", path: "/generate" },
    { text: "Statistics", icon: "bar_chart", path: "/stats" },
    { text: "Verify Your Product", icon: "smartphone", path: "/test" },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Counterfeit Detection</h2>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.text}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile sidebar backdrop */}
      {mobileOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={handleDrawerToggle}></div>}

      {/* Sidebar - mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Counterfeit Detection</h2>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.text}>
                <button
                  onClick={() => {
                    navigate(item.path)
                    setMobileOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center h-16 bg-white border-b border-gray-200 px-4 shadow-sm">
          <button onClick={handleDrawerToggle} className="p-2 rounded-md text-gray-500 hover:bg-gray-100 md:hidden">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="ml-2 text-xl font-semibold text-gray-800">{title}</h1>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export default Layout
