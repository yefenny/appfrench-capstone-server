# Appfrench

Appfrench is an app that use the space-repetition technique to help you learn new words in french.

### 1. Working Prototype

You can access a working prototype of the React app here: https://appfrench-client.yefenny.vercel.app/ and Node app here: https://hidden-reaches-87284.herokuapp.com/

### 2. User Stories

This app is a logged-in user

###### Landing Page (Importance - High) (Est: 1h)

- as a visitor
- I want to understand what I can do with this app (or sign up, or log in)
- so I can decide if I want to use it

###### Login Page (Importance - High) (Est: 3h)

- As a returning register user
- I want to enter my password and username to use this app,
- So I can have access to my account.

###### Sign Up (Importance - High) (Est: 3h)

- As a visitor
- I want to register to use this app
- So I can create a personal account.

###### Dashboard Page (Importance - High) (Est: 2h)

- As a logged in user, I'm directed to a dashboard where I can see my progress learning my language.

###### Learning page: shows the next word (Importance - High) (Est: 2h)

- As a logged in user, I can learn words using spaced repetition.

###### Learning page: answer feedback (Importance - High) (Est: 2h)

- As a logged in user, I can see feedback on my submitted answers.

### 3. Functionality

The app's functionality includes:

- Every User has the ability to create an account
- A registered User has the ability to log in.
- A logged in User can see the language that your learning on the Dashboard title.
- A logged in User can see the the progress of practiced words on the Dashboard.
- A logged in User can practice words in french.

### 4. Technology

- Front-End: HTML5, CSS3, JavaScript ES6, React
- Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
- Development Environment: Heroku, DBeaver

### 5. Wireframes

Register Page
![Register Page](/github-images/wireframes/Appfrench-signup.png)
:-------------------------:
Login Page
![Login Page](/github-images/wireframes/Appfrench-login.png)
:-------------------------:
Dashboard Page
![Dashboard Page](/github-images/wireframes/Appfrench-Dashboard.png)
:-------------------------:
Learning Page: Next Word
![Learning Page: Next Word](/github-images/wireframes/Appfrench-Learning-page-next-word.png)
:-------------------------:
Learning Page: Incorrect Answer
![Learning Page: Incorrect Answer](/github-images/wireframes/Appfrench-Learning-page-incorrect.png)
:-------------------------:
Learning Page: Correct Answer
![Learning Page: Correct Answer](/github-images/wireframes/Appfrench-Learning-page-correct-a.png)

### 6. Front-end Structure - React Components Map

- **Index.js** (stateless)
  - **App.js** (stateful)
    - **LoginRoute.js** (stateless) -
      - **LoginForm.js** (stateful) -
    - **RegistrationRoute.js** (stateless) -
      - **RegistrationForm.js** (stateful) -
    - **DashboardRoute.js** (stateless) -
      - **Dashboard.js** (stateful) -
        - **Word.js** (stateless) -
    - **LearningRoute.js** (stateless) -
      - **LearningPage.js** (stateful) -
    - **Navbar.js** (stateless) -

### 7. Back-end Structure - Business Objects

- User (database table)

  - id (serial)
  - name (text)
  - username (email validation)
  - password (at least 8 chars, at least one alpha and a special character validation)

- Word (database table)

  - id (serial)
  - original (text)
  - translation (text)
  - memory_value (integer)
  - correct_count (integer)
  - incorrect_count (integer)
  - language_id (integer)
  - next (integer)

- Language (database table)
  - id (serial)
  - name (text)
  - total_score (integer)
  - user_id (integer)
  - head (integer)

### 8. API Documentation

API Documentation details:

```text
/api
.
├── /language
│   └── GET
│       ├── /
│       ├── /head
│   └── POST
│       ├── /guess
├── /user
│   └── POST
│       └── /
├── /auth
│   └── POST
│       └── /token
│   └── PUT
│       └── /token

```

#### GET `/api/language/`

