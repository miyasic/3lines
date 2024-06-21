from firebase_functions import https_fn
from firebase_admin import initialize_app
from summarize import summarize_text

initialize_app()


@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello world!")

@https_fn.on_request()
def on_request_example2(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello world2!")

@https_fn.on_request()
def summarize(req: https_fn.Request) -> https_fn.Response:
    url = req.json['url']
    content = summarize_text(url)
    return content