DEUTSCH HÖREN 18.0 — ПАКЕТ ДЛЯ NETLIFY + GOOGLE CLOUD TTS

У пакеті збережено наявні розділи, словники, тему LKW, дизайн і localStorage.
Озвучення тепер запитує окремо uk-UA для української та de-DE для німецької.
Браузерні голоси Windows не використовуються, тож російська вимова не підставлятиметься.

ВАЖЛИВО: GitHub Pages не запускає серверні функції. Цей пакет треба розгорнути на Netlify.
Не публікуй JSON-ключ Google у HTML або GitHub.

НАЛАШТУВАННЯ:
1. У Google Cloud створи проєкт і ввімкни Cloud Text-to-Speech API.
2. Підключи Billing (після безкоштовної квоти можуть бути платні запити).
3. Створи Service Account та згенеруй JSON-ключ.
4. У Netlify відкрий Site configuration → Environment variables.
5. Додай змінну GOOGLE_SERVICE_ACCOUNT_JSON, значенням встав повний вміст JSON-ключа.
6. Розгорни цей ZIP на Netlify. Після додавання змінної зроби нове Deploy.
7. Перевір аудіо на сайті.

Використані голоси:
- uk-UA-Chirp3-HD-Achird (українська, чоловічий)
- de-DE-Chirp3-HD-Achird (німецька, чоловічий)

Якщо переходиш на новий домен, експортуй резервну копію зі старого сайту та імпортуй її на новому:
дані браузера прив'язані до домену.

Документація Google: https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types
