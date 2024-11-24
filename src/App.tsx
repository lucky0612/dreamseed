import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SolutionGenerator from './components/SolutionGenerator';
import VisualizationMap from './components/VisualizationMap';
import ValidationPanel from './components/ValidationPanel';
import SolutionMarketplace from './components/SolutionMarketplace';
import CollaborativeHub from './components/CollaborativeHub';
import useDreamSeedStore from './store/store';
import Button from './components/shared/Button';

type MainTab = 'dashboard' | 'marketplace' | 'collaborate' | 'visualization' | 'validation';

function App() {
    const { currentSolution } = useDreamSeedStore();
    const [activeTab, setActiveTab] = useState<MainTab>('dashboard');

    const mainTabs = [
        { id: 'dashboard', label: 'Dashboard', icon: '🌱' },
        { id: 'marketplace', label: 'Solution Marketplace', icon: '🌍' },
        { id: 'collaborate', label: 'Collaboration Hub', icon: '👥' }
    ];

    const solutionTabs = [
        { id: 'visualization', label: 'Innovation Map', icon: '🗺️' },
        { id: 'validation', label: 'Validation & Analysis', icon: '📊' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-moss-50 via-emerald-water-50 to-forest-50 animate-gradient-xy">
            <div className="absolute inset-0 bg-nature-pattern opacity-5 pointer-events-none" />

            <main className="relative container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl font-bold text-moss-800 mb-4">
                        Dream
                        <span className="text-emerald-water-500">Seed</span>
                    </h1>
                    <p className="text-xl text-forest-600 max-w-2xl mx-auto">
                        AI-Powered Environmental Innovation Platform -
                        Where Ideas Grow Into Sustainable Solutions
                    </p>
                </motion.div>

                {/* Main Navigation Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white/30 backdrop-blur-sm rounded-full p-1 shadow-lg">
                        <div className="flex space-x-2">
                            {mainTabs.map((tab) => (
                                <Button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as MainTab)}
                                    variant={activeTab === tab.id ? 'primary' : 'outline'}
                                    className={`relative px-6 py-2 rounded-full transition-all duration-200
                                        ${activeTab === tab.id
                                            ? 'text-white'
                                            : 'text-forest-600 hover:text-forest-700'}`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Solution-specific Tabs - Only shown when there's a current solution */}
                {currentSolution && (
                    <div className="flex justify-center mb-8">
                        <div className="bg-white/30 backdrop-blur-sm rounded-full p-1 shadow-lg">
                            <div className="flex space-x-2">
                                {solutionTabs.map((tab) => (
                                    <Button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as MainTab)}
                                        variant={activeTab === tab.id ? 'primary' : 'outline'}
                                        className={`relative px-6 py-2 rounded-full transition-all duration-200
                                            ${activeTab === tab.id
                                                ? 'text-white'
                                                : 'text-forest-600 hover:text-forest-700'}`}
                                    >
                                        <span className="mr-2">{tab.icon}</span>
                                        {tab.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'dashboard' && <SolutionGenerator />}
                        {activeTab === 'marketplace' && <SolutionMarketplace />}
                        {activeTab === 'collaborate' && <CollaborativeHub />}
                        {activeTab === 'visualization' && currentSolution && <VisualizationMap />}
                        {activeTab === 'validation' && currentSolution && <ValidationPanel />}
                    </motion.div>
                </AnimatePresence>

                {/* Environmental Floating Elements */}
                <motion.div
                    className="fixed top-0 left-0 w-full h-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-32 h-32 bg-forest-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"
                            animate={{
                                x: [Math.random() * 100, Math.random() * 100],
                                y: [Math.random() * 100, Math.random() * 100],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="relative text-center py-6 text-forest-600">
                <p>DreamSeed - Nurturing Environmental Innovation</p>
            </footer>
        </div>
    );
}

export default App;