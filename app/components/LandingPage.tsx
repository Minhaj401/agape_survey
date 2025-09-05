import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion, Variants } from 'framer-motion';

interface LandingPageProps {
  onStartQuiz: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <Container disableGutters sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: '12px',
            bgcolor: 'background.paper',
            boxShadow: 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >

          <Typography variant="h1" gutterBottom>
            Welcome to Agape Quiz!
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Discovering the Amazing You ✨
          </Typography>
          <Typography variant="body1" paragraph sx={{ mt: 3, mb: 4 }}>
            Hey there, superstar! 🎉 This quiz is all about <strong>you</strong>—your ideas,
            your dreams, and the fun things that make you unique. By answering these
            questions, you’ll help us learn more about what kids like you enjoy and what
            makes you shine. 🌈🌟 Are you ready to play and discover how awesome you are?
          </Typography>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.07, boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.96 }}
            variant="contained"
            color="primary"
            size="large"
            onClick={onStartQuiz}
            sx={{
              mt: 4,
              px: 5,
              py: 1.5,
              // transition is handled by Framer Motion's whileHover
            }}
          >
            Start Quiz 🚀
          </Button>
          <Box sx={{ mt: 6, fontStyle: 'italic', color: 'text.secondary' }}>
            <Typography variant="body2">
              &ldquo;Every child is a unique kind of flower, and all together, they make this world a beautiful garden.&rdquo; 🌸🌻🌼
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default LandingPage;
