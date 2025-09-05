import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const user = req.body;

    // Processando dados do registro

    // A senha já vem criptografada do frontend com SHA256
    // Armazenamos diretamente a senha SHA256 no banco
    // Isso garante que o mesmo processo seja usado no login
    
    const userDB = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password, // Armazena a senha SHA256 diretamente
      },
    });
    res.status(201).json(userDB);
  } catch {
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;

    // Busca o usuario no banco de dados
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    // Verifica se o usuario existe dentro do banco
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // Verifica se a senha no banco está no formato bcrypt (começa com $2b$)
    let isMatch = false;
    if (user.password.startsWith('$2b$')) {
      // Formato antigo: bcrypt
      // Não podemos comparar diretamente SHA256 com bcrypt
      // Vamos considerar que o login falhou e sugerir ao usuário recriar a conta
      isMatch = false;
    } else {
      // Formato novo: SHA256 direto
      isMatch = userInfo.password === user.password;
    }

    if (!isMatch) {
      // Mensagem específica para contas antigas
      if (user.password.startsWith('$2b$')) {
        return res.status(400).json({ 
          message: "Sua conta foi criada antes da atualização do sistema. Por favor, crie uma nova conta com o mesmo email.",
          needsReregister: true
        });
      }
      return res.status(400).json({ message: "Senha inválida" });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ message: "Erro no login, tente novamente" });
  }
});

export default router;
