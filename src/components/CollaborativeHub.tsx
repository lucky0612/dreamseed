import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Card from './shared/Card';
import Button from './shared/Button';
import { collaborators, discussions, improvementProposals, collaborationMetrics, collaborationStats } from '../data/collaborationData';

interface Collaborator {
    id: string;
    name: string;
    expertise: string[];
    contributions: number;
    avatar: string;
}

interface Comment {
    id: string;
    userId: string;
    userName: string;
    content: string;
    type: 'suggestion' | 'question' | 'improvement' | 'validation';
    timestamp: string;
    likes: number;
    replies: Comment[];
}

interface ImprovementProposal {
    id: string;
    title: string;
    description: string;
    author: string;
    impactAreas: {
        area: string;
        currentValue: number;
        projectedValue: number;
    }[];
    status: 'proposed' | 'reviewing' | 'accepted' | 'implemented';
    votes: number;
    comments: Comment[];
    timeline: string;
    resources: string[];
}

const CollaborativeHub: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'improvements' | 'discussions'>('overview');
    const [selectedProposal, setSelectedProposal] = useState<ImprovementProposal | null>(null);

    return (
        <div className="space-y-8">
            {/* Navigation Tabs */}
            <div className="flex justify-center mb-8">
                <div className="bg-white/30 backdrop-blur-sm rounded-full p-1 shadow-lg">
                    <div className="flex space-x-2">
                        {[
                            { id: 'overview', label: 'Collaboration Overview' },
                            { id: 'improvements', label: 'Improvement Proposals' },
                            { id: 'discussions', label: 'Active Discussions' }
                        ].map((tab) => (
                            <Button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                variant={activeTab === tab.id ? 'primary' : 'outline'}
                                className={`relative px-6 py-2 rounded-full transition-all
                  ${activeTab === tab.id
                                        ? 'text-white'
                                        : 'text-forest-600 hover:text-forest-700'
                                    }`}
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* Active Collaborators */}
                        <Card title="Active Collaborators" className="h-full">
                            <div className="p-6 space-y-4">
                                {collaborators.map((collaborator) => (
                                    <div
                                        key={collaborator.id}
                                        className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg hover:bg-emerald-water-50 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center text-forest-600 font-medium">
                                            {collaborator.name.charAt(0)}
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-medium text-forest-700">
                                                {collaborator.name}
                                            </h4>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {collaborator.expertise.map((exp, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-0.5 bg-moss-100 text-moss-700 rounded-full text-xs"
                                                    >
                                                        {exp}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-forest-600">Contributions</div>
                                            <div className="font-semibold text-emerald-water-600">
                                                {collaborator.contributions}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Collaboration Metrics */}
                        <Card title="Collaboration Impact" className="h-full">
                            <div className="p-6">
                                <div className="h-64 mb-6">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={collaborationMetrics}>
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="improvements"
                                                stroke="#2aa39f"
                                                name="Improvements"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="implementations"
                                                stroke="#4b8467"
                                                name="Implementations"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(collaborationStats).map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="p-4 bg-forest-50 rounded-lg text-center"
                                        >
                                            <div className="text-sm text-forest-600 capitalize">
                                                {key.replace('_', ' ')}
                                            </div>
                                            <div className="text-2xl font-bold text-emerald-water-600">
                                                {value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {activeTab === 'improvements' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* New Improvement Proposal Button */}
                        <div className="flex justify-end">
                            <Button
                                variant="primary"
                                className="px-6 py-3"
                                onClick={() => {/* Handle new proposal */ }}
                            >
                                + New Improvement Proposal
                            </Button>
                        </div>

                        {/* Improvement Proposals Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {improvementProposals.map((proposal) => (
                                <Card
                                    key={proposal.id}
                                    isInteractive
                                    onClick={() => setSelectedProposal(proposal)}
                                    className="hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-forest-800">
                                                    {proposal.title}
                                                </h3>
                                                <p className="text-forest-600">by {proposal.author}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm ${proposal.status === 'implemented'
                                                ? 'bg-emerald-water-100 text-emerald-water-700'
                                                : proposal.status === 'accepted'
                                                    ? 'bg-moss-100 text-moss-700'
                                                    : 'bg-forest-100 text-forest-700'
                                                }`}>
                                                {proposal.status.toUpperCase()}
                                            </span>
                                        </div>

                                        <p className="text-forest-600 mb-4 line-clamp-2">
                                            {proposal.description}
                                        </p>

                                        {/* Impact Areas */}
                                        <div className="space-y-3 mb-4">
                                            {proposal.impactAreas.map((area, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <div className="text-sm text-forest-600 w-24">
                                                        {area.area}
                                                    </div>
                                                    <div className="flex-grow h-2 bg-forest-100 rounded-full">
                                                        <div
                                                            className="h-full bg-emerald-water-500 rounded-full"
                                                            style={{
                                                                width: `${(area.projectedValue / area.currentValue) * 100}%`
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="text-sm text-emerald-water-600 w-16 text-right">
                                                        +{((area.projectedValue / area.currentValue - 1) * 100).toFixed(1)}%
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center text-sm text-forest-600">
                                            <div>Timeline: {proposal.timeline}</div>
                                            <div className="flex items-center space-x-4">
                                                <span>👍 {proposal.votes}</span>
                                                <span>💬 {proposal.comments.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'discussions' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Active Discussions */}
                        <div className="space-y-4">
                            {discussions.map((discussion) => (
                                <Card key={discussion.id}>
                                    <div className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-forest-600 font-medium">
                                                {discussion.author.charAt(0)}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium text-forest-700">
                                                            {discussion.author}
                                                        </h4>
                                                        <div className="text-sm text-forest-600">
                                                            {discussion.timestamp}
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${discussion.type === 'technical'
                                                        ? 'bg-emerald-water-100 text-emerald-water-700'
                                                        : 'bg-moss-100 text-moss-700'
                                                        }`}>
                                                        {discussion.type}
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-forest-700">
                                                    {discussion.content}
                                                </p>
                                                <div className="mt-4 flex items-center space-x-4">
                                                    <button className="text-forest-600 hover:text-forest-700">
                                                        👍 {discussion.likes}
                                                    </button>
                                                    <button className="text-forest-600 hover:text-forest-700">
                                                        💬 Reply
                                                    </button>
                                                    <button className="text-forest-600 hover:text-forest-700">
                                                        Share
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Selected Proposal Modal */}
            <AnimatePresence>
                {selectedProposal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-forest-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedProposal(null)}
                    >
                        {/* Modal content */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CollaborativeHub;