export default () => ({
  questions: [],
  categories: [
    {
      slug: 'geography',
      name: 'Geografía',
      kidsName: 'Nuestro Planeta',
      color: 'bg-blue-500',
      openTriviaIds: [22],
    },
    {
      slug: 'entertainment',
      name: 'Entretenimiento',
      kidsName: 'Dibujos Animados',
      color: 'bg-pink-500',
      openTriviaIds: [10, 11, 12, 13, 14, 15, 16],
    },
    { slug: 'history', name: 'Historia', color: 'bg-yellow-500', openTriviaIds: [23] },
    { slug: 'art', name: 'Arte y Literatura', color: 'bg-yellow-800', openTriviaIds: [25] },
    {
      slug: 'science',
      name: 'Ciencia y Naturaleza',
      color: 'bg-green-500',
      openTriviaIds: [17],
    },
    { slug: 'sports', name: 'Deportes', color: 'bg-orange-500', openTriviaIds: [21] },
  ],
})
