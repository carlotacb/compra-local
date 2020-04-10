import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_PARAMETERS_REQUIRED, TEST_RUN_CREATIONS
from src.helper import image


class APIUserPostTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/user'
        self.status_code = 200
        self.status_code_wrong = 400
        self.user_name = 'Albert Suarez'
        self.user_email_address_first = 'test@test.com'
        self.user_email_address_second = 'test_with_image@test.com'
        self.user_password = 'superSecureEncodedPassword'
        self.user_type = 'CLIENT'
        self.user_type_wrong = 'RANDOM'
        self.user_image_path = 'test/mock/user_image.jpeg'

    def test_status_code(self):
        response = requests.post(self.url, json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_missing_parameters(self):
        request_body = dict(name=self.user_name)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_PARAMETERS_REQUIRED)

    def test_wrong_user_type(self):
        request_body = dict(
            name=self.user_name,
            email_address=self.user_email_address_first,
            password=self.user_password,
            type=self.user_type_wrong
        )
        response = requests.post(self.url, json=request_body)
        self.assertEqual(response.status_code, self.status_code_wrong)

    def test_creation(self):
        if TEST_RUN_CREATIONS:
            request_body = dict(
                name=self.user_name,
                email_address=self.user_email_address_first,
                password=self.user_password,
                type=self.user_type
            )
            response = requests.post(self.url, json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertIsNotNone(response.get('response').get('user_id'))
        else:
            self.assertTrue(True)

    def test_creation_with_image(self):
        if TEST_RUN_CREATIONS:
            image_content = image.decode_image_file(self.user_image_path)
            request_body = dict(
                name=self.user_name,
                email_address=self.user_email_address_second,
                password=self.user_password,
                type=self.user_type,
                image=image_content
            )
            response = requests.post(self.url, json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertIsNotNone(response.get('response').get('user_id'))
        else:
            self.assertTrue(True)
