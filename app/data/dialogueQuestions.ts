export interface KidOption {
  kid: string;
  scores: { [key: string]: number };
}

export interface FourKidQuestion {
  id: number;
  text: string;
  options: KidOption[];
}

export const fourKidQuestions: FourKidQuestion[] = [
  {
    "id": 1,
    "text": "How do you typically react to new situations or environments?",
    "options": [
      {
        "kid": "👦 Kid 1: Yay, something new! I get super excited to check it out!",
        "scores": { "openness": 3, "emotional_stability": 3 }
      },
      {
        "kid": "👧 Kid 2: I'm careful, but I'll give it a try.",
        "scores": { "openness": 2, "emotional_stability": 2 }
      },
      {
        "kid": "👦 Kid 3: I like sticking to what I know, it feels safer.",
        "scores": { "openness": 1, "emotional_stability": 1 }
      },
      {
        "kid": "👧 Kid 4: New stuff makes me nervous, I don't like it much.",
        "scores": { "openness": 0, "emotional_stability": 0 }
      }
    ]
  },
  {
    "id": 2,
    "text": "When working on tasks, how do you prefer to organize your approach?",
    "options": [
      {
        "kid": "👦 Kid 1: I make a big plan with steps and follow it.",
        "scores": { "conscientiousness": 3 }
      },
      {
        "kid": "👧 Kid 2: I keep it kinda planned but still flexible.",
        "scores": { "conscientiousness": 2 }
      },
      {
        "kid": "👦 Kid 3: I just go with the flow and see what happens.",
        "scores": { "conscientiousness": 1 }
      },
      {
        "kid": "👧 Kid 4: I don't plan much at all.",
        "scores": { "conscientiousness": 0 }
      }
    ]
  },
  {
    "id": 3,
    "text": "How do you usually spend your free time?",
    "options": [
      {
        "kid": "👦 Kid 1: I love hanging out with lots of friends!",
        "scores": { "extraversion": 3 }
      },
      {
        "kid": "👧 Kid 2: I like doing things with a small group of friends.",
        "scores": { "extraversion": 2 }
      },
      {
        "kid": "👦 Kid 3: Sometimes I hang out, sometimes I like alone time.",
        "scores": { "extraversion": 1 }
      },
      {
        "kid": "👧 Kid 4: I mostly do stuff by myself.",
        "scores": { "extraversion": 0 }
      }
    ]
  },
  {
    "id": 4,
    "text": "When someone disagrees with you, how do you typically respond?",
    "options": [
      {
        "kid": "👦 Kid 1: I try to see their side and understand them.",
        "scores": { "agreeableness": 3, "emotional_stability": 2 }
      },
      {
        "kid": "👧 Kid 2: I explain my side but stay calm.",
        "scores": { "agreeableness": 2, "emotional_stability": 3 }
      },
      {
        "kid": "👦 Kid 3: I get frustrated but still listen a bit.",
        "scores": { "agreeableness": 1, "emotional_stability": 1 }
      },
      {
        "kid": "👧 Kid 4: I argue hard for my opinion.",
        "scores": { "agreeableness": 0, "emotional_stability": 0 }
      }
    ]
  },
  {
    "id": 5,
    "text": "How do you handle unexpected challenges?",
    "options": [
      {
        "kid": "👦 Kid 1: Ooo, a challenge! I see it as a fun chance.",
        "scores": { "emotional_stability": 3, "openness": 2 }
      },
      {
        "kid": "👧 Kid 2: I stay calm and try to figure it out.",
        "scores": { "emotional_stability": 2, "openness": 2 }
      },
      {
        "kid": "👦 Kid 3: I get stressed but I manage somehow.",
        "scores": { "emotional_stability": 1, "openness": 1 }
      },
      {
        "kid": "👧 Kid 4: I feel overwhelmed and don't know what to do.",
        "scores": { "emotional_stability": 0, "openness": 0 }
      }
    ]
  },
  {
    "id": 6,
    "text": "When working on a project, what matters most to you?",
    "options": [
      {
        "kid": "👦 Kid 1: Following the plan perfectly is super important!",
        "scores": { "conscientiousness": 3 }
      },
      {
        "kid": "👧 Kid 2: I want to reach the goal, but I can be flexible.",
        "scores": { "conscientiousness": 2 }
      },
      {
        "kid": "👦 Kid 3: Having fun during the process is what I like.",
        "scores": { "conscientiousness": 1 }
      },
      {
        "kid": "👧 Kid 4: I just want to finish quickly.",
        "scores": { "conscientiousness": 0 }
      }
    ]
  },
  {
    "id": 7,
    "text": "How do you prefer to make decisions?",
    "options": [
      {
        "kid": "👦 Kid 1: I think about everyone's feelings first.",
        "scores": { "agreeableness": 3 }
      },
      {
        "kid": "👧 Kid 2: I try to balance logic and feelings.",
        "scores": { "agreeableness": 2 }
      },
      {
        "kid": "👦 Kid 3: I just look at the facts.",
        "scores": { "agreeableness": 1 }
      },
      {
        "kid": "👧 Kid 4: I go with my gut instinct.",
        "scores": { "agreeableness": 0 }
      }
    ]
  },
  {
    "id": 8,
    "text": "What's your approach to trying new things?",
    "options": [
      {
        "kid": "👦 Kid 1: I'm always looking for new adventures!",
        "scores": { "openness": 3 }
      },
      {
        "kid": "👧 Kid 2: If someone suggests it, I'll give it a shot.",
        "scores": { "openness": 2 }
      },
      {
        "kid": "👦 Kid 3: You'll need to convince me first.",
        "scores": { "openness": 1 }
      },
      {
        "kid": "👧 Kid 4: I'd rather stick to my usual routine.",
        "scores": { "openness": 0 }
      }
    ]
  },
  {
    "id": 9,
    "text": "In group settings, how do you typically behave?",
    "options": [
      {
        "kid": "👦 Kid 1: I like being the leader!",
        "scores": { "extraversion": 3 }
      },
      {
        "kid": "👧 Kid 2: I join in and share my ideas.",
        "scores": { "extraversion": 2 }
      },
      {
        "kid": "👦 Kid 3: I usually wait until someone asks me.",
        "scores": { "extraversion": 1 }
      },
      {
        "kid": "👧 Kid 4: I mostly watch quietly.",
        "scores": { "extraversion": 0 }
      }
    ]
  },
  {
    "id": 10,
    "text": "How do you handle conflicts?",
    "options": [
      {
        "kid": "👦 Kid 1: I try to find a way for everyone to be happy.",
        "scores": { "agreeableness": 3, "emotional_stability": 2 }
      },
      {
        "kid": "👧 Kid 2: I listen and talk it through calmly.",
        "scores": { "agreeableness": 2, "emotional_stability": 3 }
      },
      {
        "kid": "👦 Kid 3: I usually try to avoid arguments.",
        "scores": { "agreeableness": 1, "emotional_stability": 1 }
      },
      {
        "kid": "👧 Kid 4: I stand strong and don't back down.",
        "scores": { "agreeableness": 0, "emotional_stability": 0 }
      }
    ]
  },
  {
    "id": 11,
    "text": "How do you approach deadlines and commitments?",
    "options": [
      {
        "kid": "👦 Kid 1: I finish things early, way before the deadline.",
        "scores": { "conscientiousness": 3 }
      },
      {
        "kid": "👧 Kid 2: I usually get it done right on time.",
        "scores": { "conscientiousness": 2 }
      },
      {
        "kid": "👦 Kid 3: Sometimes I just barely make it.",
        "scores": { "conscientiousness": 1 }
      },
      {
        "kid": "👧 Kid 4: I often need more time.",
        "scores": { "conscientiousness": 0 }
      }
    ]
  },
  {
    "id": 12,
    "text": "How do you handle stress?",
    "options": [
      {
        "kid": "👦 Kid 1: I stay calm and focus even when it's tough.",
        "scores": { "emotional_stability": 3 }
      },
      {
        "kid": "👧 Kid 2: I feel the pressure but manage it okay.",
        "scores": { "emotional_stability": 2 }
      },
      {
        "kid": "👦 Kid 3: I get anxious but still push through.",
        "scores": { "emotional_stability": 1 }
      },
      {
        "kid": "👧 Kid 4: I get overwhelmed really easily.",
        "scores": { "emotional_stability": 0 }
      }
    ]
  },
  {
    "id": 13,
    "text": "What's your preferred learning style?",
    "options": [
      {
        "kid": "👦 Kid 1: I love trying lots of different ways to learn!",
        "scores": { "openness": 3 }
      },
      {
        "kid": "👧 Kid 2: I like following clear, structured methods.",
        "scores": { "openness": 2 }
      },
      {
        "kid": "👦 Kid 3: I learn best by practicing myself.",
        "scores": { "openness": 1 }
      },
      {
        "kid": "👧 Kid 4: I stick to the basics only.",
        "scores": { "openness": 0 }
      }
    ]
  },
  {
    "id": 14,
    "text": "How do you prefer to spend weekends?",
    "options": [
      {
        "kid": "👦 Kid 1: Big parties and lots of people are the best!",
        "scores": { "extraversion": 3 }
      },
      {
        "kid": "👧 Kid 2: I like hanging out with a small group of friends.",
        "scores": { "extraversion": 2 }
      },
      {
        "kid": "👦 Kid 3: I do a mix of social stuff and alone time.",
        "scores": { "extraversion": 1 }
      },
      {
        "kid": "👧 Kid 4: I enjoy staying home and being quiet.",
        "scores": { "extraversion": 0 }
      }
    ]
  },
  {
    "id": 15,
    "text": "When someone needs help, how do you respond?",
    "options": [
      {
        "kid": "👦 Kid 1: I drop everything to help right away!",
        "scores": { "agreeableness": 3 }
      },
      {
        "kid": "👧 Kid 2: I'll help if I can.",
        "scores": { "agreeableness": 2 }
      },
      {
        "kid": "👦 Kid 3: I wait until they ask me directly.",
        "scores": { "agreeableness": 1 }
      },
      {
        "kid": "👧 Kid 4: I suggest other ways they can get help.",
        "scores": { "agreeableness": 0 }
      }
    ]
  },
  {
    "id": 16,
    "text": "How do you keep your personal space?",
    "options": [
      {
        "kid": "👦 Kid 1: Everything is super neat and organized!",
        "scores": { "conscientiousness": 3 }
      },
      {
        "kid": "👧 Kid 2: My space is usually tidy.",
        "scores": { "conscientiousness": 2 }
      },
      {
        "kid": "👦 Kid 3: It's a little messy but okay.",
        "scores": { "conscientiousness": 1 }
      },
      {
        "kid": "👧 Kid 4: My space is really disorganized.",
        "scores": { "conscientiousness": 0 }
      }
    ]
  }
];

export default fourKidQuestions;


