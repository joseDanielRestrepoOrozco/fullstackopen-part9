const Notification = ({ message }: { message: string }) => {
  const messageParts = message.split('\n')

  return (
    <div style={{ color: 'red', marginBottom: '10px' }}>
      {messageParts.map((part, index) => (
        <div key={index}>{part}</div>
      ))}
    </div>
  )
}

export default Notification
