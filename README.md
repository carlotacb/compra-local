# Compra Local

[![HitCount](http://hits.dwyl.io/carlotacb/compra-local.svg)](http://hits.dwyl.io/carlotacb/compra-local)
![Python application](https://github.com/carlotacb/compra-local/workflows/Python%20application/badge.svg)
[![GitHub stars](https://img.shields.io/github/stars/carlotacb/compra-local.svg)](https://gitHub.com/carlotacb/compra-local/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/carlotacb/compra-local.svg)](https://gitHub.com/carlotacb/compra-local/network/)
[![GitHub contributors](https://img.shields.io/github/contributors/carlotacb/compra-local.svg)](https://gitHub.com/carlotacb/compra-local/graphs/contributors/)
[![GitHub license](https://img.shields.io/github/license/carlotacb/compra-local.svg)](https://github.com/carlotacb/compra-local/blob/master/LICENSE)

[Demo](https://compralocal.cat)

🛒 Web application for activating local businesses and making your neighborhood a better place

## Requirements

1. Python 3.7+
2. NodeJS 13.11+
3. docker-ce (as provided by docker package repos)
4. docker-compose (as provided by PyPI)

## Usage

To run the whole stack, please execute the following from the root directory:

1. Run the server as a docker container with docker-compose

    ```bash
    docker-compose up -d --build
    ```

## API

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

    or as a Python module (only for development mode)

    ```bash
    python3 -m src.connexion
    ```

### Run tests

1. Just run the following command

   ```
   python3 -m unittest discover -v
   ```

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

## Authors

- [Elena Ruiz](https://github.com/elena20ruiz)
- [Carlota Catot](https://github.com/carlotacb)
- [Andreu Gallofre](https://github.com/andreugallofre)
- [Albert Suàrez](https://github.com/AlbertSuarez)

## License

Apache-2.0 © Compra Local
