import unittest
import requests

from src.config import PYTHON_MODULE_PORT


class APIHelpGetTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/help'
        self.latitude = 41.375574
        self.longitude = 2.126929
        self.status_code = 200
        self.status_code_wrong = 400

    def test_status_code(self):
        params = dict(latitude=self.latitude, longitude=self.longitude)
        response = requests.get(self.url, params=params)
        self.assertEqual(response.status_code, self.status_code)

    def test_status_code_wrong(self):
        response = requests.get(self.url)
        self.assertEqual(response.status_code, self.status_code_wrong)
