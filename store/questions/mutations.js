import { SET_QUESTIONS } from './mutation-types'

export default {
  [SET_QUESTIONS]: (state, questions) => {
    state.questions = [...state.questions, ...questions]
  },
}
