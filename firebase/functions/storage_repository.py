
from firebase_admin import storage
import uuid
import os


def upload_image_to_storage(file_path):
    # Storageバケットを取得
    bucket = storage.bucket()

    ## Todo: /images/userId/uuid.pngにしてもいいかも
    blob = bucket.blob(f'images/{uuid.uuid4()}.png')

    # ファイルをアップロード
    blob.upload_from_filename(file_path)
    # アクセスURLを取得
    if not os.getenv('FUNCTIONS_EMULATOR'):
        blob.make_public()
    return blob.public_url
