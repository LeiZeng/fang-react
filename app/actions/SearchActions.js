import alt from '../alt'
import { assign } from 'underscore'
import request from 'superagent'

class SearchActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'updateSearchQueryValue',
      'searchPropertiesSuccess',
      'searchSuburbSuccess',
      'getPropertiesListSuccess',
      'getPropertyCountSuccess',
      'displayFailMessage',
      'keepSuburbSuccess',
      'filterChange'
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
            this.actions.searchSuburbSuccess(res.body)
          }
        })
    }
  }

  getAllProperties(offset) {
    request.get('/api/properties/')
      .query({ offset })
      .end((err, res) => {
        if (err) {
          this.actions.displayFailMessage(err.response)
        } else {
          this.actions.getPropertiesListSuccess(res.body)
        }
      })
  }

  searchPropertiesBySuburb(suburb) {
    request.get('/api/search')
    .query(suburb)
    .end((err, res) => {
      if (err) {
        this.actions.displayFailMessage(err.response)
      } else {
        this.actions.searchPropertiesSuccess(suburb)
      }
    })
  }

  /**
   * GET /api/properties/:suburb/refine
   * ?sort=desc&terms=s&room=single&property=house&feature=furnished&feature=femalePrefer
   * &feature=nonSmoker&feature=petAllowed&feature=billInclude&feature=fastInternet
   * Looks up a property by search refinement and criteria
   */
  getPropertyCount(suburb = -1, sort, terms, room, property, feature, misc) {
    request.get('/api/count')
      .query({
        suburb,
        sort,
        terms,
        room,
        property,
        feature,
        misc
      })
      .end((err, res) => {3
        if (err) {
          this.actions.displayFailMessage(err.response)
        } else {
          this.actions.getPropertyCountSuccess(res.body)
        }
      })
  }

  searchProperties(suburb, offset, sort, term, room, property, feature, misc) {
    console.log(arguments)
    request.get('/api/search')
    .query({
      suburb,
      offset,
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
        this.actions.getPropertiesListSuccess(res.body)
      }
    })
  }

  searchRefinedFilter(filter) {
    const {
      suburb, offset, sort, term, room, property, feature, misc
    } = filter

    this.actions.filterChange(filter)
    this.actions.searchProperties(suburb, offset, sort, term, room, property, feature, misc)
  }

  keepSuburb(suburb) {
    this.actions.keepSuburbSuccess(suburb)
  }
}

export default alt.createActions(SearchActions)
