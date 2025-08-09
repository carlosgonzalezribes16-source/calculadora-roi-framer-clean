
import React from "react";
import { createRoot } from "react-dom/client";
import CalculadoraROI from "./CalculadoraROI.jsx";
import "./styles.css";

const rootElem = document.getElementById("root");
const params = new URLSearchParams(window.location.search);
const bg = params.get("bg");
const clean = params.get("clean") === "1" || params.get("clean") === "true";
const compact = params.get("compact") === "1" || params.get("compact") === "true";

if (bg === "lavender") document.body.classList.add("bg-lavender");

createRoot(rootElem).render(<CalculadoraROI clean={clean} compact={compact} />);
