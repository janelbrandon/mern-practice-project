import React, {
  Component
} from 'react'
import './App.css'
import axios from 'axios'
import ArtistList from './components/ArtistList'

const artistApi = 'http://localhost:3001/api/artists'


class App extends Component {
  state = {
    artists: [],
    newArtist: ''
  }

  componentDidMount() {
    axios.get(artistApi)
      .then((response) => {
        this.setState({ artists: response.data })
      })
  }

  changeNewArtist = (event) => {
    this.setState({ newArtist: event.target.value })
  }

  createNewArtist = (event) => {
    event.preventDefault()
    // Post the new artist to our server
    let data = { name: this.state.newArtist }
    axios.post(artistApi, data)
      .then((response) => {
        // Success! Add the new artist to our array and clear the input
        const artists = [...this.state.artists, response.data]
        this.setState({ artists, newArtist: '' })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Music Library</h1>
        </header>
        <form onSubmit={this.createNewArtist}>
          <label>New Artist:</label><input value={this.state.newArtist} onChange={this.changeNewArtist} />
        </form>
        <ArtistList artists={this.state.artists} />
      </div>
    )
  }
}
export default App;