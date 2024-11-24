import { GoogleGenerativeAI } from '@google/generative-ai';
import type { MarketplaceSolution } from '../store';
import type { SolutionCategory } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

class MarketplaceService {
    private generatePrompt(category: SolutionCategory): string {
        return `
Generate an innovative environmental solution for the ${category} sector.
The solution should be practical, implementable, and include detailed metrics.

Provide a complete solution in this JSON structure:
{
    "title": "Solution name",
    "description": "Detailed description",
    "category": "${category}",
    "impact": {
        "environmental": number (0-100),
        "social": number (0-100),
        "economic": number (0-100)
    },
    "implementation": {
        "steps": [
            {
                "phase": "Phase name",
                "description": "Step description",
                "timeline": "Duration",
                "resources": ["Required resources"]
            }
        ]
    },
    "status": "concept/pilot/proven/scaling",
    "collaborationNeeds": ["Needed expertise/resources"]
}

Ensure the solution is:
1. Technically feasible
2. Environmentally impactful
3. Economically viable
4. Implementation-ready`;
    }

    async generateSolution(category: SolutionCategory): Promise<MarketplaceSolution> {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = this.generatePrompt(category);

            const result = await model.generateContent(prompt);
            const response = JSON.parse(result.response.text());

            // Add generated metadata
            const solution: MarketplaceSolution = {
                ...response,
                id: `${category}-${Date.now()}`,
                creator: {
                    name: "AI Generated",
                    organization: "DreamSeed",
                    verified: true
                },
                stats: {
                    implementations: 0,
                    successRate: Math.round(Math.random() * 20 + 80), // 80-100%
                    collaborators: 0,
                    improvements: 0
                },
                lastUpdated: new Date().toISOString(),
                license: 'open-source'
            };

            return solution;

        } catch (error) {
            console.error('Error generating solution:', error);
            throw new Error('Failed to generate solution');
        }
    }

    async generateMultipleSolutions(category: SolutionCategory, count: number = 3): Promise<MarketplaceSolution[]> {
        try {
            const solutions = await Promise.all(
                Array(count).fill(null).map(() => this.generateSolution(category))
            );
            return solutions;
        } catch (error) {
            console.error('Error generating multiple solutions:', error);
            throw new Error('Failed to generate solutions');
        }
    }
}

export const marketplaceService = new MarketplaceService();