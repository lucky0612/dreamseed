import React, { useCallback } from 'react';
import ReactFlow, {
    Node,
    Edge,
    Background,
    Controls,
    Handle,
    Position,
    NodeProps,
} from 'react-flow-renderer';
import { motion } from 'framer-motion';
import useDreamSeedStore from '../store/store';
import { Solution } from '../store/store';

// Custom Node Components
const SolutionNode: React.FC<NodeProps> = ({ data }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="px-4 py-2 rounded-lg bg-emerald-water-500 text-white shadow-lg"
    >
        <Handle type="target" position={Position.Top} className="w-3 h-3 bg-emerald-water-700" />
        <div className="font-medium">{data.label}</div>
        <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-emerald-water-700" />
    </motion.div>
);

const ComponentNode: React.FC<NodeProps> = ({ data }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="px-4 py-2 rounded-lg bg-moss-100 border-2 border-moss-200 text-forest-700 shadow-md"
    >
        <Handle type="target" position={Position.Top} className="w-3 h-3 bg-moss-400" />
        <div className="text-sm">{data.label}</div>
        <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-moss-400" />
    </motion.div>
);

const ImpactNode: React.FC<NodeProps> = ({ data }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="px-4 py-2 rounded-lg bg-forest-100 border-2 border-forest-200 text-forest-700 shadow-md"
    >
        <Handle type="target" position={Position.Top} className="w-3 h-3 bg-forest-400" />
        <div className="text-sm">{data.label}</div>
    </motion.div>
);

// Node Types
const nodeTypes = {
    solution: SolutionNode,
    component: ComponentNode,
    impact: ImpactNode,
};

const VisualizationMap: React.FC = () => {
    const { currentSolution } = useDreamSeedStore();

    const generateNodesAndEdges = useCallback((solution: Solution) => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];
        let yOffset = 0;

        // Main Solution Node
        nodes.push({
            id: 'solution',
            type: 'solution',
            data: { label: solution.title },
            position: { x: 300, y: yOffset },
        });

        yOffset += 120;

        // Component Nodes
        solution.innovation.technicalComponents.forEach((component, index) => {
            const id = `component-${index}`;
            nodes.push({
                id,
                type: 'component',
                data: { label: component },
                position: {
                    x: 150 + (index % 2) * 300,
                    y: yOffset + Math.floor(index / 2) * 80,
                },
            });
            edges.push({
                id: `edge-solution-${id}`,
                source: 'solution',
                target: id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#4b8467' },
            });
        });

        yOffset += Math.ceil(solution.innovation.technicalComponents.length / 2) * 80 + 80;

        // Impact Nodes
        solution.environmentalImpact.directBenefits.forEach((impact, index) => {
            const id = `impact-${index}`;
            nodes.push({
                id,
                type: 'impact',
                data: { label: impact },
                position: {
                    x: 100 + (index % 3) * 200,
                    y: yOffset + Math.floor(index / 3) * 80,
                },
            });
            edges.push({
                id: `edge-impact-${id}`,
                source: 'solution',
                target: id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#2a4437' },
            });
        });

        return { nodes, edges };
    }, []);

    if (!currentSolution) {
        return null;
    }

    const { nodes, edges } = generateNodesAndEdges(currentSolution);

    return (
        <div className="w-full h-[600px] bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-right"
            >
                <Background
                    color="#4b8467"
                    gap={24}
                    size={1}
                    style={{ backgroundColor: 'transparent' }}
                />
                <Controls
                    className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-moss-100"
                    style={{ button: { border: 'none', color: '#4b8467' } }}
                />
            </ReactFlow>
        </div>
    );
};

export default VisualizationMap;