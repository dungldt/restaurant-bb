'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NotFound(): JSX.Element {
  const [countdown, setCountdown] = useState(4)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      router.push('/')
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-orange-200 mb-4">404</div>
          <div className="relative">
            <div className="text-6xl mb-4">🍜</div>
            <div className="absolute inset-0 text-6xl animate-pulse opacity-50">🔍</div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 text-md">
            Oops! The restaurant page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            Don't worry, let's get you back to our delicious menu!
          </p>
        </div>

        {/* Countdown and Redirect */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-orange-100">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-gray-700 font-medium">
            Redirecting to home in{' '}
            <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 font-bold rounded-full text-lg">
              {countdown}
            </span>{' '}
            seconds...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            🏠 Go Home Now
          </Link>
          <button
            onClick={() => window.history.back()}
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            ← Go Back
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">Looking for something specific?</p>
          <div className="flex justify-center space-x-4">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              🍽️ Browse Restaurants
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
