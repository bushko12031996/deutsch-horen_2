const textToSpeech = require("@google-cloud/text-to-speech");

let client;

function getClient() {
  if (client) return client;

  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Google Cloud credentials are missing.");

  const credentials = JSON.parse(raw);

  client = new textToSpeech.TextToSpeechClient({
    projectId: credentials.project_id,
    credentials
  });

  return client;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Only POST is allowed." })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const text = String(body.text || "").trim();
    const lang = body.lang;

    if (!text || text.length > 500) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid text." })
      };
    }

    if (!["uk-UA", "de-DE"].includes(lang)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Unsupported language." })
      };
    }

    const voiceName = lang === "uk-UA"
      ? "uk-UA-Chirp3-HD-Achird"
      : "de-DE-Chirp3-HD-Achird";

    const [result] = await getClient().synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: lang,
        name: voiceName
      },
      audioConfig: {
        audioEncoding: "MP3"
      }
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        audioContent: result.audioContent.toString("base64")
      })
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Помилка сервісу озвучення."
      })
    };
  }
};
