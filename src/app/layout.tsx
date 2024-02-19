"use client"
import './globals.css'

import NextUiProvider from "./providers/NextUiProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <html lang="en">
     <body>
      <NextUiProvider> 
          {children}
      </NextUiProvider>
      </body>
    </html>
 
  )
}
