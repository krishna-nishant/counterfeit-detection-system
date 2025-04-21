"use client"

import { useState, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { generateQRCodes } from "../services/api"

const QRCodeGenerator = () => {
  const [count, setCount] = useState(10)
  const [productCategory, setProductCategory] = useState("")
  const [productName, setProductName] = useState("")
  const [productId, setProductId] = useState("")
  const [loading, setLoading] = useState(false)
  const [generatedCodes, setGeneratedCodes] = useState([])
  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productInfo = {
        name: productName,
        category: productCategory,
        id: productId,
        generated_at: new Date().toISOString(),
      }

      const response = await generateQRCodes(count, productInfo)
      setGeneratedCodes(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error generating QR codes:", error)
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Generate QR Codes</h2>
        <p className="text-gray-600 mb-6">
          Generate unique QR codes to apply on product packaging. Each QR code can only be used once for verification.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of QR Codes</label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number.parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
                min="1"
                max="1000"
              />
              <p className="mt-1 text-xs text-gray-500">Maximum 1000 codes at once</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              >
                <option value="">Select category...</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="beauty">Beauty</option>
                <option value="pharmaceutical">Pharmaceutical</option>
                <option value="food">Food & Beverages</option>
                <option value="other">Other</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">Category of the product</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  <span>Generating...</span>
                </div>
              ) : (
                "Generate QR Codes"
              )}
            </button>

            {generatedCodes.length > 0 && (
              <button
                type="button"
                onClick={handlePrint}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Print QR Codes
              </button>
            )}
          </div>
        </form>
      </div>

      {generatedCodes.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100" ref={printRef}>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Generated QR Codes</h2>
          <p className="text-gray-600 mb-6">
            Print these QR codes and apply them on product packaging with a scratch label.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {generatedCodes.map((code, index) => (
              <div key={code.code_id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <img src={code.qrCodeImage || "/placeholder.svg"} alt={`QR Code ${index + 1}`} className="w-full" />
                <div className="p-2 text-center">
                  <p className="text-xs text-gray-500">Code #{index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default QRCodeGenerator
