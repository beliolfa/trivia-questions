<template>
  <div>
    <div class="bg-white shadow overflow-hidden sm:rounded-md mt-16">
      <ul>
        <li
          v-for="category in categories"
          :key="category.slug"
          class="border-t border-gray-200"
          @click="$router.push(category.slug)"
        >
          <a
            href="#"
            class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
          >
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-12 w-12 rounded-full" :class="category.color" />
                </div>
                <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <div class="text-sm leading-5 font-medium text-blue-500">
                      {{ category.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TriviaQuestions',

  computed: {
    ...mapGetters({
      categories: 'questions/categories',
    }),
  },

  head() {
    return {
      title: 'Trivia Questions',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: `data:image/svg+xml,
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  style="color: gray;"
                  xmlns="http://www.w3.org/2000/svg"
                ><circle cx="16" cy="16" r="15.0049" fill="currentColor" /></svg>`,
        },
      ],
    }
  },
}
</script>
