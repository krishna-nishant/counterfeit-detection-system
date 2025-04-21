"use client"

import { useState, useEffect } from "react"
import { getStats } from "../services/api"
import { Bar, Pie } from "react-chartjs-2"

const Statistics = () => {
  const [statsData, setStatsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats()
        setStatsData(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching statistics:", error)
        setError("Failed to load statistics. Please try again later.")
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center my-8">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    )
  }

  // Prepare data for QR code usage chart
  const qrCodeUsageData = {
    labels: ["Used", "Unused"],
    datasets: [
      {
        data: [statsData.usedQRCodes, statsData.unusedQRCodes],
        backgroundColor: ["#10b981", "#3b82f6"],
        hoverBackgroundColor: ["#059669", "#2563eb"],
      },
    ],
  }

  // Prepare data for scan statistics chart
  const scanStatsData = {
    labels: ["Authentic Scans", "Counterfeit Scan Attempts"],
    datasets: [
      {
        data: [statsData.authenticScans, statsData.counterfeitScanAttempts],
        backgroundColor: ["#10b981", "#ef4444"],
        hoverBackgroundColor: ["#059669", "#dc2626"],
      },
    ],
  }

  // Prepare data for regional distribution
  const regions = statsData.regionalData.map((item) => item._id || "Unknown")
  const regionCounts = statsData.regionalData.map((item) => item.count)

  const regionalData = {
    labels: regions,
    datasets: [
      {
        label: "Number of Scans",
        data: regionCounts,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Statistics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total QR Codes</p>
          <p className="text-3xl font-bold text-gray-800">{statsData.totalQRCodes}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Used QR Codes</p>
          <p className="text-3xl font-bold text-gray-800">{statsData.usedQRCodes}</p>
          <p className="text-sm text-gray-500 mt-1">{Math.round(statsData.usagePercentage)}% of total</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Scans</p>
          <p className="text-3xl font-bold text-gray-800">{statsData.totalScans}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Counterfeit Attempts</p>
          <p className="text-3xl font-bold text-red-500">{statsData.counterfeitScanAttempts}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">QR Code Usage</h2>
          <div className="h-64">
            <Pie data={qrCodeUsageData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Scan Statistics</h2>
          <div className="h-64">
            <Pie data={scanStatsData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Regional Distribution</h2>
        <div className="h-80">
          <Bar
            data={regionalData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of Scans",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Region",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Statistics
