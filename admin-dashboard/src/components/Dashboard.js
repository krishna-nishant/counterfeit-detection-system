"use client"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto">
      <div className="my-6">
        <h1 className="text-3xl font-bold text-gray-800">Counterfeit Product Detection System</h1>
        <p className="text-gray-600 mt-2">
          An admin dashboard to generate QR codes and monitor product verification statistics.
        </p>
      </div>

      <div className="p-6 mb-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md">
        <h2 className="text-2xl font-bold mb-2">Welcome to the Admin Dashboard</h2>
        <p className="mb-6 opacity-90">
          This dashboard helps you generate secure one-time QR codes for your products and track verification
          statistics. Apply these QR codes to your product packaging along with scratch labels to prevent counterfeit
          products.
        </p>
        <button
          onClick={() => navigate("/generate")}
          className="px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm"
        >
          Generate QR Codes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          onClick={() => navigate("/generate")}
          className="group cursor-pointer bg-white rounded-xl p-8 text-center transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100"
        >
          <span className="material-symbols-outlined text-6xl text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-200">
            qr_code
          </span>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Generate QR Codes</h3>
          <p className="text-gray-600">Create unique one-time QR codes to apply on your product packaging.</p>
        </div>

        <div
          onClick={() => navigate("/stats")}
          className="group cursor-pointer bg-white rounded-xl p-8 text-center transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100"
        >
          <span className="material-symbols-outlined text-6xl text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-200">
            bar_chart
          </span>
          <h3 className="text-xl font-bold text-gray-800 mb-2">View Statistics</h3>
          <p className="text-gray-600">Monitor verification statistics and detect suspicious activities.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <span className="material-symbols-outlined text-3xl text-blue-500 mr-2">qr_code</span>
            <h3 className="text-lg font-bold text-gray-800">Step 1: Generate QR Codes</h3>
          </div>
          <p className="text-gray-600">
            Generate unique QR codes with corresponding keys that are stored in the database. Each QR code contains a
            unique ID and a secure key.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <span className="material-symbols-outlined text-3xl text-blue-500 mr-2">security</span>
            <h3 className="text-lg font-bold text-gray-800">Step 2: Apply on Products</h3>
          </div>
          <p className="text-gray-600">
            Print and apply the QR codes on product packaging with a scratch label over them. The scratch label prevents
            the QR code from being scanned before purchase.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <span className="material-symbols-outlined text-3xl text-blue-500 mr-2">info</span>
            <h3 className="text-lg font-bold text-gray-800">Step 3: Monitor Verification</h3>
          </div>
          <p className="text-gray-600">
            Track verification statistics, including authentic scans, counterfeit attempts, and regional distribution of
            your products.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
