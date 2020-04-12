import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_LOCAL_WRONG_ID, MESSAGE_LOCAL_NOT_FOUND, MESSAGE_PRODUCT_WRONG_ID, \
    MESSAGE_PRODUCT_NOT_FOUND


class APIProductGetTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/admin'
        self.local_id = 1
        self.local_id_wrong = 0
        self.product_id = 1
        self.product_id_wrong = 0
        self.local_id_not_found = 123456789
        self.product_id_not_found = 123456789
        self.status_code = 200

    def test_status_code(self):
        response = requests.get(f'{self.url}/{self.local_id}/product/{self.product_id}')
        self.assertEqual(response.status_code, self.status_code)

    def test_local_id_wrong(self):
        response = requests.get(f'{self.url}/{self.local_id_wrong}/product/{self.product_id}').json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_LOCAL_WRONG_ID)

    def test_local_id_not_found(self):
        response = requests.get(f'{self.url}/{self.local_id_not_found}/product/{self.product_id}').json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_LOCAL_NOT_FOUND)

    def test_product_id_not_found(self):
        response = requests.get(f'{self.url}/{self.local_id}/product/{self.product_id_not_found}').json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_PRODUCT_NOT_FOUND)

    def test_product_id_wrong(self):
        response = requests.get(f'{self.url}/{self.local_id}/product/{self.product_id_wrong}').json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_PRODUCT_WRONG_ID)

    def test_product(self):
        response = requests.get(f'{self.url}/{self.local_id}/product/{self.product_id}').json()
        self.assertEqual(response.get('error'), False)
        self.assertIsNotNone(response.get('response').get('product'))
        self.assertIsNotNone(response.get('response').get('product').get('id'), self.product_id)
