import alt from '../alt'
import request from 'superagent'

class SearchActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'displayFailMessage',
      'getSuburbsSuccess',
      'getPropertiesSuccess',
      'getPropertiesCountSuccess',
      'updateFiltersSuccess',
      'resultPageRedirectSuccess'
    )
  }

  getSuburbs(suburb) {
    if (suburb.length > 2) {
      request.get('/api/suburb/')
        .query({ suburb })
        .end((err, res) => {
          if (err) {
            this.actions.displayFailMessage(err.response)
          } else {
            this.actions.getSuburbsSuccess(res.body)
          }
        })
    }
  }

  updateFilters(filters) {
    this.actions.updateFiltersSuccess(filters)
  }

  // make sure updateFilters has been called before this function
  // so the filters state will be always be updated, which doesn't
  // require to parse it in as parameter here
  resultPageRedirect() {
    this.actions.resultPageRedirectSuccess()
  }

  getAllProperties(offset) {
    request.get('/api/properties/')
      .query({ offset })
      .end((err, res) => {
        if (err) {
          this.actions.displayFailMessage(err.response)
        } else {
          this.actions.getPropertiesSuccess({res: res.body, filter: {}})
        }
      })
  }

  getPropertyCount(suburb = -1, sort, term, room, property, feature, misc) {
    request.get('/api/count')
      .query({
        suburb,
        sort,
        term,
        room,
        property,
        feature,
        misc
      })
      .end((err, res) => {
        if (err) {
          this.actions.displayFailMessage(err.response)
        } else {
          this.actions.getPropertiesCountSuccess(res.body)
        }
      })
  }

  searchProperties(suburb, offset, sort, term, room, property, feature, misc) {
    const filter = {
      suburb,
      offset,
      sort,
      term,
      room,
      property,
      feature,
      misc
    }
    request.get('/api/search')
    .query(filter)
    .end((err, res) => {
      if (err) {
        this.actions.displayFailMessage(err.response)
      } else {
        this.actions.getPropertiesSuccess({res: res.body, filter})
      }
    })
  }

  //searchRefinedFilter(filter) {
  //  const {
  //    suburb, offset, sort, term, room, property, feature, misc
  //  } = filter
  //  console.log(filter)
  //
  //  this.actions.filterChange(filter)
  //  //this.actions.searchProperties(suburb, offset, sort, term, room, property, feature, misc)
  //}
  //

}

export default alt.createActions(SearchActions)
