import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import './singleComic.scss'
import { useMarvelService } from '../../services/MarvelService'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { Spinner } from '../spinner/Spinner'

export const SingleComic = () => {
  const [comic, setComic] = useState()
  const { id } = useParams()
  const { loading, error, getComic, clearError } = useMarvelService()

  useEffect(() => {
    updateComic()
  }, [id])

  const updateComic = () => {
    clearError()

    getComic(id).then(onComicLoaded)
  }

  const onComicLoaded = (comic) => {
    setComic(comic)
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spiner = loading ? <Spinner /> : null
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null

  return (
    <>
      {errorMessage}
      {spiner}
      {content}
    </>
  )
}

const View = ({ comic }) => {
  const { title, description, thumbnail, price } = comic

  return (
    <div className='single-comic'>
      <img src={thumbnail} alt='x-men' className='single-comic__img' />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{title}</h2>
        <p className='single-comic__descr'>{description}</p>
        <p className='single-comic__descr'>144 pages</p>
        <p className='single-comic__descr'>Language: en-us</p>
        <div className='single-comic__price'>{price}</div>
      </div>
      <Link to='/comics' className='single-comic__back'>
        Back to all
      </Link>
    </div>
  )
}
