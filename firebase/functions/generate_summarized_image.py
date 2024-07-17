from PIL import Image, ImageDraw, ImageFont
import uuid

FONT_PATH = "assets/Noto_Sans_JP/static/NotoSansJP-ExtraBold.ttf"
ROCKNROLL_FONT_PATH = "assets/RocknRoll_One/RocknRollOne-Regular.ttf"
BACKGROUND_IMAGE_PATH = "assets/image/default_background.png"
TITLE_FONT_SIZE = 40
NORMAL_FONT_SIZE = 35
logo_FONT_SIZE = 42
PADDING = 32
HEIGHT_PADDING = 32
FRAME_WIDTH = 32

IMAGE_WIDTH, IMAGE_HEIGHT = 1200, 628

LOGO_TEXT = "今北産業"

def validation_check(title, summary1, summary2, summary3):
    MAX_CHARS_TITLE = 25
    MAX_CHARS_SUMMARY = 30
    if len(title) > MAX_CHARS_TITLE:
        raise ValueError(f"Title must be less than {MAX_CHARS_TITLE} characters.")
    if len(summary1) > MAX_CHARS_SUMMARY:
        raise ValueError(f"Summary1 must be less than {MAX_CHARS_SUMMARY} characters.")
    if len(summary2) > MAX_CHARS_SUMMARY:
        raise ValueError(f"Summary2 must be less than {MAX_CHARS_SUMMARY} characters.")
    if len(summary3) > MAX_CHARS_SUMMARY:
        raise ValueError(f"Summary3 must be less than {MAX_CHARS_SUMMARY} characters.")
    return True


def generate_image(title, summary1, summary2, summary3):
    # 背景画像を生成または読み込み
    image = Image.open(BACKGROUND_IMAGE_PATH).resize((IMAGE_WIDTH, IMAGE_HEIGHT))
    draw = ImageDraw.Draw(image)
    font_title = ImageFont.truetype(FONT_PATH, TITLE_FONT_SIZE)
    font_normal = ImageFont.truetype(FONT_PATH, NORMAL_FONT_SIZE)
    font_logo = ImageFont.truetype(ROCKNROLL_FONT_PATH, logo_FONT_SIZE)

    # タイトルを中心揃えで描画
    title_x, title_height, title_start_y = calc_title_position(draw, title, font_title)
    summary_x, summary1_start_y, summary2_start_y, summary3_start_y = calc_summary_position(draw, summary1, font_normal,title_height)
    logo_x, logo_y = logo_position(draw, LOGO_TEXT, font_logo)

    draw.text((title_x, title_start_y), title, font=font_title, fill=(0, 0, 0))
    draw.text((summary_x, summary1_start_y), f"{summary1}", font=font_normal, fill=(0,0,0))
    draw.text((summary_x, summary2_start_y), f"{summary2}", font=font_normal, fill=(0,0,0))
    draw.text((summary_x, summary3_start_y), f"{summary3}", font=font_normal, fill=(0,0,0))
    draw.text((logo_x, logo_y), LOGO_TEXT, font=font_logo, fill=(0, 0, 0))

    # 一時ファイルに保存
    file_path = f'/tmp/{uuid.uuid4()}.png'
    image.save(file_path)
    return file_path

def calc_title_position(draw, title, font_title):
    title_width, title_height = draw.textbbox((0, 0), title, font=font_title)[2:4]
    title_x = (IMAGE_WIDTH - title_width) / 2
    title_start_y = FRAME_WIDTH + HEIGHT_PADDING
    return title_x, title_height, title_start_y

def calc_summary_position(draw, summary, font_normal,title_height):
    _, summary_height = draw.textbbox((0, 0), summary, font=font_normal)[2:4]
    available_height = IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - title_height - HEIGHT_PADDING * 2
    line_padding = (available_height - 3 * summary_height) / 5 ## 3行の間の余白、上下にも余白があるので5で割る
    summary_start_y = FRAME_WIDTH + HEIGHT_PADDING + title_height + HEIGHT_PADDING + line_padding / 2
    summary1_start_y = summary_start_y
    summary2_start_y = summary_start_y + summary_height + line_padding
    summary3_start_y = summary_start_y + 2 * (summary_height + line_padding)
    summary_x = FRAME_WIDTH + PADDING
    return summary_x, summary1_start_y, summary2_start_y, summary3_start_y

def logo_position(draw, logo_text, font_logo):
    logo_width, logo_height = draw.textbbox((0, 0), logo_text, font=font_logo)[2:4]
    logo_x = IMAGE_WIDTH - FRAME_WIDTH - PADDING - logo_width
    logo_y = IMAGE_HEIGHT - FRAME_WIDTH - HEIGHT_PADDING - logo_height
    return logo_x, logo_y