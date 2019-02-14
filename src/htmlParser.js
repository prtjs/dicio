const capitalize = require('./capitalize');

const getMeaningHTMLList = $ => $('.significado > span').toArray();
const getSynonymsHTML = $ => $('.sinonimos').first();
const getAntonymHTML = $ => $('.sinonimos').last();
const getDefinitionHTML = $ => $('.tit-section').next();
const toSelector = $ => html => $(html);
const isSpanTitle = span => span.hasClass('cl');
const getTextAfterTwoDots = text => text.split(':')[1].trim();
const splitByBr = str => str.split('<br>');
const notEmpty = str => str.trim() !== '';
const getSpanContent = child => ({
  isTitle: isSpanTitle(child),
  text: child.text()
});

const parseHtmlText = $ => newHtml => {
  const div = $('<div></div>');
  div.html(newHtml);

  return div.text().trim();
};

const getMeaningSections = $ => {
  return getMeaningHTMLList($)
    .map(toSelector($))
    .map(getSpanContent);
}

const getMeaningSecionsGroups = sections => {
  let section;

  return sections.reduce((acc, { isTitle, text }) => {
    if (isTitle) {
      section = capitalize(text);
    } else {
      acc[section] = acc[section] ? `${acc[section]}\n${text}` : text;
    }

    return acc;
  }, {});
};

const getSynonyms = $ => {
  const html = getSynonymsHTML($);
  if (html.length === 0) return {};
  const text = html.text()
  if (text.indexOf('sinônimo') === -1) return {}

  return {
    'Sinônimos': getTextAfterTwoDots(text)
  };
};

const getAntonym = $ => {
  const html = getAntonymHTML($);
  if (html.length === 0) return {};
  const text = html.text()
  if (text.indexOf('contrário') === -1) return {}

  return {
    'Antônimos': getTextAfterTwoDots(text)
  };
};

const getDefinition = $ => {
  const htmlStr = getDefinitionHTML($).html();
  const definitions = splitByBr(htmlStr)
    .map(parseHtmlText($))
    .filter(notEmpty);

  return {
    'Definição': definitions.join('\n')
  };
};

const pageInformation = $ => ({
  ...getMeaningSecionsGroups(getMeaningSections($)),
  ...getSynonyms($),
  ...getAntonym($),
  ...getDefinition($)
});

module.exports = pageInformation;
