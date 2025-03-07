import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/lista-pessoal/:listaId", async (req, res) => {
  const { listaId } = req.params; // Obtém o ID da lista dos parâmetros da URL
  const { id_usuario } = req; // Presumindo que req.id_usuario está definido por um middleware
  try {
    const produtos = await prisma.item.findMany({
      where: {
        id_usuario, // Filtra pelo ID do usuário
        lista: listaId // Filtra pela lista específica
      },
      include: {
        usuario: true,
      },
    });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});


router.get("/lista-geral/:listaId", async (req, res) => {
  const { listaId } = req.params;

  try {
    const produtos = await prisma.item.findMany({
      where: {
        lista: listaId,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            // senha não será incluída
          },
        },
      },
    });
    
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});



router.post("/novoItem", async (req, res) => {
  try {
    const produtoNovo = await prisma.item.create({
      data: {
        id_usuario: req.id_usuario,
        produto: req.body.nome,
        qtd: req.body.qtd,
        data: new Date(),
        lista: req.body.lista,
        checked: false
      },
    });
    res.status(200).json(produtoNovo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.get("/listas", async(req,res) => {
  try{
    const listas = await prisma.lista.findMany();
    res.status(200).json(listas);
  }catch(error){
    res.status(500).json({message:error});
  }
})

router.patch('/item/status/:id', async (req, res) => {
  const { id } = req.params;  // Obtém o id do item da URL
  const { status } = req.body;  // Obtém o novo status enviado no body
  try {
    // Atualiza o status do item no banco de dados
    const atualiza = await prisma.item.update({
      where: { id: id },  // Filtra pelo ID
      data: { checked: status }   // Atualiza o status (campo 'checked')
    });
    return res.json(atualiza);  // Retorna o item atualizado
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message:error });
  }
});


export default router;
