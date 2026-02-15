// Importando o módulo assert no modo strict
const assert = require('node:assert/strict');

// ✅ Exemplo 1 - NÃO corresponde à expressão regular (passa no teste)
try {
  assert.doesNotMatch('Olá mundo', /erro/);
  console.log('Teste 1 passou ✅');
} catch (err) {
  console.error('Teste 1 falhou ❌', err.message);
}

// ❌ Exemplo 2 - Corresponde à expressão regular (gera erro)
try {
  assert.doesNotMatch('Isto vai falhar', /falhar/);
  console.log('Teste 2 passou ✅');
} catch (err) {
  console.error('Teste 2 falhou ❌');
  console.error(err.name);     // AssertionError
  console.error(err.message);  // Mensagem padrão do erro
}

// ❌ Exemplo 3 - Tipo inválido (não é string)
try {
  assert.doesNotMatch(12345, /123/);
} catch (err) {
  console.error('Teste 3 falhou ❌');
  console.error(err.message);  // "The 'string' argument must be of type string."
}

// ❌ Exemplo 4 - Usando mensagem personalizada
try {
  assert.doesNotMatch('admin@email.com', /@email\.com/, 'Email não pode ser do domínio @email.com');
} catch (err) {
  console.error('Teste 4 falhou ❌');
  console.error(err.message);  // Mostra a mensagem personalizada
}

// ❌ Exemplo 5 - Passando um objeto Error personalizado
try {
  assert.doesNotMatch(
    'senha123',
    /\d+/,
    new Error('A senha não pode conter números!')
  );
} catch (err) {
  console.error('Teste 5 falhou ❌');
  console.error(err.message);  // "A senha não pode conter números!"
}
