import React from 'react';
import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import Card from './shared/Card';
import useDreamSeedStore from '../store/store';

const ValidationPanel: React.FC = () => {
    const { currentSolution } = useDreamSeedStore();

    if (!currentSolution) return null;

    const { feasibility, implementation, marketPotential, sustainability } = currentSolution;

    const scoreData = [
        {
            name: 'Technical',
            score: feasibility.technicalScore,
            fill: '#44c3bf', // emerald-water-400
        },
        {
            name: 'Resource',
            score: feasibility.resourceScore,
            fill: '#69a483', // moss-400
        },
        {
            name: 'Implementation',
            score: feasibility.implementationScore,
            fill: '#578272', // forest-500
        },
        {
            name: 'Overall',
            score: feasibility.overallScore,
            fill: '#2aa39f', // emerald-water-500
        },
    ];

    const challenges = implementation.challenges.potential.map((challenge, index) => ({
        challenge,
        mitigation: implementation.challenges.mitigation[index] || 'No mitigation strategy provided'
    }));

    return (
        <div className="space-y-6">
            {/* Scores Section */}
            <Card title="Feasibility Analysis" variant="default">
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="30%"
                            outerRadius="80%"
                            barSize={20}
                            data={scoreData}
                            startAngle={180}
                            endAngle={-180}
                        >
                            <RadialBar
                                label={{ fill: '#666', position: 'insideStart' }}
                                background
                                dataKey="score"
                            />
                            <Legend
                                iconSize={10}
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-forest-50 rounded-lg"
                >
                    <h4 className="font-medium text-forest-700 mb-2">Analysis Rationale</h4>
                    <p className="text-forest-600">{feasibility.rationale}</p>
                </motion.div>
            </Card>

            {/* Challenges and Mitigations */}
            <Card title="Implementation Challenges & Solutions" variant="info">
                <div className="space-y-4">
                    {challenges.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/50 rounded-lg p-4 shadow-sm"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-water-100 flex items-center justify-center">
                                    <span className="text-emerald-water-600 font-medium">
                                        {index + 1}
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <h5 className="font-medium text-forest-700 mb-2">
                                        {item.challenge}
                                    </h5>
                                    <div className="ml-4 border-l-2 border-emerald-water-200 pl-4">
                                        <p className="text-forest-600">{item.mitigation}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Market & Sustainability Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Market Potential" variant="success">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-forest-700 mb-2">Target Sectors</h4>
                            <div className="flex flex-wrap gap-2">
                                {marketPotential.targetSectors.map((sector, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-moss-100 text-moss-700 rounded-full text-sm"
                                    >
                                        {sector}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-forest-700 mb-2">Scalability</h4>
                            <p className="text-forest-600">{marketPotential.scalabilityPotential}</p>
                        </div>

                        <div>
                            <h4 className="font-medium text-forest-700 mb-2">Economic Viability</h4>
                            <p className="text-forest-600">{marketPotential.economicViability}</p>
                        </div>
                    </div>
                </Card>

                <Card title="Sustainability Analysis" variant="success">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-forest-700 mb-2">Long-term Viability</h4>
                            <p className="text-forest-600">{sustainability.longTermViability}</p>
                        </div>

                        <div>
                            <h4 className="font-medium text-forest-700 mb-2">Maintenance Requirements</h4>
                            <ul className="space-y-2">
                                {sustainability.maintenanceNeeds.map((need, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center space-x-2 text-forest-600"
                                    >
                                        <span className="w-2 h-2 bg-moss-400 rounded-full" />
                                        <span>{need}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-medium text-forest-700 mb-2">Resource Efficiency</h4>
                            <p className="text-forest-600">{sustainability.resourceEfficiency}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ValidationPanel;