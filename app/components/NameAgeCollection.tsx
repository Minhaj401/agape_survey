import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { motion, Variants } from 'framer-motion';

interface NameAgeCollectionProps {
  onSubmit: (name: string, age: number) => void;
}

const NameAgeCollection: React.FC<NameAgeCollectionProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim() && parseInt(age) > 0) {
      onSubmit(name.trim(), parseInt(age));
    } else {
      alert('Please enter a valid name and age.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            borderRadius: '12px',
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Before You Start...
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Please tell us a little about yourself.
          </Typography>

          <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <TextField
              label="Your Age"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              inputProps={{ min: 1 }}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.07, boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)' }} whileTap={{ scale: 0.96 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              sx={{ mt: 4, px: 5, py: 1.5 }}
            >
              Proceed to Quiz
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  );
};

export default NameAgeCollection;
