import MarkdownIt from 'markdown-it'
const MDRender = new MarkdownIt()

export const imgUrlCover = (url) => {
  return url ? process.env.GRIDSOME_BASE_URL + url : ''
}

export const mdRender = (str) => {
  return str ? MDRender.render(str) : ''
}
