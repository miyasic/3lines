import os
from storage_repository import upload_image_to_storage
from generate_summarized_image import generate_image
from summarize import summarize_text
import json

def main():
    print("Hello, World!")
    # text = local_summarize_text()
    # print(text)
    file_path = local_gen_summarized_image()
    # 例として、generate_imageから生成された画像をアップロードする
    image_url = upload_image_to_storage(file_path)

    print(f"Uploaded image URL: {image_url}")

def local_summarize_text():
    url = "https://zenn.dev/miyasic/articles/lgtm-shellscript"
    api_key = os.environ["API_KEY"]
    content = summarize_text(url,api_key)
    return content

def local_gen_summarized_image():
    input = '''
{
  "title": "RaycastでLGTM画像を爆速ゲット！",
  "summary1": "LGTM画像を自動で取得し、クリップボードにコピー",
  "summary2": "LGTMeow APIを利用したシェルスクリプトを作成",
  "summary3": "Raycastから簡単に呼び出して、画像をペースト"
}
'''
    data = json.loads(input)
    title = data["title"]
    summary1 = data["summary1"]
    summary2 = data["summary2"]
    summary3 = data["summary3"]
    return generate_image(title, summary1, summary2, summary3)


if __name__ == '__main__':
    main()