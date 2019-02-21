const colors = require('colors')

const printType = (str) => console.log(colors.bold.yellow(str))
const printTitle = (str) => console.log(colors.bold.underline.green(str))
const printContent = (str) => console.log(colors.white(str))
const printEtymology = (str) => console.log(colors.italic.gray(str))
const printEmptyLine = () => console.log()

const printInformations = () => {

}

module.exports = printInformations
