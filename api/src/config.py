PYTHON_MODULE_PORT = 8081

TEST_DB_USER = 'postgres'
TEST_DB_PASSWORD = 'compra_local_db_test_password'
TEST_DB_DB = 'postgres'
TEST_DB_HOST = 'compra_local_db_test'
TEST_DB_PORT = 5432

TEST_RUN_CREATIONS = False
TEST_RUN_EDITS = False

MESSAGE_UNEXPECTED_ERROR = 'Unexpected error.'
MESSAGE_PARAMETERS_REQUIRED = 'Some required request body parameters are missing.'

MESSAGE_USER_WRONG_ID = 'User identifier has to be greater than 0.'
MESSAGE_USER_NOT_FOUND = 'User not found.'
MESSAGE_USER_TYPE_NOT_COMPATIBLE = 'UserType specified is not compatible.'
MESSAGE_USER_POST_ERROR = 'Error creating the user.'
MESSAGE_USER_WRONG_PASSWORD = 'Password provided is wrong.'
MESSAGE_ORDER_PRODUCT_LIST_WRONG = 'Product list cannot be empty.'
MESSAGE_ORDER_PRODUCT_LIST_NOT_FOUND = 'Some products are not from the given local.'
MESSAGE_ORDER_NOT_FOUND = 'Order not found.'
MESSAGE_ORDER_GROUP_NOT_FOUND = 'Order group not found.'
MESSAGE_ORDER_GROUP_SAME_USER = 'A user cannot help itself.'
MESSAGE_ORDER_POST_ERROR = 'Error creating the order.'
MESSAGE_LOCAL_WRONG_ID = 'Local identifier has to be greater than 0.'
MESSAGE_LOCAL_NOT_FOUND = 'Local not found.'
MESSAGE_LOCAL_WRONG_POSTAL_ADDRESS = 'Postal address given is not correct.'
MESSAGE_LOCAL_POST_ERROR = 'Error creating the local.'
MESSAGE_CATEGORY_NOT_FOUND = 'Category not found.'
MESSAGE_PRODUCT_WRONG_ID = 'Product identifier has to be greater than 0.'
MESSAGE_PRODUCT_NOT_FOUND = 'Product not found.'
MESSAGE_PRODUCT_GROUP_NOT_FOUND = 'Product group not found.'
MESSAGE_REVIEW_WRONG_PUNCTUATION = 'Punctuation has to be between 0 and 5.'
MESSAGE_REVIEW_LOCAL_POST_ERROR = 'Error creating the local review.'
MESSAGE_REVIEW_USER_POST_ERROR = 'Error creating the user review.'

IMAGE_RESIZE_SIZE = (256, 256)
IMAGE_OUTPUT_FOLDER_PATH = '/tmp'

DATE_WEEK_DAY_FORMAT = '%A'
DATE_TIME_FORMAT = '%H:%M'
DATE_FORMAT = '%d/%m/%Y'

MAPS_DISTANCES_LIST = [500, 1000, 2000, 5000]

TAG_LOCAL_PICK_UP = 'A domicili'
TAG_LOCAL_DELIVERY = 'Per recollir'
TAG_LOCAL_OPEN = 'Obert ara'

DOCS_HTML_FILE_PATH = 'src/templates/docs.html'
