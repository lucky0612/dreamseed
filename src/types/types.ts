// Environmental solution categories
export type SolutionCategory = 'all' | 'water' | 'energy' | 'waste' | 'agriculture' | 'biodiversity';

// Solution status types
export type SolutionStatus = 'concept' | 'pilot' | 'proven' | 'scaling';

// License types
export type LicenseType = 'open-source' | 'commercial' | 'research';

// Resource types
export interface Resource {
    type: string;
    name: string;
    link: string;
}

// Impact metrics
export interface ImpactMetrics {
    environmental: number;
    social: number;
    economic: number;
}

// Solution statistics
export interface SolutionStats {
    implementations: number;
    successRate: number;
    collaborators: number;
    improvements: number;
}

// Creator information
export interface Creator {
    name: string;
    organization: string;
    verified: boolean;
}

// Implementation step
export interface ImplementationStep {
    phase: string;
    description: string;
    timeline: string;
    tasks: string[];
    resources: string[];
    dependencies: string[];
    risks: Array<{
        description: string;
        mitigation: string;
    }>;
}

// Environmental metrics
export interface EnvironmentalMetric {
    category: string;
    value: string;
    impact: string;
    confidence: number;
}

// Sort options
export type SortOption = 'impact' | 'implementations' | 'recent';