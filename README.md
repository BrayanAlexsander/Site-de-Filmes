 Catálogo de Filmes - Projeto Web

 Descrição do Projeto

Este projeto é um catálogo de filmes desenvolvido em HTML, CSS e JavaScript puro, consumindo a API do The Movie Database (TMDB). O objetivo é apresentar um catálogo interativo de filmes populares, permitindo ao usuário visualizar detalhes completos de cada filme, incluindo sinopse, elenco, trailer e informações técnicas.

 Funcionalidades

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

Tecnologias Usadas

- **HTML5**: Estrutura semântica da página
- **CSS3**: Estilização moderna com gradientes e animações
- **JavaScript (ES6+)**: Lógica de interação e consumo de API
- **The Movie Database API**: Fonte de dados dos filmes
- **GitHub Pages**: Hospedagem gratuita

Estrutura do Projeto

```
Site-de-Filmes/
├── index.html          
├── style.css           
├── script.js           
└── README.md           
```

Configuração da API

O projeto utiliza a API pública do **The Movie Database (TMDB)** conforme especificado pelo usuário. A chave da API já está configurada no arquivo `script.js`:

```javascript
const API_KEY = 'd29e79bb675e164fc1f28decd659e21c';
const API_BASE = 'https://api.themoviedb.org/3';
```

API Principal Utilizada:
**`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`**

URLs da API Utilizadas:
- **Detalhes do filme**: `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
- **Elenco**: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`
- **Vídeos/Trailers**: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`
- **Categorias**: `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=pt-BR&page=${page}`
- **Busca**: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=${page}`

Funcionalidades Técnicas

### Consumo de API
- **Filmes Populares**: `/movie/popular`
- **Melhores Avaliados**: `/movie/top_rated`
- **Em Cartaz**: `/movie/now_playing`
- **Em Breve**: `/movie/upcoming`
- **Busca de Filmes**: `/search/movie`
- **Detalhes do Filme**: `/movie/{id}`
- **Elenco**: `/movie/{id}/credits`
- **Vídeos/Trailers**: `/movie/{id}/videos`

### Pontos Positivos

- ✅ Interface moderna e intuitiva
- ✅ Performance otimizada
- ✅ Código limpo e bem estruturado
- ✅ Compatibilidade total com GitHub Pages
- ✅ Sem dependências externas

 Pontos de Melhoria

- 🔄 Implementar sistema de busca
- 🔄 Adicionar filtros por gênero
- 🔄 Paginação para mais filmes
- 🔄 Cache local para melhor performance

 Contato
 
**Desenvolvedor**: Brayan Alexsander  
**Email**: brayanalexsanderbr@gmail.com
---
