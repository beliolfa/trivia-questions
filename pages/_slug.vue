<template>
  <Loading v-if="loading" :color="category.color" />
  <ResetCategory v-else-if="!question" :slug="slug" @reset="setQuestion" />
  <div v-else class="bg-white">
    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <h2
        class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        {{ question.question }}
      </h2>
      <a :href="question.source" target="_blank" class="text-xs mt-2 text-gray-400">
        {{ question.source }}
      </a>
      <div class="mt-8 flex">
        <div class="inline-flex rounded-md shadow">
          <div
            class="inline-flex items-center justify-center border border-transparent text-base leading-6 font-medium rounded-md text-white focus:outline-none focus:shadow-outline transition duration-150 ease-in-out cursor-pointer"
            :class="category.color"
          >
            <div v-if="!revealSolution" class="px-5 py-3" @click="reveal">Ver Solución</div>
            <div v-else class="px-5 py-3" :class="category.color" @click="setQuestion">
              Cargar otra pregunta de {{ category.name }}
            </div>
          </div>
        </div>
        <div class="ml-3 inline-flex">
          <div
            v-if="question.options"
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
              :class="{ 'bg-green-500 text-white': question.answer == answer && revealSolution }"
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
import { mapGetters, mapActions } from 'vuex'
import Loading from '@/components/Loading'
import ResetCategory from '@/components/ResetCategory'

export default {
  name: 'TriviaQuestion',

  components: { Loading, ResetCategory },

  data() {
    return {
      slug: this.$route.params.slug,
      question: {},
      loading: true,
      showHints: false,
      revealSolution: false,
    }
  },

  computed: {
    ...mapGetters({
      categoryBySlug: 'questions/categoryBySlug',
    }),

    answers() {
      return this.question.options || [this.question.answer]
    },

    category() {
      return this.categoryBySlug(this.slug)
    },
  },

  async created() {
    this.setActiveCategory(this.slug)
    await this.setQuestion()
  },

  methods: {
    ...mapActions({
      setActiveCategory: 'questions/setActiveCategory',
      getRandomQuestion: 'questions/getRandomQuestion',
      markQuestionAsDone: 'questions/markQuestionAsDone',
    }),

    async setQuestion() {
      this.loading = true
      this.revealSolution = false
      this.showHints = false
      this.question = await this.getRandomQuestion()
      this.loading = false
    },

    reveal() {
      this.revealSolution = true
      this.showHints = true
      this.markQuestionAsDone(this.question)
    },
  },
}
</script>
