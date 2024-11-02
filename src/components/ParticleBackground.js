import React, { useState, useEffect, useCallback, useMemo } from 'react';

const ParticleBackground = ({ particleCount = 30, colorScheme = 'default' }) => {
  const [particles, setParticles] = useState([]);
  const [interactionPos, setInteractionPos] = useState({ x: null, y: null });
  const [isTouching, setIsTouching] = useState(false);

  // Color schemes moved to a memoized object to prevent unnecessary re-renders
  const colorSchemes = useMemo(() => ({
    default: {
      gradient: 'from-primary-500/10 via-transparent to-secondary-500/10',
      particleColors: ['bg-primary-500/20', 'bg-secondary-500/20']
    },
    cosmic: {
      gradient: 'from-purple-500/10 via-pink-500/10 to-indigo-500/10',
      particleColors: ['bg-purple-500/20', 'bg-pink-500/20', 'bg-indigo-500/20']
    },
    ocean: {
      gradient: 'from-blue-500/10 via-cyan-500/10 to-teal-500/10',
      particleColors: ['bg-blue-500/20', 'bg-cyan-500/20', 'bg-teal-500/20']
    },
    sunset: {
      gradient: 'from-orange-500/10 via-red-500/10 to-yellow-500/10',
      particleColors: ['bg-orange-500/20', 'bg-red-500/20', 'bg-yellow-500/20']
    }
  }), []);

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      baseX: Math.random() * 100,
      baseY: Math.random() * 100,
      vx: 0,
      vy: 0,
      shape: Math.random() > 0.7 ? 'triangle' : Math.random() > 0.5 ? 'square' : 'circle',
      colorIndex: Math.floor(Math.random() * colorSchemes[colorScheme].particleColors.length),
      rotation: Math.random() * 360
    }));
    setParticles(initialParticles);
  }, [particleCount, colorScheme, colorSchemes]);

  // Animation frame for smooth movement
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, vx, vy, baseX, baseY } = particle;
          
          // Apply repulsion if interaction is present
          if (interactionPos.x !== null) {
            const dx = interactionPos.x - x;
            const dy = interactionPos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Increased repulsion radius and strength for touch
            const repulsionRadius = isTouching ? 40 : 30;
            const repulsionStrength = isTouching ? 3 : 2;
            
            if (distance < repulsionRadius) {
              const force = (repulsionRadius - distance) / repulsionRadius;
              vx -= (dx / distance) * force * repulsionStrength;
              vy -= (dy / distance) * force * repulsionStrength;
            }
          }

          // Spring force towards base position with adjusted strength
          const springStrength = isTouching ? 0.01 : 0.02; // Softer return when touching
          const springX = baseX - x;
          const springY = baseY - y;
          vx += springX * springStrength;
          vy += springY * springStrength;

          // Apply friction
          const friction = isTouching ? 0.97 : 0.95; // Less friction when touching
          vx *= friction;
          vy *= friction;

          // Update position
          x += vx;
          y += vy;

          // Boundary checking with smoother bounce
          if (x < 0) { x = 0; vx *= -0.7; }
          if (x > 100) { x = 100; vx *= -0.7; }
          if (y < 0) { y = 0; vy *= -0.7; }
          if (y > 100) { y = 100; vy *= -0.7; }

          return {
            ...particle,
            x,
            y,
            vx,
            vy,
            rotation: particle.rotation + (Math.abs(vx) + Math.abs(vy)) * (isTouching ? 3 : 2)
          };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [interactionPos, isTouching]);

  // Convert event coordinates to percentage positions
  const getRelativePosition = useCallback((clientX, clientY, rect) => {
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return { x, y };
  }, []);

  // Mouse event handlers
  const handleMouseMove = useCallback((e) => {
    if (isTouching) return; // Ignore mouse events while touching
    const rect = e.currentTarget.getBoundingClientRect();
    setInteractionPos(getRelativePosition(e.clientX, e.clientY, rect));
  }, [getRelativePosition, isTouching]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouching) {
      setInteractionPos({ x: null, y: null });
    }
  }, [isTouching]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    setIsTouching(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setInteractionPos(getRelativePosition(touch.clientX, touch.clientY, rect));
  }, [getRelativePosition]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setInteractionPos(getRelativePosition(touch.clientX, touch.clientY, rect));
  }, [getRelativePosition]);

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
    setInteractionPos({ x: null, y: null });
  }, []);

  // Custom Triangle component
  const Triangle = ({ className }) => (
    <div 
      className={`w-0 h-0 
        border-l-[25px] border-r-[25px] border-b-[40px] 
        border-transparent ${className}`} 
    />
  );

  const { gradient, particleColors } = colorSchemes[colorScheme];

  return (
    <div 
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${gradient}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute transform-gpu 
            ${particleColors[particle.colorIndex]}
            ${particle.shape === 'square' ? 'rounded-lg' : 
              particle.shape === 'circle' ? 'rounded-full' : ''}
            shadow-lg backdrop-blur-sm`}
          style={{
            width: particle.shape === 'triangle' ? '0' : `${particle.size}px`,
            height: particle.shape === 'triangle' ? '0' : `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            transition: 'box-shadow 0.3s ease-out',
            willChange: 'transform, left, top'
          }}
        >
          {particle.shape === 'triangle' && (
            <Triangle className={`${particleColors[particle.colorIndex].replace('bg-', 'border-b-')}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ParticleBackground;
