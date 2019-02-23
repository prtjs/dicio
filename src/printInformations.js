'use strict'

const colors = require('colors')

const printClass = (str) => console.log(colors.bold.yellow(str))
const printEtymology = (str) => console.log(colors.italic.gray(str))
const printNormal = (str) => console.log(colors.white(str))
const printTitle = (str) => console.log(colors.bold.underline.green(str))
const printEmptyLine = () => console.log()

// Nome das opções
const SYNONYMS = 'SYNONYMS'
const ANTONYMS = 'ANTONYMS'
const DEFINITION = 'DEFINITION'
const NO_MEANING = 'NO_MEANING'
const HELP = 'HELP'
const VERSION = 'VERSION'

// Tipos de significados
const CLASS = 'CLASS'
const ETYMOLOGY = 'ETYMOLOGY'
const MEANING = 'MEANING'

const printInformations = (wordInformations, options) => {
  const hasOption = (option) => options.includes(option)
  const showMeaning = !hasOption(NO_MEANING)

  if (showMeaning || !showMeaning && options.length === 1) {
    wordInformations.meaning.forEach((data, index) => {
      const isFirstPrint = index === 0

      switch (data.type) {
        case CLASS:
          if (!isFirstPrint) printEmptyLine()
          printClass(data.content)
          break
        case ETYMOLOGY:
          printEtymology(data.content)
          break
        case MEANING:
          printNormal(data.content)
          break
      }
    })
  }

  options.forEach((option, index) => {
    if (options === NO_MEANING) return
    if (showMeaning) printEmptyLine()

    switch (option) {
      case SYNONYMS:
        printTitle(wordInformations.synonyms.title)
        printNormal(wordInformations.synonyms.content)
        break
      case ANTONYMS:
        printTitle(wordInformations.antonyms.title)
        printNormal(wordInformations.antonyms.content)
        break
      case DEFINITION:
        printTitle(wordInformations.definition.title)
        printNormal(wordInformations.definition.content)
        break
    }
  })
}

module.exports = printInformations
