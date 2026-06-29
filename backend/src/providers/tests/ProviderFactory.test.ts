import { ProviderFactory } from "../ProviderFactory";
import { ProviderType } from "../ProviderType";
import { MockProvider } from "../MockProvider";
import { GeminiProvider } from "../GeminiProvider";

describe("ProviderFactory", () => {
  const originalProvider = process.env.LLM_PROVIDER;

  afterEach(() => {
    process.env.LLM_PROVIDER = originalProvider;
  });

  it("should return MockProvider when provider is MOCK", () => {
    process.env.LLM_PROVIDER = ProviderType.MOCK;

    const provider = ProviderFactory.getProvider();

    expect(provider).toBeInstanceOf(MockProvider);
  });

  it("should return GeminiProvider when provider is GEMINI", () => {
    process.env.LLM_PROVIDER = ProviderType.GEMINI;

    const provider = ProviderFactory.getProvider();

    expect(provider).toBeInstanceOf(GeminiProvider);
  });

  it("should throw an error for an unsupported provider", () => {
    process.env.LLM_PROVIDER = "INVALID_PROVIDER";

    expect(() => ProviderFactory.getProvider()).toThrow(
      "Unsupported provider: INVALID_PROVIDER"
    );
  });

  it("should throw an error when provider is undefined", () => {
    delete process.env.LLM_PROVIDER;

    expect(() => ProviderFactory.getProvider()).toThrow(
      "Unsupported provider: undefined"
    );
  });
});