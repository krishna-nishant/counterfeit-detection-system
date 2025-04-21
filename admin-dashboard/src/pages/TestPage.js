"use client"

import { useState } from "react"
import Layout from "../components/Layout"
import axios from "axios"

const TestPage = () => {
  const [codeId, setCodeId] = useState("")
  const [key, setKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Simulating location data
      const location = {
        latitude: 37.7749,
        longitude: -122.4194,
        region: "California",
      }

      const response = await axios.post("/api/qrcodes/verify", {
        code_id: codeId,
        key: key,
        location: location,
      })

      setResult(response.data)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed")
      setLoading(false)
    }
  }

  return (
    <Layout title="Mobile App Simulator">
      <div className="container mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Mobile App Simulator</h2>
          <p className="text-gray-600 mb-6">
            This page simulates the mobile app's QR code scanning functionality. Enter a QR code ID and key manually to
            test.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">QR Code ID</label>
                <input
                  type="text"
                  value={codeId}
                  onChange={(e) => setCodeId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">QR Code Key</label>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined mr-2">qr_code_scanner</span>
                  <span>Verify QR Code</span>
                </>
              )}
            </button>
          </form>
        </div>

        {result && (
          <div className="bg-green-50 rounded-xl shadow-sm p-6 mb-6 border border-green-100">
            <div className="flex items-center mb-4">
              <span className="material-symbols-outlined text-green-500 text-3xl mr-2">check_circle</span>
              <h3 className="text-xl font-semibold text-green-800">{result.message}</h3>
            </div>

            {result.product_info && Object.keys(result.product_info).length > 0 && (
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="text-md font-medium text-gray-700 mb-3">Product Information:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(result.product_info).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}:
                      </span>
                      <span className="font-medium text-gray-800">
                        {typeof value === "object" ? JSON.stringify(value) : value.toString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-50 rounded-xl shadow-sm p-6 border border-red-100">
            <div className="flex items-center mb-4">
              <span className="material-symbols-outlined text-red-500 text-3xl mr-2">error</span>
              <h3 className="text-xl font-semibold text-red-800">{error}</h3>
            </div>
            <p className="text-gray-700">
              This could mean the product is counterfeit, the QR code has already been used, or there was a technical
              issue.
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default TestPage
