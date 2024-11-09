import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './shared/Button';
import Input from './shared/Input';
import Card from './shared/Card';
import useDreamSeedStore from '../store/store';

interface FormData {
    problemStatement: string;
    context: string;
    constraints: string[];
    targetImpact: string;
}

const SolutionGenerator: React.FC = () => {
    const { generateSolution, isGenerating, error } = useDreamSeedStore();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        problemStatement: '',
        context: '',
        constraints: [],
        targetImpact: '',
    });
    const [constraintInput, setConstraintInput] = useState('');

    const handleAddConstraint = () => {
        if (constraintInput.trim()) {
            setFormData(prev => ({
                ...prev,
                constraints: [...prev.constraints, constraintInput.trim()]
            }));
            setConstraintInput('');
        }
    };

    const removeConstraint = (index: number) => {
        setFormData(prev => ({
            ...prev,
            constraints: prev.constraints.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        const enhancedContext = `
      Context: ${formData.context}
      Constraints: ${formData.constraints.join(', ')}
      Target Impact: ${formData.targetImpact}
    `;
        await generateSolution(formData.problemStatement, enhancedContext);
    };

    const steps = [
        {
            title: 'Define the Problem',
            description: 'What environmental challenge would you like to address?',
            content: (
                <Input
                    type="textarea"
                    label="Problem Statement"
                    value={formData.problemStatement}
                    onChange={(e) => setFormData(prev => ({ ...prev, problemStatement: e.target.value }))}
                    placeholder="Describe the environmental issue you want to solve..."
                    rows={4}
                    className="font-normal"
                />
            )
        },
        {
            title: 'Provide Context',
            description: 'Help us understand the situation better',
            content: (
                <div className="space-y-6">
                    <Input
                        type="textarea"
                        label="Background Context"
                        value={formData.context}
                        onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
                        placeholder="Share relevant background information, current approaches, or specific challenges..."
                        rows={3}
                    />

                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                label="Add Constraints"
                                value={constraintInput}
                                onChange={(e) => setConstraintInput(e.target.value)}
                                placeholder="e.g., Budget limitations, technical requirements..."
                                className="flex-1"
                            />
                            <Button
                                onClick={handleAddConstraint}
                                variant="outline"
                                className="self-end mb-[1px]"
                            >
                                Add
                            </Button>
                        </div>

                        <AnimatePresence>
                            {formData.constraints.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex flex-wrap gap-2"
                                >
                                    {formData.constraints.map((constraint, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="px-3 py-1 bg-moss-100 text-moss-700 rounded-full flex items-center gap-2"
                                        >
                                            {constraint}
                                            <button
                                                onClick={() => removeConstraint(index)}
                                                className="w-4 h-4 rounded-full bg-moss-200 hover:bg-moss-300 flex items-center justify-center text-moss-600"
                                            >
                                                ×
                                            </button>
                                        </motion.span>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )
        },
        {
            title: 'Define Impact Goals',
            description: 'What environmental impact are you aiming to achieve?',
            content: (
                <Input
                    type="textarea"
                    label="Target Impact"
                    value={formData.targetImpact}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetImpact: e.target.value }))}
                    placeholder="Describe the environmental improvements you hope to achieve..."
                    rows={3}
                />
            )
        }
    ];

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.problemStatement.trim().length > 0;
            case 2:
                return formData.context.trim().length > 0;
            case 3:
                return formData.targetImpact.trim().length > 0;
            default:
                return false;
        }
    };

    const progressBarWidth = `${(currentStep / steps.length) * 100}%`;

    return (
        <Card className="max-w-2xl mx-auto">
            <div className="relative mb-8">
                <div className="h-2 bg-moss-100 rounded-full">
                    <motion.div
                        className="h-full bg-emerald-water-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: progressBarWidth }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="absolute -top-2 left-0 w-full flex justify-between">
                    {steps.map((_, index) => (
                        <motion.button
                            key={index}
                            className={`w-6 h-6 rounded-full flex items-center justify-center
                ${index + 1 <= currentStep ? 'bg-emerald-water-500 text-white' : 'bg-moss-100 text-moss-400'}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentStep(index + 1)}
                        >
                            {index + 1}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-forest-800 mb-2">
                    {steps[currentStep - 1].title}
                </h2>
                <p className="text-forest-600">
                    {steps[currentStep - 1].description}
                </p>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="mb-8"
                >
                    {steps[currentStep - 1].content}
                </motion.div>
            </AnimatePresence>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-r"
                >
                    {error}
                </motion.div>
            )}

            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                >
                    Previous
                </Button>

                {currentStep < steps.length ? (
                    <Button
                        variant="primary"
                        onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
                        disabled={!isStepValid()}
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        isLoading={isGenerating}
                        disabled={!isStepValid() || isGenerating}
                    >
                        Generate Solution
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default SolutionGenerator;