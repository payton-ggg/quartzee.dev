import { useState, useEffect, useRef } from "react";

interface Node {
  id: string;
  label: string;
  // Используем относительные координаты (0-1)
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
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Обновление размеров при изменении размера окна
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = Math.min(600, Math.max(400, width * 0.75)); // Адаптивная высота
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Определяем узлы с относительными координатами (0-1)
  const baseNodes: Node[] = [
    // Core центр
    { id: "fullstack", label: "Full Stack", x: 0.5, y: 0.5, category: "core" },

    // Frontend кластер (левый верхний квадрант) - более разреженное
    { id: "react", label: "React", x: 0.18, y: 0.18, category: "frontend" },
    { id: "nextjs", label: "Next.js", x: 0.12, y: 0.35, category: "frontend" },
    {
      id: "typescript",
      label: "TypeScript",
      x: 0.32,
      y: 0.12,
      category: "frontend",
    },
    {
      id: "tailwind",
      label: "Tailwind",
      x: 0.28,
      y: 0.32,
      category: "frontend",
    },
    { id: "zustand", label: "Zustand", x: 0.08, y: 0.22, category: "frontend" },
    {
      id: "hookform",
      label: "Hook Form",
      x: 0.22,
      y: 0.38,
      category: "frontend",
    },

    // Backend кластер (правый верхний квадрант)
    { id: "nodejs", label: "Node.js", x: 0.72, y: 0.15, category: "backend" },
    { id: "nestjs", label: "NestJS", x: 0.88, y: 0.22, category: "backend" },
    { id: "python", label: "Python", x: 0.85, y: 0.35, category: "backend" },
    { id: "restapi", label: "REST API", x: 0.68, y: 0.28, category: "backend" },
    { id: "jwt", label: "JWT", x: 0.78, y: 0.08, category: "backend" },

    // Database кластер (правый нижний квадрант)
    {
      id: "postgres",
      label: "PostgreSQL",
      x: 0.78,
      y: 0.68,
      category: "backend",
    },
    { id: "mongodb", label: "MongoDB", x: 0.68, y: 0.78, category: "backend" },

    // DevOps/Deploy кластер (правый нижний)
    { id: "vercel", label: "Vercel", x: 0.88, y: 0.75, category: "tools" },
    {
      id: "cloudinary",
      label: "Cloudinary",
      x: 0.85,
      y: 0.88,
      category: "tools",
    },

    // Tools/Testing кластер (левый нижний квадрант)
    { id: "jest", label: "Jest", x: 0.15, y: 0.68, category: "tools" },
    { id: "chrome", label: "Chrome Ext", x: 0.08, y: 0.82, category: "tools" },
    { id: "stripe", label: "Stripe", x: 0.22, y: 0.78, category: "tools" },

    // Advanced кластер (центр низ)
    { id: "ai", label: "AI/ML", x: 0.38, y: 0.75, category: "tools" },
    {
      id: "blockchain",
      label: "Blockchain",
      x: 0.32,
      y: 0.88,
      category: "tools",
    },
    {
      id: "automation",
      label: "Automation",
      x: 0.48,
      y: 0.82,
      category: "tools",
    },
  ];

  // Преобразуем относительные координаты в абсолютные
  const nodes = baseNodes.map((node) => ({
    ...node,
    x: node.x * dimensions.width,
    y: node.y * dimensions.height,
  }));

