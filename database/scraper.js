//======== INFO / CRÉDITOS ========\\
/*
CRÉDITOS: PEDROZZ MODS

Essa base foi criada por Pedrozz Mods, então se você for divulgar, repostar ou compartilhar em qualquer lugar, dá aquela moral e mantém os créditos, fechou? 😅

Ela é totalmente **gratuita**, ou seja, se algum espertinho aí tiver vendendo, já sabe que tá feio hein... 👀

Ah, e só pra avisar: essa base foi feita usando minha API principal (Dark Stars). Se você quiser usar de forma mais profissional, recomendo assinar um plano lá (mas é opcional, claro 😎).

No mais, use com moderação (ou não kkk), e bom proveito!
*/
//MODULOS
const fs = require('fs');
const axios = require('axios');
const fetch = require("node-fetch");
//CONSTS
const BaseApi = "http://api.speedhosting.cloud";
const BaseApiDark = "https://dksapis.online";
const DARK_APIKEY = "SUAKEY"; //PEGA FAZENDO LOGIN NO LINK ACIMA DESSA CONST
const ApiKey = "SUA KEY SPEED";
const criador = "Pedrozz Mods";

//========[ DOWNLOAD ]========//
async function ytMp3(url) {
try {
api = `${BaseApiDark}/api/download/youtube-audio?url=${url}&apikey=${DARK_APIKEY}`
return api;
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function ytMp4(url) {
try {
api = `${BaseApiDark}/api/download/youtube-video?url=${url}&apikey=${DARK_APIKEY}`
return api;
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function ytMp3Query(query) {
try {
api2 = await fetch(`${BaseApiDark}/api/download/youtube-audiov3?nome=${encodeURIComponent(query)}&apikey=${DARK_APIKEY}`)
data = await api2.json()
return {
status: "online",
criador,
query,
type: 'audio/mpeg',
resultado: data.Resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function ytMp4Query(query) {
try {
api2 = await fetch(`${BaseApiDark}/api/download/youtube-audiov3?nome=${encodeURIComponent(query)}&apikey=${DARK_APIKEY}`)
data = await api2.json()
return {
status: "online",
criador,
query,
type: 'video/mp4',
resultado: data.Resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function tiktokDl(url) {
try {
api = await fetch(`${BaseApiDark}/api/download/tiktokV2?url=${url}&apikey=${DARK_APIKEY}`)
data = await api.json()
return {
status: "online",
criador,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function tiktokQuery(query) {
try {
api = await fetch(`${BaseApiDark}/api/download/tiktokQuery?query=${encodeURIComponent(query)}&apikey=${DARK_APIKEY}`)
data = await api.json()
return {
status: "online",
criador,
total: data.resultado.length,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function audiomeme(query) {
try {
api = await fetch(`${BaseApiDark}/api/download/myinstants?query=${encodeURIComponent(query)}&apikey=${DARK_APIKEY}`)
data = await api.json()
return {
status: "online",
criador,
result: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function apkpureDl(url) {
try {
api = await fetch(`${BaseApi}/api/download/apkpure?url=${url}&apikey=${ApiKey}`)
data = await api.json()
return {
status: "online",
criador,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function PinterestMultiMidia(url) {
try {
api = await fetch(`${BaseApi}/api/download/PinterestMultiMidia?url=${url}&apikey=${ApiKey}`)
data = await api.json()
return {
status: "online",
criador,
resultado: data.data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function xvideosDl(url) {
try {
api = await fetch(`${BaseApiDark}/api/download/xvideos?link=${url}&apikey=${DARK_APIKEY}`)
data = await api.json()
return {
status: "online",
criador,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function instagramDl(url) {
try {
api = await fetch(`${BaseApiDark}/api/download/instagram?url=${url}&apikey=${DARK_APIKEY}`)
data = await api.json()
return {
status: "online",
criador,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}
//========[ PESQUISA ]========//
const yts = require("yt-search")
async function ytVideosSearch(query) {
    return new Promise((resolve, reject) => {
        try {
            const cari = yts(query)
            .then((data) => {
                res = data.videos
               
                return {
status: "online",
criador,
resultado: res
};
            })
            resolve(cari)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function wikipedia(query) {
try {
api = await fetch(`${BaseApiDark}/api/pesquisa/wikipedia?query=${encodeURIComponent(query)}&apikey=${DARK_APIKEY}`)
data = await api.json()
return {
status: "online",
criador,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function xvideosQuery(query) {
try {
api = await fetch(`${BaseApiDark}/api/pesquisa/xvideos?query=${encodeURIComponent(query)}&apikey=${DARK_APIKEY}`)
data = await api.json()
return {
status: "online",
criador,
total: data.resultado.length,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function aptoide(query) {
try {
api = await fetch(`${BaseApiDark}/api/download/aplicativos?id=${encodeURIComponent(query)}&apikey=${DARK_APIKEY}`)
data = await api.json()
return {
status: "online",
criador,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function apkpureQuery(query) {
try {
api = await fetch(`${BaseApi}/api/pesquisas/apkpure?query=${encodeURIComponent(query)}&apikey=${ApiKey}`)
data = await api.json()
return {
status: "online",
criador,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function Pinterest(query) {
try {
return `${BaseApiDark}/api/pesquisa/pinterest?text=${encodeURIComponent(query)}&apikey=${DARK_APIKEY}`;
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function amazon(query) {
try {
api = await fetch(`${BaseApiDark}/api/pesquisa/amazon?nome=${encodeURIComponent(query)}&apikey=${DARK_APIKEY}`)
data = await api.json()
return {
status: "online",
criador,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function wallpaper(query) {
try {
api = await fetch(`${BaseApi}/api/pesquisa/wallpaper?query=${encodeURIComponent(query)}&apikey=${ApiKey}`)
data = await api.json()
return {
status: "online",
criador,
resultado: data.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function Playstore(query) {
try {
api = await fetch(`${BaseApi}/api/pesquisa/playstore?query=${encodeURIComponent(query)}&apikey=${ApiKey}`)
data = await api.json()
return {
status: "online",
criador,
pesquisa: query,
resultado: data.resultado.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

//========[ CANVAS ]========//
async function CanvabemVindo(titulo, avatar, fundo, desc, nome) {
try {
api = `${BaseApiDark}/api/canva/bem-vindo2?titulo=${encodeURIComponent(nome)}&avatar=${avatar}&fundo=${fundo}&nome=${encodeURIComponent(titulo)}&desc=${encodeURIComponent(desc)}&apikey=${DARK_APIKEY}`
return api;
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function canvaLevel(avatar, fundo, nome, level1, level2){
try {
api = `${BaseApiDark}/api/canvas/levelup?foto=${avatar}&fundo=${fundo}&nome=${encodeURIComponent(nome)}&lvb=${encodeURIComponent(level1)}&lva=${encodeURIComponent(level2)}&apikey=${DARK_APIKEY}`
return api;
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function canvaMusicCard(avatar, name, artistName, time){
try {
api = `${BaseApiDark}/api/canvas/musicard/v2?thumbnail=${avatar}&music_name=${encodeURIComponent(name)}&artist_name=${encodeURIComponent(time)}&time_end=${encodeURIComponent(artistName)}&apikey=${DARK_APIKEY}`
return api;
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function canvaMusicCard2(avatar, name, artistName){
try {
api = `${BaseApiDark}/api/canvas/musicard/v3?thumbnail=${avatar}&music_name=${encodeURIComponent(name)}&artist_name=${encodeURIComponent(artistName)}&apikey=${DARK_APIKEY}`
return api;
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function canvaMontagem(nome, url){
try {
api = `${BaseApiDark}/api/canvas/${nome}?link=${url}&apikey=${DARK_APIKEY}`
return api;
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

//========[ +18  ]========//
async function Hentaizinho(nomeHentai) {
try {
api2 = await fetch(`https://nekobot.xyz/api/image?type=${nomeHentai}`)
api3 = await api2.json()
return {
status: "online",
criador,
type: nomeHentai,
imagemUrl: api3.message
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}


async function Hentaizinho2(nomeHentai) {
try {
api2 = await fetch(`https://api.waifu.pics/nsfw/${nomeHentai}`)
api3 = await api2.json()
return {
status: "online",
criador,
type: nomeHentai,
imagemUrl: api3.url
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

//========[ IMAGEM ]========//

async function travaZapImg() {
try {
api = travaZap[Math.floor(Math.random() * travaZap.length)]
return {
status: "online",
criador,
imagemUrl: api
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function travaZapImg2() {
try {
api = travaZapF[Math.floor(Math.random() * travaZapF.length)]
return {
status: "online",
criador,
imagemUrl: api
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function metadinha() {
try {
api2 = await fetch(`${BaseApiDark}/api/metadinha?apikey=${DARK_APIKEY}`)
api = await api2.json()
return {
status: "online",
criador,
numero: api.número,
masculina: api.masculina,
feminina: api.feminina
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function metadinha2() {
try {
api2 = await fetch(`${BaseApi}/api/imagem/metadinha2?apikey=${ApiKey}`)
api = await api2.json()
return {
status: "online",
criador,
numero: api.número,
masculina: api.macho,
feminina: api.fema
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function logo(name, query) {
try {
if (name === "logo") {
api = `https://junimk.sirv.com/Api/1aa3ad239228f7cfe1cfb0b077cccfc4.jpg?text.0.text=${encodeURIComponent(query)}&text.0.position.gravity=center&text.0.position.y=20%25&text.0.size=90&text.0.color=ffffff&text.0.font.family=Courgette&text.0.background.color=ff2424&text.0.outline.color=5b4bde&text.0.outline.width=4&text.0.outline.blur=21`
return api;
} else if (name === "logo2") {
api = `https://junimk.sirv.com/Api/b5dc33dbe3e6baa7f7a64121c6f5a6c2.jpg?text.0.text=${encodeURIComponent(query)}&text.0.position.gravity=center&text.0.position.y=20%25&text.0.size=100&text.0.color=ffffff&text.0.font.family=Damion&text.0.background.color=ff2424&text.0.outline.color=de4b4b&text.0.outline.width=4&text.0.outline.blur=21`
return api;
} else if (name === "logo3") {
api = `https://junimk.sirv.com/Api/be4f071e8a558cf09eec6b4b9d63fe29.jpg?text.0.text=${encodeURIComponent(query)}&text.0.position.gravity=center&text.0.position.y=30%25&text.0.size=100&text.0.color=000000&text.0.font.family=Damion&text.0.background.color=ff2424&text.0.outline.color=ffffff&text.0.outline.width=4&text.0.outline.blur=21`
return api;
} else if (name === "logo4") {
api = `https://junimk.sirv.com/Api/9a8987ff1eb624256f8e86271f443545.jpg?text.0.text=${encodeURIComponent(query)}&text.0.position.gravity=center&text.0.position.y=30%25&text.0.size=100&text.0.color=ffffff&text.0.font.family=Damion&text.0.background.color=ff2424&text.0.outline.color=0026ff&text.0.outline.width=4&text.0.outline.blur=27`
return api;
} else if (name === "logo5") {
api = `https://junimk.sirv.com/Api/fe4b9803e07ab839efd4ef500b9456b9.jpg?text.0.text=${encodeURIComponent(query)}&text.0.position.gravity=center&text.0.position.y=30%25&text.0.size=100&text.0.color=ffffff&text.0.font.family=Damion&text.0.background.color=ff2424&text.0.outline.color=0026ff&text.0.outline.width=4&text.0.outline.blur=27`
return api;
}
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

//FIGURINHAS
async function figurinhas(nome) {
try {
return `${BaseApiDark}/sticker/${nome}?apikey=${DARK_APIKEY}`;
} catch (e) {
console.log(e)
}
}
//========[ INTELIGÊNCIA ARTIFICIAL ]========//

async function gemini(query) {
try {
api2 = await fetch(`${BaseApiDark}/api/gemini?texto=${encodeURIComponent(query)}&apikey=${DARK_APIKEY}`)
api = await api2.json()
return {
status: "online",
criador,
resposta: api.resposta
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function multiAi(modelo, prompt, prompt2 = null) {
try {
if (modelo === "gpt") {
api2 = await fetch(`${BaseApiDark}/api/gpt?texto=${prompt}&apikey=${DARK_APIKEY}`)
api = await api2.json();
return {
status: "online",
criador,
resposta: api.resultado
};
} else if (modelo === "gptPrompt") {
api2 = await fetch(`${BaseApiDark}/api/gptPrompt?texto=${prompt}&prompt=${prompt2}&apikey=${DARK_APIKEY}`)
api = await api2.json();
return {
status: "online",
criador,
resposta: api.resposta
};
} else {
api2 = await fetch(`${BaseApiDark}/api/ai/texto/${modelo}?query=${prompt}&apikey=${DARK_APIKEY}`)
api = await api2.json()
return {
status: "online",
criador,
resposta: api.resultado
};
}
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}
}

async function imagineAi(prompt) {
try {
api2 = await fetch(`${BaseApiDark}/api/ai/imagem/imagine?prompt=${prompt}&apikey=${DARK_APIKEY}`)
api = await api2.json();
return {
status: true,
criador,
imagem: api.resultado.imagemUrl,
info: api.resultado.info
}
} catch (e) {
console.log(e)
}
}

async function dalle(prompt, modelo) {
try {
return `${BaseApiDark}/api/ai/imagem/${modelo}?prompt=${prompt}&apikey=${DARK_APIKEY}`
} catch (e) {
console.log(e)
}

}
async function consultas(pux, dado) {
try {
api2 = await fetch(`${BaseApiDark}/api/consulta/${pux}?query=${dado}&apikey=${DARK_APIKEY}`)
api = await api2.json()
return {
status: "online",
criador,
resposta: api.resultado
};
} catch (e) {
console.log("Deu erro no puxa da informação da api Original")
console.log(e)
}

}
//EXPORTANDO AS FUNÇÕES 
module.exports = { ytVideosSearch, ytMp3Query, ytMp4Query, ytMp3, ytMp4, instagramDl, tiktokDl, xvideosDl, apkpureDl, audiomeme, wikipedia, amazon, tiktokQuery, apkpureQuery, xvideosQuery, aptoide, Pinterest, figurinhas, PinterestMultiMidia, wallpaper, Playstore, CanvabemVindo, canvaLevel, canvaMusicCard, canvaMusicCard2, canvaMontagem, Hentaizinho, Hentaizinho2, travaZapImg, travaZapImg2, metadinha, metadinha2, logo, gemini, dalle, imagineAi, multiAi, consultas }