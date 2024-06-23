from firebase_admin import firestore
import uuid
from urllib.parse import urlparse



def save_article_data(db,uid, articleUrl, imageUrl, title, summary, language):
    # ドメインをarticleUrlから抽出
    parsed_url = urlparse(articleUrl)
    domain = parsed_url.netloc


    # データの生成
    data = {
        "userId": uid,
        "articleUrl": articleUrl,
        "imageUrl": imageUrl,
        "domain": domain,
        "createdAt": firestore.SERVER_TIMESTAMP,
        "title": title,
        "summary": summary,
        "language": language,
        "numRead": 0
    }

    # Firestoreのコレクションにデータを追加
    doc_ref = db.collection("article").document(str(uuid.uuid4()))
    doc_ref.set(data)