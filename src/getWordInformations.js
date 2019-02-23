'use strict'

function getMeaning($) {

  // Constantes
  const CLASS = 'CLASS'
  const ETYMOLOGY = 'ETYMOLOGY'
  const MEANING = 'MEANING'

  const toElement = (element) => $(element)
  const parseElement = (child) => {
    const isClass = child.hasClass('cl')
    const isEtymology = child.hasClass('etim')
    let type

    if (isClass) type = CLASS
    else if (isEtymology) type = ETYMOLOGY
    else type = MEANING

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

function addConjuction(words) {
  return words.reduce((prev, curr, index, arr) => (
    arr.length - 1 === index
      ? `${prev} e ${curr}`
      : `${prev}, ${curr}`
  ))
}

function getAdicionais($, type) {
  let element

  switch (type) {
    case 'synonyms':
      element = $('.sinonimos').first()
      break
    case 'antonyms':
      element = $('.sinonimos').last()
      break
  }

  if (!element) return undefined

  return element
    .find('a')
    .toArray()
    .map((obj) => obj.children[0].data)
}

function getSynonyms($) {
  return addConjuction(getAdicionais($, 'synonyms'))
}

function getAntonyms($) {
  return addConjuction(getAdicionais($, 'antonyms'))
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
      content: getAntonyms($)
    },
    definition: {
      title: 'Definição',
      content: getDefinition($)
    }
  }
}

module.exports = getWordInformations
