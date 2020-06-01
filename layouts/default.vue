<template>
  <div class="flex flex-col items-center">
    <div class="w-screen p-8 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2
          class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate cursor-pointer"
          @click="$router.push('/')"
        >
          <span class="text-blue-500">T</span>
          <span class="text-pink-500">r</span>
          <span class="text-yellow-500">i</span>
          <span class="text-yellow-800">v</span>
          <span class="text-green-500">i</span>
          <span class="text-orange-500">a</span>
          <span>Questions</span>
        </h2>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <KidsToggle />
      </div>
    </div>
    <div class="flex h-2 w-screen">
      <div class="flex-1 bg-blue-500" />
      <div class="flex-1 bg-pink-500" />
      <div class="flex-1 bg-yellow-500" />
      <div class="flex-1 bg-yellow-800" />
      <div class="flex-1 bg-green-500" />
      <div class="flex-1 bg-orange-500" />
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
      totals: state => state.questions.totals,
    }),
  },

  async created() {
    if (!this.totals.length) {
      await this.setTotals()
    }
  },

  methods: {
    ...mapActions({
      setTotals: 'questions/setTotals',
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
