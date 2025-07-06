const API_KEY = 'd29e79bb675e164fc1f28decd659e21c';
const API_BASE = 'https://api.themoviedb.org/3';
// https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR

const catalogo = document.getElementById('catalogo');
const detalhes = document.getElementById('detalhes');
const loading = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryBtns = document.querySelectorAll('.category-btn');
const pagination = document.getElementById('pagination');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

// Estado da aplicação
let currentPage = 1;
let currentCategory = 'popular';
let totalPages = 1;
let searchQuery = '';

// Inicialização
window.onload = () => {
  loadMovies();
  setupEventListeners();
};

// Configuração dos event listeners
function setupEventListeners() {
  // Busca
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Categorias
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      if (category !== currentCategory) {
        currentCategory = category;
        currentPage = 1;
        searchQuery = '';
        searchInput.value = '';
        updateActiveCategory();
        loadMovies();
      }
    });
  });

  // Paginação
  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      loadMovies();
    }
  });

  nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadMovies();
    }
  });
}

// Atualizar categoria ativa
function updateActiveCategory() {
  categoryBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === currentCategory) {
      btn.classList.add('active');
    }
  });
}

// Função de busca
function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    searchQuery = query;
    currentPage = 1;
    currentCategory = 'search';
    updateActiveCategory();
    loadMovies();
  }
}

// Atualizar categoria ativa
function updateActiveCategory() {
  categoryBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === currentCategory) {
      btn.classList.add('active');
    }
  });
}

// Função de busca
function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    searchQuery = query;
    currentPage = 1;
    currentCategory = 'search';
    updateActiveCategory();
    loadMovies();
  }
}

