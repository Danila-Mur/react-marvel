import { Component } from 'react'

import MarvelService from '../../services/MarvelService'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { Spinner } from '../spinner/Spinner'

import './charList.scss'

export class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.onRequest()
  }

  onRequest = (offset) => {
    this.onCharListLoading()

    this.marvelService.getAllCharacters(offset).then(this.onCharListLoaded).catch(this.onError)
  }

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    })
  }

  onCharListLoaded = (newCharList) => {
    let ended = false
    if (newCharList.lenght < 9) {
      ended = true
    }

    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }))
  }

  onError = () => {
    this.setState({ loading: false, error: true })
  }

  render() {
    const { loading, error, offset, newItemLoading, charEnded } = this.state

    const errorMessage = error ? <ErrorMessage /> : null
    const spiner = loading ? <Spinner /> : null

    return (
      <div className='char__list'>
        <ul className='char__grid'>
          {errorMessage}
          {spiner}
          {this.state.charList.map((item) => (
            <li
              key={item.id}
              className='char__item'
              onClick={() => this.props.onCharSelected(item.id)}
            >
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
        <button
          onClick={() => this.onRequest(offset)}
          disabled={newItemLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          className='button button__main button__long'
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    )
  }
}

export default CharList
