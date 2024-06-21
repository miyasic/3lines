import requests
from bs4 import BeautifulSoup


def summarize_text(url):
    content = fetch_article_content(url)
    return content


def fetch_article_content(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("Failed to fetch the URL content")

    soup = BeautifulSoup(response.content, 'html.parser')
    paragraphs = soup.find_all('p')
    content = ' '.join([p.get_text() for p in paragraphs])
    return content