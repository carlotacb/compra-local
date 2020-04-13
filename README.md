<br>
<p align="center">
  <img alt="Compra Local" src="https://compralocal.cat/assets/img/og.png" width="50%"/>
</p>
<br>

[![HitCount](http://hits.dwyl.io/carlotacb/compra-local.svg)](http://hits.dwyl.io/carlotacb/compra-local)
![Python application](https://github.com/carlotacb/compra-local/workflows/Python%20application/badge.svg)
![Build and Deploy to Cloud Run](https://github.com/carlotacb/compra-local/workflows/Build%20and%20Deploy%20to%20Cloud%20Run/badge.svg)
[![GitHub stars](https://img.shields.io/github/stars/carlotacb/compra-local.svg)](https://gitHub.com/carlotacb/compra-local/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/carlotacb/compra-local.svg)](https://gitHub.com/carlotacb/compra-local/network/)
[![GitHub contributors](https://img.shields.io/github/contributors/carlotacb/compra-local.svg)](https://gitHub.com/carlotacb/compra-local/graphs/contributors/)
[![GitHub license](https://img.shields.io/github/license/carlotacb/compra-local.svg)](https://github.com/carlotacb/compra-local/blob/master/LICENSE)

🛒 Web application for activating local businesses and making your neighborhood a better place

|                            URL                            |                         Description                          |
| :-------------------------------------------------------: | :----------------------------------------------------------: |
| [Video demo](https://www.youtube.com/watch?v=-gFv3zRlr0U) | Promotonial video related to the project submitted on the Hackovid hackathon. |
|            [Landing](https://compralocal.cat)             | Main website for describing the use of the app and redirecting the user to the proper client. |
|     [Client application](https://app.compralocal.cat)     | Client portal for making purchases and helping your neighbours. |
|    [Admin application](https://admin.compralocal.cat)     |        Local portal for managing the incoming orders.        |
|   [API documentation](https://api.compralocal.cat/docs)   | Documentation related to the Backend API used for both clients. |

## Summary

### What is this?

[Compralocal.cat](https://compralocal.cat) és una plataforma de comerç en línia totalment funcional, on els comerços poden llistar els seus productes i els usuaris poden fer comandes a les diferents botigues del barri.

A més, en cas de no poder sortir de casa per qualsevol raó, pots demanar ajuda a la gent del teu voltant perquè et recullin les comandes.

I recorda, queda't a casa, entre tots podem frenar la corva.

### Tech specifications

A nivell d’arquitectura, el Backend està fet en Python, fent servir Flask com a framework, i és una API feta seguint l’standart de OpenAPI. Pel que fa al Frontend hem dissenyat dues aplicacions web en React (pel client i pel local), que serà portable a mòbils a través de una app nativa en futures releases. 

El Frontend està desplegat a Netlifly i el Backend està desplegat a Google Cloud, fent ús del servei de CloudRun,a més d'una base de dades PostgreSQL desplegada a CloudSQL.

Cal destacar que el codi és el màxim production-ready possible i la majoría de funcionalitats disponen de tests. També disposem d'un docker-compose per poder generar un entorn de test en local i fer les proves que siguin necessaries.

Podeu trobar més informació sobre l’arquitectura al README del GitHub.

## Testing accounts

Per a poder provar l'applicació sense haver de crear noves comptes, es poden fer servir els seguents usuaris.

|      email     | password | account type | login url                              |
|:--------------:|:--------:|:------------:|----------------------------------------|
|  hi@elena.dev  |   elena  |   Botiguera  | https://admin.compralocal.cat/login    |
| hi@carlota.dev |  carlota |   Botiguera  | https://admin.compralocal.cat/login    |
|  hi@albert.dev |  albert  |    usuari    | https://app.compralocal.cat/login      |
|  hi@andreu.dev |  andreu  |    usuari    | https://app.compralocal.cat/login      |

## Organization

This project was built thanks to a team of 4 members.

[Carlota](https://github.com/carlotacb) and [Elena](https://github.com/elena20ruiz) took the responsability of building the 3 clients (landing, client and local) using pure HTML and Bootstrap for the first one and React Hooks for the rest two. [Andreu](https://github.com/andreugallofre) and [Albert](https://github.com/AlbertSuarez) implemented all the Backend API and made the deployment flawless.

We used almost all the features that GitHub allowed us. We ended up having more than [66 Closed Pull Requests](https://github.com/carlotacb/compra-local/pulls?q=is%3Apr+is%3Aclosed), using [Issues](https://github.com/carlotacb/compra-local/issues?q=is%3Aissue+is%3Aclosed) and [Projects](https://github.com/carlotacb/compra-local/projects), and making the deployments easier using [GitHub Actions](https://github.com/carlotacb/compra-local/actions). Also, we were integrating all the features using [different branches](https://github.com/carlotacb/compra-local/network) for making the parallelism better.

## Requirements

1. Python 3.7+
2. NodeJS 13.11+
3. React 16+ (using Hooks)
4. docker-ce (as provided by docker package repos)
5. docker-compose (as provided by PyPI)

## Usage

To run the whole stack, please execute the following from the root directory:

1. Run the server as a docker container with docker-compose

    ```bash
    docker-compose up -d --build
    ```

## API

### Stack

This API is being developed using [Python 3.7](https://www.python.org/downloads/release/python-372/) as a programming language. We have used [Flask](http://flask.pocoo.org/) and [OpenAPI](https://swagger.io/docs/specification/about/) (connected themselves with [Connexion](https://connexion.readthedocs.io/en/latest/) library), integrated with [Docker compose](https://docs.docker.com/compose/).

This API is hosted in a [CloudRun](https://cloud.google.com/run) using the related Dockerfile using a [PostgreSQL](https://www.postgresql.org/) database (specified below) deployed in CloudSQL. In local, for testing purposes, we deploy the API using [uWSGI](https://uwsgi-docs.readthedocs.io/en/latest/) and [Nginx](https://www.nginx.com/) using a replica of the production database inside a Docker container.

The code follows the [PEP8](https://www.python.org/dev/peps/pep-0008/) standard, being valided by [Flake8](https://flake8.pycqa.org/en/latest/), and each endpoint is being valided using [unitests](https://docs.python.org/3/library/unittest.html). We ended up having more than 150 tests.

For making the deployment easier between versions, we integrated a pipeline using [GitHub actions](https://github.com/features/actions) for every commit in the master brach which runs the tests and if it success, deploys to CloudRun.

![](docs/images/github_actions.png)

### Recommendations

Usage of [virtualenv](https://realpython.com/blog/python/python-virtual-environments-a-primer/) is recommended for package library / runtime isolation. You should create your virtual environment inside the `api` folder.

### Usage

To run the API, please execute the following commands from the root directory:

1. Change directory to `api`

    ```bash
    cd api/
    ```

2. Setup virtual environment called `env`

    ```bash
    virtualenv -p /path/to/python env
    ```

3. Install dependencies

    ```bash
    pip3 install -r requirements.lock
    ```

4. Set up environment creating the .env file. This file must have this structure (without the brackets):

    ```bash
    DEVELOPMENT_MODE=true
    DB_USER={DB_USER}
    DB_PASSWORD={DB_PASSWORD}
    DB_DB={DB_DB}
    DB_HOST={DB_HOST}
    DB_PORT={DB_PORT}
    ```

5. Run the server using uWSGI

    ```bash
    uwsgi --ini uwsgi.ini -H env
    ```

    or as a Python module (only for debugging)

    ```bash
    python3 -m src.connexion
    ```

### Run tests

1. Just run the following command with the `RUN_MODIFICATIONS` flag enabled

   ```
   RUN_MODIFICATIONS=true python3 -m unittest discover -v
   ```

![](docs/images/unittests.png)

### Documentation

Given the fact that we used OpenAPI for making the development easier, we could take advantage to use [ReDoc](https://github.com/Redocly/redoc) for creating a beautiful API documentation. Actually, it was very useful for making the integration with the Frontend side since the UX team was reading this documentation.

![](docs/images/redoc_documentation.png)

### Development

#### Logging

For checking the logs of the whole stack in real time, the following command is recommend it:

```bash
docker-compose logs -f
```

#### How to add a new test

Create a new Python file called `test_*.py` in `test.api` with the following structure:

```python
import unittest


class NewTest(unittest.TestCase):

    def test_v0(self):
        expected = 5
        result = 2 + 3
        self.assertEqual(expected, result)

# ...


if __name__ == '__main__':
    unittest.main()

```

### Database

This is the database diagram representing the current Compra Local DB

![](docs/images/database_diagram.png)

## Client

### Requirements

1. MaterialUI 4.9.9+
2. Axios 0.19.2+
3. React 16.13.1+
4. SJCL 1.0.8+

### Available Scripts

In the project directory, you can run (from each of the available clients):

```bash
npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

```bash
npm test
```

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```bash
npm run eject
```

> **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Screenshots

![](docs/screenshots/screenshot_01.png)
<br>
![](docs/screenshots/screenshot_02.png)
<br>
![](docs/screenshots/screenshot_03.png)
<br>
![](docs/screenshots/screenshot_04.png)
<br>
![](docs/screenshots/screenshot_05.png)
<br>
![](docs/screenshots/screenshot_06.png)
<br>
![](docs/screenshots/screenshot_07.png)
<br>
![](docs/screenshots/screenshot_08.png)
<br>
![](docs/screenshots/screenshot_09.png)
<br>
![](docs/screenshots/screenshot_10.png)
<br>
![](docs/screenshots/screenshot_11.png)
<br>
![](docs/screenshots/screenshot_12.png)
<br>
![](docs/screenshots/screenshot_13.png)
<br>
![](docs/screenshots/screenshot_14.png)
<br>
![](docs/screenshots/screenshot_15.png)

## Authors

- [Elena Ruiz](https://github.com/elena20ruiz)
- [Carlota Catot](https://github.com/carlotacb)
- [Andreu Gallofre](https://github.com/andreugallofre)
- [Albert Suàrez](https://github.com/AlbertSuarez)

## License

Apache-2.0 © Compra Local
