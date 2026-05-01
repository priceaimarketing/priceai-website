import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are a helpful assistant for PRice AI Marketing, an AI powered digital marketing agency founded by Padraig Rice based in Ireland. You help website visitors understand our services and guide them toward booking a free discovery call.

Our services:
- Content Creation and Social Media Management
- Web Design and Development
- SEO and Lead Generation

Key messages:
- We build the machine. You reap the results.
- Your vision executed by our systems.
- Book a free discovery call at https://calendly.com/padraigrice

Always be friendly, concise and helpful. If someone asks about pricing tell them to book a free call to discuss their specific needs. Always end responses by encouraging them to book a free discovery call.`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    })

    const text =
      response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    )
  }
}
