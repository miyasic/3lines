import os
from firestore_repository import save_article_data
from storage_repository import upload_image_to_storage
from generate_summarized_image import generate_image
from summarize import summarize_text
import json
import firebase_admin
from firebase_admin import credentials, firestore

# Firebase Admin SDKの初期化
cred = credentials.Certificate("../serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'lines-31c04.appspot.com'
})

# Firestoreクライアントを初期化
db = firestore.client()

ARTICLE_URL = "https://zenn.dev/miyasic/articles/lgtm-shellscript"
SAMPLE_SUMMARY = '''
{
"title": "RaycastでLGTM画像を爆速ゲット！",
"summary1": "LGTM画像を自動で取得し、クリップボードにコピー",
"summary2": "LGTMeow APIを利用したシェルスクリプトを作成",
"summary3": "Raycastから簡単に呼び出して、画像をペースト"
}
'''

def main():
    print("Hello, World!")
    text = local_summarize_text()
    print(text)
    file_path = local_gen_summarized_image(text)
    # 例として、generate_imageから生成された画像をアップロードする
    image_url = upload_image_to_storage(file_path)
    local_upload_to_firestore(image_url, ARTICLE_URL, text, "japanese")
    print(f"Uploaded image URL: {image_url}")

def local_summarize_text():
    api_key = os.environ["API_KEY"]
    content = summarize_text(ARTICLE_URL,api_key)
    return content

def local_gen_summarized_image(input=None):
    if input is None:
        input = SAMPLE_SUMMARY
    data = json.loads(input)
    title = data["title"]
    summary1 = data["summary1"]
    summary2 = data["summary2"]
    summary3 = data["summary3"]
    return generate_image(title, summary1, summary2, summary3)

def local_upload_to_firestore(imageUrl, articleUrl, input, language):
    data = json.loads(input)
    title = data["title"]
    summary = [data["summary1"], data["summary2"], data["summary3"]]
    uid = "exampleUserId"
    save_article_data(db, uid, articleUrl, imageUrl, title, summary, language)
    return None

if __name__ == '__main__':
    main()