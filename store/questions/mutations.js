import Vue from 'vue'
import {
  SET_QUESTIONS,
  SET_ACTIVE_CATEGORY,
  SET_KIDS_MODE,
  MARK_QUESTION_AS_DONE,
  RESET_CURRENT_CATEGORY,
} from './mutation-types'

export default {
  [SET_QUESTIONS]: (state, questions) => {
    state.questions = [...state.questions, ...questions]
  },

  [SET_ACTIVE_CATEGORY]: (state, category) => {
    state.activeCategory = category
  },

  [SET_KIDS_MODE]: (state, value) => {
    state.kidsMode = value
  },

  [MARK_QUESTION_AS_DONE]: (state, question) => {
    const q = state.questions.find(q => q.id === question.id)
    Vue.set(q, 'answered', true)
  },

  [RESET_CURRENT_CATEGORY]: state => {
    state.questions = state.questions.map(q => {
      if (q.slug === state.currentCategory) {
        q.answered = false
        return q
      }
      return q
    })
  },
}
