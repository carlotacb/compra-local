import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND, TEST_RUN_EDITS


class APIUserPutTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/user'
        self.status_code = 200
        self.user_id = 1
        self.user_id_wrong = 0
        self.user_id_not_found = 123456789
        self.user_new_name = 'Albert Suarez'
        self.user_new_email_address = 'test@test.com'

    def test_status_code(self):
        response = requests.put(f'{self.url}/{self.user_id}', json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_user_id_wrong(self):
        response = requests.put(f'{self.url}/{self.user_id_wrong}', json=dict()).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_WRONG_ID)

    def test_user_id_not_found(self):
        response = requests.put(f'{self.url}/{self.user_id_not_found}', json=dict()).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_NOT_FOUND)

    def test_edit(self):
        if TEST_RUN_EDITS:
            request_body = dict(name=self.user_new_name, email_address=self.user_new_email_address)
            response = requests.put(f'{self.url}/{self.user_id}', json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertEqual(response.get('response').get('edited'), True)
        else:
            self.assertTrue(True)
