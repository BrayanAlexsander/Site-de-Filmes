const API_KEY = 'd29e79bb675e164fc1f28decd659e21c';
const API_BASE = 'https://api.themoviedb.org/3';
const catalogo = document.getElementById('moviesGrid');
const detalhes = document.getElementById('movieModal');
const loading = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryBtns = document.querySelectorAll('.nav-btn');
const pagination = document.getElementById('pagination');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const movieDetails = document.getElementById('movieDetails');

let currentPage = 1;
let currentCategory = 'now_playing';
let totalPages = 1;
let searchQuery = '';

window.onload = () => {
  loadMovies();
  setupEventListeners();
  setupHeaderScroll();
};

function setupEventListeners() {
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

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

  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        loadMovies();
      }
    });
  }

  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        loadMovies();
      }
    });
  }

  // Modal close
  const closeModal = document.querySelector('.close');
  if (closeModal) {
    closeModal.addEventListener('click', voltarCatalogo);
    window.addEventListener('click', function(event) {
      if (event.target === detalhes) {
        voltarCatalogo();
      }
    });
  }
}

function updateActiveCategory() {
  categoryBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === currentCategory) {
      btn.classList.add('active');
    }
  });
}

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

async function loadMovies() {
  showLoading();
  hideDetails();
  
  try {
    let url;
    
    if (searchQuery) {
      url = `${API_BASE}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(searchQuery)}&page=${currentPage}`;
    } else {
      if (currentCategory === 'now_playing' || currentCategory === 'popular' || currentCategory === 'top_rated' || currentCategory === 'upcoming') {
        url = `${API_BASE}/movie/${currentCategory}?api_key=${API_KEY}&language=pt-BR&page=${currentPage}`;
      } else {
        url = `${API_BASE}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${currentPage}`;
      }
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      displayMovies(data.results);
      totalPages = Math.min(data.total_pages, 500);
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

function getGenreId(category) {
  const genreMap = {
    'action': 28,
    'drama': 18,
    'comedy': 35,
    'horror': 27,
    'sci-fi': 878
  };
  return genreMap[category] || 28;
}

function displayMovies(movies) {
  catalogo.innerHTML = '';
  
  movies.forEach(filme => {
    const card = createMovieCard(filme);
    catalogo.appendChild(card);
  });
}

function createMovieCard(filme) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  const rating = filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A';
  card.innerHTML = `
    <div class="movie-poster">
      <img src="${filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 'https://via.placeholder.com/500x750/1e293b/64748b?text=Sem+Imagem'}" alt="${filme.title}" loading="lazy">
      <div class="movie-rating">⭐ ${rating}</div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">${filme.title}</h3>
      <div class="movie-meta">
        <span>${rating}/10</span>
      </div>
      <div class="movie-genres">
        ${filme.genre_ids ? getGenreNames(filme.genre_ids).map(genre => `<span class="genre-tag">${genre}</span>`).join('') : ''}
      </div>
    </div>
  `;
  card.onclick = () => showMovieDetailsInline(filme.id);
  return card;
}

function getGenreNames(genreIds) {
  const genreMap = {
    28: 'Ação',
    12: 'Aventura',
    16: 'Animação',
    35: 'Comédia',
    80: 'Crime',
    99: 'Documentário',
    18: 'Drama',
    10751: 'Família',
    14: 'Fantasia',
    36: 'História',
    27: 'Terror',
    10402: 'Música',
    9648: 'Mistério',
    10749: 'Romance',
    878: 'Ficção Científica',
    10770: 'Filme para TV',
    53: 'Suspense',
    10752: 'Guerra',
    37: 'Faroeste'
  };
  return genreIds.map(id => genreMap[id] || 'Outro').slice(0, 3);
}

async function showMovieDetailsInline(id) {
  showLoading();
  try {
    // Buscar dados do filme
    const [filme, creditos, videos] = await Promise.all([
      fetch(`${API_BASE}/movie/${id}?api_key=${API_KEY}&language=pt-BR`).then(r => r.json()),
      fetch(`${API_BASE}/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`).then(r => r.json()),
      fetch(`${API_BASE}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`).then(r => r.json())
    ]);
    const trailer = videos.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    const releaseYear = filme.release_date ? filme.release_date.split('-')[0] : 'N/A';
    const budget = filme.budget ? `$${(filme.budget/1000000).toFixed(1)}M` : 'N/A';
    const revenue = filme.revenue ? `$${(filme.revenue/1000000).toFixed(1)}M` : 'N/A';
    const genres = filme.genres?.map(g => `<span class='genre-tag'>${g.name}</span>`).join(' ') || '';
    const cast = creditos.cast?.slice(0, 8) || [];
    const castHtml = cast.length > 0 ? cast.map(actor => `
      <div class="cast-member">
        ${actor.profile_path 
          ? `<img src="https://image.tmdb.org/t/p/w185${actor.profile_path}" alt="${actor.name}" class="cast-photo">`
          : `<div class="cast-photo-placeholder">?</div>`}
        <span class="cast-name">${actor.name}</span>
        <span class="cast-character">${actor.character}</span>
      </div>
    `).join('') : '<span class="no-cast">Elenco não disponível.</span>';
    
    movieDetails.innerHTML = `
      <div class="movie-details-container">
        <button class="back-button" id="backToCatalog" style="margin-bottom:2rem;"><i class="fas fa-arrow-left"></i> Voltar ao Catálogo</button>
        <h1 class="movie-title-main">${filme.title}</h1>
        <div class="movie-details-card">
          <div class="movie-poster-section">
            <img src="${filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 'https://via.placeholder.com/500x750/1e293b/64748b?text=Sem+Imagem'}" alt="${filme.title}" class="movie-poster-image">
          </div>
          <div class="movie-info-section">
            <div class="movie-meta-tags">
              <span class="meta-tag">${releaseYear}</span>
              <span class="meta-tag">Nota: ${filme.vote_average?.toFixed(1) || 'N/A'}</span>
              <span class="meta-tag">Orçamento: ${budget}</span>
              <span class="meta-tag">Bilheteria: ${revenue}</span>
            </div>
            <div class="movie-genres-container">${genres}</div>
            <div class="movie-synopsis">
              <h2>Sinopse</h2>
              <p>${filme.overview || 'Sinopse não disponível.'}</p>
            </div>
            <div class="movie-cast-section">
              <h2>Elenco Principal</h2>
              <div class="cast-grid">${castHtml}</div>
            </div>
          </div>
        </div>
        ${trailer ? `<div class="trailer-section"><div class="trailer-container"><iframe width='100%' height='380' src='https://www.youtube.com/embed/${trailer.key}' title='YouTube trailer' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div></div>` : `<div class="no-trailer">Trailer não disponível.</div>`}
      </div>
    `;
    // Mostrar detalhes, esconder grid de filmes
    movieDetails.style.display = 'block';
    catalogo.style.display = 'none';
    pagination.style.display = 'none';
    // Botão voltar
    document.getElementById('backToCatalog').onclick = () => {
      movieDetails.style.display = 'none';
      catalogo.style.display = '';
      pagination.style.display = '';
    };
  } catch (error) {
    movieDetails.innerHTML = '<div class="error-message">Erro ao carregar detalhes do filme.</div>';
    movieDetails.style.display = 'block';
    catalogo.style.display = 'none';
    pagination.style.display = 'none';
  } finally {
    hideLoading();
  }
}

function showLoading() {
  loading.style.display = 'block';
}

function hideLoading() {
  loading.style.display = 'none';
}

function showNoResults() {
  catalogo.innerHTML = `
    <div class="no-results">
      <i class="fas fa-search"></i>
      <h3>Nenhum filme encontrado</h3>
      <p>${searchQuery ? 'Tente uma busca diferente.' : 'Tente ajustar os filtros.'}</p>
    </div>
  `;
  if (pagination) pagination.style.display = 'none';
}

function showError(message) {
  catalogo.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-triangle"></i>
      <p>${message}</p>
    </div>
  `;
  if (pagination) pagination.style.display = 'none';
}

function voltarCatalogo() {
  movieDetails.style.display = 'none';
  catalogo.style.display = '';
  pagination.style.display = '';
}

function hideDetails() {
  if (movieDetails) movieDetails.style.display = 'none';
}

function updatePagination() {
  if (!pagination) return;
  if (totalPages <= 1) {
    pagination.style.display = 'none';
    return;
  }
  pagination.style.display = 'flex';
  if (pageInfo) pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
  if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;
}

function setupHeaderScroll() {
  const header = document.querySelector('.header-dark.header-fixed');
  let lastScroll = window.scrollY;
  let ticking = false;

  function onScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      header.classList.add('header-compact');
    } else {
      header.classList.remove('header-compact');
    }
    if (currentScroll > lastScroll && currentScroll > 80) {
      // Descendo: esconde
      header.classList.add('header-hidden');
    } else {
      // Subindo: mostra
      header.classList.remove('header-hidden');
    }
    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
}