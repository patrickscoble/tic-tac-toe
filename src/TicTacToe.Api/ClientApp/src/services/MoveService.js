export async function getAIMove(move) {
  const response = await fetch('/api/move/getAIMove', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(move)
  })
  return await response.json();
}
