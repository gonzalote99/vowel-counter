import {fillerWords } from './box.js';

const paper = document.getElementById('paper');
const analyze = document.getElementById('analyze');
const generalData = document.getElementById('data');
const assumptions = document.getElementById('assumptions');


const textAnalyzer = {
name: 'text analyzer 1.0',
charCount:() => {
 return paper.value.length;
},

exclSpace: () => {

},

wordCount: (paper) => {
let numOfWords = paper.value.split(' ');
numOfWords = numOfWords.filter(function (str) {

  return /\S/.test(str)
});
return numOfWords.length;


},

longestWord: (paper) => {
let sorted = paper.value
.split(' ')
.sort((wordA, wordB) => wordB.length - wordA.length);
return sorted[0];

},

vowelConter: (paper) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  let count = 0;

  for (let letter of paper.value.toLowerCase()) {
    if(vowels.includes(letter))
    count++;
  }
  return count;
},

consonantCounter: (paprer) => {
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y', 'z'];

  let count = 0;

  for(let letter of paper.value.toLowerCase()) {
    if(consonants.includes(letter)) 
    count++;
  }
  return count;
},

vToCRatio:() => {
  return textAnalyzer.vowelConter(paper) / textAnalyzer.consonantCounter(paper);
},

cToVRatio:() => {
  return textAnalyzer.consonantCounter(paper) / textAnalyzer.vowelConter(paper);
},


bagOfWords:() => {
  return fillerWords.length;
},

uniqueWords:() => {

}

};


const judge = {
  name: 'text judger',
  lengthJudger: () => {
  if(textAnalyzer.wordCount(paper) <= 75) {
     return 'very short';
  } else if(textAnalyzer.wordCount(paper) <= 150 ) {
    return 'short';
  } else if (textAnalyzer.wordCount(paper) <= 500) {
    return 'long';
  } else return 'very long';
  },


  vowelComparison: () => {
    if(textAnalyzer.vToCRatio() > textAnalyzer.cToVRatio())
    return 'vowels than consonants';
    else return 'consonants than vowels';
  },

  guessedLanguage:() => {
    if(judge.vowelComparison() === 'vowels than consonants')
    return 'spanish or another';
    else return 'english or another';
  }


};

document.title = textAnalyzer.name;
const heading = document.querySelector('h1');
heading.innerHTML = textAnalyzer.name;

analyze.addEventListener('click', showResults);

function showResults() {
  generalData.innerHTML = `
     <em><h2>general data</h2></em>

     <strong>character count (incl. spaces):  </strong> ${textAnalyzer.charCount()}
     <br>
     <strong>character count (excl. spaces): </strong> ${textAnalyzer.exclSpace()}
     <br>
     <strong>word count: </strong> ${textAnalyzer.wordCount(paper)}
     <br>
     <strong>longer word: </strong> ${textAnalyzer.longestWord(paper)}
     <br>
     <strong>number of vowels </strong> ${textAnalyzer.vowelConter(paper)}
     <br>
      <strong>number of consonants </strong> ${textAnalyzer.consonantCounter(paper)}
      <br>
      <strong>vowel to consonant </strong> ${textAnalyzer.vToCRatio()}
      <br>
      <strong consonant to vowel</strong> ${textAnalyzer.cToVRatio()}
      <br>
      <strong>bag of words: </strong> ${textAnalyzer.bagOfWords()}
      <br>
      <strong>number unique words</strong> ${textAnalyzer.uniqueWords()}
      
  `;
  assumptions.innerHTML = `
  <em><h2>assumptions</h2></em>

  this is a ${judge.lengthJudger()} text
  has more ${judge.vowelComparison()}.
  i am guessing ${judge.guessedLanguage()}.
  the bag of words
  
  `
}




