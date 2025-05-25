import { useEffect, useState } from 'react'
import type { DiaryEntry, NewDiaryEntry } from './types'
import diaryService from './services/diaryService'
import Content from './components/Content'
import FormDiaryEntry from './components/FormDiaryEntry'
import Notification from './components/Notification'
import axios from 'axios'

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  const addDiary = async (entry: NewDiaryEntry) => {
    try {
      const addedEntry = await diaryService.addEntry(entry)
      setDiaryEntries(diaryEntries.concat(addedEntry))
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data)
      } else {
        setMessage('Error: unknown error')
      }
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  return (
    <>
      {message && <Notification message={message} />}
      <FormDiaryEntry addDiary={addDiary} />
      <Content diaryEntries={diaryEntries} />
    </>
  )
}

export default App
