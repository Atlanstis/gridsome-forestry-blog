export const imgUrlCover = (url) => {
  return url ? process.env.GRIDSOME_BASE_URL + url : ''
}
