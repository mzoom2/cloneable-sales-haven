
/**
 * TelegramService - Sends notifications to a Telegram bot
 */

const TELEGRAM_BOT_TOKEN = "7806541153:AAEQ3Yl9IH3kn2elnW7wqLodPZaJ3iQelm0";
const TELEGRAM_CHAT_ID = "6777655739";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

/**
 * Send a message to Telegram
 * @param message The message to send
 */
export const sendTelegramMessage = async (message: string): Promise<void> => {
  try {
    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error sending Telegram notification:', errorData);
      return;
    }

    console.log('Telegram notification sent successfully');
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
};

/**
 * Format cart items into a readable message
 */
export const formatCartItems = (items: any[]): string => {
  if (!items || items.length === 0) return 'No items';
  
  return items.map((item) => {
    return `- ${item.name} (x${item.quantity}) - $${item.price * item.quantity}`;
  }).join('\n');
};
