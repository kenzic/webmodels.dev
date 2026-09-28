export const EXAMPLE = `// Request the model your app was built and tested against.
const model = '<model-id>';

button.addEventListener('click', async () => {
  if (!('models' in navigator)) return showFallback();

  try {
    const { status } = await navigator.models.requestAccess(model);
    if (status !== 'granted') return showFallback();

    const result = await navigator.models.generate(model, {
      messages: [{ role: 'user', content: 'Explain the web in one sentence.' }],
    });

    output.textContent = result.data ?? '';
  } catch {
    showFallback();
  }
});`;
