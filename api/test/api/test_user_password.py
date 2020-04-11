import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND, TEST_RUN_EDITS, \
    MESSAGE_USER_WRONG_PASSWORD


class APIUserPasswordTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/user'
        self.status_code = 200
        self.user_id = 1
        self.user_id_wrong = 0
        self.user_id_not_found = 123456789
        self.user_old_password = '72d0166b5707d129dc321e56692fe454c034552ee9e2b38f5a7f1c1306a632ea'
        self.user_old_password_wrong = 'WrongPassword'
        self.user_new_password = 'ThisIsABetterPassword'

    def test_status_code(self):
        response = requests.put(f'{self.url}/{self.user_id}/password', json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_user_id_wrong(self):
        response = requests.put(f'{self.url}/{self.user_id_wrong}/password', json=dict()).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_WRONG_ID)

    def test_user_id_not_found(self):
        response = requests.put(f'{self.url}/{self.user_id_not_found}/password', json=dict()).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_NOT_FOUND)

    def test_wrong_password(self):
        request_body = dict(old_password=self.user_old_password_wrong, new_password=self.user_new_password)
        response = requests.put(f'{self.url}/{self.user_id}/password', json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_WRONG_PASSWORD)

    def test_edit(self):
        if TEST_RUN_EDITS:
            request_body = dict(old_password=self.user_old_password, new_password=self.user_new_password)
            response = requests.put(f'{self.url}/{self.user_id}/password', json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertEqual(response.get('response').get('edited'), True)
        else:
            self.assertTrue(True)
