class ArgumentsParser {
  constructor(definitions) {
    this.definitions = definitions
  }

  /**
   * @private
   */
  _isRegistered(option) {
    return !!this.definitions.find((def) => def.options.includes(option))
  }
  _getOptionName(option) {
    return this.definitions.find((def) => def.options.includes(option)).name
  }

  /**
   * @public
   */
  setArguments(args) {
    args.map((arg) => {
      if (!/^-/.test(arg)) {
        if (this.word) {
          throw new Error('Mais de uma palavra definida.')
        }
        this.word = arg
      }
    })
  }
  getWord() {
    if (!this.word) throw new Error('Nenhuma palavra foi definida.')
    return this.word
  }
  getOptions() {
    const options = []

    this.args.forEach((argOption) => {
      const isRegistered = this._isRegistered(argOption)
      const isWord = argOption === this.word

      if (!isRegistered && !isWord) {
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
}

module.exports = ArgumentsParser
