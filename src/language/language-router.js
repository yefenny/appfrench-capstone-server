const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');
const { getLanguageWords } = require('./language-service');

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
  LanguageService.getLanguageWords(req.app.get('db'), req.language.id)
    .then((words) => {
      if (words) {
        const word = {
          nextWord: words[0].original,
          totalScore: req.language.total_score,
          wordCorrectCount: words[0].correct_count,
          wordIncorrectCount: words[0].incorrect_count
        };

        res.send(word);
      }
    })
    .catch(next);
});

languageRouter.post('/guess', async (req, res, next) => {
  // implement me
  res.send('implement me!');
});

module.exports = languageRouter;
