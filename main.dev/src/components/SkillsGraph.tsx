import { useState } from "react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  category: "core" | "frontend" | "backend" | "tools" | "other";
}

interface Edge {
  from: string;
  to: string;
}

const SkillsGraph = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Определяем узлы (навыки)
  const nodes: Node[] = [
    // Core центр
    { id: "fullstack", label: "Full Stack", x: 400, y: 300, category: "core" },

    // Frontend кластер (слева вверху)
    { id: "react", label: "React", x: 200, y: 150, category: "frontend" },
    { id: "nextjs", label: "Next.js", x: 150, y: 250, category: "frontend" },
    {
      id: "typescript",
      label: "TypeScript",
      x: 300,
      y: 100,
      category: "frontend",
    },

    // Backend кластер (справа вверху)
    { id: "nodejs", label: "Node.js", x: 600, y: 150, category: "backend" },
    { id: "python", label: "Python", x: 650, y: 250, category: "backend" },

    // Database кластер (справа внизу)
    {
      id: "postgres",
      label: "PostgreSQL",
      x: 600,
      y: 450,
      category: "backend",
    },
    { id: "mongodb", label: "MongoDB", x: 500, y: 500, category: "backend" },

    // Tools кластер (слева внизу)
    { id: "ai", label: "AI/ML", x: 200, y: 400, category: "tools" },
    {
      id: "blockchain",
      label: "Blockchain",
      x: 150,
      y: 500,
      category: "tools",
    },
    {
      id: "automation",
      label: "Automation",
      x: 300,
      y: 480,
      category: "tools",
    },
  ];

  // Определяем связи
  const edges: Edge[] = [
    // Core connections
    { from: "fullstack", to: "react" },
    { from: "fullstack", to: "nextjs" },
    { from: "fullstack", to: "typescript" },
    { from: "fullstack", to: "nodejs" },
    { from: "fullstack", to: "python" },
    { from: "fullstack", to: "postgres" },
    { from: "fullstack", to: "mongodb" },

    // Frontend cluster
    { from: "react", to: "nextjs" },
    { from: "react", to: "typescript" },
    { from: "nextjs", to: "typescript" },

    // Backend cluster
    { from: "nodejs", to: "typescript" },
    { from: "nodejs", to: "postgres" },
    { from: "nodejs", to: "mongodb" },
    { from: "python", to: "postgres" },
    { from: "python", to: "ai" },

    // Tools connections
    { from: "ai", to: "python" },
    { from: "blockchain", to: "nodejs" },
    { from: "automation", to: "nodejs" },
    { from: "automation", to: "python" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "core":
        return "#00ff00"; // Яркий зеленый
      case "frontend":
        return "#00ccff"; // Голубой
      case "backend":
        return "#ff00ff"; // Пурпурный
      case "tools":
        return "#ffff00"; // Желтый
      default:
        return "#888888";
    }
  };

  const isNodeConnected = (nodeId: string) => {
    if (!hoveredNode) return true;
    if (nodeId === hoveredNode) return true;
    return edges.some(
      (e) =>
        (e.from === hoveredNode && e.to === nodeId) ||
        (e.to === hoveredNode && e.from === nodeId)
    );
  };

  const isEdgeConnected = (edge: Edge) => {
    if (!hoveredNode) return true;
    return edge.from === hoveredNode || edge.to === hoveredNode;
  };

  return (
    <div className="w-full my-16">
      <h2 className="text-3xl font-extrabold text-white mb-8 font-mono">
        <span className="text-gray-500">## </span>
        skills network
        <span className="text-gray-500 text-lg ml-2">(hover to explore)</span>
      </h2>

      <div className="relative w-full h-[600px] bg-[#0a0a0a] border border-gray-700 rounded-lg overflow-hidden">
        <svg width="800" height="600" className="absolute inset-0">
          {/* Рисуем линии связей */}
          <g className="edges">
            {edges.map((edge, idx) => {
              const fromNode = nodes.find((n) => n.id === edge.from);
              const toNode = nodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const isActive = isEdgeConnected(edge);
              return (
                <line
                  key={idx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isActive ? "#00ff00" : "#333333"}
                  strokeWidth={isActive ? 2 : 1}
                  opacity={isActive ? 0.6 : 0.2}
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          {/* Рисуем узлы */}
          <g className="nodes">
            {nodes.map((node) => {
              const isActive = isNodeConnected(node.id);
              const isCoreNode = node.category === "core";
              const radius = isCoreNode ? 16 : 12;
              const color = getCategoryColor(node.category);

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    opacity: isActive ? 1 : 0.3,
                  }}
                >
                  {/* Внешнее свечение при hover */}
                  {hoveredNode === node.id && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius + 8}
                      fill={color}
                      opacity={0.2}
                      className="animate-pulse"
                    />
                  )}

                  {/* Основной круг узла */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    fill={hoveredNode === node.id ? color : "#1a1a1a"}
                    stroke={color}
                    strokeWidth={2}
                  />

                  {/* Метка узла */}
                  <text
                    x={node.x}
                    y={node.y + radius + 20}
                    textAnchor="middle"
                    fill={hoveredNode === node.id ? color : "#888888"}
                    fontSize={isCoreNode ? 14 : 12}
                    fontWeight={isCoreNode ? "bold" : "normal"}
                    className="font-mono transition-all duration-300"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Легенда категорий */}
        <div className="absolute bottom-4 left-4 font-mono text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00ff00]"></div>
            <span className="text-gray-400">Core</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00ccff]"></div>
            <span className="text-gray-400">Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff00ff]"></div>
            <span className="text-gray-400">Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ffff00]"></div>
            <span className="text-gray-400">Tools</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsGraph;
