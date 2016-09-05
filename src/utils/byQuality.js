
const byQuality = ({ quality: qualityA }, { quality: qualityB }) => (
  +qualityA.slice(0, -1) < +qualityB.slice(0, -1) ? 1 : -1
)

export default byQuality
