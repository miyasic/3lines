from PIL import Image, ImageDraw, ImageFont
import uuid

FONT_PATH = "assets/Noto_Sans_JP/static/NotoSansJP-ExtraBold.ttf"
ROCKNROLL_FONT_PATH = "assets/RocknRoll_One/RocknRollOne-Regular.ttf"
BACKGROUND_IMAGE_PATH = "assets/image/default_background.png"
TITLE_FONT_SIZE = 40
NORMAL_FONT_SIZE = 35
IMAKITA_FONT_SIZE = 42
PADDING = 32
HEIGHT_PADDING = 32
FRAME_WIDTH = 32

IMAGE_WIDTH, IMAGE_HEIGHT = 1200, 628

def generate_image(title, summary1, summary2, summary3):
    # 背景画像を生成または読み込み
    image = Image.open(BACKGROUND_IMAGE_PATH).resize((IMAGE_WIDTH, IMAGE_HEIGHT))
    draw = ImageDraw.Draw(image)
    font_title = ImageFont.truetype(ROCKNROLL_FONT_PATH, TITLE_FONT_SIZE)
    font_normal = ImageFont.truetype(ROCKNROLL_FONT_PATH, NORMAL_FONT_SIZE)
    font_imakita = ImageFont.truetype(ROCKNROLL_FONT_PATH, IMAKITA_FONT_SIZE)

    # タイトルを中心揃えで描画
    title_width, title_height = draw.textbbox((0, 0), title, font=font_title)[2:4]
    title_x = (IMAGE_WIDTH - title_width) / 2
    draw.text((title_x, FRAME_WIDTH + HEIGHT_PADDING), title, font=font_title, fill=(0, 0, 0))

    # サマリーの位置を計算
    _, summary_height = draw.textbbox((0, 0), summary1, font=font_normal)[2:4]
    available_height = IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - title_height - HEIGHT_PADDING * 2
    line_padding = (available_height - 3 * summary_height) / 5 ## 3行の間の余白、上下にも余白があるので5で割る
    summary_start_y = FRAME_WIDTH + HEIGHT_PADDING + title_height + HEIGHT_PADDING + line_padding / 2

    # 文字を画像に描画
    draw.text((FRAME_WIDTH + PADDING, summary_start_y), f"{summary1}", font=font_normal, fill=(0,0,0))
    draw.text((FRAME_WIDTH + PADDING, summary_start_y + summary_height + line_padding), f"{summary2}", font=font_normal, fill=(0,0,0))
    draw.text((FRAME_WIDTH + PADDING, summary_start_y + 2 * (summary_height + line_padding)), f"{summary3}", font=font_normal, fill=(0,0,0))

    # 「今北産業」を右下に描画
    imakita_text = "今北産業"
    imakita_width, imakita_height = draw.textbbox((0, 0), imakita_text, font=font_imakita)[2:4]
    imakita_x = IMAGE_WIDTH - FRAME_WIDTH - PADDING - imakita_width
    imakita_y = IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - imakita_height
    draw.text((imakita_x, imakita_y), imakita_text, font=font_imakita, fill=(0, 0, 0))

    # 一時ファイルに保存
    file_path = f'/tmp/{uuid.uuid4()}.png'
    image.save(file_path)
    return file_path
