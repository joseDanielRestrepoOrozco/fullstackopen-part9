import { useState } from 'react'
import type { NewDiaryEntry } from '../types'

interface Props {
  addDiary: (entry: NewDiaryEntry) => Promise<void>
}

const RadioInput = ({
  label,
  name,
  setValue,
  checked,
}: {
  label: string
  name: string
  setValue: (value: string) => void
  checked: boolean
}) => {
  return (
    <label style={{ marginRight: '8px' }}>
      <input 
        type="radio" 
        name={name} 
        value={label}
        checked={checked}
        onChange={() => setValue(label)} 
      />
      {' '}{label}
    </label>
  )
}

const visibilityOptions = ['great', 'good', 'ok', 'poor']
const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy']

const FormDiaryEntry = ({ addDiary }: Props) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const entryToAdd: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    }

    addDiary(entryToAdd)

    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <section>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Date{' '}
            <input
              type="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Visibility</strong>{' '}
          <div>
          {visibilityOptions.map(option => (
            <RadioInput
              key={option}
              label={option}
              name="visibility"
              setValue={setVisibility}
              checked={visibility === option}
            />
          ))}
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Weather</strong>{' '}
          <div>
          {weatherOptions.map(option => (
            <RadioInput
              key={option}
              label={option}
              name="weather"
              setValue={setWeather}
              checked={weather === option}
            />
          ))}
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Comment{' '}
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </section>
  )
}

export default FormDiaryEntry
