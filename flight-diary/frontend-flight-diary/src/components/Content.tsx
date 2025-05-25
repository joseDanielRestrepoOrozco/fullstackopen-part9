import type { DiaryEntry } from '../types'

const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
    </div>
  )
}

const Content = ({ diaryEntries }: { diaryEntries: DiaryEntry[] }) => {
  return (
    <section>
      <h2>Diary entries</h2>
      {diaryEntries.map(entry => {
        return <Entry key={entry.id} entry={entry} />
      })}
    </section>
  )
}

export default Content
