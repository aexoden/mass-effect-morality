/* eslint-disable sort-keys */

import { SectionData } from "../types";

const gameChoices: SectionData[] = [
    {
        id: "history-and-profile",
        title: "Pre-Service History and Psychological Profile",
        description: "Pre-service history and psychological profile selected during character creation determine your starting morality points.",
        groups: [
            {
                id: "pre-service-history",
                title: "Pre-Service History",
                choices: [
                    {
                        id: "pre-service-history",
                        options: [
                            { id: "spacer", label: "Spacer", paragon: 10, renegade: 0 },
                            { id: "colonist", label: "Colonist", paragon: 5, renegade: 5 },
                            { id: "earthborn", label: "Earthborn", paragon: 0, renegade: 10 },
                        ],
                        isForced: true,
                    },
                ],
            },
            {
                id: "psych-profile",
                title: "Psychological Profile",
                choices: [
                    {
                        id: "psych-profile",
                        options: [
                            { id: "war-hero", label: "War Hero", paragon: 10, renegade: 0 },
                            { id: "sole-survivor", label: "Sole Survivor", paragon: 5, renegade: 5 },
                            { id: "ruthless", label: "Ruthless", paragon: 0, renegade: 10 },
                        ],
                        isForced: true,
                    },
                ],
            },
        ],
    },
    {
        id: "prologue",
        title: "Prologue: Find the Beacon",
        groups: [
            {
                id: "joker-and-kaidan",
                title: "Joker and Kaidan",
                choices: [
                    {
                        id: "joker-and-kaidan",
                        options: [
                            { id: "paragon", label: "I agree.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Cut the chatter!", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
            {
                id: "jenkins-and-chakwas",
                title: "Richard L. Jenkins and Doctor Chakwas",
                choices: [
                    {
                        id: "jenkins-and-chakwas",
                        options: [
                            { id: "paragon", label: "Relax, Jenkins.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Part of the job, Doc.", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
            {
                id: "first-contact",
                title: "First Contact",
                choices: [
                    {
                        id: "first-contact",
                        options: [
                            { id: "paragon", label: "He deserves a burial.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Forget about him.", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
            {
                id: "ashley-williams",
                title: "Ashley Williams",
                choices: [
                    {
                        id: "ashley-williams-1",
                        options: [
                            { id: "paragon", label: "Are you okay?", paragon: 2, renegade: 0 },
                        ],
                    },
                    {
                        id: "ashley-williams-2",
                        description: "After asking Ashley what happened to her squad.",
                        options: [
                            { id: "paragon", label: "Don't blame yourself.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "You abandoned them.", paragon: 0, renegade: 2 },
                        ],
                    },
                    {
                        id: "ashley-williams-3",
                        description: 'After telling Ashley "Stay here."',
                        options: [
                            { id: "renegade", label: "Fine, come with us.", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
        ],
    },
];

function validateUniqueIds(data: SectionData[]) {
    const sectionIds = new Set<string>();
    const groupIds = new Set<string>();
    const choiceIds = new Set<string>();

    const sectionDuplicates: string[] = [];
    const groupDuplicates: string[] = [];
    const choiceDuplicates: string[] = [];

    data.forEach((section) => {
        if (sectionIds.has(section.id)) {
            sectionDuplicates.push(section.id);
        } else {
            sectionIds.add(section.id);
        }

        section.groups.forEach((group) => {
            if (groupIds.has(group.id)) {
                groupDuplicates.push(group.id);
            } else {
                groupIds.add(group.id);
            }

            group.choices.forEach((choice) => {
                if (choiceIds.has(choice.id)) {
                    choiceDuplicates.push(choice.id);
                } else {
                    choiceIds.add(choice.id);
                }
            });
        });
    });

    if (sectionDuplicates.length > 0) {
        console.error(`Duplicate section IDs found: ${sectionDuplicates.join(", ")}`);
    }

    if (groupDuplicates.length > 0) {
        console.error(`Duplicate group IDs found: ${groupDuplicates.join(", ")}`);
    }

    if (choiceDuplicates.length > 0) {
        console.error(`Duplicate choice IDs found: ${choiceDuplicates.join(", ")}`);
    }
}

validateUniqueIds(gameChoices);

export default gameChoices;
