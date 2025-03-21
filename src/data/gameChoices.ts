/* eslint-disable sort-keys */

import { SectionData } from "../types";

const gameChoices: SectionData[] = [
    {
        id: "history-and-profile",
        title: "Pre-Service History and Psychological Profile",
        description:
            "Pre-service history and psychological profile selected during character creation determine your starting morality points.",
        groups: [
            {
                id: "male-or-female",
                title: "Male or Female",
                choices: [
                    {
                        id: "male-or-female",
                        description: "One choice is only available for a female Shepard.",
                        options: [
                            { id: "male", label: "Male", paragon: 0, renegade: 0 },
                            { id: "female", label: "Female", paragon: 0, renegade: 0 },
                        ],
                        isForced: true,
                    },
                ],
            },
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
                        options: [{ id: "paragon", label: "Are you okay?", paragon: 2, renegade: 0 }],
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
                        options: [{ id: "renegade", label: "Fine, come with us.", paragon: 0, renegade: 2 }],
                    },
                ],
            },
            {
                id: "manuel-and-dr-warren",
                title: "Manuel and Dr. Warren",
                choices: [
                    {
                        id: "manuel-and-dr-warren-1",
                        options: [{ id: "paragon", label: "You're safe.", paragon: 2, renegade: 0 }],
                    },
                    {
                        id: "manuel-and-dr-warren-2",
                        description: "After asking about the assistant.",
                        options: [{ id: "renegade", label: "Shutting Manuel up.", paragon: 0, renegade: 9 }],
                    },
                ],
            },
            {
                id: "cole-and-friends",
                title: "Cole and Friends",
                choices: [
                    {
                        id: "cole-and-friends-1",
                        options: [{ id: "paragon", label: "It's safe.", paragon: 2, renegade: 0 }],
                    },
                    {
                        id: "cole-and-friends-2",
                        options: [
                            {
                                id: "renegade",
                                label: "You're holding out on me.",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 1 } }],
                            },
                        ],
                    },
                    {
                        id: "cole-and-friends-3",
                        options: [
                            {
                                id: "paragon",
                                label: "He may know something.",
                                paragon: 2,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 2 } }],
                            },
                            {
                                id: "renegade",
                                label: "Is he worth dying for?",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 2 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "the-smuggler",
                title: "The Smuggler",
                choices: [
                    {
                        id: "the-smuggler-1",
                        description: "Available if you extracted the smuggler's name from Cole and friends.",
                        options: [{ id: "paragon", label: "Let it go, Williams.", paragon: 2, renegade: 0 }],
                        dependsOn: [
                            { choiceId: "cole-and-friends-3", optionId: "paragon" },
                            { choiceId: "cole-and-friends-3", optionId: "renegade" },
                        ],
                    },
                    {
                        id: "the-smuggler-2",
                        options: [
                            {
                                id: "renegade",
                                label: "You're lying!",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 3 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "kaidan-after-prologue",
                title: "Kaidan (on the Normandy)",
                choices: [
                    {
                        id: "kaidan-after-prologue",
                        description: "Available only for a female Shepard.",
                        options: [
                            { id: "paragon", label: "You helped.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "The mission failed.", paragon: 0, renegade: 2 },
                        ],
                        dependsOn: [
                            {
                                choiceId: "male-or-female",
                                optionId: "female",
                            },
                        ],
                    },
                ],
            },
            {
                id: "ashley-after-prologue",
                title: "Ashley (on the Normandy)",
                choices: [
                    {
                        id: "ashley-after-prologue",
                        options: [
                            { id: "paragon", label: "You helped.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "The mission failed.", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "citadel-expose-saren",
        title: "Citadel: Expose Saren",
        groups: [
            {
                id: "arrival-at-citadel",
                title: "Arrival at the Citadel",
                choices: [
                    {
                        id: "arrival-at-citadel",
                        options: [{ id: "renegade", label: "They're blind.", paragon: 0, renegade: 2 }],
                    },
                ],
            },
            {
                id: "council-meeting-1",
                title: "First Council Meeting",
                choices: [
                    {
                        id: "council-meeting-1",
                        options: [{ id: "paragon", label: "Quit protecting him!", paragon: 2, renegade: 0 }],
                    },
                ],
            },
            {
                id: "citadel-garrus",
                title: "Citadel: Garrus",
                choices: [
                    {
                        id: "citadel-garrus",
                        options: [
                            { id: "paragon", label: "It was a big risk.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Nice shot.", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
            {
                id: "fist-henchmen",
                title: "Fist's Henchmen",
                choices: [
                    {
                        id: "fist-henchmen",
                        description: "Conversation only happens if you have charm or intimidate talent at level 3.",
                        options: [
                            {
                                id: "paragon",
                                label: "Save yourselves.",
                                paragon: 2,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 3 } }],
                            },
                            {
                                id: "renegade",
                                label: "You're making a mistake.",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 3 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "fist",
                title: "Fist",
                choices: [
                    {
                        id: "fist",
                        options: [
                            {
                                id: "renegade",
                                label: "You don't deserve to live. / He deserved it.",
                                paragon: 0,
                                renegade: 2,
                            },
                        ],
                    },
                ],
            },
            {
                id: "council-meeting-2",
                title: "Second Council Meeting",
                choices: [
                    {
                        id: "council-meeting-2",
                        options: [
                            { id: "paragon", label: "It's the best solution.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Quit holding us back!", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
            {
                id: "udina-at-docks",
                title: "Ambassador Udina (at the Docks)",
                choices: [
                    {
                        id: "udina-at-docks",
                        options: [
                            { id: "paragon", label: "I'll be careful.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "That's your job.", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
            {
                id: "departing-speech",
                title: "Departing Speech",
                description: "You can only earn either paragon or renegade points, but not both.",
                choices: [
                    {
                        id: "departing-speech-1",
                        options: [
                            { id: "paragon", label: "Humanity must do its part.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Nobody's going to help us.", paragon: 0, renegade: 2 },
                        ],
                    },
                    {
                        id: "departing-speech-2",
                        options: [
                            {
                                id: "paragon",
                                label: "Everyone is counting on us.",
                                paragon: 2,
                                renegade: 0,
                                dependsOn: [
                                    {
                                        dependsOn: [
                                            { choiceId: "departing-speech-1", optionId: "paragon" },
                                            { choiceId: "departing-speech-1", optionId: "skip" },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "renegade",
                                label: "Humanity's in this alone!",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [
                                    {
                                        dependsOn: [
                                            { choiceId: "departing-speech-1", optionId: "renegade" },
                                            { choiceId: "departing-speech-1", optionId: "skip" },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: "navigator-pressly",
                title: "Navigator Pressly",
                choices: [
                    {
                        id: "navigator-pressly-1",
                        description: "Choosing the renegade option first will lock out this choice.",
                        options: [{ id: "paragon", label: "They're on our side.", paragon: 2, renegade: 0 }],
                    },
                    {
                        id: "navigator-pressly-2",
                        options: [{ id: "renegade", label: "You doubt my decisions?", paragon: 0, renegade: 2 }],
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
