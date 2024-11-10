export * from './availableSolutions';
export * from './marketplaceData';
export * from './collaborationData';
export * from './adaptationData';

// Additional helper functions
export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
};

export const getStatusColor = (status: string) => {
    const statusColors = {
        improving: 'emerald-water',
        declining: 'red',
        stable: 'moss',
        implemented: 'emerald-water',
        reviewing: 'moss',
        proposed: 'forest'
    };
    return statusColors[status as keyof typeof statusColors] || 'forest';
};

export const getImpactColor = (impact: number) => {
    if (impact >= 80) return 'emerald-water';
    if (impact >= 60) return 'moss';
    return 'forest';
};

export const calculateTrend = (historicalData: any[]) => {
    if (historicalData.length < 2) return 'stable';
    const recent = historicalData.slice(-3);
    const average = recent.reduce((sum, item) => sum + item.value, 0) / recent.length;
    const previous = historicalData.slice(-6, -3);
    const prevAverage = previous.reduce((sum, item) => sum + item.value, 0) / previous.length;

    if (average > prevAverage * 1.05) return 'improving';
    if (average < prevAverage * 0.95) return 'declining';
    return 'stable';
};