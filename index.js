//======== INFO / CRÉDITOS ========\\
/*
CRÉDITOS: PEDROZZ MODS

Essa base foi criada por Pedrozz Mods, então se você for divulgar, repostar ou compartilhar em qualquer lugar, dá aquela moral e mantém os créditos, fechou? 😅

Ela é totalmente **gratuita**, ou seja, se algum espertinho aí tiver vendendo, já sabe que tá feio hein... 👀

Ah, e só pra avisar: essa base foi feita usando minha API principal (Dark Stars). Se você quiser usar de forma mais profissional, recomendo assinar um plano lá (mas é opcional, claro 😎).

No mais, use com moderação (ou não kkk), e bom proveito!
*/
//==========MODULOS=========\\
const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const request = require('request');

//======CONFIG======\\
const KEY_FILE = './database/apikeys.json';
const criador = 'Pedrozz Mods 🦉';
const senhaAdm = 'pedrozz';

//======SCRAPERS========\\
const { ytVideosSearch, ytMp3Query, ytMp4Query, ytMp3, ytMp4, instagramDl, tiktokDl, xvideosDl, apkpureDl, audiomeme, wikipedia, amazon, tiktokQuery, apkpureQuery, xvideosQuery, aptoide, Pinterest, PinterestMultiMidia, wallpaper, Playstore, CanvabemVindo, canvaLevel, figurinhas, canvaMusicCard, canvaMusicCard2, canvaMontagem, Hentaizinho, Hentaizinho2, travaZapImg, travaZapImg2, metadinha, metadinha2, logo, gemini, dalle, imagineAi, multiAi, consultas } = require('./database/scraper.js')

//======================\\
const app = express();
const PORT = 3000;

//=====MIDDLEWARES======\\\
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//========FUNÇÕES=========\\
const cores = {
  reset: '\x1b[0m',
  preto: '\x1b[30m',
  vermelho: '\x1b[31m',
  verde: '\x1b[32m',
  amarelo: '\x1b[33m',
  azul: '\x1b[34m',
  magenta: '\x1b[35m',
  ciano: '\x1b[36m',
  branco: '\x1b[37m',
  negrito: '\x1b[1m',
  sublinhado: '\x1b[4m',
  reverso: '\x1b[7m',
  semCor: '\x1b[0m'
};

function colorirConsole(texto) {
  return texto.replace(/%(\w+)%/g, (match, nome) => {
    return cores[nome] || match;
  });
}

function LerDadosApikey() {
  if (!fs.existsSync(KEY_FILE)) return {};
  return JSON.parse(fs.readFileSync(KEY_FILE));
}

function SalvarDadosApikey(data) {
  fs.writeFileSync(KEY_FILE, JSON.stringify(data, null, 2));
}

function diminuirRequest(apikey) {
const data = LerDadosApikey();
if (!data[apikey]) { return { success: false, message: 'Apikey não registrada pelo administrador, compre uma apikey e tente novamente 😊👌' }; }
if (data[apikey].request <= 0) { return { success: false, message: 'Você atingiu o limite de requisições 🚫' };}
data[apikey].request--;
SalvarDadosApikey(data);

}
//======ROTAS========\\
//REGISTRAR KEY
app.post('/api/apikey/add/apikey', (req, res) => {
  const { senha, apikey, request } = req.body;
  if (senha !== senhaAdm) return res.status(403).json({ error: 'Senha incorreta' });

  const data = LerDadosApikey();
  if (data[apikey]) return res.status(400).json({ error: 'API Key já existe' });

  data[apikey] = { request: request || 100 };
  SalvarDadosApikey(data);
  res.json({ success: true, message: 'API Key criada', apikey });
});

// 🗑️ Deletar uma API Key
app.post('/api/apikey/del/apikey', (req, res) => {
  const { senha, apikey } = req.body;
  if (senha !== senhaAdm) return res.status(403).json({ error: 'Senha incorreta' });

  const data = LerDadosApikey();
  if (!data[apikey]) return res.status(404).json({ error: 'API Key não encontrada' });

  delete data[apikey];
  SalvarDadosApikey(data);
  res.json({ success: true, message: 'API Key deletada' });
});

