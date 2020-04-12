import unittest
import requests

from src.config import PYTHON_MODULE_PORT


class APICategoryGetAllTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/category'
        self.status_code = 200

    def test_status_code(self):
        response = requests.get(self.url)
        self.assertEqual(response.status_code, self.status_code)

    def test_category_all(self):
        response = requests.get(self.url).json()
        self.assertEqual(response.get('error'), False)
        self.assertIsNotNone(response.get('response').get('category_list'))
