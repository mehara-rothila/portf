import React, { useState, useEffect, useCallback } from 'react';

const ParticleBackground = ({
  particleCount = 30,
  colorScheme = 'default',
}) => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  // Color schemes
  const colorSchemes = {
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
  };

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
          
          // Apply mouse repulsion if mouse is present
          if (mousePos.x !== null) {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 30) { // Repulsion radius
              const force = (30 - distance) / 30;
              vx -= (dx / distance) * force * 2;
              vy -= (dy / distance) * force * 2;
            }
          }

          // Spring force towards base position
          const springX = baseX - x;
          const springY = baseY - y;
          vx += springX * 0.02;
          vy += springY * 0.02;

          // Apply friction
          vx *= 0.95;
          vy *= 0.95;

          // Update position
          x += vx;
          y += vy;

          // Boundary checking
          if (x < 0) { x = 0; vx *= -0.5; }
          if (x > 100) { x = 100; vx *= -0.5; }
          if (y < 0) { y = 0; vy *= -0.5; }
          if (y > 100) { y = 100; vy *= -0.5; }

          return {
            ...particle,
            x,
            y,
            vx,
            vy,
            rotation: particle.rotation + (Math.abs(vx) + Math.abs(vy)) * 2
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
  }, [mousePos]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: null, y: null });
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
