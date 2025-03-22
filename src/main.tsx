import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { validateGameData } from "./data/validation";
import gameChoicesData from "./data/gameChoices";

const { valid, errors } = validateGameData(gameChoicesData);

if (!valid && import.meta.env.DEV) {
    console.error("Game data validation failed:");
    errors.forEach((error) => {
        console.error(`- ${error}`);
    });
    throw new Error("Invalid game data. See console for details.");
}

if (!valid && import.meta.env.PROD) {
    console.error("Game data has validation issues:", errors);
}

const rootElement = document.getElementById("root");

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
} else {
    console.error("Root element not found");
}
