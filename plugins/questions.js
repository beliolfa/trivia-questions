const fetchQuestions = async ({ category, amount = 1, difficulty = 'easy', type = 'multiple' }) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
  )

  const json = await response.json()
  return json.results[0]
}

export default function(context, inject) {
  inject('fetchQuestions', fetchQuestions)
}
