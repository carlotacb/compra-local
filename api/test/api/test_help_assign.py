import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_PARAMETERS_REQUIRED, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND, \
    MESSAGE_ORDER_GROUP_SAME_USER, MESSAGE_ORDER_GROUP_NOT_FOUND, TEST_RUN_EDITS


class APIHelpAssignTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/help/assign'
        self.status_code = 200
        self.user_id = 2
        self.user_id_same = 1
        self.user_id_wrong = 0
        self.user_id_not_found = 123456789
        self.order_group_id = 2
        self.order_group_id_not_found = 987654321

    def test_status_code(self):
        response = requests.post(self.url, json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_missing_parameters(self):
        request_body = dict(user_id=self.user_id)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_PARAMETERS_REQUIRED)

    def test_user_id_wrong(self):
        request_body = dict(user_id=self.user_id_wrong, order_group_id=self.order_group_id)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_WRONG_ID)

    def test_user_id_not_found(self):
        request_body = dict(user_id=self.user_id_not_found, order_group_id=self.order_group_id)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_NOT_FOUND)

    def test_user_id_same(self):
        request_body = dict(user_id=self.user_id_same, order_group_id=self.order_group_id)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_ORDER_GROUP_SAME_USER)

    def test_order_group_id_not_found(self):
        request_body = dict(user_id=self.user_id, order_group_id=self.order_group_id_not_found)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_ORDER_GROUP_NOT_FOUND)

    def test_assign(self):
        if TEST_RUN_EDITS:
            request_body = dict(user_id=self.user_id, order_group_id=self.order_group_id)
            response = requests.post(self.url, json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertEqual(response.get('response').get('assigned'), True)
        else:
            self.assertTrue(True)
