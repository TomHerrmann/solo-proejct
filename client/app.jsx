import React, { Component } from 'react';
import fetch from 'node-fetch';

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <button className='clearbutton' /*onClick={this.props.clearFeed}*/>Clear Feed</button>
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
  }
  // Individual movies or shows details
  // Check box to mark as watched and remove
  // Smaller delete option
  render() {
    return (
      <button key={this.props.id} id="item">

        <h1>{this.props.title}</h1>
        {/* <h3>
          {this.props.title} ({this.props.year})
        </h3>
        <i>Rotten Tomatoes Score: {this.props.rottenTomatoes}</i>
        <p>Plot: {this.props.plot}</p> */}
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

    if (this.props.feedItems) {
      this.props.feedItems.forEach(elem => {
        itemsArray.push(
          <Item title={elem.title} />
        )
      })
    }

    // front end rendering - not needed 
    //
    // if (Object.values(this.props.items)[0]) {
    //   Object.values(this.props.items).forEach((elem, idx) => {
    //     if (elem.watched === false) {
    //       itemsArray.push(
    //         <Item
    //           idx={idx}
    //           rottenTomatoes={elem.Ratings[1].Value}
    //           poster={elem.Poster}
    //           title={elem.Title}
    //           year={elem.Year}
    //           plot={elem.Plot}
    //           actors={elem.Actors}
    //           release={elem.Release}
    //           imdbID={elem.imdbID}
    //           genre={elem.Genre}
    //           director={elem.Director}
    //           rated={elem.Rated}
    //           runtime={elem.Runtime}
    //           watched={elem.watched}
    //         />
    //       );
    //     }
    //   });
    // }

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
      items: {},
    };
    this.searchFunc = this.searchFunc.bind(this);
    this.clearResults = this.clearResults.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
    this.clearFeed = this.clearFeed.bind(this);
    this.setAsWatched = this.setAsWatched.bind(this);
  }

  componentDidMount() {
    fetch('/getmedia')
      .then(res => res.json())
      .then(data => this.setState({ feedItems: data }));
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

  clearFeed() {
    fetch('/clearfeed')
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
        fetch('/postmedia', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ id: data.imdbID, title: newItem[data.imdbID].Title, watched: false, year: newItem[data.imdbID].Year, rt: newItem[data.imdbID].Ratings[1].Value, plot: newItem[data.imdbID].Plot })
        })
          .catch(err => console.log('POST ERROR', err))
      })
      .catch(err => console.log('GET ERROR', err))
  }

  setAsWatched() {
    fetch('/setAsWatched')
  }

  render() {
    return (
      <div id="app">
        <header>
          <nav>
            <h1>Watch List</h1>
            {/* <nav id='nav-right'>
              <button id='login' className="button">Login</button>
              <button id='signup' className="button">Sign Up</button>
            </nav> */}
          </nav>
          <section id="searchbar">
            <input id="search-input" type="text" placeholder="Search Movies & TV"></input>
            <button id="search" className="button" onClick={this.searchFunc}>
              Search
            </button>
            <button id="clear" className="button" onClick={this.clearResults}>
              Clear
            </button>
          </section>
        </header>
        <div id="app">
          <Results searchResults={this.state.searchResults} addToWatchList={this.addToWatchList} />
          <Feed items={this.state.items} feedItems={this.state.feedItems} />
          <footer>
            <Footer clearFeed={this.clearFeed} />
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
