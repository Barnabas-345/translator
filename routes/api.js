'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      if (!locale || text == undefined) {
        res.json({ error: 'Required field(s) missing' })
      }

      if (text == "") {
        res.json({ error: 'No text to translate' })
      }

      let translation = "";
      if (locale != 'american-to-british' && locale != 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      } else {
        translation = translator.translate(text, locale);
      }

      if (translation == text || !translation) {
        translation = "Everything looks good to me!";
      } else {
        translation = translation[1];
      }
      return res.json({ text, translation })
    })

}
