import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_LOCAL_WRONG_ID, MESSAGE_LOCAL_NOT_FOUND


class APILocalGetTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/admin'
        self.local_id = 1
        self.local_id_wrong = 0
        self.local_id_not_found = 123456789
        self.status_code = 200

    def test_status_code(self):
        response = requests.get(f'{self.url}/{self.local_id}')
        self.assertEqual(response.status_code, self.status_code)

    def test_local_id_wrong(self):
        response = requests.get(f'{self.url}/{self.local_id_wrong}').json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_LOCAL_WRONG_ID)

    def test_local_id_not_found(self):
        response = requests.get(f'{self.url}/{self.local_id_not_found}').json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_LOCAL_NOT_FOUND)

    def test_local(self):
        response = requests.get(f'{self.url}/{self.local_id}').json()
        self.assertEqual(response.get('error'), False)
        self.assertIsNotNone(response.get('response').get('local'))
        self.assertIsNotNone(response.get('response').get('local').get('id'), self.local_id)
