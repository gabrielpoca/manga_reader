//import * as api from '../api'

export const cacheChapter = async (mangaId, chapterId) => {
  //try {
  //const { chapter, response, requestURL } = await api.chapter(
  //mangaId,
  //chapterId
  //)
  //if (await caches.match(requestURL)) {
  //return
  //}
  //const imageCache = await caches.open('image-cache')
  //const chapterCache = await caches.open('chapter-cache')
  //const mangaCache = await caches.open('manga-cache')
  //const {
  //response: mangaResponse,
  //requestURL: mangaRequestURL
  //} = await api.show(mangaId)
  //chapter.pages.map(async page => {
  //const pageResponse = await fetch(page.url, { mode: 'no-cors' })
  //return imageCache.put(page.url, pageResponse)
  //})
  //if (!await caches.match(mangaRequestURL)) {
  //await mangaCache.put(mangaRequestURL, mangaResponse)
  //}
  //await chapterCache.put(requestURL, response)
  //} catch (err) {
  //console.error(err)
  //}
};

export const uncacheChapter = async ({ mangaId, id, pages }) => {
  //const imageCache = await caches.open('image-cache')
  //const chapterCache = await caches.open('chapter-cache')
  //pages.map(async ({ url }) => await imageCache.delete(url))
  //await chapterCache.delete(api.routes.chapter(mangaId, id))
};
