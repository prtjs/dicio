const colors = require('colors');

const printTitle = title => console.log(colors.bold.underline.green(title));
const printContent = content => console.log(colors.white(content));
const printEmptyLine = () => console.log();

const print = obj => {
  const keys = Object.keys(obj);

  keys.map((title, index) => {
    const content = obj[title];
    const isNotLast = index < keys.length - 1;

    printTitle(title);
    printContent(content);
    isNotLast && printEmptyLine();
  });
};

module.exports = print;
