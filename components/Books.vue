<template>
  <div>
    <v-container>
      <v-col cols="12" md="6" offset-lg="3">
        <v-text-field
          label="Cerca per titolo"
          hide-details="auto"
          @input="filterBooks($event)"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" offset-lg="3">
        <v-text-field
          label="Cerca per autore"
          hide-details="auto"
          @input="filterAuthor($event)"
          @change="filterAuthor($event)"
          ref="authorField"
        ></v-text-field>
      </v-col>
      <br />

      <div class="filter__author">Filtra autori</div>
      <div class="alphabet">
        <div v-for="(letter, index) in alphabet" :key="index" class="letter">
          <v-avatar
            color="#f6f6f6"
            size="36"
            tile
            @click="filterAuthorsByLetter(letter)"
            >{{ letter }}</v-avatar
          >
        </div>
      </div>
    </v-container>

    <br />

    <v-container v-if="filteredAuthors.length > 0">
      <v-row class="mb-6">
        <v-col
          v-for="(book, index) in filteredAuthors"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card @click="searchAuthor(book.book_author)">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">{{
                  book.book_author
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="filteredBooks.length > 0">
      <v-row class="mb-6">
        <v-col
          v-for="(book, index) in filteredBooks"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  {{ book.book_name }}
                </v-list-item-title>
                <v-list-item-subtitle
                  >di {{ book.book_author }}</v-list-item-subtitle
                >
                <br />
                <v-list-item-subtitle
                  >Edizione: {{ book.book_edition }}</v-list-item-subtitle
                >
                <br />
                <v-list-item-subtitle>{{
                  book.book_publication
                }}</v-list-item-subtitle>
                <br />
                {{ book.book_location }}
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
      filteredAuthors: [],
      filteredBooks: [],
    }
  },
  computed: {
    books() {
      return this.$store.state.data
    },
  },
  methods: {
    filterBooks(e) {
      this.filteredAuthors = []
      if (e !== '' && e.length > 2) {
        this.$data.filteredBooks = this.books.filter((book) => {
          const name = book.book_name.toLowerCase()
          const search = e.toLowerCase()
          return name.includes(search)
        })
      } else {
        this.$data.filteredBooks = []
      }
    },

    filterAuthor(e) {
      this.filteredAuthors = []
      if (e !== '' && e.length > 2) {
        this.$data.filteredBooks = this.books.filter((book) => {
          const author = book.book_author.toLowerCase()
          const search = e.toLowerCase()
          return author.includes(search)
        })
      } else {
        this.$data.filteredBooks = []
      }
    },

    filterAuthorsByLetter(e) {
      this.filteredAuthors = []
      this.filteredBooks = []

      this.$data.filteredAuthors = this.books.filter((book) => {
        const author = book.book_author.charAt(0)
        const authorInitial = author.toLowerCase()
        const search = e.toLowerCase()
        return authorInitial === search
      })
    },

    searchAuthor(author) {
      this.filterAuthor(author)
    },
  },
}
</script>

<style>
.alphabet {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 900px) {
  .alphabet {
    overflow: scroll;
  }
}

.v-avatar {
  cursor: pointer;
}

.filter__author {
  margin-bottom: 10px;
}
</style>
