import create from 'zustand';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface Solution {
    id: string;
    title: string;
    description: string;
    problem: {
        statement: string;
        context: string;
        currentChallenges: string[];
    };
    innovation: {
        coreTechnology: string;
        uniqueApproach: string;
        keyFeatures: string[];
        technicalComponents: string[];
    };
    implementation: {
        steps: {
            phase: string;
            description: string;
            timeline: string;
            resources: string[];
        }[];
        requirements: {
            technical: string[];
            resources: string[];
            expertise: string[];
        };
        challenges: {
            potential: string[];
            mitigation: string[];
        };
    };
    environmentalImpact: {
        directBenefits: string[];
        indirectBenefits: string[];
        metrics: {
            category: string;
            metric: string;
            estimatedImpact: string;
        }[];
        scalability: string;
    };
    feasibility: {
        technicalScore: number;
        resourceScore: number;
        implementationScore: number;
        overallScore: number;
        rationale: string;
    };
    marketPotential: {
        targetSectors: string[];
        scalabilityPotential: string;
        economicViability: string;
    };
    sustainability: {
        longTermViability: string;
        maintenanceNeeds: string[];
        resourceEfficiency: string;
    };
}

interface DreamSeedState {
    solutions: Solution[];
    currentSolution: Solution | null;
    isGenerating: boolean;
    error: string | null;

    // Actions
    generateSolution: (problemStatement: string, context: string) => Promise<void>;
    setCurrentSolution: (solution: Solution) => void;
    clearError: () => void;
}

const generateDetailedPrompt = (problemStatement: string, context: string) => `
You are an advanced environmental innovation system specialized in generating comprehensive, practical, and innovative solutions to environmental challenges. Analyze the following problem and generate a detailed solution:

Problem Statement: ${problemStatement}
Context: ${context}

Generate an innovative environmental solution that is:
1. Technically feasible with current or near-future technology
2. Environmentally sustainable and impactful
3. Practically implementable
4. Economically viable
5. Scalable for wider adoption

Consider these aspects in your analysis:
- Existing solutions and their limitations
- Novel approaches and technologies
- Cross-disciplinary applications
- Biomimicry opportunities
- Resource efficiency
- Implementation challenges
- Environmental impact metrics
- Market viability
- Sustainability factors

Provide the response in the following detailed JSON format:
{
  "title": "Concise but descriptive title",
  "description": "2-3 sentence overview of the solution",
  "problem": {
    "statement": "Clear problem definition",
    "context": "Relevant background information",
    "currentChallenges": ["List", "of", "current", "challenges"]
  },
  "innovation": {
    "coreTechnology": "Primary technological approach",
    "uniqueApproach": "What makes this solution innovative",
    "keyFeatures": ["Key", "distinctive", "features"],
    "technicalComponents": ["Required", "technical", "components"]
  },
  "implementation": {
    "steps": [
      {
        "phase": "Phase name",
        "description": "Detailed description",
        "timeline": "Estimated timeline",
        "resources": ["Required", "resources"]
      }
    ],
    "requirements": {
      "technical": ["Technical", "requirements"],
      "resources": ["Resource", "requirements"],
      "expertise": ["Required", "expertise"]
    },
    "challenges": {
      "potential": ["Potential", "challenges"],
      "mitigation": ["Mitigation", "strategies"]
    }
  },
  "environmentalImpact": {
    "directBenefits": ["Direct", "environmental", "benefits"],
    "indirectBenefits": ["Indirect", "benefits"],
    "metrics": [
      {
        "category": "Impact category",
        "metric": "Measurement metric",
        "estimatedImpact": "Quantified impact"
      }
    ],
    "scalability": "Environmental impact scalability"
  },
  "feasibility": {
    "technicalScore": 0-100,
    "resourceScore": 0-100,
    "implementationScore": 0-100,
    "overallScore": 0-100,
    "rationale": "Scoring rationale"
  },
  "marketPotential": {
    "targetSectors": ["Target", "market", "sectors"],
    "scalabilityPotential": "Market scalability analysis",
    "economicViability": "Economic viability assessment"
  },
  "sustainability": {
    "longTermViability": "Long-term sustainability analysis",
    "maintenanceNeeds": ["Maintenance", "requirements"],
    "resourceEfficiency": "Resource efficiency analysis"
  }
}

Ensure the solution is:
- Innovative yet practical
- Technically detailed but understandable
- Implementation-focused with clear steps
- Environmentally impactful with measurable benefits
- Market-viable with clear value proposition
`;

const useDreamSeedStore = create<DreamSeedState>((set, get) => ({
    solutions: [],
    currentSolution: null,
    isGenerating: false,
    error: null,

    generateSolution: async (problemStatement: string, context: string) => {
        try {
            set({ isGenerating: true, error: null });

            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = generateDetailedPrompt(problemStatement, context);

            const result = await model.generateContent(prompt);
            const response = JSON.parse(result.response.text());

            const newSolution: Solution = {
                id: Date.now().toString(),
                ...response
            };

            set(state => ({
                solutions: [...state.solutions, newSolution],
                currentSolution: newSolution,
                isGenerating: false
            }));

        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'An error occurred while generating the solution',
                isGenerating: false
            });
            console.error('Solution generation error:', error);
        }
    },

    setCurrentSolution: (solution: Solution) => {
        set({ currentSolution: solution });
    },

    clearError: () => {
        set({ error: null });
    }
}));

export default useDreamSeedStore;

// Optional: Export type definitions for use in components
export type { Solution };