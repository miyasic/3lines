import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import os
import re

genai.configure(api_key=os.environ["API_KEY"])

model = genai.GenerativeModel('gemini-1.5-flash')

def request_gemini(text):
    response = model.generate_content(text)
    return response.text

def fetch_article_content(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("Failed to fetch the URL content")

    soup = BeautifulSoup(response.content, 'html.parser')
    paragraphs = soup.find_all('p')
    content = ' '.join([p.get_text() for p in paragraphs])
    return content


def extract_json_from_markdown(markdown):
    # 正規表現パターンを定義します
    pattern = r'\"(title|summary1|summary2|summary3)\":\s*\"([^\"]*)\"'
    
    # 正規表現でマッチする部分を抽出し、辞書に格納します
    matches = re.findall(pattern, markdown)
    extracted_data = {key: value for key, value in matches}
    return extracted_data

def main():
    url = 'https://zenn.dev/miyasic/articles/lgtm-shellscript'
    content = fetch_article_content(url)
    response_text = request_gemini("次の内容を50文字×3の箇条書きで読者が興味を持つように要約してください。title,sammary1~3をkeyとしたjsonで返してください。" + content)
    summary_json = extract_json_from_markdown(response_text)
    print(summary_json['title'])
    print(summary_json['summary1'])
    print(summary_json['summary2'])
    print(summary_json['summary3'])

if __name__ == '__main__':
    main()