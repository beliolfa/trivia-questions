export default {
  openTriviaIds: state => state.categories.flatMap(category => category.openTriviaIds),

  activeQuestions: state => {
    const kidsModeFilter = state.kidsMode
      ? question => question.difficulty === 'kids'
      : question => question.difficulty !== 'kids'

    return state.questions
      .filter(question => !question.answered && question.category === state.activeCategory)
      .filter(kidsModeFilter)
      .slice()
      .sort(() => Math.random() - 0.5)
  },

  categoryBySlug: state => slug => state.categories.find(category => category.slug === slug) || {},
}
