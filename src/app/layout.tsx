"use client"
import Nav from './components/Navbar/Navbar';
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
        <Nav/>
          {children}
      </NextUiProvider>
      </body>
    </html>
 
  )
}
