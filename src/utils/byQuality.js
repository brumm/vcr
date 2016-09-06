
const sortOrder = [
  '1080p',
  '720p',
  '360p',
  'Auto',
  'auto',
]

const byQuality = ({ quality: qualityA }, { quality: qualityB }) => {
  return sortOrder.indexOf(qualityA) < sortOrder.indexOf(qualityB) ? -1 : 1
}

export default byQuality
