"use client";

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const balloonVariants = {
  float: (i: number) => ({
    y: ["0%", "-120%", "0%"], // Increased vertical range
    x: ["0%", `${(i % 2 === 0 ? 1 : -1) * 10}%`, "0%"], // Increased horizontal sway
    rotate: [0, (i % 2 === 0 ? 1 : -1) * 10, 0], // Increased rotation
    transition: {
      y: {
        duration: 12 + Math.random() * 8, // Longer, more varied duration
        repeat: Infinity,
        ease: "easeInOut",
      },
      x: {
        duration: 10 + Math.random() * 6, // Longer, more varied duration
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        duration: 8 + Math.random() * 4, // Longer, more varied duration
        repeat: Infinity,
        ease: "easeInOut",
      },
      delay: Math.random() * 3, // More varied delay
    },
  }),
};



const BackgroundDecorations: React.FC = () => {
  const theme = useTheme();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const balloons = [
    { color: theme.palette.extraColors.pinkLight, top: '10%', left: '5%', size: '90px' },
    { color: theme.palette.extraColors.blueLight, top: '25%', right: '8%', size: '100px' },
    { color: theme.palette.extraColors.yellowLight, bottom: '10%', left: '20%', size: '70px' },
    { color: theme.palette.extraColors.greenLight, top: '40%', left: '15%', size: '110px' },
    { color: theme.palette.extraColors.purpleLight, bottom: '20%', right: '15%', size: '85px' },
    { color: theme.palette.extraColors.pinkLight, top: '5%', right: '25%', size: '75px' },
    { color: theme.palette.extraColors.blueLight, bottom: '25%', left: '5%', size: '95px' },
    { color: theme.palette.extraColors.yellowLight, top: '15%', left: '40%', size: '105px' }, // Added new balloon
    { color: theme.palette.extraColors.greenLight, bottom: '5%', right: '40%', size: '80px' }, // Added new balloon
  ];



  if (!isClient) {
    return null; // Don't render anything on the server
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1, // Ensure it's behind content
        pointerEvents: 'none', // Allow clicks to pass through
      }}
    >
      {/* Balloons */}
      {balloons.map((balloon, i) => (
        <motion.div
          key={`balloon-${i}`}
          custom={i}
          variants={balloonVariants}
          initial="float"
          animate="float"
          style={{
            position: 'absolute',
            width: balloon.size,
            height: balloon.size,
            borderRadius: '50%',
            backgroundColor: balloon.color,
            boxShadow: `inset -10px -10px 0px rgba(0,0,0,0.1)`,
            filter: 'brightness(1.1)',
            ...balloon,
          }}
        >
          {/* Balloon string */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '-15px',
              left: '50%',
              transform: 'translateX(-50%) translateZ(0)',
              width: '2px',
              height: '30px',
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
          />
        </motion.div>
      ))}


    </Box>
  );
};

export default BackgroundDecorations;
