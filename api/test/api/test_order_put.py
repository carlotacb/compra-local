import unittest
import requests

from src.config import PYTHON_MODULE_PORT, TEST_RUN_EDITS, MESSAGE_ORDER_NOT_FOUND
from src.enum.order_status import OrderStatusEdit
from src.helper import env


class APIOrderPutTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/order'
        self.status_code = 200
        self.status_code_wrong = 400
        self.order_id = 4
        self.order_id_not_found = 123456789
        self.order_new_status = OrderStatusEdit.DONE.value
        self.order_new_status_wrong = 'RANDOM'

    def test_status_code(self):
        response = requests.put(f'{self.url}/{self.order_id}', json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_order_id_not_found(self):
        request_body = dict(new_status=self.order_new_status)
        response = requests.put(f'{self.url}/{self.order_id_not_found}', json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_ORDER_NOT_FOUND)

    def test_order_new_status_wrong(self):
        request_body = dict(new_status=self.order_new_status_wrong)
        response = requests.put(f'{self.url}/{self.order_id_not_found}', json=request_body)
        self.assertEqual(response.status_code, self.status_code_wrong)

    def test_edit(self):
        if env.run_modifications() or TEST_RUN_EDITS:
            request_body = dict(new_status=self.order_new_status)
            response = requests.put(f'{self.url}/{self.order_id}', json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertEqual(response.get('response').get('edited'), True)
        else:
            self.assertTrue(True)
