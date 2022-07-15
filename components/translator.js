const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const reverseDict = (obj) => {
  return Object.assign(
    {},
    ...Object.entries(obj).map(([k, v]) => ({ [v]: k }))
  )
}

const toBritish = {
  dict: { ...americanOnly, ...americanToBritishSpelling },
  titles: americanToBritishTitles,
  timeRegex: /([0-1]?[0-9]|[2][0-3]):([0-5][0-9])/g,
  // timeRegex: /([1-9]|1[012]):[0-5][0-9]/g,
  locale: "toBritish"
}

const toAmerican = {
  dict: { ...britishOnly, ...reverseDict(americanToBritishSpelling) },
  titles: reverseDict(americanToBritishTitles),
  timeRegex: /([0-1]?[0-9]|[2][0-3]).([0-5][0-9])/g,
  // timeRegex: /([1-9]|1[012]).[0-5][0-9]/g,
  locale: "toAmerican"
}

class Translator {

  replaceAll(text, matchMap) {
    const re = new RegExp(Object.keys(matchMap).join("|"), "gi");
    return text.replace(re, (match) => matchMap[match.toLowerCase()]);
  }

  replaceAllWithHighLight(text, matchMap) {
    const re = new RegExp(Object.keys(matchMap).join("|"), "gi");
    return text.replace(re, (match) => {
      return `<span class="highlight">${matchMap[match.toLowerCase()]}</span>`;
    })
  }

  convert(text, params) {
    const lowText = text.toLowerCase();
    const matchMap = {};
    const { dict, titles, timeRegex, locale } = params;

    Object.entries(titles).map(([k, v]) => {
      if (lowText.includes(k)) {
        matchMap[k] = v.charAt(0).toUpperCase() + v.slice(1);
      }
    })

    const wordsWithSpace = Object.fromEntries(
      Object.entries(dict).filter(([k, v]) => k.includes(" "))
    )

    Object.entries(wordsWithSpace).map(([k, v]) => {
      if (lowText.includes(k)) {
        matchMap[k] = v;
      }
    })

    lowText.match(/(\w+([-'])(\w+)?['-]?(\w+))|\w+/g).forEach((word) => {
      if (dict[word]) matchMap[word] = dict[word];
    })

    const matchTime = lowText.match(timeRegex);

    if (matchTime) {
      matchTime.map((e) => {
        if (locale === "toBritish") {
          return (matchMap[e] = e.replace(":", "."));
        } else if (locale === "toAmerican") {
          return (matchMap[e] = e.replace(".", ":"));
        }
      })
    }

    if (Object.keys(matchMap).length === 0) return null;

    const translation = this.replaceAll(text, matchMap);

    const translationWithHighLight = this.replaceAllWithHighLight(text, matchMap);

    return [translation, translationWithHighLight];
  }

  translate(text, locale) {
    let translation;

    if (locale != 'american-to-british' && locale != 'british-to-american') {
      return;
    } else if (locale == 'american-to-british') {
      translation = this.convert(text, toBritish);
    } else if (locale == 'british-to-american') {
      translation = this.convert(text, toAmerican);
    }

    return !translation ? text : translation;
  }

}

module.exports = Translator;
