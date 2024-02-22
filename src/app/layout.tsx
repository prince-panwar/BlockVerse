"use client"
import Nav from './components/Navbar/Navbar';
import './globals.css'
import NextUiProvider from "./providers/NextUiProvider";
import { ContractProvider } from './Context/ContractContext';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <html lang="en" suppressHydrationWarning>
     <body>
      <ContractProvider>
      <NextUiProvider> 
        <Nav/>
          {children}
      </NextUiProvider>
      </ContractProvider>
      </body>
    </html>
 
  )
}
