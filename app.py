import base64
from io import BytesIO

from flask import Flask, request, send_file
from rembg import remove

app = Flask(__name__)


@app.route('/hello')
def main():
    return 'Hello World'


@app.route('/upload', methods=['POST'])
def uploadFile():
    file = request.files['image'].read()
    output = BytesIO(remove(file))
    return base64.b64encode(output.getbuffer().tobytes())
