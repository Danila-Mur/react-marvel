import { useEffect, useState } from 'react'

import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'

import { useMarvelService } from '../../services/MarvelService'

import './charInfo.scss'

export const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null)

  const { loading, error, getCharacter, clearError } = useMarvelService()

  useEffect(() => {
    updateChar()
  }, [charId])

  const updateChar = () => {
    if (!charId) {
      return
    }

    clearError()
    getCharacter(charId).then(onCharLoaded)
  }

  const onCharLoaded = (char) => {
    setChar(char)
  }

  const skeleton = char || loading || error ? null : <Skeleton />
  const errorMessage = error ? <ErrorMessage /> : null
  const spiner = loading ? <Spinner /> : null
  const content = !(loading || error || !char) ? <View char={char} /> : null

  return (
    <div className='char__info'>
      {skeleton}
      {errorMessage}
      {spiner}
      {content}
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char

  let styleNotImage =
    thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

  return (
    <>
      <div className='char__basics'>
        <img
          src={thumbnail}
          alt={name}
          style={{ objectFit: styleNotImage ? 'contain' : 'cover' }}
        />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics.map((item, i) => {
          if (i > 9) return

          return (
            <li key={i} className='char__comics-item'>
              {item.name}
            </li>
          )
        })}
      </ul>
    </>
  )
}
