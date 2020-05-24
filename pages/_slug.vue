<template>
  <Loading v-if="loading" />
  <div v-else class="bg-white">
    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <div class="mb-8 text-gray-600 cursor-pointer" @click="$router.push('/')">Volver</div>

      <h2
        class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        {{ question }}
      </h2>
      <div class="mt-8 flex">
        <div class="inline-flex rounded-md shadow">
          <div
            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out cursor-pointer"
            @click="reveal"
          >
            Ver Solución
          </div>
        </div>
        <div class="ml-3 inline-flex">
          <div
            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition duration-150 ease-in-out cursor-pointer"
            @click="showHints = !showHints"
          >
            {{ showHints ? 'Esconder' : 'Ver' }} Pistas
          </div>
        </div>
      </div>
      <div v-if="showHints" class="bg-white shadow overflow-hidden sm:rounded-md mt-16">
        <ul>
          <li v-for="(answer, index) in answers" :key="index" class="border-t border-gray-200">
            <div
              class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              :class="{ 'bg-green-500 text-white': correct_answer == answer && revealSolution }"
            >
              <div class="flex items-center px-4 py-4 sm:px-6">
                <div class="min-w-0 flex-1 flex items-center">
                  <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <div class="text-sm leading-5 font-medium truncate">
                        {{ answer }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'

export default {
  name: 'TriviaQuestion',

  components: { Loading },

  data() {
    return {
      language: 'en',
      loading: true,
      showHints: false,
      revealSolution: false,
      question: '',
      incorrect_answers: [],
      correct_answer: '',
      categories: {
        geography: [22],
        history: [23],
        entertaiment: [10, 11, 12, 13, 14, 15, 16],
        art: [25],
        science: [17],
        sports: [21],
      },
    }
  },

  computed: {
    answers() {
      return [...this.incorrect_answers, this.correct_answer].sort(() => Math.random() - 0.5)
    },
  },

  async created() {
    const category = this.categories[this.$route.params.slug]
    const id = category[Math.floor(Math.random() * category.length)]
    const response = await this.$axios.$get(
      `https://opentdb.com/api.php?amount=1&category=${id}&difficulty=easy&type=multiple`
    )
    const question = response.results[0]

    if (this.language === 'en') {
      this.question = question.question
      this.correct_answer = question.correct_answer
      this.incorrect_answers = question.incorrect_answers
      this.loading = false
      return
    }

    const to = this.language

    const translatedQuestion = await this.$translate(question.question, { to })
    const translatedCorectAnswer = await this.$translate(question.correct_answer, { to })

    for (let answer of question.incorrect_answers) {
      const translatedIncorectAnswer = await this.$translate(answer, { to })
      this.incorrect_answers.push(translatedIncorectAnswer.text)
    }

    this.question = translatedQuestion.text
    this.correct_answer = translatedCorectAnswer.text
    this.loading = false
  },

  methods: {
    reveal() {
      this.revealSolution = true
      this.showHints = true
    },
  },
}
</script>
