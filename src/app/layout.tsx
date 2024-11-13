// onde guardamos as informações dos imports das bibliotecas e algumas ferramentas

import "primeflex/primeflex.min.css"
import 'primeicons/primeicons.css';


export const metadata = {
  title: 'Print',
  description: '',
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
