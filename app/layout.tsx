import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aula - Search Browser',
  description: 'A modern search browser',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

