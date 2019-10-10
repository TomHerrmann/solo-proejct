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
    console.log(this);
    return (
      <button key={this.props.id} id="item">
        <h3>
          {this.props.title} ({this.props.year})
        </h3>
        <i>Rotten Tomatoes Score: {this.props.rottenTomatoes}</i>
        {/* <p>Plot: {this.props.plot}</p> */}
      </button>
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
      <button
        key={this.props.id}
        id="result"
        onClick={() => {
          this.props.addToWatchList(this.props.id);
        }}
      >
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
    const itemsArray = [];

    console.log('ITEMS IN FEED', this.props.items);

    if (Object.values(this.props.items)[0]) {
      Object.values(this.props.items).forEach((elem, idx) => {
        if (elem.watched === false) {
          itemsArray.push(
            <Item
              idx={idx}
              rottenTomatoes={elem.Ratings[1].Value}
              poster={elem.Poster}
              title={elem.Title}
              year={elem.Year}
              plot={elem.Plot}
              actors={elem.Actors}
              release={elem.Release}
              imdbID={elem.imdbID}
              genre={elem.Genre}
              director={elem.Director}
              rated={elem.Rated}
              runtime={elem.Runtime}
              watched={elem.watched}
            />
          );
        }
      });
    }

    console.log('IA', itemsArray);
    return (
      <main id="feed">
        <h2>Your Movies & Shows</h2>
        {itemsArray}
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
      items: {}
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

  addToWatchList(buttonKey) {
    const newItem = {};
    fetch(`http://www.omdbapi.com/?i=${buttonKey}&apikey=e53aeb90`)
      .then(res => res.json())
      .then(data => {
        newItem[data.imdbID] = data;
        Object.assign(newItem[data.imdbID], { watched: false });
        this.setState(Object.assign(this.state.items, newItem));
        // POST reqeust
        // *** NOT WORKING ****
        fetch('/mediapost'), {
          header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ media: newItem[data][Title], watched: false })
        }
          .then(res => console.log(res))
          .catch(err => console.log(err))
      })
      .catch(err => console.log('ERROR', err))
  }

  render() {
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
