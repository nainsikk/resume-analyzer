function ErrorMessage({ message, onRetry }) {
  if (!message) return null

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm font-medium underline hover:text-red-900"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage;