import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import re
import json

def summarize_text(url, api_key):
    content = fetch_article_content(url)
    response_text = request_gemini("次の内容を30文字×3の箇条書きで読者が興味を持つように要約してください。title,summary1~3をkeyとしたjsonで返してください。" + content, api_key)
    extracted_data = extract_json_from_markdown(response_text)
    print(extracted_data['title'])
    print(extracted_data['summary1'])
    print(extracted_data['summary2'])
    print(extracted_data['summary3'])

    json_data = json.dumps(extracted_data, ensure_ascii=False, indent=2)
    return json_data


def fetch_article_content(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("Failed to fetch the URL content")

    soup = BeautifulSoup(response.content, 'html.parser')
    paragraphs = soup.find_all('p')
    content = ' '.join([p.get_text() for p in paragraphs])
    return content

def request_gemini(text, api_key):
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(text)
    return response.text

def extract_json_from_markdown(markdown):
    # 正規表現パターンを定義します
    pattern = r'\"(title|summary1|summary2|summary3)\":\s*\"([^\"]*)\"'
    
    # 正規表現でマッチする部分を抽出し、辞書に格納します
    matches = re.findall(pattern, markdown)
    extracted_data = {key: value for key, value in matches}
    return extracted_data