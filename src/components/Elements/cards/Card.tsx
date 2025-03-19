import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return <div className={`bg-gray-100 rounded-lg shadow-lg border-2 border-gray-200 ${className}`}>{children}</div>
}

export const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => {
  return <div className={`flex items-center justify-between font-semibold text-2xl ${className}`}>{children}</div>
}

export const CardContent: React.FC<CardProps> = ({ children, className = "" }) => {
  return <div className={`shadow-lg rounded-md ${className}`}>{children}</div>
}

export const CardTitle: React.FC<CardProps> = ({ children, className = "" }) => {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
}