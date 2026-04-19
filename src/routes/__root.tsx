import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Cursor } from "@/components/site/Cursor";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Lost in the void</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has drifted out of orbit.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-glow"
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Darji Dev — Full-Stack Developer in Ahmedabad" },
      { name: "description", content: "Portfolio of Darji Dev, a full-stack developer crafting scalable digital experiences with React, Node.js, and modern web tech." },
      { name: "author", content: "Darji Dev" },
      { property: "og:title", content: "Darji Dev — Full-Stack Developer" },
      { property: "og:description", content: "Building scalable digital experiences from Ahmedabad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a0a0f" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <Cursor />
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
