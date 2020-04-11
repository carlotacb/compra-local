import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND


class APIReviewUserAverageTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/review/user'
        self.user_id = 2
        self.user_id_wrong = 0
        self.user_id_not_found = 123456789
        self.status_code = 200

    def test_status_code(self):
        response = requests.get(f'{self.url}/{self.user_id}/average')
        self.assertEqual(response.status_code, self.status_code)

    def test_user_id_wrong(self):
        response = requests.get(f'{self.url}/{self.user_id_wrong}/average').json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_WRONG_ID)

    def test_user_id_not_found(self):
        response = requests.get(f'{self.url}/{self.user_id_not_found}/average').json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_NOT_FOUND)

    def test_user_average(self):
        response = requests.get(f'{self.url}/{self.user_id}/average').json()
        self.assertEqual(response.get('error'), False)
        self.assertIsNotNone(response.get('response').get('average'))
