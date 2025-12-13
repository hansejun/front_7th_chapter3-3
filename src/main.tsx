import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TanstackQueryProvider } from "@app/index.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <App />
      <ReactQueryDevtools />
    </TanstackQueryProvider>
  </StrictMode>,
)
