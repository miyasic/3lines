from firebase_functions import https_fn
from firebase_admin import initialize_app
from summarize import summarize_text
from firebase_functions.params import SecretParam

initialize_app()

API_KEY = SecretParam('API_KEY')

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
