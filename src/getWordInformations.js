function getMeaning($) {
  const toElement = (html) => $(element)
  const parseElement = (child) => {
    const isClass = child.hasClass('cl')
    const isEtymology = child.hasClass('etim')
    let type

    if (isClass) type = 'class'
    if (isEtymology) type = 'etymology'
    else type = 'meaning'

    return {
      type,
      content: child.text()
    }
  }

  return $('.significado > span')
    .toArray()
    .map(toElement)
    .map(parseElement)
}

const getAdicionais = ($, type) => {
  let element

  switch (type) {
    case 'synonyms':
      element = $('.sinonimos').first()
      break
    case 'antonyms':
      element = $('.sinonimos').last()
  }

  if (!element) return undefined

  return element
    .find('a')
    .toArray()
    .map((obj) => obj.children[0].data)
}

function getSynonyms($) {
  return getAdicionais($, 'synonyms')
}

function getAntonyms($) {
  return getAdicionais($, 'antonyms')
}

function getDefinition($) {
  const htmlStr = $('.tit-section + p')

  if (!htmlStr) return undefined

  const trimStr = (str) => str.trim()
  const remHtmlTags = (htmlStr) => htmlStr.replace(/<.[^>]*>/g, '')
  const splitBr = (htmlStr) => htmlStr.split(/<br\s*\/?\s*>/g)

  return splitBr(htmlStr.html())
    .map(trimStr)
    .map(remHtmlTags)
}

function getWordInformations($) {
  return {
    meaning: getMeaning($),
    synonyms: {
      title: 'Sinônimos',
      content: getSynonyms($)
    },
    antonyms: {
      title: 'Antônimos',
      content: getAntonym($)
    },
    definition: {
      title: 'Definição',
      content: getDefinition($)
    }
  }
}
