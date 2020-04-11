import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_PARAMETERS_REQUIRED, TEST_RUN_CREATIONS, \
    MESSAGE_LOCAL_WRONG_POSTAL_ADDRESS, MESSAGE_CATEGORY_NOT_FOUND, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND
from src.helper import image


class APILocalPostTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/admin'
        self.status_code = 200
        self.local_name = 'Rovira Forners'
        self.local_postal_address = 'Carrer de Sants, 282, 08028 Barcelona'
        self.user_id = 3
        self.user_id_wrong = 0
        self.user_id_not_found = 123456789
        self.local_category_id = 3
        self.local_category_id_wrong = 1234567890
        self.local_image_path = 'mock/local_image_3.jpg'

    def test_status_code(self):
        response = requests.post(self.url, json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_missing_parameters(self):
        request_body = dict(name=self.local_name)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_PARAMETERS_REQUIRED)

    def test_user_id_wrong(self):
        request_body = dict(
            name=self.local_name,
            postal_address=self.local_postal_address,
            user_id=self.user_id_wrong
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_WRONG_ID)

    def test_user_id_not_found(self):
        request_body = dict(
            name=self.local_name,
            postal_address=self.local_postal_address,
            user_id=self.user_id_not_found
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_NOT_FOUND)

    def test_wrong_category(self):
        request_body = dict(
            name=self.local_name,
            postal_address=self.local_postal_address,
            user_id=self.user_id,
            category_id=self.local_category_id_wrong
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_CATEGORY_NOT_FOUND)

    def test_creation(self):
        if TEST_RUN_CREATIONS:
            request_body = dict(
                name=self.local_name,
                postal_address=self.local_postal_address,
                user_id=self.user_id,
                category_id=self.local_category_id
            )
            response = requests.post(self.url, json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertIsNotNone(response.get('response').get('local_id'))
        else:
            self.assertTrue(True)

    def test_creation_with_image(self):
        if TEST_RUN_CREATIONS:
            image_content = image.decode_image_file(self.local_image_path)
            request_body = dict(
                name=self.local_name,
                postal_address=self.local_postal_address,
                user_id=self.user_id,
                category_id=self.local_category_id,
                image=image_content
            )
            response = requests.post(self.url, json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertIsNotNone(response.get('response').get('local_id'))
        else:
            self.assertTrue(True)
