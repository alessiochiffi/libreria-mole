import sheetrock from 'sheetrock'

export const state = {
  data: {
    isLoaded: false,
  },
}

export const mutations = {
  SET_GENERAL(state, payload) {
    state.data = payload
    state.isLoaded = true
  },
}

export const actions = {
  /**
   * Fetch current week tab from Google Sheet url
   */
  fetchBooks({ commit }) {
    fetchData(process.env.bibliopopExcel, { commit })
  },

  filterBooks({ commit }, payload) {
    commit('FILTER_BOOKS', payload)
  },
}

/**
 * Fetch data function - using sheetrock to clean up Google Sheet API response
 * Creating the object for each day and registaring it the vuex state
 * @param {String} sheetUrl Google sheet url with specific ID value for tab
 * @param {Object} commit Vuex commit to state function
 */
function fetchData(sheetUrl, { commit }) {
  const appData = []

  const sheetrockCallback = (error, options, response) => {
    if (!error) {
      response.rows.forEach((row) => {
        const obj = {
          book_author: row.cellsArray[0],
          book_name: row.cellsArray[1],
          bookLocation: row.cellsArray[2],
          bookEdition: row.cellsArray[3],
          bookPublication: row.cellsArray[4],
        }
        if (!row.cellsArray[0].includes('AUTORE')) {
          appData.push(obj)
        }
      })
    } else {
      /* eslint-disable-next-line */
      console.log(error)
    }

    commit('SET_GENERAL', appData)
  }

  sheetrock({
    url: sheetUrl,
    query: 'select A,B,C,D,E',
    callback: sheetrockCallback,
    reset: true,
  })
}
