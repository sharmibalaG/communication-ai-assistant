import { LLMProvider } from "./LLMProvider";
import { ProviderType } from "./ProviderType";

import { MockProvider } from "./MockProvider";
import { GeminiProvider } from "./GeminiProvider";
// import { GroqProvider } from "./GroqProvider";
// import { CohereProvider } from "./CohereProvider";
// import { OpenRouterProvider } from "./OpenRouterProvider";

export class ProviderFactory {

    static getProvider(): LLMProvider {

        const provider =
            process.env.LLM_PROVIDER as ProviderType;

            console.log("LLM_PROVIDER:", process.env.LLM_PROVIDER);

        switch (provider) {

            case ProviderType.MOCK:
                return new MockProvider();

            case ProviderType.GEMINI:
                return new GeminiProvider();

            // case ProviderType.GROQ:
            //     return new GroqProvider();

            // case ProviderType.COHERE:
            //     return new CohereProvider();

            // case ProviderType.OPEN_ROUTER:
            //     return new OpenRouterProvider();

            default:
                throw new Error(
                    `Unsupported provider: ${provider}`
                );
        }

    }

}