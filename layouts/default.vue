<template>
  <div class="flex flex-col items-center">
    <div class="w-screen p-8 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2
          class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate cursor-pointer"
          @click="$router.push('/')"
        >
          Trivia Questions
        </h2>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <KidsToggle />
      </div>
    </div>
    <div class="max-w-xl p-8">
      <nuxt />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import KidsToggle from '@/components/KidsToggle'

export default {
  components: { KidsToggle },

  computed: {
    ...mapState({
      questions: state => state.questions.questions,
    }),
  },

  async created() {
    if (!this.questions.length) {
      await this.setQuestions()
    }
  },

  methods: {
    ...mapActions({
      setQuestions: 'questions/setQuestions',
    }),
  },
}
</script>
<style lang="postcss">
html,
body {
  @apply w-full flex justify-center;
}
</style>
