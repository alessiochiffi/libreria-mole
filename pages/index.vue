<template>
  <div v-if="loaded" class="app-loaded">
    <Hero></Hero>
    <div class="container">
      <div class="logo"><img src="/logo.png" alt="" /></div>
    </div>
    <Books></Books>
  </div>
  <div v-else>
    <Hero></Hero>
    <br />
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
  head: {
    title: 'Bibliopop',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Bibliopop - ACAB aps',
      },
    ],
  },
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

<style>
.logo {
  position: relative;
}

.logo img {
  position: absolute;
  max-width: 200px;
  right: -20px;
}

@media (max-width: 900px) {
  .logo {
    text-align: center;
  }

  .logo img {
    position: relative;
    right: 0;
  }
}
</style>
