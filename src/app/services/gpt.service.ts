import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-cVuY9wmxUKPo5B2R4gGT7acy",
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);


@Injectable({
  providedIn: 'root'
})
export class GptService {

  constructor(private http: HttpClient) { }


  // ...

  // Función para realizar la llamada a la API de OpenAI
  async generarRespuesta(prompt: string) {
    const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const apiKey = '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'; // Reemplaza con tu propia API Key de OpenAI

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 7,
        temperature: 0,
      })
      const generatedText = response['data']['choices'][0]['text'].trim();
      console.log("GPT:", prompt, generatedText); // Aquí puedes mostrar o utilizar la respuesta generada
    } catch (error) {
      console.error('Error al llamar a la API de OpenAI:', error);
    }


  }

}
