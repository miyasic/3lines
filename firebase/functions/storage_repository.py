import firebase_admin
from firebase_admin import credentials, storage
import uuid

# Firebase Admin SDKの初期化
cred = credentials.Certificate("../serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'lines-31c04.appspot.com'
})

def upload_image_to_storage(file_path):
    # Storageバケットを取得
    bucket = storage.bucket()
    ## Todo: /images/userId/uuid.pngにしてもいいかも
    blob = bucket.blob(f'images/{uuid.uuid4()}.png')

    # ファイルをアップロード
    blob.upload_from_filename(file_path)

    # アクセスURLを取得
    blob.make_public()
    return blob.public_url
