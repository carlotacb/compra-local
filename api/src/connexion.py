import connexion

from flask_cors import CORS

from src.config import PYTHON_MODULE_PORT


connexion_app = connexion.FlaskApp(__name__, specification_dir='./openapi/')
flask_app = connexion_app.app
flask_app.config['JSON_AS_ASCII'] = False
connexion_app.add_api('openapi.yaml', arguments={'title': 'Compra Local API'})
CORS(flask_app)


if __name__ == '__main__':
    connexion_app.run(host='0.0.0.0', port=PYTHON_MODULE_PORT)
