import { SET_QUESTIONS } from './mutation-types'
const he = require('he')

export default {
  async getRandomQuestionsBySlug({ state }, slug) {
    const questions = state.questions
      .filter(question => !question.answered && question.category === slug)
      .slice()
      .sort(() => Math.random() - 0.5)

    // if (!questions.length) {
    //   dispatch(setQuestionByCategory, category)
    //   // if still no results, mark as unanswered the old ones
    // }

    const question = questions[0]

    if (question.language === 'es') {
      return question
    }

    const to = 'es'
    const rawQuestion = await this.$translate(question.question, { to })
    const translatedQuestion = he.decode(rawQuestion)
    const answer = await this.$translate(question.answer, { to })
    const options = []
    for (let option of question.options) {
      const translatedIncorectAnswer = await this.$translate(option, { to })
      options.push(translatedIncorectAnswer)
    }

    return {
      question: translatedQuestion,
      answer,
      options,
      id: question.id,
    }
  },

  async setFirebaseQuestions({ commit }) {
    await this.$fireStore
      .collection('questions')
      .get()
      .then(({ docs }) => {
        commit(
          SET_QUESTIONS,
          docs.map(doc => ({ id: doc.id, language: 'es', answered: false, ...doc.data() }))
        )
      })
  },

  async setOpenTriviaQuestions({ dispatch, getters }) {
    for (let category of getters.openTriviaIds) {
      await dispatch('setQuestionByCategory', category)
    }
  },

  async setQuestionByCategory({ commit, state }, category) {
    const cat = state.categories.find(c => c.openTriviaIds.includes(category))
    const questions = await this.$fetchQuestions({ category, amount: 50 })
    commit(
      SET_QUESTIONS,
      questions.map(question => {
        const answer = question.correct_answer
        const options = [...question.incorrect_answers, answer].sort(() => Math.random() - 0.5)
        return {
          id: Math.random()
            .toString(36)
            .substring(7),
          language: 'en',
          answered: false,
          answer,
          options,
          difficulty: question.difficulty,
          question: question.question,
          category: cat.slug,
          source: 'https://opentdb.com',
        }
      })
    )
  },

  async setQuestions({ dispatch }) {
    await dispatch('setFirebaseQuestions')
    await dispatch('setOpenTriviaQuestions')
  },
}
