import { useState, useEffect } from 'react'

import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import MarvelService from '../../services/MarvelService'
import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../errorMessage/ErrorMessage'

export const RandomChar = () => {
  const [char, setChar] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const marvelService = new MarvelService()

  useEffect(() => {
    updateChar()
  }, [])

  const onCharLoaded = (char) => {
    setChar(char)
    setLoading(false)
  }

  const onCharLoading = () => {
    setLoading(true)
  }

  const onError = () => {
    setLoading(false)
    setError(true)
  }

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

    onCharLoading()

    marvelService.getCharacter(id).then(onCharLoaded).catch(onError)
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spiner = loading ? <Spinner /> : null
  const content = !(loading || error) ? <View char={char} /> : null

  return (
    <div className='randomchar'>
      {errorMessage}
      {spiner}
      {content}
      <div className='randomchar__static'>
        <p className='randomchar__title'>
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className='randomchar__title'>Or choose another one</p>
        <button className='button button__main'>
          <div className='inner' onClick={updateChar}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
      </div>
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char

  let personDescription = description
    ? description.length > 207
      ? description.slice(0, 206) + '...'
      : description
    : 'There is no information about this character'

  let styleNotImage =
    thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

  return (
    <div className='randomchar__block'>
      <img
        src={thumbnail}
        style={{ objectFit: styleNotImage ? 'contain' : 'cover' }}
        alt='Random character'
        className='randomchar__img'
      />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{name}</p>
        <p className='randomchar__descr'>{personDescription}</p>
        <div className='randomchar__btns'>
          <a href={homepage} className='button button__main'>
            <div className='inner'>homepage</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}
