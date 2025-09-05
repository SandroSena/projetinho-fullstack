// Configuração para criptografia no frontend
const CRYPTO_CONFIG = {
  // Chave secreta para adicionar como salt na criptografia SHA256
  // Usando diretamente o valor fixo para garantir consistência durante o desenvolvimento
  SECRET_KEY: "kR7p9Lm2Qz8Xw5Vy3Tb6Nc1Jd4Fg0Ah",
};

// Configuração pronta para uso

// Nota: Em produção, certifique-se de que o arquivo .env está configurado corretamente
// e não está incluído no controle de versão (já adicionado ao .gitignore)

export default CRYPTO_CONFIG;