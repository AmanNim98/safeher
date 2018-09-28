# PollutionMap

## Deploy
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Development Workflow

### Setup your development environment

#### Prerequisites

```
python 3.7+
node 10.x.x+
npm 5.x+
pipenv
```

1. Fork and clone this repo.

```
$ git clone http://github.com/gurpreetsingh00885/safeher.git
```

2. Change working directory into the repo, activate your virtual environment and install the backend dependencies.

```
$ cd safeher
$ pipenv shell
(env) $ pipenv install
```

3. Change the working directory into the frontend react app and install the frontend dependencies.

```
(env) $ cd frontend
(env) $ npm install
```

4. Start the django development server

```
(env) $ cd ..
(env) $ python manage.py migrate
(env) $ python manage.py runserver
```

5. Run the frontend app in another shell

```
(env) $ cd frontend
(env) $ npm run watch
```

6. Open http://localhost:8000/ in your browser.

7. Add a new remote to your fork if you want to contribute

```
git remote add myfork https://github.com/<username>/safeher.git
```
