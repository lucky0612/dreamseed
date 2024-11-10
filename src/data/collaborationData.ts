// Collaborators data
export const collaborators = [
    {
        id: 'col-1',
        name: 'Dr. Emily Chen',
        expertise: ['Water Treatment', 'Solar Technology', 'Process Engineering'],
        contributions: 28,
        avatar: '/avatars/emily.jpg'
    },
    {
        id: 'col-2',
        name: 'Marcus Rodriguez',
        expertise: ['AI/ML', 'Data Science', 'Sustainability Metrics'],
        contributions: 34,
        avatar: '/avatars/marcus.jpg'
    },
    {
        id: 'col-3',
        name: 'Dr. Aisha Patel',
        expertise: ['Biomimicry', 'Material Science', 'Green Chemistry'],
        contributions: 42,
        avatar: '/avatars/aisha.jpg'
    }
];

// Discussions data
export const discussions = [
    {
        id: 'disc-1',
        title: 'Optimizing Solar Desalination Efficiency',
        author: 'Dr. Emily Chen',
        type: 'technical',
        content: "Ive been working on improving the energy efficiency of our solar desalination units.Our latest tests show a 15% improvement in water production with the new nanostructured materials.",
        timestamp: '2024-03-10T14:30:00Z',
        likes: 24,
        replies: 12
    },
    {
        id: 'disc-2',
        title: 'Integration of ML in Waste Sorting',
        author: 'Marcus Rodriguez',
        type: 'implementation',
        content: 'The new computer vision model is showing 95% accuracy in identifying different types of plastics. Looking for feedback on deployment strategies.',
        timestamp: '2024-03-09T16:45:00Z',
        likes: 18,
        replies: 8
    }
];

// Improvement proposals data
export const improvementProposals = [
    {
        id: 'imp-1',
        title: 'Enhanced Solar Absorption Layer',
        description: 'Implementation of bio-inspired nanostructures for improved solar absorption efficiency.',
        author: 'Dr. Aisha Patel',
        impactAreas: [
            {
                area: 'Energy Efficiency',
                currentValue: 100,
                projectedValue: 125
            },
            {
                area: 'Cost Reduction',
                currentValue: 100,
                projectedValue: 85
            },
            {
                area: 'Maintenance',
                currentValue: 100,
                projectedValue: 90
            }
        ],
        status: 'reviewing',
        votes: 45,
        comments: [
            {
                id: 'comment-1',
                userId: 'col-1',
                userName: 'Dr. Emily Chen',
                content: 'This could significantly improve our overall system efficiency.',
                type: 'validation',
                timestamp: '2024-03-08T10:20:00Z',
                likes: 12,
                replies: []
            }
        ],
        timeline: '3 months',
        resources: ['Lab Testing', 'Material Analysis', 'Prototype Development']
    }
];

// Collaboration metrics data
export const collaborationMetrics = [
    {
        date: '2024-01',
        improvements: 12,
        implementations: 8,
        activeProjects: 12,
        completedMilestones: 34,
        newCollaborators: 8
    },
    {
        date: '2024-02',
        improvements: 18,
        implementations: 12,
        activeProjects: 15,
        completedMilestones: 42,
        newCollaborators: 12
    },
    {
        date: '2024-03',
        improvements: 24,
        implementations: 15,
        activeProjects: 18,
        completedMilestones: 48,
        newCollaborators: 15
    }
];

// Collaboration statistics
export const collaborationStats = {
    active_collaborators: 156,
    successful_implementations: 42,
    ongoing_projects: 28,
    impact_score: 89
};