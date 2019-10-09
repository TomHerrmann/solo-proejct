import React, { Component } from 'react';
import fetch from 'node-fetch';

class Item extends Component {
  constructor(props) {
    super(props);
  }
  // Individual movies or shows details
  // Check box to mark as watched and remove
  // Smaller delete option
  render() {
    return (
      <div key={this.props.id} id="item">
        {/* {this.props.title} ({this.props.year}) */}
      </div>
    );
  }
}

class Result extends Component {
  constructor(props) {
    super(props);
  }
  // Individual movies or shows details
  // Click to add to watch list
  render() {
    return (
      <button key={this.props.id} id="result" onClick={this.props.addToWatchList}>
        {this.props.title} ({this.props.year})
      </button>
    );
  }
}

class Feed extends Component {
  constructor(props) {
    super(props);
  }
  // Displays Items (movies & shows) that a user has added to their list
  render() {
    return (
      <main id="feed">
        <h2>Your Movies & Shows</h2>
        <Item />
      </main>
    );
  }
}

class Results extends Component {
  constructor(props) {
    super(props);
  }
  // Entered from search page
  // Dispalys search reuslts of films and shows
  // Offers add to feed options - multiple at once?
  // Redirects back to home page when movie or show is added

  render() {
    const resultsArray = [];

    if (this.props.searchResults) {
      this.props.searchResults.forEach(elem => {
        if (elem !== undefined) {
          resultsArray.push(
            <div key={elem.imdbID}>
              <Result
                id={elem.imdbID}
                poster={elem.Poster}
                title={elem.Title}
                year={elem.Year}
                addToWatchList={this.props.addToWatchList}
              />
            </div>
          );
        }
      });
    }

    return <section id="results">{resultsArray}</section>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: '',
      items: []
    };
    this.searchFunc = this.searchFunc.bind(this);
    this.clearResults = this.clearResults.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
  }

  searchFunc() {
    const searchValue = document.querySelector('input').value;
    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=e53aeb90`)
      .then(res => res.json())
      .then(data => this.setState({ searchResults: data.Search }));
    document.querySelector('input').value = '';
  }

  clearResults() {
    this.setState({ searchResults: '' });
  }

  addToWatchList() {
    console.log('addToWatchList');
    this.state.items.push('TEXT');

  }

  render() {
    console.log(this.addToWatchList);
    return (
      <div id="app">
        <header>
          <nav id="nav">
            <section id="branding">
              <h1>Watch List</h1>
            </section>
            <section id="searchbar">
              <input id="search-input" type="text" placeholder="Search Movies & TV"></input>
              <button id="search" className="button" onClick={this.searchFunc}>
                Search
              </button>
              <button id="clear" className="button" onClick={this.clearResults}>
                Clear
              </button>
            </section>
          </nav>
        </header>
        <div id="app">
          <Results searchResults={this.state.searchResults} addToWatchList={this.addToWatchList} />
          <Feed items={this.state.items} />
        </div>
      </div>
    );
  }
}

// class Watched extends Component {
//   // feed of movies marked as Watched
// }

export default App;
