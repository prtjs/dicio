class ArgumentsParser {
  constructor(definitions) {
    this.definitions = definitions
  }

  /**
   * @private
   */
  _hasOptionRegistered(option) {
    return !!this.definitions.find((def) => def.options.includes(option))
  }
  _getOptionName(option) {
    return this.definitions.find((def) => def.options.includes(option)).name
  }

  /**
   * @public
   */
  setArguments(args) {
    this.args = args

    args.map((arg) => {
      if (this.word) throw new Error('Mais de uma palavra definida.')
      if (!/^-/.test(arg)) this.word = arg
    })

    if (!this.word) {
      throw new Error('Nenhuma palavra foi definida.')
    }
  }
  getOptions() {
    const options = []

    this.args.forEach((argOption) => {
      const isRecognized = this._hasOptionRegistered(argOption)
      const isWord = argOption === this.word

      if (!isRecognized && !isWord) {
        throw new Error(`A opção '${argOption}' não foi reconhecida.`)
      }

      const optionName = this._getOptionName(argOption)

      if (options.includes(optionName)) {
        throw new Error(`A opção '${argOption}' já foi definida.`)
      }
      if (optionName === null) {
        return
      }

      options.push(optionName)
    })

    return options
  }
  getWord() {
    return this.word
  }
  getOptionsInfo(definitions) {
    const toStrList = arr => arr.join(', ')
    const lens = definitions.map(def => toStrList(def.options).length)
    const maxOptLen = Math.max.apply(null, lens)

    this.definitions.map((def) => {
      const { options, description } = def
      const listOptions = toStrList(options)
      const spacesCount = 4 + maxOptLen - listOptions.length
      const spaces = ' '.repeat(spacesCount)

      return `  ${listOptions}${spaces}${description}`
    })
  }
}

module.exports = ArgumentsParser

var ap = new ArgumentsParser([
  {
    name: 'synonyms',
    options: [ '--synonyms', '-s' ],
    description: 'Exibe os sinônimos da palavra.',
  },
  {
    name: 'definition',
    options: [ '--definition', '-d' ],
    description: 'Exibe a definição da palavra.'
  },
  {
    name: 'no-meaning',
    options: [ '--no-meaning', '-m' ],
    description: 'Não exibe o significado da palavra.'
  },
  {
    name: null,
    options: [ '--no-colors' ],
    description: 'Não exibe cores no terminal.'
  },
  {
    name: 'help',
    options: [ '--help', '-h', '-?' ],
    description: 'Exibe essa mensagem e sai.'
  },
  {
    name: 'version',
    options: [ '--version', '-v' ],
    description: 'Exibe a versão e sai.'
  }
])
