const colors = require('colors')

const printType = (str) => console.log(colors.bold.yellow(str))
const printTitle = (str) => console.log(colors.bold.underline.green(str))
const printContent = (str) => console.log(colors.white(str))
const printEtymology = (str) => console.log(colors.italic.gray(str))
const printEmptyLine = () => console.log()

const print = (data, showMeaning, options) => {
  if (showMeaning) {
    data.meaning.forEach((meaning, index) => {
      const { type, content, etymology } = meaning

      printType(type)
      printContent(content.join('\n'))

      if (etymology) {
        printEtymology(etymology)
      }
      if (index !== data.meaning.length - 1) {
        printEmptyLine()
      }
    })
  }

  // Se o significado for aparecer e tiver mais informações a serem
  // apresentadas também, então deverá fazer uma quebra de linha entre elas.
  if (showMeaning) printEmptyLine()

  // Analisar as opções e exibir o resutado de acordo com o pedido pelo usuário.
  options.forEach((option, index) => {
    const { title, content } = data[option]
    printTitle(title)
    printContent(content)

    if (index !== options.length - 1) {
      printEmptyLine()
    }
  })
}

module.exports = print
