function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <div className="error-message">
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ErrorMessage
