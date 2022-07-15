const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

// input
const AB = 'american-to-british';
const BA = 'british-to-american';
const text = "Mangoes are my favorite fruit.";
const translation = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
const sameText = "No need to translate."

// output
const noField = 'Required field(s) missing';
const noText = 'No text to translate';
const noLocale = 'Invalid value for locale field'
const noNeed = "Everything looks good to me!";

suite('Functional Tests', () => {

  test("Translation with text and locale fields: POST request to /api/translate", function (done) {
    chai.request(server)
      .post('/api/translate')
      .send({ text: text, locale: AB })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, translation);
        done();
      })
  })

  test("Translation with text and invalid locale field: POST request to /api/translate", function (done) {
    chai.request(server)
      .post('/api/translate')
      .send({ text: text, locale: "invalid" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, noLocale);
        done();
      })
  })

  test("Translation with missing text field: POST request to /api/translate", function (done) {
    chai.request(server)
      .post('/api/translate')
      .send({ locale: BA })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, noField);
        done();
      })
  })

  test("Translation with missing locale field: POST request to /api/translate", function (done) {
    chai.request(server)
      .post('/api/translate')
      .send({ text: text })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, noField);
        done();
      })
  })

  test("Translation with empty text: POST request to /api/translate", function (done) {
    chai.request(server)
      .post('/api/translate')
      .send({ text: "", locale: AB })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, noText);
        done();
      })
  })

  test("Translation with text that needs no translation: POST request to / api / translate", function (done) {
    chai.request(server)
      .post('/api/translate')
      .send({ text: sameText, locale: BA })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, noNeed);
        done();
      })
  })

});