```js
// req.header
{
    "Authorization": "Bearer ${token}",
}

// res.body

{
    "language": {
        "id": 1,
        "name": "French",
        "user_id": 1,
        "head": 1,
        "total_score": 0
    },
    "words": [
        {
            "id": 1,
            "language_id": 1,
            "original": "apprendre",
            "translation": "learn",
            "next": 2,
            "memory_value": 1,
            "correct_count": 0,
            "incorrect_count": 1
        },
        {
            "id": 2,
            "language_id": 1,
            "original": "ordinateur",
            "translation": "computer",
            "next": 3,
            "memory_value": 1,
            "correct_count": 0,
            "incorrect_count": 0
        },
        {
            "id": 3,
            "language_id": 1,
            "original": "family",
            "translation": "famille",
            "next": 4,
            "memory_value": 1,
            "correct_count": 0,
            "incorrect_count": 0
        },
        {
            "id": 4,
            "language_id": 1,
            "original": "dormir",
            "translation": "sleep",
            "next": 5,
            "memory_value": 1,
            "correct_count": 0,
            "incorrect_count": 0
        },
        {
            "id": 5,
            "language_id": 1,
            "original": "essayer",
            "translation": "try",
            "next": 6,
            "memory_value": 1,
            "correct_count": 0,
            "incorrect_count": 0
        },
        {
            "id": 6,
            "language_id": 1,
            "original": "améliorer",
            "translation": "improve",
            "next": 7,
            "memory_value": 1,
            "correct_count": 0,
            "incorrect_count": 0
        },
        {
            "id": 7,
            "language_id": 1,
            "original": "eau",
            "translation": "water",
            "next": 8,
            "memory_value": 1,
            "correct_count": 0,
            "incorrect_count": 0
        },
        {
            "id": 8,
            "language_id": 1,
            "original": "pluie",
            "translation": "rain",
            "next": null,
            "memory_value": 1,
            "correct_count": 0,
            "incorrect_count": 0
        }
    ]
}



```

#### GET `/api/language/head`

```js
// req.header
{
    "Authorization": "Bearer ${token}",
}

// res.body

{
    "nextWord": "ordinateur",
    "wordCorrectCount": 4,
    "wordIncorrectCount": 0,
    "totalScore": 30
}

```

#### POST `/api/language/guess`

```js
// req.header
{
    "Authorization": "Bearer ${token}",
}

// req.body
{
  guess: 'guess'
}

// res.body

{
  "nextWord": "test-next-word-from-generic-guess",
  "wordCorrectCount": 777,
  "wordIncorrectCount": 777,
  "totalScore": 777,
  "answer": "test-answer-from-generic-guess",
  "isCorrect": true
}

```

#### POST `/api/user/`

```js


// req.body
{
  username: 'username',
  name: 'name',
  password: 'password'
}

// res.body

{
    authToken: 'asKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjne'

}

```

#### POST `/api/auth/`

```js


// req.body
{
  username: 'username',
  password: 'password'
}

// res.body

{

    authToken: 'asKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjne'
}

```

#### PUT `/api/auth/`

```js
// res.body

{
  authToken: 'asKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjneasKNNJhkjnnfsdnfkjne';
}
```

### 9. Screenshots

Register Page
![Register Page](/github-images/screenshots/Appfrench-signup.png)
:-------------------------:
Login Page
![Login Page](/github-images/screenshots/Appfrench-login.png)
:-------------------------:
Dashboard Page
![Dashboard Page](/github-images/screenshots/Appfrench-Dashboard.png)
:-------------------------:
Learning Page: Next Word
![Learning Page: Next Word](/github-images/screenshots/Appfrench-Learning-page-next-word.png)
:-------------------------:
Learning Page: Incorrect Answer
![Learning Page: Incorrect Answer](/github-images/screenshots/Appfrench-Learning-page-incorrect.png)
:-------------------------:
Learning Page: Correct Answer
![Learning Page: Correct Answer](/github-images/screenshots/Appfrench-Learning-page-correct-a.png)

### 10. Development Roadmap

This is v1.0 of the app, but future enhancements are expected to include:

- Add more functionality

### 11. How to run it

Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts

- To install the react project ===> npm install
- To run react (on port 3000) ===> npm start
- To run tests ===> npm run test

##### Local Node scripts

- To install the node project ===> npm install
- To migrate the database ===> npm run migrate -- 1
- To run Node server (on port 8000) ===> npm run dev
- To run tests ===> npm run test
