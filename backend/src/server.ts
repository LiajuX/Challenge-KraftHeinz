import cors from 'cors'
import express, { Request, Response } from 'express'

const app = express()

app.use(cors())
app.use(express.json())

const language = require('@google-cloud/language');

const client = new language.LanguageServiceClient();

async function analizeTextSentiment(text: string) {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  }
  
  const [result] = await client.analyzeSentiment({document})
  
  const sentiment = result.documentSentiment

  return sentiment
}

app.post('/comment', async (request: Request, response: Response) => {
  const { comment } = request.body

  const sentimentAnalysis = await analizeTextSentiment(comment)

  return response.json(sentimentAnalysis)
})

app.listen(3333)