// Carregar filmes
async function loadMovies() {
  showLoading();
  hideDetails();
  
  try {
    let url;
    
    if (searchQuery) {
      url = `${API_BASE}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(searchQuery)}&page=${currentPage}`;
    } else {
      url = `${API_BASE}/movie/${currentCategory}?api_key=${API_KEY}&language=pt-BR&page=${currentPage}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      displayMovies(data.results);
      totalPages = Math.min(data.total_pages, 500); // TMDB limita a 500 páginas
      updatePagination();
    } else {
      showNoResults();
    }
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
    showError('Erro ao carregar filmes. Tente novamente.');
  } finally {
    hideLoading();
  }
}

// Exibir filmes
function displayMovies(movies) {
  catalogo.innerHTML = '';
  
  movies.forEach(filme => {
    const card = createMovieCard(filme);
    catalogo.appendChild(card);
  });
}

// Criar card do filme
function createMovieCard(filme) {
  const card = document.createElement('div');
  card.className = 'filme-card';
  
  const releaseYear = filme.release_date ? filme.release_date.split('-')[0] : 'N/A';
  const rating = filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A';
  
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}">
    <div class="filme-info">
      <h2>${filme.title}</h2>
      <div class="filme-meta">
        <span>${releaseYear}</span>
        <div class="rating">
          <i class="fas fa-star"></i>
          <span>${rating}</span>
        </div>
      </div>
    </div>
  `;
  
  card.onclick = () => mostrarDetalhes(filme.id);
  return card;
}

// Mostrar detalhes do filme
async function mostrarDetalhes(id) {
  showLoading();
  hideCatalog();
  detalhes.classList.add('visible');
  detalhes.innerHTML = '<p>Carregando detalhes...</p>';

  try {
    const [filme, creditos, videos] = await Promise.all([
      fetch(`${API_BASE}/movie/${id}?api_key=${API_KEY}&language=pt-BR`).then(r => r.json()),
      fetch(`${API_BASE}/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`).then(r => r.json()),
      fetch(`${API_BASE}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`).then(r => r.json())
    ]);

    const trailer = videos.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    const releaseYear = filme.release_date ? filme.release_date.split('-')[0] : 'N/A';
    const runtime = filme.runtime ? `${Math.floor(filme.runtime / 60)}h ${filme.runtime % 60}min` : 'N/A';
    const budget = filme.budget ? `$${(filme.budget / 1000000).toFixed(1)}M` : 'N/A';
    const revenue = filme.revenue ? `$${(filme.revenue / 1000000).toFixed(1)}M` : 'N/A';

    detalhes.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}">
      <h2>${filme.title}</h2>
      
      <div class="filme-details">
        <div class="detail-row">
          <span class="detail-label">Ano:</span>
          <span class="detail-value">${releaseYear}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Duração:</span>
          <span class="detail-value">${runtime}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Avaliação:</span>
          <span class="detail-value">
            <i class="fas fa-star" style="color: #fbbf24;"></i>
            ${filme.vote_average?.toFixed(1) || 'N/A'} / 10
          </span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Orçamento:</span>
          <span class="detail-value">${budget}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Receita:</span>
          <span class="detail-value">${revenue}</span>
        </div>
      </div>

      <div class="genres">
        ${filme.genres?.map(g => `<span class="genre-tag">${g.name}</span>`).join('') || ''}
      </div>

      <div class="sinopse">
        <strong>Sinopse:</strong><br>
        ${filme.overview || 'Sinopse não disponível.'}
      </div>

      <div class="elenco">
        <div class="elenco-title">Elenco Principal</div>
        ${creditos.cast?.slice(0, 12).map(ator => `
          <div class="elenco-ator">
            ${ator.profile_path
              ? `<img src="https://image.tmdb.org/t/p/w185${ator.profile_path}" alt="${ator.name}">`
              : `<div style="width:80px;height:80px;border-radius:50%;background:#334155;display:flex;align-items:center;justify-content:center;color:#94a3b8;border:2px solid #38bdf8;">?</div>`
            }
            <div class="ator-name">${ator.name}</div>
            <div class="ator-character">${ator.character}</div>
          </div>
        `).join('') || '<p style="color:#94a3b8;text-align:center;">Elenco não disponível.</p>'}
      </div>

      ${trailer ? `
        <div class="trailer">
          <iframe width="100%" height="100%" 
                  src="https://www.youtube.com/embed/${trailer.key}" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
          </iframe>
        </div>
      ` : '<div style="color:#94a3b8;text-align:center;margin:2rem 0;">Trailer não disponível.</div>'}

      <button onclick="voltarCatalogo()">
        <i class="fas fa-arrow-left"></i> Voltar ao catálogo
      </button>
    `;
  } catch (error) {
    console.error('Erro ao carregar detalhes:', error);
    detalhes.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Erro ao carregar detalhes do filme. Tente novamente.</p>
        <button onclick="voltarCatalogo()">Voltar ao catálogo</button>
      </div>
    `;
  } finally {
    hideLoading();
  }
}

// Voltar ao catálogo
function voltarCatalogo() {
  detalhes.classList.remove('visible');
  showCatalog();
  updatePagination();
}

// Funções de controle de visibilidade
function showLoading() {
  loading.style.display = 'flex';
}

function hideLoading() {
  loading.style.display = 'none';
}

function showCatalog() {
  catalogo.style.display = 'flex';
  pagination.style.display = 'flex';
}

function hideCatalog() {
  catalogo.style.display = 'none';
  pagination.style.display = 'none';
}

function hideDetails() {
  detalhes.classList.remove('visible');
}

function showNoResults() {
  catalogo.innerHTML = `
    <div class="no-results">
      <i class="fas fa-search"></i>
      <p>Nenhum filme encontrado.</p>
      ${searchQuery ? `<p>Tente uma busca diferente.</p>` : ''}
    </div>
  `;
  pagination.style.display = 'none';
}

function showError(message) {
  catalogo.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-triangle"></i>
      <p>${message}</p>
    </div>
  `;
  pagination.style.display = 'none';
}

// Atualizar paginação
function updatePagination() {
  if (totalPages <= 1) {
    pagination.style.display = 'none';
    return;
  }

  pagination.style.display = 'flex';
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  
  prevPageBtn.disabled = currentPage <= 1;
  nextPageBtn.disabled = currentPage >= totalPages;
} 
