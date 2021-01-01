<template>
  <div v-if="loaded">
    <Books></Books>
  </div>
  <div v-else>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </v-col>

        <v-col cols="12" md="4">
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </v-col>

        <v-col cols="12" md="4">
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loaded: false,
    }
  },
  computed: mapState(['data']),
  created() {
    const unwatch = this.$store.watch(
      (state) => state.data,
      () => {
        this.loaded = true
        unwatch()
      }
    )
  },
  mounted() {
    this.$store.dispatch('fetchBooks')
  },
}
</script>
