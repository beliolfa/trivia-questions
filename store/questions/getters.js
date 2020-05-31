export default {
  openTriviaIds: state => state.categories.flatMap(category => category.openTriviaIds),

  categories: state => state.categories.filter(category => category.kids === state.kidsMode),

  activeQuestions: (state, getters) =>
    state.questions
      .filter(question => !question.answered && question.category === state.activeCategory)
      .filter(getters.kidsModeFilter)
      .slice()
      .sort(() => Math.random() - 0.5),

  answeredQuestions: (state, getters) => {
    return state.questions
      .filter(question => question.answered && question.category === state.activeCategory)
      .filter(getters.kidsModeFilter)
  },

  kidsModeFilter: state =>
    state.kidsMode
      ? question => question.difficulty === 'kids'
      : question => question.difficulty !== 'kids',

  categoryBySlug: state => slug =>
    state.categories.find(category => category.slug === slug && category.kids === state.kidsMode) ||
    {},

  answeredQuestionsIds: (state, getters) =>
    getters.answeredQuestions.map(question => question.uniqueId),

  activeCategoryTotalQuestions: state => {
    const total = state.totals.find(total => total.category === state.activeCategory)
    if (!total) {
      return 0
    }
    return total.total
  },
}
