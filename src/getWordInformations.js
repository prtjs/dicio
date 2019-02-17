/**
 * Objeto com informações do conteúdo da tag span com siginifcados.
 *
 * @typedef {object} SpanContent
 * @prop {boolean} isType - Se for a o tipo (classe) da palavra.
 * @prop {boolean} isEtymology - Se for a etimologia da palavra.
 * @prop {string} text - Conteúdo do tag.
 */

/**
 * Obter objeto com informações duma tag span com significados.
 *
 * @param {initialize} child Objeto jQuery-like da tag span.
 * @returns {SpanContent} Informações da tag span.
 */
const getSpanContent = (child) => ({
   isType: child.hasClass('cl'),
   isEtymology: child.hasClass('etim'),
   text: child.text()
})

/**
 * Obter lista de informações das tags com significados.
 *
 * @param {Functio} $ Função jQuery-like de toda a página.
 * @returns {SpanContent[]} Array com todas as informações.
 */
const getMeaningSections = ($) => {
  return $('.significado > span').toArray()
    .map((html) => $(html))
    .map(getSpanContent)
}

/**
 * Melhorar texto com a etimologia.
 *
 * @param {string} text Texto no formato recebido pelo site.
 * @returns {string} Texto melhorado.
 * @example
 * const text = 'Etimologia (origem da palavra bio). De origem controversa.'
 * improveEtymology(text)
 * //=> 'Etimologia: De origem controversa.'
 */
const improveEtymology = (text) => text.replace(/^.*\)\./, 'Etimologia:')

/**
 * Objeto com informações dum tipo (classe) da palavra.
 *
 * @typedef Meaning
 * @prop {string} type - Tipo (classe) da palavra.
 * @prop {string[]} content - Array com sifinicados da palavra.
 * @prop {string|null} etymology - Etimologia da palavra.
 */

/**
 * Obter lista com todos os tipos das palavra.
 *
 * @param {Function} $ Objeto jQuery-like de toda a página.
 * @returns {Meaning[]} Array com todos os sifinicados.
 */
const getMeaning = ($) => {
  const sections = getMeaningSections($)
  let meaning = []
  let defaultData = {
    type: '',
    etymology: null,
    content: []
  }
  let data = Object.assign({}, defaultData)

  for (let index in sections) {
    const { isType, isEtymology, text } = sections[index]

    if (isType) {
      if (!!data.type) {
        meaning = meaning.concat(data)
        data = Object.assign({}, defaultData)
      }
      data.type = text
    } else if (isEtymology) {
      data.etymology = improveEtymology(text)
    } else {
      data.content = data.content.concat(text)
    }

    if (index == sections.length - 1) {
      meaning = meaning.concat(data)
    }
  }

  return meaning
}

/**
 * Obter o texto depois de dois-pontos.
 *
 * @param {string} text Um texto qualquer para analisar.
 * @returns {string} Texto depois dos dois-pontos.
 * @example
 * getTextAfterColon('foo:bar')
 * //=> 'bar'
 */
const getTextAfterColon = (text) => text.split(':')[1].trim()

/**
 * Extrair lista de sinônimos da página.
 *
 * @param {Function} $ Objeto jQuery-like de toda a página.
 * @returns {string} Todos sinônimos na página.
 */
const getSynonyms = ($) => {
  const html = $('.sinonimos').first()
  if (html.length === 0) return ''
  const text = html.text()
  if (!text.includes('sinônimo')) return ''

  return getTextAfterColon(text)
}

/**
 * Extrair lista de antônimos da página.
 *
 * @param {Function} $ Função jQuery-like de toda a página.
 * @returns {string} Todos antônimos na página.
 */
const getAntonym = ($) => {
  const html = $('.sinonimos').last()
  if (html.length === 0) return ''
  const text = html.text()
  if (!text.includes('contrário')) return ''

  return getTextAfterColon(text)
}

/**
 * Extrair somente o texto de uma string HTML.
 *
 * @param {Function} $ Função jQuery-like.
 * @returns {string} Somente o texto do HTML.
 */
const parseHtmlText = ($) => (newHtml) => {
  const div = $('<div></div>')
  div.html(newHtml)

  return div.text().trim()
}

/**
 * Extrair as definições da palavra na página.
 *
 * @param {Function} $ Função jQuery-like de toda a página.
 * @returns {string} Definições da palavra.
 */
const getDefinition = ($) => {
  const htmlStr = $('.tit-section').next().html()
  const definitions = htmlStr.split('<br>')
    .map(parseHtmlText($))
    .filter((str) => str.trim() !== '')

  return definitions.join('\n')
}

/**
 * Obter todas as informações necessárias da palavra na página.
 *
 * @param {Function} $ Função jQuery-like de toda a página.
 * @returns {object} Objeto com todas as informações.
 */
const getWordInformations = ($) => ({
  meaning: getMeaning($),
  synonyms:   { title: 'Sinônimos', content: getSynonyms($) },
  antonyms:   { title: 'Antônimos', content: getAntonym($) },
  definition: { title: 'Definição', content: getDefinition($) }
})

module.exports = getWordInformations
