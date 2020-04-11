import unittest
import requests

from src.config import PYTHON_MODULE_PORT, MESSAGE_PARAMETERS_REQUIRED, TEST_RUN_CREATIONS, \
    MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND, MESSAGE_REVIEW_WRONG_PUNCTUATION, MESSAGE_ORDER_GROUP_NOT_FOUND


class APIReviewUserPostTest(unittest.TestCase):

    def setUp(self):
        self.url = f'http://localhost:{PYTHON_MODULE_PORT}/review/user'
        self.status_code = 200
        self.writer_id = 2
        self.writer_id_wrong = 0
        self.writer_id_not_found = 1234567890
        self.order_group_id = 4
        self.order_group_id_not_found = 1234567890
        self.punctuation = 3
        self.punctuation_wrong = 1234567890
        self.comment = 'Molt bona gent!'

    def test_status_code(self):
        response = requests.post(self.url, json=dict())
        self.assertEqual(response.status_code, self.status_code)

    def test_missing_parameters(self):
        request_body = dict(writer_id=self.writer_id)
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_PARAMETERS_REQUIRED)

    def test_writer_id_wrong(self):
        request_body = dict(
            writer_id=self.writer_id_wrong,
            order_group_id=self.order_group_id,
            punctuation=self.punctuation
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_WRONG_ID)

    def test_writer_id_not_found(self):
        request_body = dict(
            writer_id=self.writer_id_not_found,
            order_group_id=self.order_group_id,
            punctuation=self.punctuation
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_USER_NOT_FOUND)

    def test_order_group_id_not_found(self):
        request_body = dict(
            writer_id=self.writer_id,
            order_group_id=self.order_group_id_not_found,
            punctuation=self.punctuation
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_ORDER_GROUP_NOT_FOUND)

    def test_wrong_punctuation(self):
        request_body = dict(
            writer_id=self.writer_id,
            order_group_id=self.order_group_id,
            punctuation=self.punctuation_wrong
        )
        response = requests.post(self.url, json=request_body).json()
        self.assertEqual(response.get('error'), True)
        self.assertEqual(response.get('message'), MESSAGE_REVIEW_WRONG_PUNCTUATION)

    def test_creation(self):
        if TEST_RUN_CREATIONS:
            request_body = dict(
                writer_id=self.writer_id,
                order_group_id=self.order_group_id,
                punctuation=self.punctuation,
                comment=self.comment
            )
            response = requests.post(self.url, json=request_body).json()
            self.assertEqual(response.get('error'), False)
            self.assertIsNotNone(response.get('response').get('review_user_id'))
        else:
            self.assertTrue(True)
