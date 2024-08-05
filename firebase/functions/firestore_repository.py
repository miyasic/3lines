from firebase_admin import firestore
import uuid
from urllib.parse import urlparse



def save_summary_data(db,uid, articleUrl, imageUrl, title, summary, language, isAnonymous):
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
        "numRead": 0,
        "isPrivate": False,
        "isAnonymous": isAnonymous,
    }

    summaryId = str(uuid.uuid4())
    # Firestoreのコレクションにデータを追加
    doc_ref = db.collection("summary").document(summaryId)
    doc_ref.set(data)

    return summaryId