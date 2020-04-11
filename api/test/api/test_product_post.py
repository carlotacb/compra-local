import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_PARAMETERS_REQUIRED, TEST_RUN_CREATIONS, \
    MESSAGE_CATEGORY_NOT_FOUND, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND, MESSAGE_LOCAL_WRONG_ID
from src.helper import image


class APIProductPostTest(unittest.TestCase):

    def setUp(self):
        self.local_id_wrong = 0
        self.local_id = 1
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/admin/{self.local_id}/product'
        self.url_wrong_id = f'http://localhost:{PYTHON_MODULE_PORT}/admin/{self.local_id_wrong}/product'
        self.status_code = 200
        self.product_name = 'Bordar'
        self.currency = 'EUR'
        self.price_type = 'UNIT'
        self.price = 10.5

    def test_status_code(self):
        response = requests.post(self.url, json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_missing_parameters(self):
        request_body = dict(name=self.product_name)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_PARAMETERS_REQUIRED)

    def test_local_id_wrong(self):
        request_body = dict(
            name=self.product_name,
            currency=self.currency,
            price=self.price,
            price_type=self.price_type,
            local_id=self.local_id_wrong
        )
        response = requests.post(self.url_wrong_id, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_LOCAL_WRONG_ID)

    def test_creation(self):
        if TEST_RUN_CREATIONS:
            request_body = dict(
                name=self.product_name,
                currency=self.currency,
                price=self.price,
                price_type=self.price_type,
                local_id=self.local_id
            )
            response = requests.post(self.url, json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertIsNotNone(response.get('response').get('product_id'))
        else:
            self.assertTrue(True)