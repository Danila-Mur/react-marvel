import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useMarvelService } from '../../services/MarvelService'

import './comicsList.scss'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { Spinner } from '../spinner/Spinner'

export const ComicsList = () => {
  const [comicsList, setComicsList] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(210)
  const [comicsEnded, setComicsEnded] = useState(false)

  const { loading, error, getAllComics } = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)

    getAllComics(offset).then(onComicsListLoaded)
  }

  const onComicsListLoaded = (newComicsList) => {
    let ended = false
    if (newComicsList.lenght < 12) {
      ended = true
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList])
    setNewItemLoading(false)
    setOffset((offset) => offset + 12)
    setComicsEnded(ended)
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spiner = loading && !newItemLoading ? <Spinner /> : null

  return (
    <div className='comics__list'>
      <ul className='comics__grid'>
        {errorMessage}
        {spiner}
        {comicsList.map((item) => (
          <li key={item.id} className='comics__item'>
            <Link to={`/comics/${item.id}`}>
              <img src={item.thumbnail} alt='ultimate war' className='comics__item-img' />
              <div className='comics__item-name'>{item.title}</div>
              <div className='comics__item-price'>{item.price}</div>
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
        style={{ display: comicsEnded ? 'none' : 'block' }}
        className='button button__main button__long'
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  )
}
