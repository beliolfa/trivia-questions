export default {
  openTriviaIds: state => state.categories.flatMap(question => question.openTriviaIds),
}
