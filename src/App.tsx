import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Adventure } from "@/pages/Adventure";
import { Gacha } from "@/pages/Gacha";
import { Collection } from "@/pages/Collection";
import { Bonds } from "@/pages/Bonds";
import { Deck } from "@/pages/Deck";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/adventure/:id" element={<Adventure />} />
        <Route path="/gacha" element={<Gacha />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/bonds" element={<Bonds />} />
        <Route path="/deck" element={<Deck />} />
      </Routes>
    </Router>
  );
}
