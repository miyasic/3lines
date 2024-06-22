from PIL import Image, ImageDraw, ImageFont
import uuid

FONT_PATH = "assets/Noto_Sans_JP/static/NotoSansJP-ExtraBold.ttf"
BACKGROUND_IMAGE_PATH = "assets/image/default_background.png"
TITLE_FONT_SIZE = 32
NORMAL_FONT_SIZE = 24

IMAGE_WIDTH, IMAGE_HEIGHT = 1200, 628

def generate_image(title, summary1, summary2, summary3):
    # 背景画像を生成または読み込み
    image = Image.open(BACKGROUND_IMAGE_PATH).resize((IMAGE_WIDTH, IMAGE_HEIGHT))
    # image = Image.new('RGB', (IMAGE_WIDTH, IMAGE_HEIGHT), color=(73, 109, 137))
    draw = ImageDraw.Draw(image)
    font_title = ImageFont.truetype(FONT_PATH, TITLE_FONT_SIZE)
    font_normal = ImageFont.truetype(FONT_PATH, NORMAL_FONT_SIZE)

    # 文字を画像に描画
    draw.text((50, 50), title, font=font_title, fill=(0,0,0))
    draw.text((50, 150), f"・　{summary1}", font=font_normal, fill=(0,0,0))
    draw.text((50, 250), f"・　{summary2}", font=font_normal, fill=(0,0,0))
    draw.text((50, 350), f"・　{summary3}", font=font_normal, fill=(0,0,0))

    # 一時ファイルに保存
    file_path = f'/tmp/{uuid.uuid4()}.png'
    image.save(file_path)
    return file_path
