import { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { FiMenu } from "react-icons/fi"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Toggle button for mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute top-4 left-4 z-50 block text-black md:hidden"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar for mobile - overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-gray-800 shadow-lg">
            <Sidebar />
          </div>
          {/* Overlay background to close */}
          <div
            className="flex-1 bg-gray-800 bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
