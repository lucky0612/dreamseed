import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './shared/Card';
import { marketplaceSolutions, collaborationMetrics, collaborationStats } from '../data/marketplaceData';

interface MarketplaceSolution {
    id: string;
    title: string;
    description: string;
    category: string;
    impact: {
        environmental: number;
        social: number;
        economic: number;
    };
    creator: {
        name: string;
        organization: string;
        verified: boolean;
    };
    stats: {
        implementations: number;
        successRate: number;
        collaborators: number;
        improvements: number;
    };
    tags: string[];
    status: 'concept' | 'pilot' | 'proven' | 'scaling';
    lastUpdated: string;
    license: 'open-source' | 'commercial' | 'research';
    resources: {
        type: string;
        name: string;
        link: string;
    }[];
    collaborationNeeds: string[];
}

const SolutionMarketplace: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSolution, setSelectedSolution] = useState<MarketplaceSolution | null>(null);
    const [sortBy, setSortBy] = useState<'impact' | 'implementations' | 'recent'>('impact');

    // Categories with environmental theme icons
    const categories = [
        { id: 'all', name: 'All Solutions', icon: '🌍' },
        { id: 'water', name: 'Water Conservation', icon: '💧' },
        { id: 'energy', name: 'Renewable Energy', icon: '⚡' },
        { id: 'waste', name: 'Waste Management', icon: '♻️' },
        { id: 'agriculture', name: 'Sustainable Agriculture', icon: '🌱' },
        { id: 'biodiversity', name: 'Biodiversity', icon: '🦋' }
    ];

    return (
        <div className="space-y-8">
            {/* Search and Filters */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search solutions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 pl-10 rounded-lg border-2 border-moss-200 
                       focus:border-emerald-water-400 focus:ring-2 focus:ring-emerald-water-200 
                       bg-white/50"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-500">
                            🔍
                        </span>
                    </div>

                    <div className="flex gap-2">
                        {['impact', 'implementations', 'recent'].map((sort) => (
                            <button
                                key={sort}
                                onClick={() => setSortBy(sort as typeof sortBy)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all
                  ${sortBy === sort
                                        ? 'bg-emerald-water-500 text-white'
                                        : 'bg-white text-forest-600 hover:bg-emerald-water-50'}`}
                            >
                                {sort.charAt(0).toUpperCase() + sort.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-full font-medium transition-all
                ${selectedCategory === category.id
                                    ? 'bg-forest-500 text-white shadow-md'
                                    : 'bg-white/50 text-forest-600 hover:bg-forest-50'}`}
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Solutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketplaceSolutions.map((solution) => (
                    <motion.div
                        key={solution.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <Card
                            isInteractive
                            onClick={() => setSelectedSolution(solution)}
                            className="h-full hover:shadow-xl transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-forest-800 mb-2">
                                            {solution.title}
                                        </h3>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className={`px-2 py-1 rounded-full text-xs ${solution.status === 'proven'
                                                ? 'bg-emerald-water-100 text-emerald-water-700'
                                                : solution.status === 'pilot'
                                                    ? 'bg-moss-100 text-moss-700'
                                                    : 'bg-forest-100 text-forest-700'
                                                }`}>
                                                {solution.status.toUpperCase()}
                                            </span>
                                            <span className="text-sm text-forest-600">
                                                {solution.creator.organization}
                                            </span>
                                        </div>
                                    </div>
                                    {solution.creator.verified && (
                                        <span className="bg-emerald-water-100 p-1 rounded-full">
                                            ✓
                                        </span>
                                    )}
                                </div>

                                <p className="text-forest-600 mb-4 line-clamp-3">
                                    {solution.description}
                                </p>

                                {/* Impact Metrics */}
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    {Object.entries(solution.impact).map(([key, value]) => (
                                        <div key={key} className="text-center">
                                            <div className="text-sm text-forest-600 capitalize">
                                                {key}
                                            </div>
                                            <div className="font-semibold text-emerald-water-600">
                                                {value}%
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {solution.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-moss-100 text-moss-700 rounded-full text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center space-x-1">
                                        <span className="text-forest-500">👥</span>
                                        <span className="text-forest-600">
                                            {solution.stats.implementations} implementations
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="text-forest-500">📈</span>
                                        <span className="text-forest-600">
                                            {solution.stats.successRate}% success
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Solution Detail Modal */}
            <AnimatePresence>
                {selectedSolution && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-forest-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedSolution(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold text-forest-800 mb-2">
                                            {selectedSolution.title}
                                        </h2>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-3 py-1 rounded-full text-sm ${selectedSolution.status === 'proven'
                                                ? 'bg-emerald-water-100 text-emerald-water-700'
                                                : selectedSolution.status === 'pilot'
                                                    ? 'bg-moss-100 text-moss-700'
                                                    : 'bg-forest-100 text-forest-700'
                                                }`}>
                                                {selectedSolution.status.toUpperCase()}
                                            </span>
                                            <span className="text-forest-600">
                                                Last updated: {selectedSolution.lastUpdated}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedSolution(null)}
                                        className="p-2 hover:bg-forest-50 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Detailed Content */}
                                <div className="prose prose-forest max-w-none">
                                    <p>{selectedSolution.description}</p>
                                </div>

                                {/* Resources */}
                                <div>
                                    <h3 className="text-lg font-semibold text-forest-800 mb-4">
                                        Available Resources
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedSolution.resources.map((resource, index) => (
                                            <a
                                                key={index}
                                                href={resource.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-4 bg-forest-50 rounded-lg hover:bg-forest-100 transition-colors"
                                            >
                                                <div className="font-medium text-forest-700 mb-1">
                                                    {resource.name}
                                                </div>
                                                <div className="text-sm text-forest-600">
                                                    {resource.type}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Collaboration Needs */}
                                <div>
                                    <h3 className="text-lg font-semibold text-forest-800 mb-4">
                                        Collaboration Opportunities
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedSolution.collaborationNeeds.map((need, index) => (
                                            <div
                                                key={index}
                                                className="p-4 bg-moss-50 rounded-lg border border-moss-200"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <span className="w-2 h-2 bg-moss-400 rounded-full" />
                                                    <span className="text-forest-700">{need}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <button className="flex-1 px-6 py-3 bg-emerald-water-500 text-white rounded-lg font-medium hover:bg-emerald-water-600 transition-colors">
                                        Collaborate
                                    </button>
                                    <button className="flex-1 px-6 py-3 border-2 border-emerald-water-500 text-emerald-water-500 rounded-lg font-medium hover:bg-emerald-water-50 transition-colors">
                                        Download Resources
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SolutionMarketplace;