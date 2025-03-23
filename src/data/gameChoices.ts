/* eslint-disable sort-keys */

import { SectionData } from "../types";
import { flattenDependencies } from "../utils/dependencyUtils";

const gameChoices: SectionData[] = flattenDependencies([
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
                        dependsOn: [{ choiceId: "cole-and-friends-3", optionIds: ["paragon", "renegade"] }],
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
                        dependsOn: [{ choiceId: "male-or-female", optionIds: ["female"] }],
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
                description: "You can only earn either Paragon or Renegade points, but not both.",
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
                                        dependsOn: [{ choiceId: "departing-speech-1", optionIds: ["paragon", "skip"] }],
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
                                            { choiceId: "departing-speech-1", optionIds: ["renegade", "skip"] },
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
    {
        id: "citadel-assignments-1",
        title: "Citadel Assignments",
        groups: [
            {
                id: "citadel-asari-consort",
                title: "Citadel: Asari Consort",
                choices: [
                    {
                        id: "citadel-asari-consort",
                        options: [
                            { id: "paragon", label: "Glad to help.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Let's talk payment.", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
            {
                id: "citadel-doctor-michel",
                title: "Citadel: Doctor Michel",
                choices: [
                    {
                        id: "citadel-doctor-michel",
                        options: [
                            { id: "paragon", label: "Let's work this out.", paragon: 2, renegade: 0 },
                            {
                                id: "charm",
                                label: "You should reconsider.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 6 } }],
                            },
                            { id: "renegade", label: "Kill him.", paragon: 0, renegade: 2 },
                            {
                                id: "intimidate",
                                label: "Talk and you're dead!",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 3 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "citadel-the-fan",
                title: "Citadel: The Fan",
                choices: [
                    {
                        id: "citadel-the-fan",
                        description: "On your third encounter.",
                        options: [
                            {
                                id: "paragon",
                                label: "It's not that easy. / There are other fights. / Let's talk about trust.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 2 } }],
                            },
                            {
                                id: "renegade",
                                label: "That's a load of crap. / There are no good fights. / Here's a test.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 2 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "citadel-homecoming",
                title: "Citadel: Homecoming",
                choices: [
                    {
                        id: "citadel-homecoming",
                        options: [
                            {
                                id: "paragon-bosker",
                                label: "To Clerk Bosker: This isn't right.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 2 } }],
                            },
                            {
                                id: "renegade-bosker",
                                label: "To Clerk Bosker: I'm releasing the body.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 2 } }],
                            },
                            {
                                id: "paragon-samesh",
                                label: "To Samesh Bhatia: This is important.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 3 } }],
                            },
                            {
                                id: "renegade-samesh",
                                label: "To Samesh Bhatia: This is war.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 3 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "citadel-jahleeds-fears",
                title: "Citadel: Jahleed's Fears",
                choices: [
                    {
                        id: "citadel-jahleeds-fears-1",
                        description:
                            'To Chorban in the Lower Markets. The Paragon option is only available if you received "Citadel: Scan the Keepers" from Chorban, and the Renegade option is only available if you did not.',
                        options: [
                            { id: "paragon", label: "No more.", paragon: 8, renegade: 0 },
                            { id: "renegade", label: "You're not leaving.", paragon: 0, renegade: 9 },
                        ],
                    },
                    {
                        id: "citadel-jahleeds-fears-2",
                        description: "To Jahleed at C-Sec Academy.",
                        options: [
                            {
                                id: "paragon",
                                label: "Then do it legally.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 7 } }],
                            },
                            {
                                id: "renegade",
                                label: "Take it back!",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 6 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "citadel-presidium-prophet",
                title: "Citadel: Presidium Prophet",
                choices: [
                    {
                        id: "citadel-presidium-prophet",
                        options: [
                            {
                                id: "paragon-hanar",
                                label: "To the hanar: This is unworthy of you.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 4 } }],
                            },
                            {
                                id: "renegade-hanar",
                                label: "To the hanar: There's trouble anyway.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 6 } }],
                            },
                            {
                                id: "paragon-officer",
                                label: "To the officer: It's not causing trouble.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 7 } }],
                            },
                            {
                                id: "renegade-officer",
                                label: "To the officer: This is dangerous.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 4 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "citadel-reporters-request",
                title: "Citadel: Reporter's Request",
                choices: [
                    {
                        id: "citadel-reporters-request",
                        description: "Only available if you spoke to Emily Wong before dealing with Fist.",
                        options: [
                            {
                                id: "renegade",
                                label: "You owe me more.",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 2 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "citadel-ritas-sister",
                title: "Citadel: Rita's Sister",
                choices: [
                    {
                        id: "citadel-ritas-sister-1",
                        options: [
                            {
                                id: "paragon",
                                label: "You don't need her.",
                                paragon: 2,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 7 } }],
                            },
                            {
                                id: "renegade",
                                label: "Pathetic.",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 6 } }],
                            },
                        ],
                    },
                    {
                        id: "citadel-ritas-sister-2",
                        description:
                            "If following Paragon, be careful to not attempt to arrest Jax, or you will fight him and lose the potential Paragon points.",
                        options: [
                            {
                                id: "paragon",
                                label: "(Return the shipment to Chellick.)",
                                paragon: 8,
                                renegade: 0,
                            },
                            {
                                id: "renegade",
                                label: "(Fight Jax.)",
                                paragon: 0,
                                renegade: 9,
                            },
                        ],
                    },
                ],
            },
            {
                id: "citadel-xeltans-complaint",
                title: "Citadel: Xeltan's Complaint",
                choices: [
                    {
                        id: "citadel-xeltans-complaint",
                        options: [{ id: "paragon", label: "Don't worry.", paragon: 2, renegade: 0 }],
                    },
                ],
            },
            {
                id: "unc-hostile-takeover",
                title: "UNC: Hostile Takeover",
                choices: [
                    {
                        id: "unc-hostile-takeover-1",
                        options: [
                            { id: "paragon", label: "No. I won't do this.", paragon: 8, renegade: 0 },
                            { id: "renegade", label: "Not a problem. / I'll do it.", paragon: 0, renegade: 2 },
                        ],
                    },
                    {
                        id: "unc-hostile-takeover-2",
                        options: [
                            { id: "paragon", label: "You're under arrest.", paragon: 2, renegade: 0 },
                            {
                                id: "charm",
                                label: "Walk away.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 10 } }],
                            },
                            {
                                id: "renegade",
                                label: "Then we're fine. / You better stay clean.",
                                paragon: 0,
                                renegade: 2,
                            },
                            {
                                id: "intimidate",
                                label: "Disband the group.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 7 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "unc-privateers",
                title: "UNC: Privateers",
                choices: [
                    {
                        id: "unc-privateers-1",
                        options: [
                            { id: "paragon", label: "I'll do it.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Forget it.", paragon: 0, renegade: 2 },
                        ],
                    },
                    {
                        id: "unc-privateers-2",
                        options: [
                            { id: "paragon", label: "This must be hard on you.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "You were fooling yourself.", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "citadel-assignments-2",
        title: "Citadel Assignments (After 1 Plot World)",
        groups: [
            {
                id: "citadel-family-matter",
                title: "Citadel: Family Matter",
                choices: [
                    {
                        id: "citadel-family-matter",
                        options: [
                            {
                                id: "paragon-man",
                                label: "It's still her choice.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 2 } }],
                            },
                            {
                                id: "paragon-woman",
                                label: "It's worth it.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 3 } }],
                            },
                            {
                                id: "renegade-man",
                                label: "You're not helping.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 3 } }],
                            },
                            {
                                id: "renegade-woman",
                                label: "Think of the child.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 2 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "citadel-planting-a-bug",
                title: "Citadel: Planting a Bug",
                choices: [
                    {
                        id: "citadel-planting-a-bug",
                        options: [
                            { id: "paragon", label: "It's a good cause. / You're welcome.", paragon: 2, renegade: 0 },
                            {
                                id: "charm",
                                label: "I've changed my mind.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 4 } }],
                            },
                            {
                                id: "renegade",
                                label: "[LIE] I already did it.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 5 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "citadel-the-fourth-estate",
                title: "Citadel: The Fourth Estate",
                choices: [
                    {
                        id: "citadel-the-fourth-estate",
                        description:
                            "If you use the +2 Paragon/Renegade options at any time, those are the only points you will receive. The +2 options are awarded immediately, but the +8/+9 options aren't awarded until you speak with Admiral Hackett at the Galaxy Map. You will only receive one award, so be careful.",
                        options: [
                            { id: "paragon", label: "This interview is over.", paragon: 2, renegade: 0 },
                            {
                                id: "charm",
                                label: '"The turians helped build it." followed by "The crew is still Alliance."',
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 6 } }],
                            },
                            { id: "renegade", label: "Time to shut you up.", paragon: 0, renegade: 2 },
                            {
                                id: "intimidate",
                                label: '"A great human innovation." followed by "I command the Normandy."',
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 5 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "citadel-snap-inspection",
                title: "Citadel: Snap Inspection",
                choices: [
                    {
                        id: "citadel-snap-inspection",
                        options: [
                            {
                                id: "paragon",
                                label: "We need to build bridges.",
                                paragon: 2,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 9 } }],
                            },
                            {
                                id: "intimidate",
                                label: "We need to kick ass.",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 9 } }],
                            },
                            {
                                id: "renegade",
                                label: '"I don\'t think so." followed by "I\'m afraid so." / "Damn right I did."',
                                paragon: 0,
                                renegade: 2,
                            },
                        ],
                    },
                ],
            },
            {
                id: "unc-asari-diplomacy",
                title: "UNC: Asari Diplomacy",
                choices: [
                    {
                        id: "unc-asari-diplomacy",
                        options: [
                            { id: "paragon", label: "Don't bother.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "It better be.", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "noveria-geth-interest",
        title: "Noveria: Geth Interest",
        groups: [
            {
                id: "port-hanshan",
                title: "Port Hanshan Docking Bay",
                choices: [
                    {
                        id: "port-hanshan-1",
                        options: [{ id: "paragon", label: "We'll cooperate.", paragon: 2, renegade: 0 }],
                    },
                    {
                        id: "port-hanshan-2",
                        options: [{ id: "renegade", label: "I'm keeping my gun.", paragon: 0, renegade: 2 }],
                    },
                ],
            },
            {
                id: "maeko-matsuo-1",
                title: "Maeko Matsuo",
                choices: [
                    {
                        id: "maeko-matsuo-1",
                        description: "Available after speaking to Gianna Parasini.",
                        options: [
                            { id: "paragon", label: "Forget about it.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Humiliating, wasn't it?", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
            {
                id: "noveria-smuggling",
                title: "Noveria: Smuggling",
                choices: [
                    {
                        id: "noveria-smuggling",
                        description: "The Charm/Intimidate requirement is to get Opold to reveal the recipient.",
                        options: [
                            {
                                id: "renegade",
                                label: "(Sell the package directly to Inamorda.)",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [
                                    { requiredTalent: { talent: "charm", points: 6 } },
                                    { requiredTalent: { talent: "intimidate", points: 4 } },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: "noveria-espionage",
                title: "Noveria: Espionage",
                choices: [
                    {
                        id: "noveria-espionage-1",
                        options: [{ id: "paragon", label: "Not this time.", paragon: 8, renegade: 0 }],
                    },
                    {
                        id: "noveria-espionage-2",
                        description:
                            "Only available if you accept the job. The Charm/Intimidate requirement is for the conversation with Rafael Vargas.",
                        options: [
                            { id: "paragon", label: "This is wrong.", paragon: 2, renegade: 0 },
                            {
                                id: "renegade",
                                label: "It's done.",
                                paragon: 0,
                                renegade: 2,
                                dependsOn: [
                                    { requiredTalent: { talent: "charm", points: 6 } },
                                    { requiredTalent: { talent: "intimidate", points: 6 } },
                                ],
                            },
                        ],
                        dependsOn: [{ choiceId: "noveria-espionage-1", optionIds: ["skip"] }],
                    },
                    {
                        id: "noveria-espionage-3",
                        description:
                            'Only available if you accept the job and tell Rafael Vargas "An asari asked me to spy."',
                        options: [
                            {
                                id: "paragon",
                                label: '"I told him about you." followed by "You\'re a criminal."',
                                paragon: 2,
                                renegade: 0,
                            },
                            {
                                id: "renegade",
                                label: '"I told him about you." followed by "You\'re both irritating."',
                                paragon: 0,
                                renegade: 2,
                            },
                            { id: "renegade-lie", label: "[LIE] It's done.", paragon: 0, renegade: 9 },
                        ],
                        dependsOn: [{ choiceId: "noveria-espionage-2", optionIds: ["skip"] }],
                    },
                ],
            },
        ],
    },
    {
        id: "noveria-lorik-quiin",
        title: "Noveria: Lorik Qui'in",
        groups: [
            {
                id: "synthetic-insights",
                title: "Synthetic Insights Break-in",
                choices: [
                    {
                        id: "synthetic-insights",
                        options: [
                            {
                                id: "paragon",
                                label: "You're here illegally.",
                                paragon: 8,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 6 } }],
                            },
                            {
                                id: "renegade",
                                label: "You can't take us.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 8 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "kaira-stirling",
                title: "Confrontation with Kaira Stirling",
                choices: [
                    {
                        id: "kaira-stirling",
                        options: [
                            { id: "paragon", label: "They didn't give me a choice.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Bring it on.", paragon: 0, renegade: 2 },
                        ],
                    },
                ],
            },
            {
                id: "lorik-quiin",
                title: "Convincing Lorik Qui'in to Testify",
                choices: [
                    {
                        id: "lorik-quiin",
                        options: [
                            {
                                id: "paragon",
                                label: "You'd be a hero.",
                                paragon: 24,
                                renegade: 0,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 5 } }],
                            },
                            {
                                id: "renegade",
                                label: "Damn right I will.",
                                paragon: 0,
                                renegade: 25,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 5 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "anoleis",
                title: "Administrator Anoleis",
                choices: [
                    {
                        id: "anoleis",
                        description:
                            "To get the +25 Renegade points, you must have learned Gianna's true identity. To get any of the +9 points, you must first choose \"I have Lorik's evidence.\" and then one of the three non-Charm/Intimidate options, followed by the point-granting option. If you received a garage pass from turning in Opold, only a single one of the +9 options will be available.",
                        options: [
                            { id: "renegade-gianna", label: "Gianna is investigating you.", paragon: 0, renegade: 25 },
                            {
                                id: "renegade-benezia",
                                label: "Get me to Benezia. / I accept.",
                                paragon: 0,
                                renegade: 9,
                            },
                            {
                                id: "renegade-charm",
                                label: "I'm not here to arrest you. / I'll hold onto it.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "charm", points: 4 } }],
                            },
                            {
                                id: "renegade-intimidate",
                                label: "You'll do what I say.",
                                paragon: 0,
                                renegade: 9,
                                dependsOn: [{ requiredTalent: { talent: "intimidate", points: 8 } }],
                            },
                        ],
                    },
                ],
            },
            {
                id: "gianna-parasini",
                title: "Gianna Parasini",
                choices: [
                    {
                        id: "gianna-parasini",
                        description:
                            "Only available if you persuaded Qui'in to testify and didn't turn the evidence over to Anoleis.",
                        options: [{ id: "paragon", label: "I convinced Qui'in.", paragon: 8, renegade: 0 }],
                        dependsOn: [
                            { choiceId: "lorik-quiin", optionIds: ["paragon", "renegade"] },
                            { choiceId: "anoleis", optionIds: ["skip"] },
                        ],
                    },
                ],
            },
            {
                id: "maeko-matsuo-2",
                title: "Maeko Matsuo",
                choices: [
                    {
                        id: "maeko-matsuo-2",
                        description:
                            "(Possibly) only available if you convince Qui'in and talk to Gianna. TODO: Verify the dependencies here.",
                        options: [
                            { id: "paragon", label: "He was a criminal.", paragon: 2, renegade: 0 },
                            { id: "renegade", label: "Your opinion doesn't matter.", paragon: 0, renegade: 2 },
                        ],
                        dependsOn: [{ choiceId: "gianna-parasini", optionIds: ["paragon"] }],
                    },
                ],
            },
        ],
    },
    {
        id: "after-2-plot-worlds",
        title: "After 2 Plot Worlds",
        groups: [
            {
                id: "council-about-virmire",
                title: "Council About Virmire",
                choices: [
                    {
                        id: "council-about-virmire-1",
                        options: [{ id: "paragon", label: "Good.", paragon: 2, renegade: 0 }],
                    },
                    {
                        id: "council-about-virmire-2",
                        options: [
                            {
                                id: "renegade",
                                label: '"I don\'t have time for this." followed by "This is my investigation!"',
                                paragon: 0,
                                renegade: 2,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default gameChoices;
