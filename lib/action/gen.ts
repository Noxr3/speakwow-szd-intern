'use server'


import { PromptTemplate } from "@langchain/core/prompts";
import { generateObject, streamObject } from 'ai';
import { z } from 'zod';
import { openai,createOpenAI} from '@ai-sdk/openai';
import { ChatOpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser, CustomListOutputParser } from "langchain/output_parsers";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStreamableValue } from "ai/rsc";
import { getPrompt } from "./mongoIO";
import { url } from "inspector";


export async function genListeningFeedback(
    text: string,
    questions: string[],
    stu_answers: string[],
) {
    const template_data = await getPrompt('6743369ad368e87f10775269')
    const template = template_data?.content as string

    const formattedQuestions = questions.map((q, index) => `Question ${index + 1}: ${q}`).join(', ');
    const formattedAnswers = stu_answers.map((answer, index) => `Student's answer to Question ${index + 1}: ${answer}`).join(', ');
    
    // 定义需要替换的字段映射
    const templateFields = {
        text,
        questions: formattedQuestions,
        stu_answers: formattedAnswers,
    }
    
    // 使用正则表达式替换所有 {xxx} 占位符
    const formattedPrompt = template.replace(
        /\{(\w+)\}/g,
        (match, key) => templateFields[key as keyof typeof templateFields] || match
    )
    const self_openai = createOpenAI({
        baseURL: 'https://cn831pib23.execute-api.us-east-1.amazonaws.com',
        apiKey: process.env.OPENAI_API_KEY,
      });
    const output_schema =  z.object({
        result: z.array(z.boolean())
    })
   
    const maxRetries = 5
    let attempts = 0;
    while (attempts < maxRetries) {
        try {
            const { object } = await generateObject({
                model: self_openai('gpt-4o'),
                schema: output_schema,
                prompt: formattedPrompt,
              });
            return object.result
        }
        catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed:`, error);

            if (attempts >= maxRetries) {
                throw new Error('Maximum retries reached');
            }
        }
    }
}