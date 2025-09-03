import React, { useState } from 'react';
import { Box, Typography, Button, Container, LinearProgress, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, QuizResponse, PersonalityResult } from '../types/quiz';
import { fourKidQuestions } from '../data/dialogueQuestions';
import { analyzeQuizResponses } from '../utils/quizAnalyzer';

interface QuizLayoutProps {
  name: string;
  age: number;
  onQuizComplete: (result: PersonalityResult) => void;
}

const QuizLayout: React.FC<QuizLayoutProps> = ({ name, age, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);

  const questionVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const breathe = {
    animate: {
      scale: [1, 1.03, 1],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const handleOptionChange = (questionId: number, selectedOptionIndex: number) => {
    setResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(r => r.questionId === questionId);
      if (existingResponseIndex > -1) {
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex] = { questionId, selectedOptionIndex };
        return updatedResponses;
      } else {
        return [...prevResponses, { questionId, selectedOptionIndex }];
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < fourKidQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Convert 4-kid responses into existing analyzer format
      const synthesizedQuestions: Question[] = fourKidQuestions.map((q) => ({
        id: q.id,
        text: q.text,
        traitScores: q.options.map(option => ({
          text: option.kid,
          scores: option.scores
        }))
      }));

      const result = analyzeQuizResponses(synthesizedQuestions, responses);
      onQuizComplete(result);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const getCurrentResponse = (questionId: number) => {
    const found = responses.find(r => r.questionId === questionId);
    return found ? found.selectedOptionIndex : -1;
  };

  const motivationalMessages = [
    "Your journey of self-discovery is inspiring!",
    "Every answer brings you closer to understanding yourself better.",
    "Thank you for taking time for personal growth.",
    "Your insights are valuable for your development journey.",
    "Keep going - self-awareness is the key to growth!",
  ];

  const funFactsOrTips = [
    "Did you know? Personality traits can evolve throughout your life.",
    "Tip: Self-reflection is a powerful tool for personal growth.",
    "Fact: Understanding your personality can improve your relationships and decision-making.",
    "Tip: There are no 'right' or 'wrong' personality traits - each has its own strengths!",
    "Did you know? Regular self-assessment can help track your personal development journey.",
  ];

  const currentQuestion = fourKidQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex / (fourKidQuestions.length - 1)) * 100;

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial="enter"
          animate="center"
          exit="exit"
          variants={questionVariants}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Box
            sx={{
              p: 4,
              borderRadius: '12px',
              bgcolor: 'background.paper',
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" color="text.secondary" align="right" mb={2}>
              Question {currentQuestionIndex + 1} of {fourKidQuestions.length}
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ mb: 4, height: 8, borderRadius: 5 }} />

            <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
              {currentQuestion.text}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, alignItems: 'end' }}>
              {currentQuestion.options.map((option, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'background.default',
                      border: '1px solid',
                      borderColor: 'divider',
                      textAlign: 'center',
                      maxWidth: '100%',
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Kid {index + 1}
                    </Typography>
                    <Typography variant="body1">{option.kid}</Typography>
                    <Box sx={{
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: 14,
                      height: 14,
                      bgcolor: 'background.default',
                      borderLeft: '1px solid',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }} />
                  </Box>
                  <Box sx={{ width: 180, height: 180 }}>
                    <img 
                      src={(() => {
                        switch (index) {
                          case 0: return "/avatars/kid1.svg";
                          case 1: return "/avatars/kid2.svg";
                          case 2: return "/avatars/kid3.svg";
                          case 3: return "/avatars/kid4.svg";
                          default: return "/avatars/kid1.svg"; // Fallback
                        }
                      })()} 
                      alt={`Kid ${index + 1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                  </Box>
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    variant={getCurrentResponse(currentQuestion.id) === index ? 'contained' : 'outlined'}
                    color={(() => {
                        switch (index) {
                          case 0: return 'primary';
                          case 1: return 'secondary';
                          case 2: return 'success'; // New color for Kid 3
                          case 3: return 'error';   // New color for Kid 4
                          default: return 'primary';
                        }
                      })()}
                    onClick={() => handleOptionChange(currentQuestion.id, index)}
                    sx={{ minWidth: 140 }}
                  >
                    I'm like Kid {index + 1}
                  </Button>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                variant="outlined"
                color="secondary"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                sx={{
                  px: 4,
                  py: 1.2,
                }}
              >
                Previous
              </Button>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05, boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)' }}
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={getCurrentResponse(currentQuestion.id) === -1}
                sx={{
                  px: 4,
                  py: 1.2,
                }}
              >
                {currentQuestionIndex === fourKidQuestions.length - 1 ? 'Complete Quiz' : 'Next'}
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4, fontStyle: 'italic' }}>
              {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
            </Typography>
            
            <Box sx={{ mt: 4, p: 2, bgcolor: 'background.default', borderRadius: '8px', border: '1px dashed', borderColor: 'secondary.main' }}>
              <Typography variant="body2" color="text.primary" fontWeight="bold">Fun Fact / Tip:</Typography>
              <Typography variant="body2" color="text.secondary">
                {funFactsOrTips[Math.floor(Math.random() * funFactsOrTips.length)]}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default QuizLayout;
