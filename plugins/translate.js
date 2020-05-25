require('dotenv').config()

const headers = {
  'Ocp-Apim-Subscription-Key': process.env.BING_TRANSLATOR_KEY,
  'Ocp-Apim-Subscription-Region': process.env.BING_TRANSLATOR_REGION,
  'Content-Type': 'application/json',
}

const translate = async (text, { to }) => {
  const response = await fetch(
    `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${to}`,
    {
      method: 'POST',
      body: `[{'Text':'${text}'}]`,
      headers,
    }
  )

  const json = await response.json()
  return json[0].translations[0].text
}

export default function(context, inject) {
  inject('translate', translate)
}
