export const USE_CASES = [
  {
    id: "summarize",
    title: "Get to the key points.",
    description: "Turn a long article, report, or document into a short summary.",
    method: "generate()",
    filename: "SUMMARIZE.JS",
    caption: "Keep the input within the model’s context window. Split longer documents into sections.",
    note: "Here, documentInput is a text area containing the article or document.",
    code: `// Placeholder: replace with the ID of your chosen LLM.
const model = '<llm-model-id>';

button.addEventListener('click', async () => {
  if (!('models' in navigator)) return showFallback();

  try {
    const { status } = await navigator.models.requestAccess(model);
    if (status !== 'granted') return showFallback();

    const result = await navigator.models.generate(model, {
      messages: [
        { role: 'system', content: 'Summarize the key points in three bullets.' },
        { role: 'user', content: documentInput.value },
      ],
    });

    if (result.finishReason !== 'stop') return showFallback();
    output.textContent = result.data ?? '';
  } catch {
    showFallback();
  }
});`,
  },
  {
    id: "receipt",
    title: "Read the receipt.",
    description: "Extract the merchant, date, and total with a model that supports images and structured output.",
    method: "output.schema",
    filename: "RECEIPT.JS",
    caption: "A completed response matches the schema. Your app should still let people review the extracted values.",
    note: "Here, imageInput is a file input for a supported receipt image (up to 10 MiB).",
    code: `// Placeholder: a vision-capable model with structured output.
const model = '<vision-model-id>';

button.addEventListener('click', async () => {
  if (!('models' in navigator)) return showFallback();
  const image = imageInput.files?.[0];
  if (!image) return showFallback();

  try {
    const { status } = await navigator.models.requestAccess(model);
    if (status !== 'granted') return showFallback();

    const result = await navigator.models.generate(model, {
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: 'Extract the merchant, date, and total.' },
          { type: 'image', image },
        ],
      }],
      output: {
        schema: {
          type: 'object',
          properties: {
            merchant: { type: 'string' },
            date: { type: 'string' },
            total: { type: 'number' },
          },
          required: ['merchant', 'date', 'total'],
        },
      },
    });

    if (result.finishReason !== 'stop') return showFallback();
    output.textContent = JSON.stringify(result.data, null, 2);
  } catch {
    showFallback();
  }
});`,
  },
  {
    id: "search",
    title: "Search by meaning.",
    description: "Use the same embedding model to index and search notes, so the vectors stay compatible.",
    method: "embed()",
    filename: "SEARCH.JS",
    caption: "For a saved index, store the returned model ID with the vectors. Compare only vectors from the same model.",
    note: "Here, notes is a small, nonempty array of text strings and queryInput is the search field. Split larger collections into batches that fit the API’s limits.",
    code: `// Placeholder: replace with the ID of your chosen embedding model.
const model = '<embedding-model-id>';

button.addEventListener('click', async () => {
  if (!('models' in navigator)) return showFallback();

  try {
    const { status } = await navigator.models.requestAccess(model);
    if (status !== 'granted') return showFallback();

    const index = await navigator.models.embed(model, notes);
    const query = await navigator.models.embed(index.model, queryInput.value);
    if (query.model !== index.model) return showFallback();

    const matches = notes.map((text, i) => ({
      text,
      score: cosineSimilarity(query.vectors[0], index.vectors[i]),
    })).sort((a, b) => b.score - a.score);

    output.textContent = JSON.stringify(matches.slice(0, 5), null, 2);
  } catch {
    showFallback();
  }
});`,
  },
] as const;
