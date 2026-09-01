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
  const [mode, setMode] = useState<"graph" | "sphere">("graph");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Graph state
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

  // Sphere state
  const [sphereRotation, setSphereRotation] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const isNarrow = width < 640;
        const maxHeight = isNarrow
          ? Math.min(380, window.innerHeight * 0.46)
          : 520;
        const minHeight = isNarrow ? 260 : 340;
        const height = Math.min(maxHeight, Math.max(minHeight, width * 0.56));
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (nodeAnimationFrameRef.current)
        cancelAnimationFrame(nodeAnimationFrameRef.current);
    };
  }, []);

  const initialNodes: Node[] = [
    { id: "fullstack", label: "Full Stack", x: 0.5, y: 0.46, category: "core" },
    {
      id: "typescript",
      label: "TypeScript",
      x: 0.4,
      y: 0.28,
      category: "core",
    },
    { id: "golang", label: "Go", x: 0.6, y: 0.28, category: "core" },
    {
      id: "javascript",
      label: "JavaScript",
      x: 0.44,
      y: 0.16,
      category: "core",
    },
    { id: "sql", label: "SQL", x: 0.56, y: 0.64, category: "core" },

    { id: "react", label: "React.js", x: 0.22, y: 0.22, category: "frontend" },
    { id: "nextjs", label: "Next.js", x: 0.28, y: 0.38, category: "frontend" },
    {
      id: "tailwind",
      label: "Tailwind CSS",
      x: 0.14,
      y: 0.36,
      category: "frontend",
    },
    { id: "zustand", label: "Zustand", x: 0.09, y: 0.22, category: "frontend" },
    {
      id: "hookform",
      label: "Hook Form",
      x: 0.2,
      y: 0.52,
      category: "frontend",
    },
    { id: "vuejs", label: "Vue.js", x: 0.1, y: 0.6, category: "frontend" },
    {
      id: "contextapi",
      label: "Context API",
      x: 0.28,
      y: 0.56,
      category: "frontend",
    },

    { id: "nestjs", label: "NestJS", x: 0.78, y: 0.22, category: "backend" },
    { id: "nodejs", label: "Node.js", x: 0.7, y: 0.36, category: "backend" },
    {
      id: "express",
      label: "Express.js",
      x: 0.88,
      y: 0.3,
      category: "backend",
    },
    {
      id: "restapi",
      label: "REST APIs",
      x: 0.82,
      y: 0.44,
      category: "backend",
    },
    { id: "jwt", label: "JWT Auth", x: 0.72, y: 0.52, category: "backend" },
    {
      id: "postgres",
      label: "PostgreSQL",
      x: 0.68,
      y: 0.7,
      category: "backend",
    },
    { id: "mongodb", label: "MongoDB", x: 0.84, y: 0.6, category: "backend" },

    { id: "docker", label: "Docker", x: 0.62, y: 0.85, category: "tools" },
    {
      id: "actions",
      label: "GitHub Actions",
      x: 0.48,
      y: 0.85,
      category: "tools",
    },
    { id: "gcp", label: "GCP", x: 0.76, y: 0.85, category: "tools" },
    { id: "vercel", label: "Vercel", x: 0.36, y: 0.85, category: "tools" },
    { id: "jest", label: "Jest / Husky", x: 0.22, y: 0.72, category: "tools" },
    { id: "chrome", label: "Chrome MV3", x: 0.1, y: 0.08, category: "tools" },
    {
      id: "streams",
      label: "ReadableStream",
      x: 0.26,
      y: 0.08,
      category: "tools",
    },
    {
      id: "cloudinary",
      label: "Cloudinary",
      x: 0.4,
      y: 0.7,
      category: "tools",
    },
    { id: "stripe", label: "Stripe", x: 0.88, y: 0.74, category: "tools" },
    {
      id: "telegram",
      label: "Telegram Bot API",
      x: 0.88,
      y: 0.12,
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
      ]),
    ),
  );

  useEffect(() => {
    setNodePositions(
      new Map(
        initialNodes.map((node) => [
          node.id,
          { x: node.x * dimensions.width, y: node.y * dimensions.height },
        ]),
      ),
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
    { from: "fullstack", to: "typescript" },
    { from: "fullstack", to: "golang" },
    { from: "fullstack", to: "react" },
    { from: "fullstack", to: "nextjs" },
    { from: "fullstack", to: "nestjs" },
    { from: "fullstack", to: "nodejs" },
    { from: "fullstack", to: "postgres" },
    { from: "fullstack", to: "actions" },
    { from: "typescript", to: "javascript" },
    { from: "typescript", to: "react" },
    { from: "typescript", to: "nextjs" },
    { from: "typescript", to: "nestjs" },
    { from: "typescript", to: "nodejs" },
    { from: "typescript", to: "chrome" },
    { from: "golang", to: "gcp" },
    { from: "golang", to: "restapi" },
    { from: "golang", to: "postgres" },
    { from: "golang", to: "telegram" },
    { from: "sql", to: "postgres" },
    { from: "sql", to: "golang" },
    { from: "sql", to: "nestjs" },
    { from: "react", to: "nextjs" },
    { from: "react", to: "zustand" },
    { from: "react", to: "hookform" },
    { from: "react", to: "vuejs" },
    { from: "react", to: "jest" },
    { from: "nextjs", to: "tailwind" },
    { from: "nextjs", to: "vercel" },
    { from: "nextjs", to: "contextapi" },
    { from: "nextjs", to: "cloudinary" },
    { from: "nextjs", to: "stripe" },
    { from: "tailwind", to: "react" },
    { from: "zustand", to: "chrome" },
    { from: "chrome", to: "streams" },
    { from: "hookform", to: "zustand" },
    { from: "nodejs", to: "nestjs" },
    { from: "nodejs", to: "express" },
    { from: "nodejs", to: "restapi" },
    { from: "nodejs", to: "jwt" },
    { from: "nestjs", to: "jwt" },
    { from: "nestjs", to: "postgres" },
    { from: "nestjs", to: "mongodb" },
    { from: "restapi", to: "jwt" },
    { from: "docker", to: "actions" },
    { from: "docker", to: "gcp" },
    { from: "actions", to: "vercel" },
    { from: "actions", to: "gcp" },
    { from: "jest", to: "typescript" },
    { from: "telegram", to: "restapi" },
    { from: "stripe", to: "restapi" },
    { from: "cloudinary", to: "restapi" },
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

  // --- Graph Interaction Logic ---

  const isNodeConnected = (nodeId: string) => {
    if (!hoveredNode) return true;
    if (nodeId === hoveredNode) return true;
    return edges.some(
      (e) =>
        (e.from === hoveredNode && e.to === nodeId) ||
        (e.to === hoveredNode && e.from === nodeId),
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
      applyNodeMomentum(nodeId),
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (mode === "sphere") return;
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
    if (mode === "sphere") return;
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
    if (mode === "sphere") return;
    if (
      isPanning &&
      (Math.abs(velocityRef.current.x) > 0.3 ||
        Math.abs(velocityRef.current.y) > 0.3)
    ) {
      applyMomentum();
    }
    if (
      draggedNode &&
      (Math.abs(nodeVelocityRef.current.x) > 0.3 ||
        Math.abs(nodeVelocityRef.current.y) > 0.3)
    ) {
      applyNodeMomentum(draggedNode);
    }
    setIsPanning(false);
    setDraggedNode(null);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (mode === "sphere") return;
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

  const handleTouchStartGraph = (e: React.TouchEvent) => {
    if (mode === "sphere") return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsPanning(true);
      setPanStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
      lastPosRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
      velocityRef.current = { x: 0, y: 0 };
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  };

  const handleTouchMoveGraph = (e: React.TouchEvent) => {
    if (mode === "sphere") {
      if (e.touches.length > 0 && containerRef.current) {
        setIsAutoRotating(false);
        const touch = e.touches[0];
        const rect = containerRef.current.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width - 0.5;
        const y = (touch.clientY - rect.top) / rect.height - 0.5;
        setTargetRotation({ x: y * 3, y: x * 3 });
      }
      return;
    }

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      if (isPanning) {
        const newPan = {
          x: touch.clientX - panStart.x,
          y: touch.clientY - panStart.y,
        };
        setPan(newPan);
        const now = Date.now();
        const dt = now - lastPosRef.current.time;
        if (dt > 0) {
          velocityRef.current = {
            x: ((touch.clientX - lastPosRef.current.x) / dt) * 30,
            y: ((touch.clientY - lastPosRef.current.y) / dt) * 30,
          };
        }
        lastPosRef.current = { x: touch.clientX, y: touch.clientY, time: now };
      }

      if (draggedNode) {
        const svg = containerRef.current?.querySelector("svg");
        if (svg) {
          const rect = svg.getBoundingClientRect();
          const x = touch.clientX - rect.left - pan.x;
          const y = touch.clientY - rect.top - pan.y;

          setNodePositions((prev) => {
            const newMap = new Map(prev);
            newMap.set(draggedNode, {
              x: x - dragOffset.x,
              y: y - dragOffset.y,
            });
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
    }
  };

  const handleTouchEndGraph = () => {
    if (mode === "sphere") {
      setIsAutoRotating(true);
      return;
    }
    handleMouseUp();
  };

  const handleNodeTouchStart = (e: React.TouchEvent, nodeId: string) => {
    if (mode === "sphere") return;
    e.stopPropagation();
    setHoveredNode(nodeId);
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        setDraggedNode(nodeId);
        const svg = containerRef.current?.querySelector("svg");
        if (svg) {
          const rect = svg.getBoundingClientRect();
          const x = touch.clientX - rect.left - pan.x;
          const y = touch.clientY - rect.top - pan.y;
          setDragOffset({ x: x - node.x, y: y - node.y });
          lastNodePosRef.current = {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now(),
          };
          nodeVelocityRef.current = { x: 0, y: 0 };
          if (nodeAnimationFrameRef.current) {
            cancelAnimationFrame(nodeAnimationFrameRef.current);
            nodeAnimationFrameRef.current = null;
          }
        }
      }
    }
  };

  // --- Sphere Animation Logic ---
  useEffect(() => {
    let animationFrameId: number;
    let prevTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - prevTime) / 1000;
      prevTime = time;

      if (mode === "sphere") {
        setSphereRotation((prev) => {
          let newX = prev.x;
          let newY = prev.y;

          if (isAutoRotating) {
            newX += (0 - prev.x) * dt * 2;
            newY += 0.3 * dt;
          } else {
            newX += (targetRotation.x - prev.x) * dt * 5;
            newY += (targetRotation.y - prev.y) * dt * 5;
          }
          return { x: newX, y: newY };
        });
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    if (mode === "sphere") {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [mode, targetRotation, isAutoRotating]);

  const handleSphereMouseMove = (e: React.MouseEvent) => {
    if (mode === "graph") return;
    if (!containerRef.current) return;
    setIsAutoRotating(false);
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTargetRotation({ x: y * 3, y: x * 3 });
  };

  const handleSphereMouseLeave = () => {
    if (mode === "graph") return;
    setIsAutoRotating(true);
  };

  const getSphereNodes = () => {
    const N = initialNodes.length;
    const sphereRadius = Math.min(dimensions.width, dimensions.height) * 0.35;

    return initialNodes
      .map((node, i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        let x = Math.cos(theta) * Math.sin(phi);
        let y = Math.sin(theta) * Math.sin(phi);
        let z = Math.cos(phi);

        const rx = sphereRotation.x;
        const ry = sphereRotation.y;

        let y1 = y * Math.cos(rx) - z * Math.sin(rx);
        let z1 = y * Math.sin(rx) + z * Math.cos(rx);

        let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
        let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
        let y2 = y1;

        const scale = 250 / (250 + z2 * 100);
        const xProj = x2 * sphereRadius * scale + dimensions.width / 2;
        const yProj = y2 * sphereRadius * scale + dimensions.height / 2;

        const alpha = Math.min(1, Math.max(0.7, (z2 + 1.8) / 2.2));

        return {
          ...node,
          xProj,
          yProj,
          scale,
          alpha,
          z: z2,
        };
      })
      .sort((a, b) => b.z - a.z);
  };

  const handleReset = () => {
    if (mode === "graph") {
      setPan({ x: 0, y: 0 });
      setNodePositions(
        new Map(
          initialNodes.map((node) => [
            node.id,
            { x: node.x * dimensions.width, y: node.y * dimensions.height },
          ]),
        ),
      );
      velocityRef.current = { x: 0, y: 0 };
      nodeVelocityRef.current = { x: 0, y: 0 };
    } else {
      setSphereRotation({ x: 0, y: 0 });
    }
  };

  const isMobile = dimensions.width < 640;
  const baseRadius = isMobile ? 7 : 12;
  const coreRadius = isMobile ? 10 : 16;
  const fontSize = isMobile ? 9 : 12;
  const coreFontSize = isMobile ? 11 : 14;

  const sphereNodes = mode === "sphere" ? getSphereNodes() : [];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center min-h-full py-2 sm:py-6 px-1 sm:px-4 md:px-8">
      <div className="flex flex-wrap justify-between items-center mb-2 sm:mb-4 gap-2">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white font-mono flex items-center">
          <span className="text-gray-600 mr-1.5 sm:mr-2">## </span>
          skills network
          <span className="text-green-500 text-[10px] sm:text-sm font-normal ml-2 sm:ml-3">
            // {mode === "graph" ? "interactive 2d graph" : "3d orbital view"}
          </span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setMode(mode === "graph" ? "sphere" : "graph")}
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/40 rounded-lg font-mono text-[11px] sm:text-sm transition-all shadow-[0_0_10px_rgba(34,197,94,0.15)]"
          >
            {mode === "graph" ? "3D Sphere" : "2D Graph"}
          </button>
          <button
            onClick={handleReset}
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 rounded-lg font-mono text-[11px] sm:text-sm transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        data-scrollable="false"
        className={`relative w-full bg-[#111317]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden touch-none ${
          mode === "graph"
            ? "cursor-grab active:cursor-grabbing"
            : "cursor-crosshair"
        }`}
        style={{ height: `${dimensions.height}px` }}
        onMouseDown={mode === "graph" ? handleMouseDown : undefined}
        onMouseMove={mode === "graph" ? handleMouseMove : handleSphereMouseMove}
        onMouseUp={mode === "graph" ? handleMouseUp : undefined}
        onMouseLeave={mode === "graph" ? handleMouseUp : handleSphereMouseLeave}
        onTouchStart={handleTouchStartGraph}
        onTouchMove={handleTouchMoveGraph}
        onTouchEnd={handleTouchEndGraph}
      >
        {mode === "graph" ? (
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
                      strokeWidth={isActive ? (isMobile ? 1.5 : 2) : 1}
                      opacity={isActive ? 0.8 : 0.25}
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
                      onTouchStart={(e) => handleNodeTouchStart(e, node.id)}
                      className="cursor-move transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : 0.5 }}
                    >
                      {hoveredNode === node.id && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={radius + (isMobile ? 4 : 6)}
                          fill={color}
                          opacity={0.25}
                          className="pointer-events-none"
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius}
                        fill={hoveredNode === node.id ? color : "#1a1a1a"}
                        stroke={color}
                        strokeWidth={isMobile ? 1.5 : 2}
                      />
                      <rect
                        x={
                          node.x -
                          (node.label.length *
                            (isCoreNode ? coreFontSize : fontSize)) /
                            2.4
                        }
                        y={node.y + radius + (isMobile ? 3 : 8)}
                        width={
                          node.label.length *
                          (isCoreNode ? coreFontSize : fontSize) *
                          0.68
                        }
                        height={isCoreNode ? coreFontSize + 4 : fontSize + 4}
                        fill="#0a0a0a"
                        opacity={0.95}
                        rx={3}
                        className="pointer-events-none"
                      />
                      <text
                        x={node.x - radius / 2}
                        y={node.y + radius + (isMobile ? 12 : 18)}
                        textAnchor="middle"
                        fill={hoveredNode === node.id ? "#ffffff" : color}
                        fontSize={isCoreNode ? coreFontSize : fontSize}
                        fontWeight={isCoreNode ? "bold" : "600"}
                        className="font-mono transition-colors duration-200 select-none pointer-events-none"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </g>
            </g>
          </svg>
        ) : (
          <div className="w-full h-full relative perspective-[1000px]">
            {sphereNodes.map((node) => {
              const isCoreNode = node.category === "core";
              const color = getCategoryColor(node.category);
              const nodeFontSize =
                (isCoreNode ? coreFontSize + 3 : fontSize + 3) * node.scale;
              const isHovered = hoveredNode === node.id;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onTouchStart={() => setHoveredNode(node.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 cursor-pointer flex items-center justify-center font-mono whitespace-nowrap"
                  style={{
                    left: `${node.xProj}px`,
                    top: `${node.yProj}px`,
                    opacity: isHovered ? 1 : node.alpha,
                    zIndex: Math.round((node.z + 2) * 100),
                    fontSize: `${nodeFontSize}px`,
                    color: isHovered ? "#ffffff" : color,
                    fontWeight: isCoreNode || isHovered ? "bold" : "600",
                  }}
                >
                  {node.label}
                </div>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-1.5 sm:bottom-3 left-2 sm:left-4 font-mono text-[9px] sm:text-xs flex sm:flex-col gap-2 sm:gap-1 pointer-events-none bg-black/60 sm:bg-transparent p-1 sm:p-0 rounded border border-white/5 sm:border-0">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00ff00]"></div>
            <span className="text-gray-400">Core</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00ccff]"></div>
            <span className="text-gray-400">Front</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff00ff]"></div>
            <span className="text-gray-400">Back</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ffff00]"></div>
            <span className="text-gray-400">Tools</span>
          </div>
        </div>

        <div className="absolute top-1.5 sm:top-3 right-2 sm:right-4 font-mono text-[9px] sm:text-xs text-gray-500 text-right pointer-events-none bg-black/60 sm:bg-transparent p-1 sm:p-0 rounded border border-white/5 sm:border-0">
          {mode === "graph" ? (
            <div>Drag nodes / pan canvas</div>
          ) : (
            <div>Drag or swipe to rotate</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsGraph;
