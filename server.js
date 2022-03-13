const express = require('express')
const app = express()

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" }
    ]
}

app.use(express.urlencoded({ extended: true })) // Processa o body em formato UrlEncoded
app.use(express.json()) // Processa o body em formato json

app.use((req, res, next) => {
    let data_req = new Date();
    console.log(`${data_req.toLocaleString()} - ${req.path} - ${req.get('content-type')}`);
    next();
})

app.get('/api/produtos', (req, res, next) => {
   res.json(lista_produtos);
})

app.get('/api/produtos/:id', (req, res, next) => {
    id = lista_produtos.produtos.findIndex(elem => elem.id == parseInt(req.params.id));
    if (id != -1) {
        res.status(200).json(lista_produtos.produtos[id]);
    } else {
        res.status(404).json({ "message": "Produto não encontrado." });
    }
})

app.post('/api/produtos', (req, res, next) => {
   lista_produtos.produtos.push({
    id: (parseInt(lista_produtos.produtos[lista_produtos.produtos.length - 1].id) + 1),
    descricao: req.body.descricao,
    valor: parseFloat(req.body.valor),
    marca: req.body.marca
   });
   res.status(200).json({ "message": "Produto cadastrado." });
})

app.put('/api/produtos/:id', (req, res, next) => {
    id = lista_produtos.produtos.findIndex(elem => elem.id == parseInt(req.params.id) + 1);
    if (id != -1) {
        for (var i = 0; i < lista_produtos.produtos.length; i++) {
            if (id == lista_produtos.produtos[i].id) {
                lista_produtos.produtos[i].descricao = req.body.descricao;
                lista_produtos.produtos[i].valor = parseFloat(req.body.valor);
                lista_produtos.produtos[i].marca = req.body.marca;
                break;
            }
        }
        res.status(200).json({ "message": `Produto do id ${id} alterado.` });
    } else {
        res.status(404).json({ "message": "Produto não encontrado." });
    }
 })

 app.delete('/api/produtos/:id', (req, res, next) => {
     id = lista_produtos.produtos.findIndex(elem => elem.id == parseInt(req.params.id) + 1);
     if (id != -1) {
         id = lista_produtos.produtos.findIndex(elem => elem.id == parseInt(req.params.id) + 1);
         lista_produtos.produtos = lista_produtos.produtos.filter((elem) => {
             return elem.id != id;
         });
         res.status(200).json({ "message": `Produto do id ${id} excluído.` });
     } else {
         res.status(404).json({ "message": "Produto não encontrado." });
     }
 })

const PORTA = process.env.PORT || 3000 // Se não achar PORT definido como variável de ambiente, utilizar 3000
app.listen (PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
})