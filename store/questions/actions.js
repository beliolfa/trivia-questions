import {
  SET_QUESTIONS,
  SET_ACTIVE_CATEGORY,
  SET_KIDS_MODE,
  MARK_QUESTION_AS_DONE,
  RESET_CURRENT_CATEGORY,
  SET_TOTALS,
} from './mutation-types'
const he = require('he')
import sample from 'lodash/sample'

export default {
  async getRandomQuestion({ state, getters, dispatch }) {
    if (!getters.activeQuestions.length) {
      const success = await dispatch('getFirebaseRandomQuestion')
      if (!success && !state.kidsMode) {
        // Get another batch from Open Trivia
        await dispatch('setOpenTriviaQuestionsBySlug', state.activeCategory)
      }
    }

    const question = getters.activeQuestions[0]

    if (!question) {
      return null
    }

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
      source: question.source,
    }
  },

  async getFirebaseRandomQuestion({ commit, state, getters }) {
    const total = getters.activeCategoryTotalQuestions
    const idsRange = Array.from({ length: total }, (_, i) => i + 1)
    let difference = idsRange.filter(x => !getters.answeredQuestionsIds.includes(x))
    const uniqueId = sample(difference)

    if (!uniqueId) {
      return false
    }

    await this.$fireStore
      .collection('questions')
      .where('category', '==', state.activeCategory)
      .where('uniqueId', '==', uniqueId)
      .get()
      .then(({ docs }) => {
        commit(
          SET_QUESTIONS,
          docs.map(doc => ({ id: doc.id, language: 'es', answered: false, ...doc.data() }))
        )
      })
    return true
  },

  async setOpenTriviaQuestions({ dispatch, getters }) {
    for (let category of getters.openTriviaIds) {
      await dispatch('setQuestionByCategory', category)
    }
  },

  async setOpenTriviaQuestionsBySlug({ dispatch, state }, slug) {
    const categories = state.categories
      .filter(c => c.slug === slug)
      .flatMap(question => question.openTriviaIds)

    for (let category of categories) {
      await dispatch('setQuestionByCategory', category)
    }
  },

  async setQuestionByCategory({ commit, state }, category) {
    const cat = state.categories.find(c => c.openTriviaIds && c.openTriviaIds.includes(category))
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

  async setTotals({ commit }) {
    await this.$fireStore
      .collection('totals')
      .get()
      .then(({ docs }) => {
        commit(
          SET_TOTALS,
          docs.map(doc => ({ id: doc.id, ...doc.data() }))
        )
      })
  },

  markQuestionAsDone({ commit }, question) {
    commit(MARK_QUESTION_AS_DONE, question)
  },

  setActiveCategory({ commit }, category) {
    commit(SET_ACTIVE_CATEGORY, category)
  },

  setKidsMode({ commit }, value) {
    commit(SET_KIDS_MODE, value)
  },

  resetCurrentCategory({ commit }) {
    commit(RESET_CURRENT_CATEGORY)
  },
}
