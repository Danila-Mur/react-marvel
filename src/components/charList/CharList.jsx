import { Component } from 'react'

import MarvelService from '../../services/MarvelService'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { Spinner } from '../spinner/Spinner'

import './charList.scss'

export class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.updateAllChars()
  }

  onCharLoaded = (chars) => {
    this.setState({ chars, loading: false })
  }

  onError = () => {
    this.setState({ loading: false, error: true })
  }

  updateAllChars = () => {
    this.marvelService.getAllCharacters().then(this.onCharLoaded).catch(this.onError)
  }

  render() {
    const { loading, error } = this.state

    const errorMessage = error ? <ErrorMessage /> : null
    const spiner = loading ? <Spinner /> : null

    return (
      <div className='char__list'>
        <ul className='char__grid'>
          {errorMessage}
          {spiner}
          {this.state.chars.map((item, i) => (
            <li key={i} className='char__item'>
              <img
                src={item.thumbnail}
                style={{
                  objectFit:
                    item.thumbnail ===
                    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                      ? 'contain'
                      : 'cover',
                }}
                alt='abyss'
              />
              <div className='char__name'>{item.name}</div>
            </li>
          ))}
          {/* <li className='char__item char__item_selected'>
            <img src={abyss} alt='abyss' />
            <div className='char__name'>Abyss</div>
          </li> */}
        </ul>
        <button className='button button__main button__long'>
          <div className='inner'>load more</div>
        </button>
      </div>
    )
  }
}

export default CharList
