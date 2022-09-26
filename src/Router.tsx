import { Route, Routes } from "react-router-dom";

import { Event } from "./pages/Event";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Event />} />
      <Route path="/welcome/:slug" element={<Event />} />
    </Routes>
  )
}
