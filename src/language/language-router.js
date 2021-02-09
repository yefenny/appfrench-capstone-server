const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');
const jsonBodyParser = express.json();

const languageRouter = express.Router();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/', async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

    res.json({
      language: req.language,
      words
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/head', async (req, res, next) => {
  // implement me
  LanguageService.getWordByLanguageHead(req.app.get('db'), req.language.id)
    .then((word) => {
      if (word) {
        const newWord = {
          nextWord: word[0].original,
          wordCorrectCount: word[0].correct_count,
          wordIncorrectCount: word[0].incorrect_count,
          totalScore: req.language.total_score
        };
        return res.send(newWord);
      }
    })
    .catch(next);
});

languageRouter.post('/guess', jsonBodyParser, async (req, res, next) => {
  // implement me
  // await
  let updateLanguage = {};
  let list;
  let isCorrect = true;
  const { guess } = req.body;
  if (!guess)
    return res.status(400).json({ error: `Missing 'guess' in request body` });

  let words = await LanguageService.getLanguageWords(
    req.app.get('db'),
    req.language.id
  );
  const language = await LanguageService.getUsersLanguage(
    req.app.get('db'),
    req.user.id
  );
  list = await LanguageService.createLinkedList(words, req.language.head);
  let head = list.head;
  if (head.value.translation.toLowerCase() === guess.toLowerCase()) {
    head.value.correct_count = head.value.correct_count + 1;
    head.value.memory_value = head.value.memory_value * 2;
    updateLanguage.total_score = language.total_score + 1;
    language.total_score++;
  } else {
    head.value.incorrect_count = head.value.incorrect_count + 1;
    head.value.memory_value = 1;
    isCorrect = false;
  }
  await list.shift();
  if (list.head.value.original === 'original 1')
    updateLanguage.head = list.head.value.id;
  await LanguageService.updateWords(req.app.get('db'), list);
  await LanguageService.updateLanguage(
    req.app.get('db'),
    req.language.id,
    updateLanguage
  ).catch(next);
  let response = {
    nextWord: list.head.value.original,
    wordCorrectCount: list.head.value.correct_count,
    wordIncorrectCount: list.head.value.incorrect_count,
    totalScore: language.total_score,
    answer: head.value.translation,
    isCorrect: isCorrect
  };
  return res.send(response);
});

module.exports = languageRouter;
