import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <title>Dyt. Betül Ozan - Beslenme Danışmanlığı</title>
        <meta name="description" content="Profesyonel beslenme danışmanlığı hizmetleri" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}