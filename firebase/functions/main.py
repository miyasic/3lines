from firebase_functions import https_fn
from firebase_admin import initialize_app,firestore, storage
from storage_repository import upload_image_to_storage
from firestore_repository import save_article_data
from summarize import summarize_text
from firebase_functions.params import SecretParam
from generate_summarized_image import generate_image
import os

initialize_app()

API_KEY = SecretParam('API_KEY')
firestore.client()._firestore_api._target = 'localhost:8080'
# Storageエミュレータの設定
os.environ['FIREBASE_STORAGE_EMULATOR_HOST'] = 'localhost:9199'


@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello world!")

@https_fn.on_request()
def on_request_example2(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello world2!")

@https_fn.on_call(secrets=[API_KEY])
def summarize(req: https_fn.Request) -> https_fn.Response:
    url = req.data['url']
    api_key = API_KEY.value
    content = summarize_text(url,api_key)
    return content

@https_fn.on_call()
def mock_summarize(req: https_fn.Request) -> https_fn.Response:
    url = req.data['url']
    content = dict(
        title="title",
        summary1="summary1",
        summary2="summary2",
        summary3="summary3"
    )
    return content

@https_fn.on_call()
def save_summary(req: https_fn.Request) -> https_fn.Response:
    file_path = generate_image(
        req.data['title'],
        req.data['summary'][0],
        req.data['summary'][1],
        req.data['summary'][2],
    )
    image_url = upload_image_to_storage(file_path)
    db = firestore.client()

    uid = req.auth.uid
    print(uid)

    save_article_data(
        db,
        uid,
        req.data['articleUrl'],
        image_url,
        req.data['title'],
        req.data['summary'],
        req.data['language'],)
    return {"result": "ok"}