  // Определяем связи
  const edges: Edge[] = [
    // Core connections - Frontend
    { from: "fullstack", to: "react" },
    { from: "fullstack", to: "nextjs" },
    { from: "fullstack", to: "typescript" },
    { from: "fullstack", to: "tailwind" },

    // Core connections - Backend
    { from: "fullstack", to: "nodejs" },
    { from: "fullstack", to: "nestjs" },
    { from: "fullstack", to: "python" },
    { from: "fullstack", to: "postgres" },
    { from: "fullstack", to: "mongodb" },

    // Frontend cluster connections
    { from: "react", to: "nextjs" },
    { from: "react", to: "typescript" },
    { from: "react", to: "zustand" },
    { from: "react", to: "hookform" },
    { from: "nextjs", to: "typescript" },
    { from: "nextjs", to: "tailwind" },
    { from: "nextjs", to: "vercel" },
    { from: "tailwind", to: "typescript" },
    { from: "zustand", to: "typescript" },
    { from: "hookform", to: "react" },

    // Backend cluster connections
    { from: "nodejs", to: "nestjs" },
    { from: "nodejs", to: "typescript" },
    { from: "nodejs", to: "restapi" },
    { from: "nodejs", to: "jwt" },
    { from: "nodejs", to: "postgres" },
    { from: "nodejs", to: "mongodb" },
    { from: "nestjs", to: "typescript" },
    { from: "nestjs", to: "jwt" },
    { from: "nestjs", to: "postgres" },
    { from: "python", to: "postgres" },
    { from: "python", to: "ai" },
    { from: "restapi", to: "jwt" },

    // DevOps/Deploy connections
    { from: "vercel", to: "nextjs" },
    { from: "cloudinary", to: "nextjs" },
    { from: "cloudinary", to: "nodejs" },

    // Tools connections
    { from: "jest", to: "react" },
    { from: "jest", to: "typescript" },
    { from: "chrome", to: "typescript" },
    { from: "chrome", to: "zustand" },
    { from: "stripe", to: "nextjs" },
    { from: "stripe", to: "nodejs" },

    // Advanced tools connections
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

  // Адаптивные размеры для узлов
  const isMobile = dimensions.width < 640;
  const baseRadius = isMobile ? 8 : 12;
  const coreRadius = isMobile ? 12 : 16;
  const fontSize = isMobile ? 10 : 12;
  const coreFontSize = isMobile ? 12 : 14;

  return (
    <div className="w-full my-16">
      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 md:mb-8 font-mono">
        <span className="text-gray-500">## </span>
        skills network
        <span className="text-gray-500 text-sm md:text-lg ml-2 hidden sm:inline">
          (hover to explore)
        </span>
      </h2>

      <div
        ref={containerRef}
        className="relative w-full bg-[#0a0a0a] border border-gray-700 rounded-lg overflow-hidden"
        style={{ height: `${dimensions.height}px` }}
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
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
              const radius = isCoreNode ? coreRadius : baseRadius;
              const color = getCategoryColor(node.category);

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onTouchStart={() => setHoveredNode(node.id)}
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

                  {/* Фон под текстом для лучшей читаемости */}
                  <rect
                    x={
                      node.x -
                      (node.label.length *
                        (isCoreNode ? coreFontSize : fontSize)) /
                        2.5
                    }
                    y={node.y + radius + (isMobile ? 5 : 10)}
                    width={
                      node.label.length *
                      (isCoreNode ? coreFontSize : fontSize) *
                      0.65
                    }
                    height={isCoreNode ? coreFontSize + 6 : fontSize + 6}
                    fill="#0a0a0a"
                    opacity={0.85}
                    rx={3}
                  />

                  {/* Метка узла */}
                  <text
                    x={node.x}
                    y={node.y + radius + (isMobile ? 15 : 20)}
                    textAnchor="middle"
                    fill={hoveredNode === node.id ? color : "#888888"}
                    fontSize={isCoreNode ? coreFontSize : fontSize}
                    fontWeight={isCoreNode ? "bold" : "normal"}
                    className="font-mono transition-all duration-300 select-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Легенда категорий */}
        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 font-mono text-[10px] md:text-xs space-y-1">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#00ff00]"></div>
            <span className="text-gray-400">Core</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#00ccff]"></div>
            <span className="text-gray-400">Frontend</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#ff00ff]"></div>
            <span className="text-gray-400">Backend</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#ffff00]"></div>
            <span className="text-gray-400">Tools</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsGraph;
