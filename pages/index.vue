<template>
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
                  <div class="text-sm leading-5 font-medium text-indigo-600 truncate">
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
</template>

<script>
export default {
  name: 'TriviaQuestions',

  data() {
    return {
      categories: [
        { slug: 'geography', name: 'Geografía', color: 'bg-blue-500' },
        { slug: 'entertaiment', name: 'Entretenimiento', color: 'bg-pink-500' },
        { slug: 'history', name: 'Historia', color: 'bg-yellow-500' },
        { slug: 'art', name: 'Arte y Literatura', color: 'bg-yellow-800' },
        {
          slug: 'science',
          name: 'Ciencia y Naturaleza',
          color: 'bg-green-500',
        },
        { slug: 'sports', name: 'Deportes', color: 'bg-orange-500' },
      ],
    }
  },
}
</script>
<style lang="postcss">
html,
body {
  @apply w-full flex justify-center;
}
</style>
