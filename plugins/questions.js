const fetchQuestions = async ({ category, amount = 1, difficulty = 'easy', type = 'multiple' }) => {
  const response = await fetch(
    //TODO: Handle difficulty. Disabled in order to get better results
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`
  )

  const json = await response.json()
  return json.results
}

export default function(context, inject) {
  inject('fetchQuestions', fetchQuestions)
}
