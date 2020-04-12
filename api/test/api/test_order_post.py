import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_PARAMETERS_REQUIRED, TEST_RUN_CREATIONS, \
    MESSAGE_CATEGORY_NOT_FOUND, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND, MESSAGE_LOCAL_NOT_FOUND, \
    MESSAGE_ORDER_PRODUCT_LIST_WRONG, MESSAGE_ORDER_PRODUCT_LIST_NOT_FOUND


class APIOrderPostTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/order'
        self.status_code = 200
        self.status_code_wrong = 400
        self.user_id = 1
        self.user_id_wrong = 0
        self.user_id_not_found = 123456789
        self.local_id = 1
        self.local_id_not_found = 1234567890
        self.order_type = 'PICK_UP'
        self.order_type_wrong = 'RANDOM'
        self.product_list = [dict(product_id=1, quantity=1.2), dict(product_id=3, quantity=4)]
        self.product_list_wrong = []
        self.product_list_not_found = [dict(product_id=1, quantity=1.2), dict(product_id=4, quantity=1)]

    def test_status_code(self):
        response = requests.post(self.url, json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_missing_parameters(self):
        request_body = dict(name=self.user_id)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_PARAMETERS_REQUIRED)

    def test_user_id_wrong(self):
        request_body = dict(
            user_id=self.user_id_wrong,
            local_id=self.local_id,
            order_type=self.order_type,
            product_list=self.product_list
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_WRONG_ID)

    def test_user_id_not_found(self):
        request_body = dict(
            user_id=self.user_id_not_found,
            local_id=self.local_id,
            order_type=self.order_type,
            product_list=self.product_list
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_NOT_FOUND)

    def test_local_id_not_found(self):
        request_body = dict(
            user_id=self.user_id,
            local_id=self.local_id_not_found,
            order_type=self.order_type,
            product_list=self.product_list
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_LOCAL_NOT_FOUND)

    def test_order_type_wrong(self):
        request_body = dict(
            user_id=self.user_id,
            local_id=self.local_id,
            order_type=self.order_type_wrong,
            product_list=self.product_list
        )
        response = requests.post(self.url, json=request_body)
        self.assertEqual(response.status_code, self.status_code_wrong)

    def test_product_list_wrong(self):
        request_body = dict(
            user_id=self.user_id,
            local_id=self.local_id,
            order_type=self.order_type,
            product_list=self.product_list_wrong
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_ORDER_PRODUCT_LIST_WRONG)

    def test_product_list_not_found(self):
        request_body = dict(
            user_id=self.user_id,
            local_id=self.local_id,
            order_type=self.order_type,
            product_list=self.product_list_not_found
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_ORDER_PRODUCT_LIST_NOT_FOUND)

    def test_creation(self):
        if TEST_RUN_CREATIONS:
            request_body = dict(
                user_id=self.user_id,
                local_id=self.local_id,
                order_type=self.order_type,
                product_list=self.product_list
            )
            response = requests.post(self.url, json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertIsNotNone(response.get('response').get('local_id'))
        else:
            self.assertTrue(True)
