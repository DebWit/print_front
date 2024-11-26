import "primeflex/primeflex.min.css"
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";


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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Lilita One', sans-serif" }}>{children}</body>
    </html>
  )
}