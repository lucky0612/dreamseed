export const adaptationMetrics = [
    {
        category: 'Resource Efficiency',
        currentValue: 72,
        targetValue: 85,
        trend: 'improving',
        adaptations: [
            {
                suggestion: 'Implement smart resource allocation system',
                impact: 8.5,
                confidence: 0.87,
                implementation: 'Integration with IoT sensors for real-time monitoring'
            },
            {
                suggestion: 'Optimize waste recovery process',
                impact: 5.2,
                confidence: 0.92,
                implementation: 'Enhanced sorting algorithms and material recognition'
            }
        ],
        historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: `2024-${String(i + 1).padStart(2, '0')}`,
            value: 65 + Math.random() * 15,
            adaptation: i === 12 ? 'Implemented smart monitoring' : undefined
        }))
    },
    {
        category: 'Energy Optimization',
        currentValue: 78,
        targetValue: 90,
        trend: 'improving',
        adaptations: [
            {
                suggestion: 'AI-powered energy distribution',
                impact: 12.3,
                confidence: 0.89,
                implementation: 'Machine learning model for predictive energy management'
            },
            {
                suggestion: 'Solar efficiency enhancement',
                impact: 7.8,
                confidence: 0.85,
                implementation: 'New photovoltaic material integration'
            }
        ],
        historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: `2024-${String(i + 1).padStart(2, '0')}`,
            value: 70 + Math.random() * 18,
            adaptation: i === 15 ? 'Implemented AI management' : undefined
        }))
    },
    {
        category: 'Water Conservation',
        currentValue: 65,
        targetValue: 80,
        trend: 'stable',
        adaptations: [
            {
                suggestion: 'Advanced filtration system',
                impact: 15.0,
                confidence: 0.91,
                implementation: 'Biomimetic membrane technology deployment'
            },
            {
                suggestion: 'Rainwater harvesting optimization',
                impact: 8.5,
                confidence: 0.88,
                implementation: 'Smart collection and distribution system'
            }
        ],
        historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: `2024-${String(i + 1).padStart(2, '0')}`,
            value: 60 + Math.random() * 12,
            adaptation: i === 18 ? 'Implemented new filtration' : undefined
        }))
    }
];

export const adaptationInsights = [
    {
        trigger: 'Resource utilization pattern change detected',
        impact: 'high',
        suggestion: 'Dynamic resource allocation based on real-time demand',
        reasoning: 'Analysis shows 23% resource wastage during off-peak hours',
        confidenceScore: 0.89,
        implementationSteps: [
            'Install IoT sensors at key points',
            'Implement predictive analytics model',
            'Set up automated control systems'
        ],
        expectedOutcome: '15-20% improvement in resource efficiency'
    },
    {
        trigger: 'Energy consumption anomaly identified',
        impact: 'medium',
        suggestion: 'Implement AI-driven load balancing',
        reasoning: 'Peak energy usage could be optimized with predictive scheduling',
        confidenceScore: 0.85,
        implementationSteps: [
            'Deploy energy monitoring sensors',
            'Develop load prediction model',
            'Configure automated balancing system'
        ],
        expectedOutcome: '12-15% reduction in peak energy consumption'
    },
    {
        trigger: 'Water quality fluctuation detected',
        impact: 'high',
        suggestion: 'Enhanced real-time water quality monitoring',
        reasoning: 'Preventive maintenance could reduce treatment costs by 30%',
        confidenceScore: 0.92,
        implementationSteps: [
            'Install advanced water quality sensors',
            'Implement early warning system',
            'Develop automated treatment response'
        ],
        expectedOutcome: '25-30% improvement in treatment efficiency'
    }
];

export const performanceMetrics = {
    overall_efficiency: 82,
    adaptation_success_rate: 88,
    resource_optimization: 75,
    cost_reduction: 68,
    environmental_impact: 91
};