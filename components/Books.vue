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
          v-for="(author, index) in filteredAuthors"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card @click="searchAuthor(author)">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">{{
                  author
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
          <div class="card">
            <div class="card__content">
              <div class="headline book__headline">
                {{ book.book_name }}
              </div>
              <div class="subtitle">di {{ book.book_author }}</div>
              <br />
              <div class="edition">Edizione: {{ book.book_edition }}</div>
              <div class="edition">{{ book.book_publication }}</div>
              <div class="edition">{{ book.book_location }}</div>
            </div>
          </div>
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
      return Object.freeze(this.$store.state.data)
    },
  },
  methods: {
    filterBooks(e) {
      this.filteredAuthors = []
      if (e !== '' && e.length > 2) {
        this.filteredBooks = this.books.filter((book) => {
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
      const authorsList = this.$store.state.singleAuthors
      this.$data.filteredAuthors = authorsList.filter((author) => {
        const authorFL = author.charAt(0)
        const authorInitial = authorFL.toLowerCase()
        const search = e.toLowerCase()
        if (authorInitial === search) {
          return author
        }
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

.book__headline.headline {
  padding-left: 0;
  min-height: 70px;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  color: #333;
}

.card {
  border: 1px solid #f3f3f3;
  box-shadow: 0 10px 20px rgb(199 199 199 / 19%),
    0 6px 6px rgb(211 211 211 / 23%);
  padding: 20px;
}
</style>
