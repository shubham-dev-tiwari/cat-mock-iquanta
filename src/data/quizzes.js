export const catQuizzes = {
  quantitative: [
    {
      id: 1,
      name: "Arithmetic Fundamentals",
      difficulty: "Easy",
      questions: 20,
      timeLimit: 30,
      section: "quantitative",
      description: "Basic arithmetic operations, percentages, and number systems",
      icon: "📊",
      completed: false,
      score: null,
      attempts: 0
    },
    {
      id: 2,
      name: "Algebra & Functions",
      difficulty: "Medium",
      questions: 25,
      timeLimit: 45,
      section: "quantitative",
      description: "Linear equations, quadratic equations, and functions",
      icon: "🔢",
      completed: true,
      score: 85,
      attempts: 2
    },
    {
      id: 3,
      name: "Geometry Advanced",
      difficulty: "Hard",
      questions: 30,
      timeLimit: 60,
      section: "quantitative",
      description: "Coordinate geometry, mensuration, and trigonometry",
      icon: "📐",
      completed: false,
      score: null,
      attempts: 1
    }
  ],
  
  verbal: [
    {
      id: 4,
      name: "Reading Comprehension",
      difficulty: "Medium",
      questions: 20,
      timeLimit: 40,
      section: "verbal",
      description: "Passages with critical reasoning and inference questions",
      icon: "📚",
      completed: true,
      score: 78,
      attempts: 1
    },
    {
      id: 5,
      name: "Vocabulary & Grammar",
      difficulty: "Easy",
      questions: 15,
      timeLimit: 25,
      section: "verbal",
      description: "Synonyms, antonyms, sentence correction, and grammar",
      icon: "📝",
      completed: false,
      score: null,
      attempts: 0
    },
    {
      id: 6,
      name: "Para Jumbles & Summary",
      difficulty: "Hard",
      questions: 18,
      timeLimit: 35,
      section: "verbal",
      description: "Paragraph arrangement and passage summarization",
      icon: "🔤",
      completed: false,
      score: null,
      attempts: 0
    }
  ],
  
  logical: [
    {
      id: 7,
      name: "Data Interpretation",
      difficulty: "Hard",
      questions: 25,
      timeLimit: 50,
      section: "logical",
      description: "Charts, graphs, tables, and data analysis",
      icon: "📈",
      completed: true,
      score: 92,
      attempts: 3
    },
    {
      id: 8,
      name: "Logical Reasoning",
      difficulty: "Medium",
      questions: 22,
      timeLimit: 40,
      section: "logical",
      description: "Puzzles, arrangements, and logical sequences",
      icon: "🧩",
      completed: false,
      score: null,
      attempts: 1
    },
    {
      id: 9,
      name: "Critical Reasoning",
      difficulty: "Hard",
      questions: 20,
      timeLimit: 45,
      section: "logical",
      description: "Assumptions, conclusions, and logical arguments",
      icon: "🎯",
      completed: false,
      score: null,
      attempts: 0
    }
  ],
  
  general: [
    {
      id: 10,
      name: "Current Affairs 2024",
      difficulty: "Easy",
      questions: 15,
      timeLimit: 20,
      section: "general",
      description: "Recent events, government policies, and current affairs",
      icon: "🌍",
      completed: false,
      score: null,
      attempts: 0
    },
    {
      id: 11,
      name: "Business Awareness",
      difficulty: "Medium",
      questions: 18,
      timeLimit: 25,
      section: "general",
      description: "Business terms, economics, and corporate knowledge",
      icon: "💼",
      completed: false,
      score: null,
      attempts: 0
    }
  ]
}

export const getAllQuizzes = () => {
  return [
    ...catQuizzes.quantitative,
    ...catQuizzes.verbal,
    ...catQuizzes.logical,
    ...catQuizzes.general
  ]
}

export const getQuizzesBySection = (section) => {
  return catQuizzes[section] || []
}

export const getCompletedQuizzes = () => {
  return getAllQuizzes().filter(quiz => quiz.completed)
}
