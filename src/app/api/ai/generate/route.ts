import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: config.env.deepSeekApiKey,
});

export async function POST(req: Request) {
  try {
    const { emailContent, tone } = await req.json();

    if (!emailContent) {
      return NextResponse.json(
        { error: 'Email content is required' },
        { status: 400 }
      );
    }

    const systemPrompt = tone 
      ? `You are an AI assistant that helps write email replies in a ${tone} tone. Maintain this tone throughout your response. Keep the reply concise and professional.`
      : 'You are an AI assistant that helps write professional email replies. Keep the reply concise and to the point.';

    try {
      const completion = await openai.chat.completions.create({
        model: 'openai/gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Please write a reply to the following email, keeping it concise and natural:\n\n${emailContent}`
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: { type: 'text' },
        stream: false
      });

      const generatedText = completion.choices[0]?.message.content || '';

      return NextResponse.json({ reply: generatedText });
    } catch (apiError) {
      console.error('DeepSeek API error:', apiError);
      
      if (apiError instanceof Error) {
        if (apiError.message.includes('402')) {
          return NextResponse.json(
            { 
              error: 'Insufficient balance in your DeepSeek account',
              details: 'Please add credits to your DeepSeek account to continue using the service.'
            },
            { status: 402 }
          );
        }
        
        return NextResponse.json(
          { 
            error: 'Error generating reply',
            details: apiError.message
          },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Error generating reply',
          details: 'An unknown error occurred'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 