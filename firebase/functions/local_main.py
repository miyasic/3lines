import os
from generate_summarized_image import generate_image
from summarize import summarize_text
import json

def main():
    print("Hello, World!")
    local_gen_summarized_image()

def local_summarize_text():
    url = "https://zenn.dev/miyasic/articles/lgtm-shellscript"
    api_key = os.environ["API_KEY"]
    content = summarize_text(url,api_key)
    return content

def local_gen_summarized_image():
    input = '''
{
  "title": "Raycastで猫ちゃんLGTM画像を爆速でペースト！",
  "summary1": "LGTMeowのAPIを使って、Raycastから猫ちゃんLGTM画像を簡単に取得＆ペースト！",
  "summary2": "シェルスクリプトで画像URLをコピーし、Raycastに登録すれば、タブ切り替え不要で爆速ペースト！",
  "summary3": "LGTMeow開発者も快諾！ぜひ試して、プルリクを猫ちゃんで彩りましょう！"
}
'''
    data = json.loads(input)
    title = data["title"]
    summary1 = data["summary1"]
    summary2 = data["summary2"]
    summary3 = data["summary3"]
    generate_image(title, summary1, summary2, summary3)
    return None


if __name__ == '__main__':
    main()