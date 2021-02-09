const list = require('../List/List');

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score'
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count'
      )
      .where({ language_id })
      .orderBy('next', 'asc');
  },
  getWordByLanguageHead(db, language_id) {
    return db
      .from('word')
      .join('language', 'word.id', '=', 'language.head')
      .select('original', 'language_id', 'correct_count', 'incorrect_count')
      .where({ language_id });
  },
  updateWords(db, list) {
    let currentNode = list.head;
    const words = [];
    while (currentNode !== null) {
      words.push(currentNode.value);
      currentNode = currentNode.next;
    }

    Promise.all(
      words.map((word) => {
        return db('word').where('id', word.id).update({
          correct_count: word.correct_count,
          incorrect_count: word.incorrect_count,
          memory_value: word.memory_value,
          next: word.next
        });
      })
    ).then(() => {
      return;
    });
  },
  updateLanguage(db, language_id, values) {
    return db('language').where('id', language_id).update(values);
  },
  async createLinkedList(words, head) {
    const newList = new list();
    let word = words.find((item) => item.id === head);
    newList.insertFirst(word);

    while (word.next) {
      word = words.find((item) => item.id === word.next);
      newList.insertLast(word);
    }
    return newList;
  }
};

module.exports = LanguageService;
