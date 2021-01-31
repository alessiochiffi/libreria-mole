import sheetrock from 'sheetrock'

export const state = {
  data: {
    isLoaded: false,
  },
}

export const mutations = {
  SET_GENERAL(state, payload) {
    const books = payload
    Object.freeze(books)
    state.data = books
    state.isLoaded = true
  },
  SET_SINGLE_AUTHORS(state, payload) {
    const singleAuthors = payload
    Object.freeze(singleAuthors)
    state.singleAuthors = singleAuthors
  },
}

export const actions = {
  /**
   * Fetch current week tab from Google Sheet url
   */
  fetchBooks({ commit }) {
    fetchData(
      'https://docs.google.com/spreadsheets/d/1XnlV69dZxqPC9VedJZcUSkz451fFSE4DNOC4d8yc3bo/edit#gid=0',
      { commit }
    )
  },
}

/**
 * Fetch data function - using sheetrock to clean up Google Sheet API response
 * Creating the object for each day and registaring it the vuex state
 * @param {String} sheetUrl Google sheet url with specific ID value for tab
 * @param {Object} commit Vuex commit to state function
 */
function fetchData(sheetUrl, { commit }) {
  let appData = []
  let singleAuthors = []

  const sheetrockCallback = (error, options, response) => {
    if (!error) {
      response.rows.forEach((row) => {
        const author = row.cellsArray[0]
          .replace(';', '')
          .replace(',', ' ')
          .replace('  ', ' ')
          .replace(',', ' ')
        const obj = {
          book_author: author,
          book_name: row.cellsArray[1],
          book_location: row.cellsArray[2],
          book_edition: row.cellsArray[3],
          book_publication: row.cellsArray[4],
        }

        const singleAuthor =
          row.cellsArray[5] !== ''
            ? row.cellsArray[5]
                .replace(';', '')
                .replace(',', ' ')
                .replace('  ', ' ')
                .replace(',', ' ')
            : null

        if (!row.cellsArray[0].includes('AUTORE')) {
          appData.push(obj)
          if (singleAuthor !== null) {
            singleAuthors.push(singleAuthor)
          }
        }
      })
    } else {
      /* eslint-disable-next-line */
      console.log(error)
    }

    commit('SET_GENERAL', appData)
    commit('SET_SINGLE_AUTHORS', singleAuthors)
  }

  sheetrock({
    url: sheetUrl,
    query: 'select A,B,C,D,E,M',
    callback: sheetrockCallback,
    reset: true,
  })
}
