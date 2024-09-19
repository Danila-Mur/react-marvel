import { useState, useEffect } from 'react'

import MarvelService from '../../services/MarvelService'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { Spinner } from '../spinner/Spinner'

import './charList.scss'

export const CharList = ({ onCharSelected }) => {
  const [charList, setCharList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(210)
  const [charEnded, setCharEnded] = useState(false)

  const marvelService = new MarvelService()

  useEffect(() => {
    onRequest()
  }, [])

  const onRequest = (offset) => {
    onCharListLoading()

    marvelService.getAllCharacters(offset).then(onCharListLoaded).catch(onError)
  }

  const onCharListLoading = () => {
    setNewItemLoading(true)
  }

  const onCharListLoaded = (newCharList) => {
    let ended = false
    if (newCharList.lenght < 9) {
      ended = true
    }

    setCharList((charList) => [...charList, ...newCharList])
    setLoading(false)
    setNewItemLoading(false)
    setOffset((offset) => offset + 9)
    setCharEnded(ended)
  }

  const onError = () => {
    setLoading(false)
    setError(true)
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spiner = loading ? <Spinner /> : null

  return (
    <div className='char__list'>
      <ul className='char__grid'>
        {errorMessage}
        {spiner}
        {charList.map((item) => (
          <li key={item.id} className='char__item' onClick={() => onCharSelected(item.id)}>
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
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        className='button button__main button__long'
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  )
}
