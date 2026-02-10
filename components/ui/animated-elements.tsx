'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// ORBITING ICONS - Perfect for AI/Tech sections
// ============================================================================
interface OrbitingIconsProps {
  icons: React.ReactNode[];
  radius?: number;
  duration?: number;
  className?: string;
  centerContent?: React.ReactNode;
}

export const OrbitingIcons = ({ 
  icons, 
  radius = 100, 
  duration = 20,
  className = '',
  centerContent
}: OrbitingIconsProps) => {
  return (
    <div className={`relative ${className}`} style={{ width: radius * 2 + 40, height: radius * 2 + 40 }}>
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 bg-emerald-500/20 rounded-full blur-xl breathe-glow" />
      </div>
      
      {/* Center content */}
      {centerContent && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {centerContent}
        </div>
      )}
      
      {/* Orbit ring */}
      <div 
        className="absolute border border-gray-800/50 rounded-full"
        style={{ 
          width: radius * 2, 
          height: radius * 2,
          top: 20,
          left: 20
        }}
      />
      
      {/* Orbiting icons */}
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute w-10 h-10 bg-gray-900 border border-gray-700 rounded-xl flex items-center justify-center shadow-lg"
          style={{
            top: '50%',
            left: '50%',
            marginTop: -20,
            marginLeft: -20,
          }}
          animate={{
            rotate: [0 + (i * (360 / icons.length)), 360 + (i * (360 / icons.length))],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.div
            animate={{ rotate: [0 - (i * (360 / icons.length)), -360 - (i * (360 / icons.length))] }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            style={{ 
              transform: `translateX(${radius}px)`,
            }}
          >
            <div className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-xl flex items-center justify-center">
              {icon}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// NEURAL NETWORK ANIMATION - For AI-related sections
// ============================================================================
interface NeuralNetworkProps {
  className?: string;
  nodeCount?: number;
}

export const NeuralNetwork = ({ className = '', nodeCount = 12 }: NeuralNetworkProps) => {
  const [nodes, setNodes] = useState<Array<{ x: number; y: number; delay: number }>>([]);
  
  useEffect(() => {
    const generated = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setNodes(generated);
  }, [nodeCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connection lines */}
        {nodes.map((node, i) => 
          nodes.slice(i + 1).filter((_, j) => j < 3).map((target, j) => (
            <line
              key={`${i}-${j}`}
              x1={node.x}
              y1={node.y}
              x2={target.x}
              y2={target.y}
              stroke="url(#lineGradient)"
              strokeWidth="0.2"
              className="network-link"
              style={{ animationDelay: `${node.delay}s` }}
            />
          ))
        )}
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Nodes */}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="0.8"
            fill="#10b981"
            className={i % 2 === 0 ? 'node-pulse' : 'node-pulse-delayed'}
            style={{ animationDelay: `${node.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

// ============================================================================
// DATA STREAM - For content/data flow sections
// ============================================================================
interface DataStreamProps {
  className?: string;
  streamCount?: number;
  colors?: string[];
}

export const DataStream = ({ 
  className = '', 
  streamCount = 5,
  colors = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899']
}: DataStreamProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: streamCount }).map((_, i) => (
        <div
          key={i}
          className="absolute h-20 w-0.5 rounded-full data-stream"
          style={{
            left: `${15 + (i * 18)}%`,
            top: '-20%',
            background: `linear-gradient(180deg, transparent, ${colors[i % colors.length]}, transparent)`,
            animationDelay: `${i * 0.8}s`,
            opacity: 0.6
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// SCANNING RADAR - For analysis/monitoring sections
// ============================================================================
interface ScanningRadarProps {
  size?: number;
  className?: string;
}

export const ScanningRadar = ({ size = 200, className = '' }: ScanningRadarProps) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Concentric rings */}
      {[0.3, 0.5, 0.7, 0.9].map((scale, i) => (
        <div
          key={i}
          className="absolute border border-emerald-500/20 rounded-full"
          style={{
            width: size * scale,
            height: size * scale,
            top: (size - size * scale) / 2,
            left: (size - size * scale) / 2,
          }}
        />
      ))}
      
      {/* Radar sweep */}
      <div 
        className="absolute inset-0 radar-sweep"
        style={{ transformOrigin: '50% 50%' }}
      >
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-0.5"
          style={{
            background: 'linear-gradient(90deg, #10b981, transparent)',
            transformOrigin: 'left center',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: size / 2,
            height: size / 2,
            background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.2), transparent 60deg)',
            transformOrigin: 'left top',
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          }}
        />
      </div>
      
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 bg-emerald-500 rounded-full node-pulse" />
      
      {/* Random blips */}
      {[
        { x: 30, y: 40 },
        { x: 60, y: 25 },
        { x: 70, y: 65 },
        { x: 45, y: 70 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full node-pulse"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// FLOATING PARTICLES - Ambient background effect
// ============================================================================
interface FloatingParticlesProps {
  count?: number;
  className?: string;
  colors?: string[];
}

export const FloatingParticles = ({ 
  count = 15, 
  className = '',
  colors = ['#10b981', '#06b6d4', '#3b82f6']
}: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
  }>>([]);
  
  useEffect(() => {
    const generated = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5
    }));
    setParticles(generated);
  }, [count, colors]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full particle-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// ANIMATED COUNTER - For stats/numbers
// ============================================================================
interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({ 
  value, 
  prefix = '', 
  suffix = '', 
  duration = 2,
  className = ''
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

// ============================================================================
// PULSING RINGS - For emphasis/attention
// ============================================================================
interface PulsingRingsProps {
  size?: number;
  color?: string;
  className?: string;
}

export const PulsingRings = ({ size = 100, color = '#10b981', className = '' }: PulsingRingsProps) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full pulse-ring"
        style={{ borderColor: color, borderWidth: 2 }}
      />
      <div
        className="absolute inset-0 rounded-full pulse-ring-delayed"
        style={{ borderColor: color, borderWidth: 2 }}
      />
      <div
        className="absolute inset-[30%] rounded-full"
        style={{ backgroundColor: `${color}20` }}
      />
    </div>
  );
};

// ============================================================================
// MORPHING BLOB - Background decoration
// ============================================================================
interface MorphingBlobProps {
  size?: number;
  colors?: [string, string];
  className?: string;
}

export const MorphingBlob = ({ 
  size = 300, 
  colors = ['#10b981', '#06b6d4'],
  className = ''
}: MorphingBlobProps) => {
  return (
    <div 
      className={`morph-blob blur-3xl opacity-30 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
      }}
    />
  );
};

// ============================================================================
// SPARKLES - For premium/highlight areas
// ============================================================================
interface SparklesProps {
  count?: number;
  className?: string;
}

export const Sparkles = ({ count = 4, className = '' }: SparklesProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`absolute sparkle sparkle-${(i % 4) + 1}`}
          style={{
            left: `${20 + (i * 20)}%`,
            top: `${15 + (i * 15) % 70}%`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
              fill="url(#sparkleGradient)"
            />
            <defs>
              <linearGradient id="sparkleGradient" x1="0" y1="0" x2="12" y2="12">
                <stop stopColor="#10b981" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// NETWORK GRAPH - For backlinks/connections
// ============================================================================
interface NetworkNode {
  id: string;
  x: number;
  y: number;
  size?: number;
  color?: string;
}

interface NetworkGraphProps {
  className?: string;
}

export const NetworkGraph = ({ className = '' }: NetworkGraphProps) => {
  const nodes: NetworkNode[] = [
    { id: 'center', x: 50, y: 50, size: 8, color: '#10b981' },
    { id: 'n1', x: 20, y: 30, size: 5, color: '#06b6d4' },
    { id: 'n2', x: 80, y: 25, size: 5, color: '#3b82f6' },
    { id: 'n3', x: 75, y: 70, size: 5, color: '#8b5cf6' },
    { id: 'n4', x: 25, y: 75, size: 5, color: '#ec4899' },
    { id: 'n5', x: 50, y: 15, size: 4, color: '#f59e0b' },
    { id: 'n6', x: 90, y: 50, size: 4, color: '#ef4444' },
    { id: 'n7', x: 10, y: 55, size: 4, color: '#14b8a6' },
  ];

  const connections = [
    ['center', 'n1'], ['center', 'n2'], ['center', 'n3'], ['center', 'n4'],
    ['center', 'n5'], ['center', 'n6'], ['center', 'n7'],
    ['n1', 'n5'], ['n2', 'n5'], ['n2', 'n6'], ['n3', 'n6'],
    ['n3', 'n4'], ['n4', 'n7'], ['n1', 'n7']
  ];

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connections */}
        {connections.map(([from, to], i) => {
          const fromNode = getNode(from);
          const toNode = getNode(to);
          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="url(#networkGradient)"
              strokeWidth="0.3"
              className="network-link"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
            {/* Glow */}
            <circle
              cx={node.x}
              cy={node.y}
              r={(node.size || 4) * 1.5}
              fill={node.color}
              opacity={0.2}
              className="node-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
            {/* Core */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size || 4}
              fill={node.color}
              className={i % 2 === 0 ? 'node-pulse' : 'node-pulse-delayed'}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

// ============================================================================
// RISING METRICS - For growth/progress sections
// ============================================================================
interface RisingMetricsProps {
  className?: string;
}

export const RisingMetrics = ({ className = '' }: RisingMetricsProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[
        { left: '10%', color: '#10b981', delay: '0s' },
        { left: '25%', color: '#06b6d4', delay: '1.2s' },
        { left: '40%', color: '#3b82f6', delay: '0.6s' },
        { left: '55%', color: '#8b5cf6', delay: '1.8s' },
        { left: '70%', color: '#ec4899', delay: '0.3s' },
        { left: '85%', color: '#f59e0b', delay: '1.5s' },
      ].map((item, i) => (
        <div
          key={i}
          className="absolute bottom-0 rise-dot"
          style={{
            left: item.left,
            animationDelay: item.delay,
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// CONTENT FLOW - For blog/content generation sections
// ============================================================================
interface ContentFlowProps {
  className?: string;
}

export const ContentFlow = ({ className = '' }: ContentFlowProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Document icons flowing */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ 
            y: ['-10%', '110%'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "linear"
          }}
        >
          <div className="w-8 h-10 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center">
            <div className="space-y-1">
              <div className="w-4 h-0.5 bg-emerald-500/50 rounded" />
              <div className="w-3 h-0.5 bg-cyan-500/50 rounded" />
              <div className="w-4 h-0.5 bg-blue-500/50 rounded" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
