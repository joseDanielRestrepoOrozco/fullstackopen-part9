import type { CoursePart } from '../types'

const partStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
}

const Part = ({ part }: { part: CoursePart }) => {
  const renderSpecificPart = () => {
    switch (part.kind) {
      case 'basic':
        return (
          <>
            <em>{part.description}</em>
          </>
        )
      case 'group':
        return (
          <>
            project exercises
            {part.groupProjectCount}
          </>
        )
      case 'background':
        return (
          <>
            <em>{part.description}</em>
            {part.backgroundMaterial}
          </>
        )
      case 'special':
        return (
          <>
            <em>{part.description}</em>
            required skills: {part.requirements.join(', ')}
          </>
        )
      default:
        assertNever(part)
    }
  }

  const assertNever = (value: never) => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  return (
    <p style={partStyles.container}>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      {renderSpecificPart()}
    </p>
  )
}

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      {parts.map((part: CoursePart) => {
        return <Part key={part.name} part={part} />
      })}
    </>
  )
}

export default Content
