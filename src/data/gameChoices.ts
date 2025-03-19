/* eslint-disable sort-keys */

import { ChoiceSection } from "../types";

const gameChoices: ChoiceSection[] = [
    {
        section: "Background and Psych Profile",
        choices: [
            {
                id: "background",
                title: "Character Background",
                options: [
                    { id: "spacer", label: "Spacer", paragon: 10, renegade: 0 },
                    { id: "colonist", label: "Colonist", paragon: 5, renegade: 5 },
                    { id: "earthborn", label: "Earthborn", paragon: 0, renegade: 10 },
                ],
            },
            {
                id: "psych-profile",
                title: "Psychological Profile",
                options: [
                    { id: "war-hero", label: "War Hero", paragon: 10, renegade: 0 },
                    { id: "sole-survivor", label: "Sole Survivor", paragon: 5, renegade: 5 },
                    { id: "ruthless", label: "Ruthless", paragon: 0, renegade: 10 },
                ],
            },
        ],
        info: "Your character background and psychological profile determine your starting morality points.",
    },
    {
        section: "Prologue: Find the Beacon",
        choices: [
            {
                id: "joker-and-kaidan",
                title: "Joker and Kaidan",
                options: [
                    { id: "paragon", label: "I agree.", paragon: 2, renegade: 0 },
                    { id: "renegade", label: "Cut the chatter!", paragon: 0, renegade: 2 },
                    { id: "neutral", label: "(Skip)", paragon: 0, renegade: 0 },
                ],
            },
        ],
    },
];

export default gameChoices;
