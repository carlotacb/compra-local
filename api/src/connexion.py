import connexion

from flask import Response, redirect
from flask_cors import CORS

from src.config import PYTHON_MODULE_PORT, DOCS_HTML_FILE_PATH
from src.db import sqlalchemy
from src.helper import log


log.info('Creating connexion application...')
connexion_app = connexion.FlaskApp(__name__, specification_dir='./openapi/')
flask_app = connexion_app.app
flask_app.config['JSON_AS_ASCII'] = False
log.info('Setting up OpenAPI specification...')
connexion_app.add_api('openapi.yaml', arguments={'title': 'Compra Local API'})
log.info('Setting up CORS...')
CORS(flask_app)
log.info(f'Connexion application built: [{connexion_app}]')


@flask_app.teardown_appcontext
def shutdown_session(exception=None):
    log.debug(f'Session removed: {exception}')
    sqlalchemy.db_session.remove()


@flask_app.route('/')
def index():
    return redirect('/docs', code=302)


@flask_app.route('/docs')
def docs():
    with open(DOCS_HTML_FILE_PATH, 'r') as html_file:
        html_content = str(html_file.read())
    response = Response(html_content)
    response.headers['Content-Type'] = 'text/html'
    return response, 200


if __name__ == '__main__':
    connexion_app.run(host='0.0.0.0', port=PYTHON_MODULE_PORT)
