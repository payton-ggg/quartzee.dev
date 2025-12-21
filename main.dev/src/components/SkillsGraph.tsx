import { useState, useEffect, useRef } from "react";

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
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0, time: 0 });
  const animationFrameRef = useRef<number | null>(null);

  const nodeVelocityRef = useRef({ x: 0, y: 0 });
  const lastNodePosRef = useRef({ x: 0, y: 0, time: 0 });
  const nodeAnimationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = Math.min(600, Math.max(400, width * 0.75));
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (nodeAnimationFrameRef.current) {
        cancelAnimationFrame(nodeAnimationFrameRef.current);
      }
    };
  }, []);

  const initialNodes: Node[] = [
    { id: "fullstack", label: "Full Stack", x: 0.5, y: 0.5, category: "core" },
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
    { id: "nodejs", label: "Node.js", x: 0.72, y: 0.15, category: "backend" },
    { id: "nestjs", label: "NestJS", x: 0.88, y: 0.22, category: "backend" },
    { id: "python", label: "Python", x: 0.85, y: 0.35, category: "backend" },
    { id: "restapi", label: "REST API", x: 0.68, y: 0.28, category: "backend" },
    { id: "jwt", label: "JWT", x: 0.78, y: 0.08, category: "backend" },
    {
      id: "postgres",
      label: "PostgreSQL",
      x: 0.78,
      y: 0.68,
      category: "backend",
    },
    { id: "mongodb", label: "MongoDB", x: 0.68, y: 0.78, category: "backend" },
    { id: "vercel", label: "Vercel", x: 0.88, y: 0.75, category: "tools" },
    {
      id: "cloudinary",
      label: "Cloudinary",
      x: 0.85,
      y: 0.88,
      category: "tools",
    },
    { id: "jest", label: "Jest", x: 0.15, y: 0.68, category: "tools" },
    { id: "chrome", label: "Chrome Ext", x: 0.08, y: 0.82, category: "tools" },
    { id: "stripe", label: "Stripe", x: 0.22, y: 0.78, category: "tools" },
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

  const [nodePositions, setNodePositions] = useState<
    Map<string, { x: number; y: number }>
  >(
    new Map(
      initialNodes.map((node) => [
        node.id,
        { x: node.x * dimensions.width, y: node.y * dimensions.height },
      ])
    )
  );

  useEffect(() => {
    setNodePositions(
      new Map(
        initialNodes.map((node) => [
          node.id,
          { x: node.x * dimensions.width, y: node.y * dimensions.height },
        ])
      )
    );
  }, [dimensions.width, dimensions.height]);

  const nodes = initialNodes.map((node) => ({
    ...node,
    ...(nodePositions.get(node.id) || {
      x: node.x * dimensions.width,
      y: node.y * dimensions.height,
    }),
  }));

  const edges: Edge[] = [
    { from: "fullstack", to: "react" },
    { from: "fullstack", to: "nextjs" },
    { from: "fullstack", to: "typescript" },
    { from: "fullstack", to: "tailwind" },
    { from: "fullstack", to: "nodejs" },
    { from: "fullstack", to: "nestjs" },
    { from: "fullstack", to: "python" },
    { from: "fullstack", to: "postgres" },
    { from: "fullstack", to: "mongodb" },
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
    { from: "vercel", to: "nextjs" },
    { from: "cloudinary", to: "nextjs" },
    { from: "cloudinary", to: "nodejs" },
    { from: "jest", to: "react" },
    { from: "jest", to: "typescript" },
    { from: "chrome", to: "typescript" },
    { from: "chrome", to: "zustand" },
    { from: "stripe", to: "nextjs" },
    { from: "stripe", to: "nodejs" },
    { from: "ai", to: "python" },
    { from: "blockchain", to: "nodejs" },
    { from: "automation", to: "nodejs" },
    { from: "automation", to: "python" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "core":
        return "#00ff00";
      case "frontend":
        return "#00ccff";
      case "backend":
        return "#ff00ff";
      case "tools":
        return "#ffff00";
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

  const applyMomentum = () => {
    if (
      Math.abs(velocityRef.current.x) < 0.05 &&
      Math.abs(velocityRef.current.y) < 0.05
    ) {
      velocityRef.current = { x: 0, y: 0 };
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    setPan((prev) => ({
      x: prev.x + velocityRef.current.x,
      y: prev.y + velocityRef.current.y,
    }));

    velocityRef.current.x *= 0.76;
    velocityRef.current.y *= 0.76;

    animationFrameRef.current = requestAnimationFrame(applyMomentum);
  };

  const applyNodeMomentum = (nodeId: string) => {
    if (
      Math.abs(nodeVelocityRef.current.x) < 0.05 &&
      Math.abs(nodeVelocityRef.current.y) < 0.05
    ) {
      nodeVelocityRef.current = { x: 0, y: 0 };
      if (nodeAnimationFrameRef.current) {
        cancelAnimationFrame(nodeAnimationFrameRef.current);
        nodeAnimationFrameRef.current = null;
      }
      return;
    }

    setNodePositions((prev) => {
      const currentPos = prev.get(nodeId);
      if (!currentPos) return prev;

      const newMap = new Map(prev);
      newMap.set(nodeId, {
        x: currentPos.x + nodeVelocityRef.current.x,
        y: currentPos.y + nodeVelocityRef.current.y,
      });
      return newMap;
    });

    nodeVelocityRef.current.x *= 0.78;
    nodeVelocityRef.current.y *= 0.78;

    nodeAnimationFrameRef.current = requestAnimationFrame(() =>
      applyNodeMomentum(nodeId)
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      e.target === e.currentTarget ||
      (e.target as SVGElement).tagName === "svg"
    ) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      lastPosRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      velocityRef.current = { x: 0, y: 0 };

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      const newPan = { x: e.clientX - panStart.x, y: e.clientY - panStart.y };
      setPan(newPan);

      const now = Date.now();
      const dt = now - lastPosRef.current.time;
      if (dt > 0) {
        velocityRef.current = {
          x: ((e.clientX - lastPosRef.current.x) / dt) * 30,
          y: ((e.clientY - lastPosRef.current.y) / dt) * 30,
        };
      }
      lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };
    }

    if (draggedNode) {
      const svg = containerRef.current?.querySelector("svg");
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left - pan.x;
        const y = e.clientY - rect.top - pan.y;

        setNodePositions((prev) => {
          const newMap = new Map(prev);
          newMap.set(draggedNode, { x: x - dragOffset.x, y: y - dragOffset.y });
          return newMap;
        });

        const now = Date.now();
        const dt = now - lastNodePosRef.current.time;
        if (dt > 0) {
          nodeVelocityRef.current = {
            x: ((x - lastNodePosRef.current.x) / dt) * 30,
            y: ((y - lastNodePosRef.current.y) / dt) * 30,
          };
        }
        lastNodePosRef.current = { x, y, time: now };
      }
    }
  };

  const handleMouseUp = () => {
    if (isPanning) {
      if (
        Math.abs(velocityRef.current.x) > 0.3 ||
        Math.abs(velocityRef.current.y) > 0.3
      ) {
        applyMomentum();
      }
    }

    if (draggedNode) {
      if (
        Math.abs(nodeVelocityRef.current.x) > 0.3 ||
        Math.abs(nodeVelocityRef.current.y) > 0.3
      ) {
        applyNodeMomentum(draggedNode);
      }
    }

    setIsPanning(false);
    setDraggedNode(null);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setDraggedNode(nodeId);
      const svg = containerRef.current?.querySelector("svg");
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left - pan.x;
        const y = e.clientY - rect.top - pan.y;
        setDragOffset({ x: x - node.x, y: y - node.y });

        lastNodePosRef.current = { x, y, time: Date.now() };
        nodeVelocityRef.current = { x: 0, y: 0 };

        if (nodeAnimationFrameRef.current) {
          cancelAnimationFrame(nodeAnimationFrameRef.current);
          nodeAnimationFrameRef.current = null;
        }
      }
    }
  };

  const handleReset = () => {
    setPan({ x: 0, y: 0 });
    setNodePositions(
      new Map(
        initialNodes.map((node) => [
          node.id,
          { x: node.x * dimensions.width, y: node.y * dimensions.height },
        ])
      )
    );
    velocityRef.current = { x: 0, y: 0 };
    nodeVelocityRef.current = { x: 0, y: 0 };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (nodeAnimationFrameRef.current) {
      cancelAnimationFrame(nodeAnimationFrameRef.current);
      nodeAnimationFrameRef.current = null;
    }
  };

  const isMobile = dimensions.width < 640;
  const baseRadius = isMobile ? 8 : 12;
  const coreRadius = isMobile ? 12 : 16;
  const fontSize = isMobile ? 10 : 12;
  const coreFontSize = isMobile ? 12 : 14;

  return (
    <div className="w-full my-16">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-mono">
          <span className="text-gray-500">## </span>
          skills network
          <span className="text-gray-500 text-sm md:text-lg ml-2 hidden sm:inline">
            (interactive graph)
          </span>
        </h2>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600 rounded font-mono text-xs md:text-sm transition-all"
        >
          Reset
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative w-full bg-[#0a0a0a] border border-gray-700 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: `${dimensions.height}px` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform={`translate(${pan.x}, ${pan.y})`}
            style={{
              transition:
                isPanning || draggedNode ? "none" : "transform 0.1s ease-out",
            }}
          >
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
                    className="transition-all duration-300 pointer-events-none"
                  />
                );
              })}
            </g>

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
                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    onTouchStart={() => setHoveredNode(node.id)}
                    className="cursor-move transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0.3 }}
                  >
                    {hoveredNode === node.id && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius + 8}
                        fill={color}
                        opacity={0.2}
                        className="animate-pulse pointer-events-none"
                      />
                    )}

                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius}
                      fill={hoveredNode === node.id ? color : "#1a1a1a"}
                      stroke={color}
                      strokeWidth={2}
                    />

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
                      className="pointer-events-none"
                    />

                    <text
                      x={node.x}
                      y={node.y + radius + (isMobile ? 15 : 20)}
                      textAnchor="middle"
                      fill={hoveredNode === node.id ? color : "#888888"}
                      fontSize={isCoreNode ? coreFontSize : fontSize}
                      fontWeight={isCoreNode ? "bold" : "normal"}
                      className="font-mono transition-all duration-300 select-none pointer-events-none"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </g>
        </svg>

        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 font-mono text-[10px] md:text-xs space-y-1 pointer-events-none">
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

        <div className="absolute top-2 md:top-4 right-2 md:right-4 font-mono text-[10px] md:text-xs text-gray-500 text-right pointer-events-none">
          <div>Drag nodes to move</div>
          <div>Drag canvas to pan</div>
        </div>
      </div>
    </div>
  );
};

export default SkillsGraph;
