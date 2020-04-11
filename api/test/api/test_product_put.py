import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_LOCAL_WRONG_ID, TEST_RUN_EDITS


class APIProductPostTest(unittest.TestCase):

    def setUp(self):
        self.local_id_wrong = 0
        self.local_id = 1
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/admin/{self.local_id}/product'
        self.url_wrong_id = f'http://localhost:{PYTHON_MODULE_PORT}/admin/{self.local_id_wrong}/product/1'
        self.status_code = 200
        self.product_name = 'Bordar'
        self.currency = 'EUR'
        self.price_type = 'UNIT'
        self.price = 10.5
        self.new_name = 'Llenites'
        self.product_id = 1

    def test_status_code(self):
        response = requests.put(f'{self.url}/{self.product_id}', json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_local_id_wrong(self):
        request_body = dict(
            name=self.product_name,
            currency=self.currency,
            price=self.price,
            price_type=self.price_type,
            local_id=self.local_id_wrong
        )
        response = requests.put(self.url_wrong_id, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_LOCAL_WRONG_ID)

    def test_edit(self):
        if TEST_RUN_EDITS:
            request_body = dict(name=self.new_name)
            response = requests.put(f'{self.url}/{self.product_id}', json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertEqual(response.get('response').get('edited'), True)
        else:
            self.assertTrue(True)
