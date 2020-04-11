import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_PARAMETERS_REQUIRED


class APIUserLoginTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/user/login'
        self.status_code = 200
        self.status_code_wrong = 400
        self.user_email_address = 'hi@albert.dev'
        self.user_password = '72d0166b5707d129dc321e56692fe454c034552ee9e2b38f5a7f1c1306a632ea'
        self.user_password_wrong = 'ThisIsAWrongPassword'
        self.user_type = 'CLIENT'
        self.user_type_wrong = 'RANDOM'

    def test_status_code(self):
        response = requests.post(self.url, json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_missing_parameters(self):
        request_body = dict(name=self.user_email_address)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_PARAMETERS_REQUIRED)

    def test_wrong_user_type(self):
        request_body = dict(
            email_address=self.user_email_address,
            password=self.user_password,
            type=self.user_type_wrong
        )
        response = requests.post(self.url, json=request_body)
        self.assertEqual(response.status_code, self.status_code_wrong)

    def test_login(self):
        request_body = dict(
            email_address=self.user_email_address,
            password=self.user_password,
            type=self.user_type
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), False)
        self.assertEqual(response.get('response').get('success'), True)
        self.assertIsNotNone(response.get('response').get('user_id'))

    def test_login_wrong(self):
        request_body = dict(
            email_address=self.user_email_address,
            password=self.user_password_wrong,
            type=self.user_type
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), False)
        self.assertEqual(response.get('response').get('success'), False)
        self.assertIsNone(response.get('response').get('user_id'))
