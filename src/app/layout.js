import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CAT Mock Test - Powered by iQuanta',
  description: 'Professional CAT Exam Preparation Platform with realistic mock tests, detailed analytics, and expert coaching from iQuanta',
  keywords: 'CAT exam, mock test, iQuanta, CAT preparation, quantitative aptitude, verbal ability, logical reasoning',
  authors: [{ name: 'iQuanta' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          themes={['light', 'dark']}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
