<template>
  <div class="flex items-center justify-center">
    <span class="mr-4">Preguntas para niños</span>
    <span
      role="checkbox"
      tabindex="0"
      :aria-checked="kids"
      class="group relative inline-flex items-center justify-center flex-shrink-0 h-5 w-10 cursor-pointer focus:outline-none"
      @click="toggle"
    >
      <span
        aria-hidden="true"
        class="bg-gray-200 absolute h-4 w-10 mx-auto rounded-full transition-colors ease-in-out duration-200"
        :class="{ 'bg-blue-500': kids, 'bg-gray-200': !kids }"
      />
      <span
        aria-hidden="true"
        class="translate-x-0 absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform group-focus:shadow-outline group-focus:border-blue-300 transition-transform ease-in-out duration-200"
        :class="{ 'translate-x-5': kids, 'translate-x-0': !kids }"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 'KidsToggle',

  computed: {
    kids: {
      get() {
        return this.$store.state.questions.kidsMode
      },

      set(value) {
        this.$store.dispatch('questions/setKidsMode', value)
      },
    },
  },

  methods: {
    toggle() {
      this.kids = !this.kids
      this.$router.push('/')
    },
  },
}
</script>
