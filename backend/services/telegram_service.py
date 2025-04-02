
"""
TelegramService - Sends notifications to a Telegram bot
"""

import requests
import logging

logger = logging.getLogger(__name__)

TELEGRAM_BOT_TOKEN = "7806541153:AAEQ3Yl9IH3kn2elnW7wqLodPZaJ3iQelm0"
TELEGRAM_CHAT_ID = "6777655739"
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"

"""
Send a message to Telegram
@param message The message to send
"""
def send_telegram_message(message: str) -> None:
    try:
        response = requests.post(
            TELEGRAM_API_URL,
            json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": message,
                "parse_mode": "HTML",
            },
        )

        if not response.ok:
            error_data = response.json()
            logger.error(f"Error sending Telegram notification: {error_data}")
            return

        logger.info("Telegram notification sent successfully")
    except Exception as error:
        logger.error(f"Failed to send Telegram notification: {error}")

"""
Format cart items into a readable message
"""
def format_cart_items(items: list) -> str:
    if not items or len(items) == 0:
        return "No items"
    
    return "\n".join(
        [f"- {item.get('name', 'Unknown Item')} (x{item.get('quantity', 1)}) - ${(item.get('price', 0) * item.get('quantity', 1))}"
        for item in items]
    )
