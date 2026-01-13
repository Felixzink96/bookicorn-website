export const metadata = {
  title: 'Sanity Studio | Bookicorn',
  description: 'Content Management für Bookicorn Website',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
