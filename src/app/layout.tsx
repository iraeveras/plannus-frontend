// File: src/app/layout.tsx
import { cookies } from "next/headers";
import { Suspense } from "react";
import { ThemeProvider } from "@/context/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { ClientLayout } from "@/components/layout/clientLayout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = cookies()
  const defaultOpen = (await cookieStore).get("sidebar:state")?.value === "true"

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientLayout defaultOpen={defaultOpen}>
              <Suspense fallback={<div>Carregando...</div>}>
                {children}
              </Suspense>
            </ClientLayout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
