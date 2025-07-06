# 🎬 Catálogo de Filmes - Projeto Web

## 📋 Descrição do Projeto

Este projeto é um catálogo de filmes desenvolvido em **HTML, CSS e JavaScript puro**, consumindo a API do **The Movie Database (TMDB)**. O objetivo é apresentar um catálogo interativo de filmes populares, permitindo ao usuário visualizar detalhes completos de cada filme, incluindo sinopse, elenco, trailer e informações técnicas.

### ✨ Funcionalidades

- **Múltiplas Categorias**: Filmes populares, melhores avaliados, em cartaz e em breve
- **Sistema de Busca**: Pesquise filmes por título
- **Catálogo Dinâmico**: Exibe filmes da categoria selecionada
- **Detalhes Completos**: Ao clicar em um filme, mostra informações detalhadas
- **Elenco Principal**: Lista dos principais atores e personagens
- **Trailer do Filme**: Reprodução do trailer oficial (quando disponível)
- **Paginação**: Navegue entre páginas de resultados
- **Design Responsivo**: Interface moderna e adaptável a diferentes dispositivos
- **Navegação Intuitiva**: Transições suaves entre catálogo e detalhes
- **Estados de Carregamento**: Feedback visual durante requisições
- **Tratamento de Erros**: Mensagens amigáveis para falhas

## 🛠️ Tecnologias Usadas

- **HTML5**: Estrutura semântica da página
- **CSS3**: Estilização moderna com gradientes e animações
- **JavaScript (ES6+)**: Lógica de interação e consumo de API
- **The Movie Database API**: Fonte de dados dos filmes
- **GitHub Pages**: Hospedagem gratuita

## 🚀 Como Rodar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/static-movie-app.git
   cd static-movie-app
   ```

2. **Abra o arquivo `index.html` no navegador:**
   - Duplo clique no arquivo `index.html`
   - Ou use um servidor local (recomendado):
     ```bash
     # Com Python 3
     python -m http.server 8000
     
     # Com Node.js (npx)
     npx serve .
     
     # Com PHP
     php -S localhost:8000
     ```

3. **Acesse no navegador:**
   - Se usando servidor local: `http://localhost:8000`
   - Se abrindo diretamente: `file:///caminho/para/index.html`

## 🌐 Link do Site Hospedado

[**Acesse o Catálogo de Filmes Online**](https://seu-usuario.github.io/static-movie-app)

*Substitua "seu-usuario" pelo seu nome de usuário do GitHub*

## 📁 Estrutura do Projeto

```
static-movie-app/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Documentação
```

## 🔧 Configuração da API

O projeto utiliza a API pública do **The Movie Database (TMDB)** conforme especificado pelo usuário. A chave da API já está configurada no arquivo `script.js`:

```javascript
const API_KEY = 'd29e79bb675e164fc1f28decd659e21c';
const API_BASE = 'https://api.themoviedb.org/3';
```

### 🎯 API Principal Utilizada:
**`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`**

### URLs da API Utilizadas:
- **Detalhes do filme**: `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
- **Elenco**: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`
- **Vídeos/Trailers**: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`
- **Categorias**: `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=pt-BR&page=${page}`
- **Busca**: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=${page}`

**Nota**: Esta é uma chave de demonstração. Para uso em produção, recomenda-se obter sua própria chave gratuita em [themoviedb.org](https://www.themoviedb.org/settings/api).

## 📱 Responsividade

O projeto foi desenvolvido com foco na responsividade, funcionando perfeitamente em:
- 📱 Dispositivos móveis
- 💻 Tablets
- 🖥️ Desktops

## 🎨 Design

- **Tema Escuro**: Interface moderna com gradientes escuros
- **Cores Principais**: Azul ciano (#38bdf8) e tons de slate
- **Animações**: Transições suaves e efeitos hover
- **Tipografia**: Fonte Segoe UI para melhor legibilidade

## 📊 Funcionalidades Técnicas

### Consumo de API
- **Filmes Populares**: `/movie/popular`
- **Melhores Avaliados**: `/movie/top_rated`
- **Em Cartaz**: `/movie/now_playing`
- **Em Breve**: `/movie/upcoming`
- **Busca de Filmes**: `/search/movie`
- **Detalhes do Filme**: `/movie/{id}`
- **Elenco**: `/movie/{id}/credits`
- **Vídeos/Trailers**: `/movie/{id}/videos`

### Tratamento de Erros
- Imagens não encontradas (fallback automático)
- Trailers indisponíveis
- Falhas na API
- Estados de carregamento
- Busca sem resultados
- Erros de rede

## 🚀 Deploy no GitHub Pages

1. **Crie um repositório no GitHub**
2. **Suba os arquivos:**
   ```bash
   git add .
   git commit -m "Primeiro commit: Catálogo de Filmes"
   git push origin main
   ```
3. **Ative o GitHub Pages:**
   - Vá em **Settings > Pages**
   - Selecione a branch **main**
   - Selecione a pasta **root (/)** 
   - Clique em **Save**

## 👨‍💻 Desenvolvimento

### Aprendizados Durante o Projeto

- **Consumo de APIs REST**: Integração com TMDB
- **JavaScript Assíncrono**: Uso de Promises e async/await
- **Manipulação do DOM**: Criação dinâmica de elementos
- **CSS Moderno**: Gradientes, flexbox e animações
- **Design Responsivo**: Adaptação para diferentes telas

### Dificuldades Encontradas

- **CORS**: Resolvido usando API pública que permite requisições do navegador
- **Estados de Carregamento**: Implementado feedback visual durante requisições
- **Responsividade**: Ajustes para diferentes tamanhos de tela

### Pontos Positivos

- ✅ Interface moderna e intuitiva
- ✅ Performance otimizada
- ✅ Código limpo e bem estruturado
- ✅ Compatibilidade total com GitHub Pages
- ✅ Sem dependências externas

### Pontos de Melhoria

- 🔄 Implementar sistema de busca
- 🔄 Adicionar filtros por gênero
- 🔄 Paginação para mais filmes
- 🔄 Cache local para melhor performance

## 📞 Contato

**Desenvolvedor**: Brayan Alexsander  
**Email**: seu-email@exemplo.com  
**GitHub**: [@seu-usuario](https://github.com/seu-usuario)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para o curso de Web Front** 