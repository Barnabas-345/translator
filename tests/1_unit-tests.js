const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

const AB = 'american-to-british';
const BA = 'british-to-american';

suite('Unit Tests', () => {

  suite('Translate : American -> British', () => {

    // + highlight
    test("Translate Mangoes are my favorite fruit. to British English", function done() {
      const text = "Mangoes are my favorite fruit.";
      const translation = text.replace("favorite", "favourite");
      assert.equal(translator.translate(text, AB)[0], translation);
    })

    // + highlight
    test("Translate I ate yogurt for breakfast. to British English", function done() {
      const text = "I ate yogurt for breakfast."
      const translation = text.replace("yogurt", "yoghurt");
      assert.equal(translator.translate(text, AB)[0], translation);
    })

    test("Translate We had a party at my friend's condo. to British English", function done() {
      const text = "We had a party at my friend's condo.";
      const translation = text.replace("condo", "flat");
      assert.equal(translator.translate(text, AB)[0], translation);
    })

    test("Translate Can you toss this in the trashcan for me? to British English", function done() {
      const text = "Can you toss this in the trashcan for me?";
      const translation = text.replace("trashcan", "bin");
      assert.equal(translator.translate(text, AB)[0], translation);
    })

    test("Translate The parking lot was full. to British English", function done() {
      const text = "The parking lot was full.";
      const translation = text.replace("parking lot", "car park");
      assert.equal(translator.translate(text, AB)[0], translation);
    })

    test("Translate Like a high tech Rube Goldberg machine. to British English", function done() {
      const text = "Like a high tech Rube Goldberg machine.";
      const translation = text.replace("Rube Goldberg machine", "Heath Robinson device");
      assert.equal(translator.translate(text, AB)[0], translation);
    })

    test("Translate To play hooky means to skip class or work. to British English", function done() {
      const text = "To play hooky means to skip class or work.";
      const translation = text.replace("play hooky", "bunk off");
      assert.equal(translator.translate(text, AB)[0], translation);
    })

    test("Translate No Mr. Bond, I expect you to die. to British English", function done() {
      const text = "No Mr. Bond, I expect you to die.";
      const translation = text.replace("Mr.", "Mr");
      assert.equal(translator.translate(text, AB)[0], translation);
    })

    test("Translate Dr. Grosh will see you now. to British English", function done() {
      const text = "Dr. Grosh will see you now.";
      const translation = text.replace("Dr.", "Dr");
      assert.equal(translator.translate(text, AB)[0], translation);
    })

    test("Translate Lunch is at 12:15 today. to British English", function done() {
      const text = "Lunch is at 12:15 today.";
      const translation = text.replace("12:15", "12.15");
      assert.equal(translator.translate(text, AB)[0], translation);
    })

  })

  suite('Translate : British -> American', () => {

    // + highlight
    test("Translate We watched the footie match for a while. to American English", function done() {
      const text = "We watched the footie match for a while.";
      const translation = text.replace("footie", "soccer");
      assert.equal(translator.translate(text, BA)[0], translation);
    })

    // + highlight
    test("Translate Paracetamol takes up to an hour to work. to American English", function done() {
      const text = "Paracetamol takes up to an hour to work.";
      const translation = text.replace("Paracetamol", "Tylenol");
      assert.equal(translator.translate(text, BA)[0], translation);
    })

    test("Translate First, caramelise the onions. to American English", function done() {
      const text = "First, caramelise the onions.";
      const translation = text.replace("caramelise", "caramelize");
      assert.equal(translator.translate(text, BA)[0], translation);
    })

    test("Translate I spent the bank holiday at the funfair. to American English", function done() {
      const text = "I spent the bank holiday at the funfair.";
      const translation = text.replace("bank", "public").replace("funfair", "carnival");
      assert.equal(translator.translate(text, BA)[0], translation);
    })

    test("Translate I had a bicky then went to the chippy. to American English", function done() {
      const text = "I had a bicky then went to the chippy.";
      const translation = text.replace("bicky", "cookie").replace("chippy", "fish-and-chip shop");
      assert.equal(translator.translate(text, BA)[0], translation);
    })

    test("Translate I've just got bits and bobs in my bum bag. to American English", function done() {
      const text = "I've just got bits and bobs in my bum bag.";
      const translation = text.replace("bits", "odds").replace("bobs", "ends").replace("bum bag", "fanny pack");
      assert.equal(translator.translate(text, BA)[0], translation);
    })

    test("Translate The car boot sale at Boxted Airfield was called off. to American English", function done() {
      const text = "The car boot sale at Boxted Airfield was called off.";
      const translation = text.replace("car boot sale", "swap meet");
      assert.equal(translator.translate(text, BA)[0], translation);
    })

    test("Translate Have you met Mrs Kalyani? to American English", function done() {
      const text = "Have you met Mrs Kalyani?";
      const translation = text.replace("Mrs", "Mrs.");
      assert.equal(translator.translate(text, BA)[0], translation);
    })

    test("Translate Prof Joyner of King's College, London. to American English", function done() {
      const text = "Prof Joyner of King's College, London.";
      const translation = text.replace("Prof", "Prof.");
      assert.equal(translator.translate(text, BA)[0], translation);
    })

    test("Translate Tea time is usually around 4 or 4.30. to American English", function done() {
      const text = "Tea time is usually around 4 or 4.30.";
      const translation = text.replace("4.30", "4:30");
      assert.equal(translator.translate(text, BA)[0], translation);
    })

  })

  suite('Highlight : British -> American', () => {

    // first A -> B
    test("Highlight translation in Mangoes are my favorite fruit.", function done() {
      const text = "Mangoes are my favorite fruit.";
      const translation = text.replace("favorite", '<span class="highlight">favourite</span>');
      assert.equal(translator.translate(text, AB)[1], translation);
    })

    // second A -> B
    test("Highlight translation in I ate yogurt for breakfast.", function done() {
      const text = "I ate yogurt for breakfast.";
      const translation = text.replace("yogurt", '<span class="highlight">yoghurt</span>');
      assert.equal(translator.translate(text, AB)[1], translation);
    })

  })

  suite('Highlight :American -> British', () => {

    // first B -> A
    test("Highlight translation in We watched the footie match for a while.", function done() {
      const text = "We watched the footie match for a while.";
      const translation = text.replace("footie", '<span class="highlight">soccer</span>');
      assert.equal(translator.translate(text, BA)[1], translation);
    })

    // second B -> A
    test("Highlight translation in Paracetamol takes up to an hour to work.", function done() {
      const text = "Paracetamol takes up to an hour to work.";
      const translation = text.replace("Paracetamol", '<span class="highlight">Tylenol</span>');
      assert.equal(translator.translate(text, BA)[1], translation);
    })

  })

});
