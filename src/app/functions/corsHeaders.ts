// Função auxiliar para definir os cabeçalhos CORS
export function corsHeaders() {
    return {
      'Access-Control-Allow-Origin': '*',  // Permite todas as origens
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    };
  }