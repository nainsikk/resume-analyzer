import { useDropzone } from 'react-dropzone'

const MAX_SIZE_MB = 5
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

// Turns react-dropzone's rejection codes into messages for the user
function getRejectionMessage(rejections) {
  const code = rejections[0]?.errors[0]?.code
  if (code === 'file-invalid-type') return 'Only PDF files are allowed.'
  if (code === 'file-too-large') return `File is too large. Maximum size is ${MAX_SIZE_MB} MB.`
  if (code === 'file-too-small') return 'The file is empty.'
  if (code === 'too-many-files') return 'Please upload one file at a time.'
  return 'This file cannot be used.'
}

function FileDropzone({ onFileAccepted, onFileRejected, disabled = false }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: MAX_SIZE_BYTES,
    minSize: 1,
    multiple: false,
    disabled,
    onDropAccepted: (files) => onFileAccepted(files[0]),
    onDropRejected: (rejections) => onFileRejected(getRejectionMessage(rejections)),
  })

  const baseStyle =
    'cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors'
  const stateStyle = disabled
    ? 'border-slate-200 bg-slate-100 cursor-not-allowed'
    : isDragActive
      ? 'border-blue-500 bg-blue-50'
      : 'border-slate-300 bg-white hover:border-blue-400'

  return (
    <div {...getRootProps()} className={`${baseStyle} ${stateStyle}`}>
      <input {...getInputProps()} />
      <p className="text-slate-700 font-medium">
        {isDragActive ? 'Drop your PDF here' : 'Drag and drop your resume here, or click to choose'}
      </p>
      <p className="mt-1 text-sm text-slate-500">PDF only, up to {MAX_SIZE_MB} MB</p>
    </div>
  )
}

export default FileDropzone;