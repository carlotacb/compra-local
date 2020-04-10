import base64
import os
import uuid

from PIL import Image

from src.config import IMAGE_RESIZE_SIZE, IMAGE_OUTPUT_FOLDER_PATH
from src.helper import log


def resize(image_base64):
    try:
        output_path = os.path.join(IMAGE_OUTPUT_FOLDER_PATH, str(uuid.uuid4()))
        with open(output_path, 'wb') as img:
            img.write(base64.b64decode(image_base64))
        with Image.open(output_path) as img:
            img.thumbnail(IMAGE_RESIZE_SIZE, Image.ANTIALIAS)
            img.save(fp=output_path, format='JPEG', quality=95)
        with open(output_path, 'rb') as img:
            encoded_image = img.read()
        os.remove(output_path)
        return encoded_image
    except Exception as e:
        log.error(f'Exception opening and resizing image: [{e}]')
        log.exception(e)
        return None


def decode_base64(image_base64_in_bytes):
    return None if not image_base64_in_bytes else image_base64_in_bytes.decode('utf-8')


def decode_image_file(image_file_path):
    with open(image_file_path, 'rb') as img_file:
        decoded_image = base64.b64encode(img_file.read()).decode('utf-8')
    return decoded_image


def decode_and_resize(image_file_path):
    return resize(decode_image_file(image_file_path))
