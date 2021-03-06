
const sortOrder = [
  '1080p',
  '720p',
  '480p',
  '360p',
  'Auto',
  'auto',
]

const byQuality = ({ quality: qualityA }, { quality: qualityB }) => (
  sortOrder.indexOf(qualityA) < sortOrder.indexOf(qualityB) ? -1 : 1
)

export default byQuality
