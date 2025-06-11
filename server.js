const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = 3000
const DATA_FILE = path.join(__dirname, 'catalog.json')

app.use(express.static('public'))
app.use(express.json())
app.use(cors())

//ROTA SALVAR
app.post('/salvar', (req,res) => {
    const formData = req.body

    // Lê o conteúdo atual do arquivo (se existir)

    fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
        let dados = [];

        if (!err && data) {
            try {
                dados = JSON.parse(data); // Tenta converter os dados existentes
            }catch (error) {
                console.error('Erro ao analisar JSON existente:', error);
            }
        }

        // Adiciona o novo formulário aos dados existentes
        dados.push(formData);

        // Escreve de volta no arquivo
        fs.writeFile(DATA_FILE, JSON.stringify(dados, null, 4), (err) => {
            if (err) {
                console.error('Erro ao escrever o arquivo', err)
                return res.status(500).json({ error: 'Erro ao salvar os dados.' });
            }
            res.json({
                message: 'Dados salvos com sucesso!',
                redirect: '../../index.html',
            });
        });
    });
});

// Rota para obter os dados salvos
app.get('/dados', (req, res) => {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        try {
            const dados = JSON.parse(data);
            res.json(dados);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao ler os dados.' });
        }
    } else {
        res.status(404).json({ error: 'Nenhum dado encontrado.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})