//ATUALIZAR REQUEST
app.post('/api/apikey/add/request', (req, res) => {
  const { senha, apikey, request } = req.body;
  if (senha !== senhaAdm) return res.status(403).json({ error: 'Senha incorreta' });

  const data = LerDadosApikey();
  if (!data[apikey]) return res.status(404).json({ error: 'API Key não encontrada' });

  data[apikey].request = request;
  SalvarDadosApikey(data);
  res.json({ success: true, message: 'Limite atualizado', apikey });
});

//VERIFICAR KEY
app.get('/api/apikey/verificar', async (req, res) => {
  const key = req.query.apikey;
  const data = LerDadosApikey();

  if (!data[key]) return res.status(404).json({ error: 'API Key inválida' });

  res.json({ key, request: data[key].request });
});
//ROTAS DE APIs
//Download
app.get('/api/download/ROTA', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.nome;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await NOME(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/download/ytmp3', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.url;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await ytMp3(nome);
res.setHeader('Content-Type', 'audio/mpeg');
request.get(ScraperData).pipe(res);
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/download/ytmp4', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.url;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await ytMp4(nome);
res.setHeader('Content-Type', 'video/mp4');
request.get(ScraperData).pipe(res);
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/download/playAudio', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await ytMp3Query(nome);
res.send(ScraperData)
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/download/playVideo', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await ytMp4Query(nome);
res.send(ScraperData)
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});
app.get('/api/download/audiomeme', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.nome;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await audiomeme(nome);
res.send(ScraperData)
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/download/tiktokDl', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.url;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await tiktokDl(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/download/tiktokQuery', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await tiktokQuery(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/download/apkpureDl', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.url;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await apkpureDl(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/download/xvideosDl', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.url;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await xvideosDl(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/download/instagramDl', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.url;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await instagramDl(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});



//Pesquisa
app.get('/api/pesquisa/youtube', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await ytVideosSearch(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.send({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/pesquisa/wikipedia', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await wikipedia(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/pesquisa/xvideosQuery', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await xvideosQuery(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/pesquisa/aptoide', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await aptoide(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/pesquisa/apkpureQuery', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await apkpureQuery(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/pesquisa/pinterest', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await Pinterest(nome);
const response = await axios.get(ScraperData, { responseType: "arraybuffer" });
res.setHeader("Content-Type", response.headers["content-type"]);
res.send(response.data);
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/pesquisa/amazon', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await amazon(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/pesquisa/wallpaper', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await wallpaper(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/pesquisa/playstore', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await Playstore(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

//inteligência artificial
app.get('/api/ai/gemini', async (req, res) => {
const apikey = req.query.apikey;
const nome = req.query.texto;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
try {
const ScraperData = await gemini(nome);
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/ai/model/:modelo', async (req, res) => {
const { modelo } = req.params;
const apikey = req.query.apikey;
const nome = req.query.texto;
const prompt2 = req.query.prompt2
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
if (!modelo) return res.json({status: false, criador, error: "Falta o parâmetro nome do modelo"})
try {
const ScraperData = await multiAi(modelo, nome, `${prompt2 || "nada"}`);
res.send(ScraperData)
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/ai/imagem/model/:modelo', async (req, res) => {
const { modelo } = req.params;
const apikey = req.query.apikey;
const nome = req.query.texto;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
if (!modelo) return res.json({status: false, criador, error: "Falta o parâmetro nome do modelo"})
try {
if (modelo === "imagine") {
const ScraperData = await imagineAi(nome);
res.send(ScraperData)
} else {
const ScraperData = await dalle(nome, modelo);
const response = await axios.get(ScraperData, { responseType: "arraybuffer" });
res.setHeader("Content-Type", response.headers["content-type"]);
res.send(response.data);
}
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

//canvas
/*
MINI TUTORIAL DE COMO ADD UM CANVA NA DASH

Lá no dash.html tem um trecho assim:

<li><a href="/api/canva/NOME&apikey=SUAKEY">NOME</a>

Tu vai nesse NOME do link e troca pelo nome do canva que tu quer usar (pra descobrir o nome, só acessar a API principal e ver os disponíveis).

Depois, coloca os parâmetros que o canva precisa (tipo imagem, texto, etc). Isso pode exigir uma leve modificação na rota da API pra puxar certinho.

EXEMPLO:

<li><a href="/api/canva/comunismo&url=LINK_DA_IMAGEM&apikey=pedrozzKey">Comunismo</a>

Pronto, salvou e atualizou, já aparece na dash
*/
app.get('/api/canva/:canva', async (req, res) => {
const { canva } = req.params;
const apikey = req.query.apikey;
const nome = req.query.url;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
if (!canva) return res.json({status: false, criador, error: "Falta o parâmetro o nome do canva"})
try {
const ScraperData = await NOME(nome);
const response = await axios.get(ScraperData, { responseType: "arraybuffer" });
res.setHeader("Content-Type", response.headers["content-type"]);
res.send(response.data);
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

//Logos
app.get('/api/logos/:logoName', async (req, res) => {
const { logoName } = req.params;
const apikey = req.query.apikey;
const nome = req.query.nome;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
if (!nome) return res.json({status: false, criador, error: "Falta o parâmetro nome na query"})
if (!logoName) return res.json({status: false, criador, error: "Falta o parâmetro o nome da logo"})
try {
const ScraperData = await logo(logoName, nome);
const response = await axios.get(ScraperData, { responseType: "arraybuffer" });
res.setHeader("Content-Type", response.headers["content-type"]);
res.send(response.data);
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

//CONSULTAS
app.get('/api/consulta/:pux', async (req, res) => {
const { pux } = req.params;
const { apikey, dados } = req.query;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
try {
const ScraperData = await consultas(pux, dados);
res.send(ScraperData)
} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

//Imagens diversas
app.get('/api/images/metadinha', async (req, res) => {
const apikey = req.query.apikey;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
try {
const ScraperData = await metadinha();
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/images/metadinha2', async (req, res) => {
const apikey = req.query.apikey;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
try {
const ScraperData = await metadinha2();
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/images/travaZap', async (req, res) => {
const apikey = req.query.apikey;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
try {
const ScraperData = await travaZapImg();
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});

app.get('/api/images/travaZap2', async (req, res) => {
const apikey = req.query.apikey;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
try {
const ScraperData = await travaZapImg2();
res.send(ScraperData)

} catch (e) {
console.log(e)
res.json({status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte"})
}
});
//Figurinhas
app.get('/api/figurinhas/:fig', async (req, res) => {
const { fig } = req.params
const apikey = req.query.apikey;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
const ScraperData = await figurinhas(fig)
console.log(ScraperData)
const response = await axios.get(ScraperData, { responseType: "arraybuffer" });
res.setHeader("Content-Type", response.headers["content-type"]);
res.send(response.data);
});
//outros
app.get('/api/outros/ROTA', async (req, res) => {
const apikey = req.query.apikey;
const infoErro = diminuirRequest(apikey);
if (infoErro) return res.json(infoErro);
//FUNÇÃO DA NOVA ROTA AQUI MEU NOBRE 😊👌
});

//HTML
app.get('/', async (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dasboard', async (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'dash.html'));
});

app.get('/planos', async (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'planos.html'));
});

app.get('/atualizacao', async (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'atualizacao.html'));
});

app.get('/painel', async (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'adm.html'));
});
//=====FIM ROTAS======\\

//Inicialização do servidor
app.listen(PORT, () => {
console.log(`\n\x1b[36mSERVIDOR RODANDO: HTTP://LOCALHOST:${PORT}\x1b[0m`);
});

fs.watchFile(__filename, () => {
fs.unwatchFile(__filename)
console.log(colorirConsole(`\n%azul%[ INDEX ] %semCor%- A index principal da api foi editada irei reinicia para salvar as alterações 👍`))
process.exit();
})

fs.watchFile('./database/scraper.js', () => {
fs.unwatchFile('./database/scraper.js')
console.log(colorirConsole(`\n%azul%[ SCRAPER ] %semCor%- Os scraper da api foi editada irei reinicia para salvar as alterações 👍`))
process.exit();
})