import unittest
import requests

from src.config import PYTHON_MODULE_PORT


class APIStatusTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/docs'
        self.status_code = 200
        self.response_message = True

    def test_status_code(self):
        response = requests.get(self.url)
        self.assertEqual(response.status_code, self.status_code)
