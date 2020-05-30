<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        No hay preguntas sin contestar en {{ category.name }}
      </h3>
      <div class="mt-2 max-w-xl text-sm leading-5 text-gray-500">
        <p>
          ¿Quieres marcarlas todas como no contestadas y empezar de cero en esta categoria?
        </p>
      </div>
      <div class="mt-5">
        <button
          type="button"
          :class="category.color"
          class="text-white inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          @click="reset"
        >
          Sí, Marcar preguntas como no contestadas
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ResetCategory',

  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      categoryBySlug: 'questions/categoryBySlug',
    }),

    category() {
      return this.categoryBySlug(this.slug)
    },
  },

  methods: {
    ...mapActions({
      resetCurrentCategory: 'questions/resetCurrentCategory',
    }),

    reset() {
      this.resetCurrentCategory()
      this.$emit('reset')
    },
  },
}
</script>
