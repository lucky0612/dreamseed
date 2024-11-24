import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useDreamSeedStore from '../store/store';
import { Solution } from '../store/store';

const Dashboard: React.FC = () => {
    const { generateSolution, solutions, currentSolution, isGenerating, error } = useDreamSeedStore();
    const [problemStatement, setProblemStatement] = useState('');
    const [context, setContext] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await generateSolution(problemStatement, context);
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Input Section */}
            <motion.div
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="problem"
                            className="block text-lg font-medium text-forest-800 mb-2"
                        >
                            What environmental challenge would you like to solve?
                        </label>
                        <textarea
                            id="problem"
                            value={problemStatement}
                            onChange={(e) => setProblemStatement(e.target.value)}
                            className="w-full h-32 px-4 py-3 rounded-lg border-2 border-moss-200 
                       focus:border-emerald-water-400 focus:ring-2 focus:ring-emerald-water-200 
                       bg-white/50 backdrop-blur-sm transition duration-200"
                            placeholder="Describe the environmental problem you want to address..."
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="context"
                            className="block text-lg font-medium text-forest-800 mb-2"
                        >
                            Additional Context
                        </label>
                        <textarea
                            id="context"
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            className="w-full h-24 px-4 py-3 rounded-lg border-2 border-moss-200 
                       focus:border-emerald-water-400 focus:ring-2 focus:ring-emerald-water-200 
                       bg-white/50 backdrop-blur-sm transition duration-200"
                            placeholder="Add any relevant context, constraints, or specific requirements..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isGenerating || !problemStatement.trim()}
                        className={`w-full py-4 rounded-lg text-white font-medium text-lg
                     transition duration-200 transform hover:scale-[1.02]
                     ${isGenerating
                                ? 'bg-moss-400 cursor-wait'
                                : 'bg-emerald-water-500 hover:bg-emerald-water-600 shadow-lg'
                            }`}
                    >
                        {isGenerating ? (
                            <div className="flex items-center justify-center space-x-2">
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-3 border-white border-t-transparent rounded-full inline-block"
                                />
                                <span>Generating Solution...</span>
                            </div>
                        ) : (
                            'Generate Environmental Solution'
                        )}
                    </button>
                </form>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg"
                    >
                        <p className="text-red-700">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Solution Display */}
            <AnimatePresence>
                {currentSolution && (
                    <motion.div
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8"
                    >
                        <h2 className="text-3xl font-bold text-forest-800 mb-6">
                            {currentSolution.title}
                        </h2>

                        <div className="space-y-8">
                            {/* Description */}
                            <div>
                                <h3 className="text-xl font-semibold text-moss-700 mb-2">Overview</h3>
                                <p className="text-forest-600">{currentSolution.description}</p>
                            </div>

                            {/* Problem Analysis */}
                            <div>
                                <h3 className="text-xl font-semibold text-moss-700 mb-2">Problem Analysis</h3>
                                <div className="bg-moss-50 rounded-lg p-4">
                                    <p className="text-forest-700 mb-2">{currentSolution.problem.statement}</p>
                                    <p className="text-forest-600 mb-4">{currentSolution.problem.context}</p>
                                    <div className="space-y-2">
                                        {currentSolution.problem.currentChallenges.map((challenge, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <span className="w-2 h-2 bg-emerald-water-400 rounded-full" />
                                                <span className="text-forest-600">{challenge}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Innovation Details */}
                            <div>
                                <h3 className="text-xl font-semibold text-moss-700 mb-2">Innovation</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-emerald-water-50 rounded-lg p-4">
                                        <h4 className="font-medium text-forest-700 mb-2">Core Technology</h4>
                                        <p className="text-forest-600">{currentSolution.innovation.coreTechnology}</p>
                                    </div>
                                    <div className="bg-emerald-water-50 rounded-lg p-4">
                                        <h4 className="font-medium text-forest-700 mb-2">Unique Approach</h4>
                                        <p className="text-forest-600">{currentSolution.innovation.uniqueApproach}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Implementation Steps */}
                            <div>
                                <h3 className="text-xl font-semibold text-moss-700 mb-4">Implementation Roadmap</h3>
                                <div className="space-y-4">
                                    {currentSolution.implementation.steps.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-forest-50 rounded-lg p-4"
                                        >
                                            <div className="flex items-center mb-2">
                                                <span className="w-8 h-8 rounded-full bg-forest-200 flex items-center justify-center text-forest-700 font-medium">
                                                    {index + 1}
                                                </span>
                                                <h4 className="ml-3 font-medium text-forest-700">{step.phase}</h4>
                                            </div>
                                            <p className="text-forest-600 ml-11">{step.description}</p>
                                            <div className="ml-11 mt-2 flex flex-wrap gap-2">
                                                {step.resources.map((resource, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 bg-forest-100 text-forest-600 rounded-full text-sm"
                                                    >
                                                        {resource}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Environmental Impact */}
                            <div>
                                <h3 className="text-xl font-semibold text-moss-700 mb-4">Environmental Impact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-forest-700 mb-2">Direct Benefits</h4>
                                        <ul className="space-y-2">
                                            {currentSolution.environmentalImpact.directBenefits.map((benefit, index) => (
                                                <li key={index} className="flex items-center space-x-2">
                                                    <span className="w-2 h-2 bg-emerald-water-400 rounded-full" />
                                                    <span className="text-forest-600">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-forest-700 mb-2">Impact Metrics</h4>
                                        <div className="space-y-3">
                                            {currentSolution.environmentalImpact.metrics.map((metric, index) => (
                                                <div key={index} className="bg-emerald-water-50 rounded-lg p-3">
                                                    <div className="text-sm text-emerald-water-600">{metric.category}</div>
                                                    <div className="font-medium text-forest-700">{metric.estimatedImpact}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feasibility Scores */}
                            <div>
                                <h3 className="text-xl font-semibold text-moss-700 mb-4">Feasibility Analysis</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Technical', score: currentSolution.feasibility.technicalScore },
                                        { label: 'Resource', score: currentSolution.feasibility.resourceScore },
                                        { label: 'Implementation', score: currentSolution.feasibility.implementationScore },
                                        { label: 'Overall', score: currentSolution.feasibility.overallScore },
                                    ].map((item, index) => (
                                        <div key={index} className="bg-white rounded-lg p-4 text-center">
                                            <div className="text-sm text-forest-600 mb-1">{item.label}</div>
                                            <div className="text-2xl font-bold text-emerald-water-600">
                                                {item.score}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4 text-forest-600">{currentSolution.feasibility.rationale}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Previous Solutions Quick Access */}
            {solutions.length > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl"
                >
                    <h3 className="text-lg font-medium text-forest-700 mb-4">Previous Solutions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {solutions.slice(0, -1).reverse().map((solution) => (
                            <motion.div
                                key={solution.id}
                                whileHover={{ scale: 1.02 }}
                                className="p-4 bg-white rounded-lg shadow cursor-pointer hover:shadow-md transition duration-200"
                                onClick={() => useDreamSeedStore.getState().setCurrentSolution(solution)}
                            >
                                <h4 className="font-medium text-forest-700 mb-2">{solution.title}</h4>
                                <p className="text-sm text-forest-600 line-clamp-2">{solution.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Dashboard;