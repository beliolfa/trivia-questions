<template>
  <span>{{ kidsMode ? category.kidsName : category.name }}</span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CategoryName',

  props: {
    category: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      kidsMode: state => state.questions.kidsMode,
    }),
  },
}
</script>
