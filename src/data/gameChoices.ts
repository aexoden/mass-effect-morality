/* eslint-disable sort-keys */

import { ChoiceSection } from "../types";

const gameChoices: ChoiceSection[] = [
    {
        section: "Pre-Service History and Psychological Profile",
        choices: [
            {
                id: "pre-service-history",
                title: "Pre-Service History",
                options: [
                    { id: "spacer", label: "Spacer", paragon: 10, renegade: 0 },
                    { id: "colonist", label: "Colonist", paragon: 5, renegade: 5 },
                    { id: "earthborn", label: "Earthborn", paragon: 0, renegade: 10 },
                ],
                isForced: true,
            },
            {
                id: "psych-profile",
                title: "Psychological Profile",
                options: [
                    { id: "war-hero", label: "War Hero", paragon: 10, renegade: 0 },
                    { id: "sole-survivor", label: "Sole Survivor", paragon: 5, renegade: 5 },
                    { id: "ruthless", label: "Ruthless", paragon: 0, renegade: 10 },
                ],
                isForced: true,
            },
        ],
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
                ],
            },
            {
                id: "jenkins-and-chakwas",
                title: "Richard L. Jenkins and Doctor Chakwas",
                options: [
                    { id: "paragon", label: "Relax, Jenkins.", paragon: 2, renegade: 0 },
                    { id: "renegade", label: "Part of the job, Doc.", paragon: 0, renegade: 2 },
                ],
            },
            {
                id: "first-contact",
                title: "First Contact",
                options: [
                    { id: "paragon", label: "He deserves a burial.", paragon: 2, renegade: 0 },
                    { id: "renegade", label: "Forget about him.", paragon: 0, renegade: 2 },
                ],
            },
            {
                id: "ashley-williams-1",
                title: "Ashley Williams",
                options: [
                    { id: "paragon", label: "Are you okay?", paragon: 2, renegade: 0 },
                ],
            },
            {
                id: "ashley-williams-2",
                title: "Ashley Williams (cont.)",
                info: "To get this choice, you must ask Ashley what happened to her squad.",
                options: [
                    { id: "paragon", label: "Don't blame yourself.", paragon: 2, renegade: 0 },
                    { id: "renegade", label: "You abandoned them.", paragon: 0, renegade: 2 },
                ],
            },
            {
                id: "ashley-williams-3",
                title: "Ashley Williams (cont.)",
                info: 'To get this choice, you must tell Ashley "Stay here."',
                options: [
                    { id: "renegade", label: "Fine, come with us.", paragon: 0, renegade: 2 },
                ],
            },
        ],
    },
];

export default gameChoices;
