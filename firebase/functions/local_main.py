import os
from summarize import summarize_text

def main():
    print("Hello, World!")
    print(local_summarize_text())

def local_summarize_text():
    url = "https://zenn.dev/miyasic/articles/lgtm-shellscript"
    api_key = os.environ["API_KEY"]
    content = summarize_text(url,api_key)
    return content


if __name__ == '__main__':
    main()