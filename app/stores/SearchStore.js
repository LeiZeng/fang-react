import alt from '../alt'
import SearchActions from '../actions/SearchActions'

class SearchStore {
  constructor() {
    this.bindActions(SearchActions)
    this.ajaxAnimationClass = ''
    this.searchQuery = ''
    this.suburbs = []
  }

  onUpdateAjaxAnimation(className) {
    // fadein or fadeout
    this.ajaxAnimationClass = className
  }

  onSearchPropertiesSuccess(payload) {
    payload.history.pushState(null, '/properties/' + payload.suburb)
  }

  onSearchPropertiesFail(payload) {
    payload.searchForm.classList.add('shake')
    setTimeout(() => {
      payload.searchForm.classList.remove('shake')
    }, 1000)
  }

  onUpdateSearchQueryValue(value) {
    this.searchQuery = value
  }

  onSearchSuburbSuccess(data) {
    this.suburbs = data
  }

  onSearchSuburbFail(errorMessage) {
    toastr.error(errorMessage)
  }
}

export default alt.createStore(SearchStore)
