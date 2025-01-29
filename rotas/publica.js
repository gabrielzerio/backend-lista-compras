import { PrismaClient } from "@prisma/client"; 
import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET

router.post("/cadastro", async (req, res) => {
    try {
      const dadosUsuario = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(dadosUsuario.senha, salt);
      const userDB = await prisma.usuario.create({
        data: {
            email: dadosUsuario.email,
            nome: dadosUsuario.nome,
            senha: hashPassword,
        },
      });
      res.status(201).json(userDB);
    } catch (err) {
        console.log(err);
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  });

router.post("/login", async (req,res) => {
    try{
        const userInfo = req.body;
        const user = await prisma.usuario.findUnique({
            where:{email:userInfo.email},
        });
        if(!user){
            return res.status(400).json({message:"usuario não encontrado"});
        }
        const isMatch = await bcrypt.compare(userInfo.senha, user.senha); //faz a assimilação das senhas, se forem iguais passa true
        if(!isMatch){
            return res.status(400).json({message:"senha invalida"});
        }
        
        const token = jwt.sign({
            id:user.id, 
            email:user.email,
            nome:user.nome
        }, JWT_SECRET, {expiresIn:'7d'});
        res.status(200).json(token);
    }catch(error){
        res.status(500).json({message:"erro no servidor! tente mais uma vez"});
        console.log(error);
    }
});

export default router;