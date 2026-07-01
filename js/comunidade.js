/* ============================================
   SheTech — Comunidade JS
   ============================================ */

/* ─── DADOS MOCK ──────────────────────────── */

const CURRENT_USER = {
  id: 0,
  name: 'Ana Luiza',
  role: 'Desenvolvedora Front-end',
  avatar: 'assets/avatars/avatar.svg'
};

const MOCK_POSTS = [
  {
    id: 1,
    author: 'Carla Mendes',
    role: 'Full Stack Dev',
    avatar: 'assets/avatars/avatar.svg',
    time: '5 minutos atrás',
    text: 'Acabei de lançar meu primeiro projeto open source! 🚀 Um template de autenticação com Next.js e Prisma. Se quiserem colaborar, o PR é bem-vindo! #opensource #nextjs #carreira',
    tags: ['#opensource', '#nextjs'],
    likes: 42,
    comments: 8,
    liked: false,
    link: { title: 'she-auth — GitHub', url: 'github.com/carla/she-auth' }
  },
  {
    id: 2,
    author: 'Bia Torres',
    role: 'UX Designer',
    avatar: 'assets/avatars/avatar.svg',
    time: '32 minutos atrás',
    text: 'Dica rápida de acessibilidade: sempre use aria-label em ícones sem texto visível. Parece pequeno, mas faz uma diferença enorme para usuárias de leitores de tela. A gente faz código para todas. 💜 #uxdesign #acessibilidade',
    tags: ['#uxdesign', '#acessibilidade'],
    likes: 87,
    comments: 14,
    liked: true,
    image: null
  },
  {
    id: 3,
    author: 'Julia Costa',
    role: 'Data Scientist',
    avatar: 'assets/avatars/avatar.svg',
    time: '1 hora atrás',
    text: 'Compartilhando um recurso incrível que encontrei esta semana. O curso da fast.ai para ML prático é gratuito e absolutamente fenomenal. Recomendo para todas que estão entrando em IA/ML. #datascience #machinelearning',
    tags: ['#datascience', '#machinelearning'],
    likes: 134,
    comments: 21,
    liked: false,
    link: { title: 'Practical Deep Learning — fast.ai', url: 'course.fast.ai' }
  },
  {
    id: 4,
    author: 'Mariana Lima',
    role: 'Product Manager',
    avatar: 'assets/avatars/avatar.svg',
    time: '3 horas atrás',
    text: 'Reflexão do dia: produto sem diversidade nas equipes é produto com pontos cegos. Precisamos de mais mulheres tomando decisões sobre o que construímos. Nossa perspectiva não é diferencial — é necessidade. #mulhereslíderes #product',
    tags: ['#mulhereslíderes', '#product'],
    likes: 203,
    comments: 37,
    liked: false
  }
];

const MOCK_LINKS = [
  { id: 1, title: 'Roadmap Desenvolvedor Full Stack 2024', url: 'https://roadmap.sh', desc: 'Guia visual com todas as habilidades necessárias para se tornar full stack.', categoria: 'Referência' },
  { id: 2, title: 'CSS Grid — Guia Completo', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', desc: 'O recurso mais completo sobre CSS Grid que você vai encontrar online.', categoria: 'Tutorial' },
  { id: 3, title: 'Figma — Design colaborativo', url: 'https://figma.com', desc: 'Ferramenta essencial para design de interfaces, gratuita para estudantes.', categoria: 'Ferramenta' },
  { id: 4, title: 'Women Who Code', url: 'https://womenwhocode.com', desc: 'Comunidade global que apoia mulheres em carreiras de tecnologia.', categoria: 'Referência' },
  { id: 5, title: 'JavaScript.info', url: 'https://javascript.info', desc: 'Tutorial moderno de JavaScript do zero ao avançado, em português.', categoria: 'Tutorial' },
  { id: 6, title: 'Vercel — Deploy instantâneo', url: 'https://vercel.com', desc: 'Plataforma de hospedagem gratuita para projetos front-end.', categoria: 'Ferramenta' }
];

const MOCK_MEMBERS = [
  { id: 1,  name: 'Carla Mendes',   role: 'Full Stack Dev',      avatar: 'assets/avatars/avatar.svg',  online: true,  skills: ['React', 'Node.js'] },
  { id: 2,  name: 'Bia Torres',     role: 'UX Designer',         avatar: 'assets/avatars/avatar.svg',  online: true,  skills: ['Figma', 'UX'] },
  { id: 3,  name: 'Julia Costa',    role: 'Data Scientist',       avatar: 'assets/avatars/avatar.svg', online: true,  skills: ['Python', 'ML'] },
  { id: 4,  name: 'Mariana Lima',   role: 'Product Manager',      avatar: 'assets/avatars/avatar.svg', online: false, skills: ['Product', 'Scrum'] },
  { id: 5,  name: 'Sofia Andrade',  role: 'DevOps Engineer',      avatar: 'assets/avatars/avatar.svg', online: false, skills: ['Docker', 'AWS'] },
  { id: 6,  name: 'Letícia Rocha',  role: 'Desenvolvedora iOS',   avatar: 'assets/avatars/avatar.svg', online: true,  skills: ['Swift', 'iOS'] },
  { id: 7,  name: 'Fernanda Cruz',  role: 'Back-end Developer',   avatar: 'assets/avatars/avatar.svg', online: false, skills: ['Java', 'Spring'] },
  { id: 8,  name: 'Priya Sharma',   role: 'Data Analyst',         avatar: 'assets/avatars/avatar.svg', online: true,  skills: ['SQL', 'Power BI'] },
  { id: 9,  name: 'Amanda Souza',   role: 'Desenvolvedora',       avatar: 'assets/avatars/avatar.svg', online: false, skills: ['Vue.js', 'Firebase'] },
  { id: 10, name: 'Tatiana Alves',  role: 'Designer de Produto',  avatar: 'assets/avatars/avatar.svg', online: false, skills: ['Figma', 'Motion'] },
  { id: 11, name: 'Renata Faria',   role: 'Full Stack Dev',       avatar: 'assets/avatars/avatar.svg', online: true,  skills: ['React', 'GraphQL'] },
  { id: 12, name: 'Camila Duarte',  role: 'Product Manager',      avatar: 'assets/avatars/avatar.svg', online: false, skills: ['Product', 'OKRs'] }
];

/* ─── ESTADO ──────────────────────────────── */

let currentTab    = 'feed';
let allLinks      = [...MOCK_LINKS];
let allMembers    = [...MOCK_MEMBERS];
let allPosts      = [...MOCK_POSTS];
let activePostId  = null;
let nextLinkId    = MOCK_LINKS.length + 1;
let nextPostId    = MOCK_POSTS.length + 1;

/* ─── INIT ────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o layout compartilhado
  if (typeof Layout !== 'undefined') {
    Layout.init({ active: 'comunidade' });
  } else {
    // Fallback caso Layout não esteja disponível
    const collapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (collapsed) document.body.classList.add('sidebar-collapsed');

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        const firstName = user.nome_completo.split(' ')[0];
        const topName = document.getElementById('top-name');
        if (topName) topName.innerText = `Olá, ${firstName}`;
    }
  }

  renderFeed();
  renderLinks();
  renderMembers();
  initSearch();
  const notifDot = document.getElementById('notif-dot');
  if (notifDot) notifDot.style.display = 'block';
});

/* ─── TABS ────────────────────────────────── */

function switchTab(tab) {
  currentTab = tab;
  ['feed', 'links', 'members'].forEach(t => {
    const el = document.getElementById(`section-${t}`);
    const btn = document.getElementById(`tab-${t}`);
    el.style.display = t === tab ? '' : 'none';
    btn.classList.toggle('active', t === tab);
  });
}

/* ─── FEED ────────────────────────────────── */

function renderFeed(posts) {
  const list = document.getElementById('feed-list');
  const data = posts || allPosts;
  list.innerHTML = data.map(post => postHTML(post)).join('');
}

function postHTML(post) {
  const text = escapeHTML(post.text).replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
  return `
  <div class="post-card" id="post-${post.id}">
    <div class="post-header">
      <img src="${post.avatar}" alt="${post.author}" class="post-avatar" />
      <div class="post-meta">
        <div class="post-author">${post.author}</div>
        <div class="post-info">
          <span class="post-role-badge">${post.role}</span>
          · ${post.time}
        </div>
      </div>
      <button class="post-options" onclick="postMenu(${post.id})" title="Opções">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
      </button>
    </div>

    <div class="post-text">${text}</div>

    ${post.image ? `<img src="${post.image}" class="post-image" alt="imagem do post" />` : ''}
    
    ${post.link ? `
    <div class="post-link-preview-wrap">
      <a href="https://${post.link.url}" target="_blank" class="post-link-preview">
        <div class="post-link-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </div>
        <div>
          <div class="post-link-title">${post.link.title}</div>
          <div class="post-link-url">${post.link.url}</div>
        </div>
      </a>
      <button class="post-link-save-btn" onclick="savePostLinkToMyLinks('${post.link.title}', '${post.link.url}', event)" title="Salvar link" style="background:var(--pink-soft);color:var(--pink);border:none;border-radius:8px;padding:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
      </button>
    </div>` : ''}

    <div class="post-footer">
      <button class="reaction-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id}, this)">
        <svg viewBox="0 0 24 24" fill="${post.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span id="likes-${post.id}">${post.likes}</span>
      </button>
      <button class="reaction-btn" onclick="openComments(${post.id})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>${post.comments}</span>
      </button>
      <button class="post-share" onclick="sharePost(${post.id})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        Compartilhar
      </button>
    </div>
  </div>`;
}

function toggleLike(postId, btn) {
  const post = allPosts.find(p => p.id === postId);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  btn.classList.toggle('liked', post.liked);
  const svg = btn.querySelector('svg');
  svg.setAttribute('fill', post.liked ? 'currentColor' : 'none');
  document.getElementById(`likes-${postId}`).textContent = post.likes;
}

function createPost() {
  const field = document.getElementById('composer-field');
  const text = field.innerText.trim();
  if (!text) { showToast('Escreva algo antes de publicar.', 'error'); return; }

  const imgEl = document.getElementById('preview-img');
  const hasImg = document.getElementById('media-preview').style.display !== 'none';

  const post = {
    id: nextPostId++,
    author: CURRENT_USER.name,
    role: CURRENT_USER.role,
    avatar: CURRENT_USER.avatar,
    time: 'Agora mesmo',
    text,
    tags: [],
    likes: 0,
    comments: 0,
    liked: false,
    image: hasImg ? imgEl.src : null
  };

  allPosts.unshift(post);
  field.innerText = '';
  clearMedia();
  renderFeed();
  showToast('Post publicado! 🎉', 'success');
}

/* ─── MEDIA ───────────────────────────────── */

function previewMedia(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('preview-img').src = ev.target.result;
    document.getElementById('media-preview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function clearMedia() {
  document.getElementById('media-preview').style.display = 'none';
  document.getElementById('preview-img').src = '';
  document.getElementById('post-file').value = '';
}

function expandComposer() {
  document.getElementById('composer-footer').style.display = 'flex';
}

function addLink() {
  // Para uma experiência sem prompts nativos, abrimos o modal de criação de post com foco no campo
  const field = document.getElementById('composer-field');
  field.focus();
  Layout.showToast('Cole o link diretamente no campo de texto 🔗');
}

function addEmoji() {
    const emojis = ['🚀', '💜', '✨', '🎉', '💡', '🔥', '👩‍💻', '🌟', '🤝', '🙌', '💻', '🎨', '📚', '💪', '🌈', '⚡', '🎯', '📍', '✅', '❤️'];
    
    const existing = document.getElementById('emoji-picker-modal');
    if (existing) { existing.remove(); return; }

    const emojiBtn = event.target.closest('button');
    const rect = emojiBtn ? emojiBtn.getBoundingClientRect() : null;
    
    const top = rect ? (rect.top - 320) + 'px' : '50%';
    const left = rect ? (rect.left - 100) + 'px' : '50%';

    const modalHtml = `
        <div id="emoji-picker-modal" class="modal modal-detail-overlay" style="display: flex; z-index: 10001; background: transparent;">
            <div class="modal-content" style="max-width: 300px; height: auto; position: fixed; top: ${top}; left: ${left}; padding: 15px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); background: white;">
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;">
                    ${emojis.map(e => `<button onclick="insertEmoji('${e}')" style="font-size: 20px; padding: 5px; border-radius: 8px; transition: background 0.2s; border: none; background: transparent; cursor: pointer;" onmouseover="this.style.background='var(--pink-soft)'" onmouseout="this.style.background='transparent'">${e}</button>`).join('')}
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Fechar ao clicar fora
    document.getElementById('emoji-picker-modal').onclick = (e) => {
        if (e.target.id === 'emoji-picker-modal') e.target.remove();
    };
}

function insertEmoji(emoji) {
    const field = document.getElementById('composer-field');
    field.innerText += emoji;
    field.focus();
    document.getElementById('emoji-picker-modal')?.remove();
}

function savePostLinkToMyLinks(title, url, event) {
    event.preventDefault();
    event.stopPropagation();
    
    const user = State.getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const folders = State.getFolders(user.email);
    
    const modalHtml = `
        <div id="save-link-modal" class="modal modal-detail-overlay" style="display: flex; z-index: 10000;">
            <div class="modal-content" style="max-width: 400px; height: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>Salvar nos Meus Links</h2>
                    <button onclick="document.getElementById('save-link-modal').remove()" style="font-size: 24px; background: none; border: none; cursor: pointer;">&times;</button>
                </div>
                <p style="margin-bottom: 15px; font-size: 14px; color: var(--gray-700);">Escolha uma pasta para salvar: <strong>${title}</strong></p>
                <div class="form-group">
                    <label>Pasta</label>
                    <select id="save-folder-select" class="form-control" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--gray-300);">
                        <option value="">Nenhuma pasta (Geral)</option>
                        ${folders.map(f => `<option value="${f.id}">${f.nome}</option>`).join('')}
                    </select>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button onclick="confirmSavePostLink('${title}', '${url}')" class="btn btn-primary" style="flex: 1;">Salvar</button>
                    <button onclick="document.getElementById('save-link-modal').remove()" class="btn btn-outline" style="flex: 1;">Cancelar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function confirmSavePostLink(title, url) {
    const folderId = document.getElementById('save-folder-select').value;
    const user = State.getCurrentUser();
    
    const linkData = {
        titulo: title,
        url: url.startsWith('http') ? url : `https://${url}`,
        descricao: '',
        categoria: 'Comunidade',
        folderId: folderId ? parseInt(folderId) : null,
        proprietaria_id: user.email,
        favorito: false
    };
    
    State.saveLink(linkData);
    showToast(`Link "${title}" salvo em Meus Links!`, 'success');
    document.getElementById('save-link-modal').remove();
}

/* ─── COMMENTS MODAL ──────────────────────── */

const MOCK_COMMENTS = {
  1: [
    { id: 1, author: 'Bia Torres', avatar: 'assets/avatars/avatar.svg', text: 'Uau! Parabéns, Carla! Vou dar uma olhada no repositório.', time: '3min' },
    { id: 2, author: 'Julia Costa', avatar: 'assets/avatars/avatar.svg', text: 'Que orgulho! Open source é a melhor escola 🚀', time: '7min' }
  ],
  2: [
    { id: 1, author: 'Carla Mendes', avatar: 'assets/avatars/avatar.svg', text: 'Tão importante essa dica! Já apliquei no meu projeto hoje.', time: '20min' }
  ],
  3: [],
  4: []
};

function openComments(postId) {
  activePostId = postId;
  const list = document.getElementById('comments-list');
  const comments = MOCK_COMMENTS[postId] || [];
  list.innerHTML = comments.length
    ? comments.map(c => commentHTML(c)).join('')
    : '<p style="color:var(--text-3); font-size:13px; text-align:center; padding:24px 0;">Nenhum comentário ainda. Seja a primeira! 💬</p>';
  openModal('comments-modal');
}

function commentHTML(c) {
  return `
  <div class="comment-item">
    <img src="${c.avatar}" alt="${c.author}" />
    <div class="comment-bubble">
      <strong>${c.author}</strong>
      <p>${escapeHTML(c.text)}</p>
      <div class="comment-time">${c.time}</div>
    </div>
  </div>`;
}

function submitComment() {
  const input = document.getElementById('comment-input');
  const text = input.value.trim();
  if (!text) return;
  const comment = { id: Date.now(), author: CURRENT_USER.name, avatar: CURRENT_USER.avatar, text, time: 'Agora' };
  if (!MOCK_COMMENTS[activePostId]) MOCK_COMMENTS[activePostId] = [];
  MOCK_COMMENTS[activePostId].push(comment);
  const list = document.getElementById('comments-list');
  const p = list.querySelector('p');
  if (p) p.remove();
  list.insertAdjacentHTML('beforeend', commentHTML(comment));
  list.scrollTop = list.scrollHeight;
  input.value = '';

  const post = allPosts.find(p => p.id === activePostId);
  if (post) {
    post.comments++;
    const card = document.getElementById(`post-${activePostId}`);
    if (card) {
      const btns = card.querySelectorAll('.reaction-btn');
      btns.forEach(b => {
        const spans = b.querySelectorAll('span');
        if (spans.length && b.textContent.includes(post.comments - 1)) {
          spans[0].textContent = post.comments;
        }
      });
    }
  }
}

/* ─── LINKS ───────────────────────────────── */

let currentLinkFilter = 'todos';

function renderLinks(filter) {
  const grid = document.getElementById('links-grid');
  const data = filter && filter !== 'todos'
    ? allLinks.filter(l => l.categoria === filter)
    : allLinks;
  grid.innerHTML = data.map(l => linkCardHTML(l)).join('');
}

function linkCardHTML(link) {
  return `
  <div class="link-card" data-cat="${link.categoria}" id="link-${link.id}">
    <div class="link-card-top">
      <div class="link-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </div>
      <span class="link-cat-badge">${link.categoria}</span>
    </div>
    <div class="link-card-title">${escapeHTML(link.title)}</div>
    ${link.desc ? `<div class="link-card-desc">${escapeHTML(link.desc)}</div>` : ''}
    <div class="link-card-url">${link.url}</div>
    <div class="link-card-footer">
      <a href="${link.url}" target="_blank" class="link-open-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Abrir
      </a>
      <button class="link-save-btn" onclick="saveToMyLinks(${link.id})" title="Salvar nos Meus Links" style="background: var(--pink-soft); color: var(--pink); border-radius: 8px; padding: 6px; display: flex; align-items: center; justify-content: center;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
      </button>
      <button class="link-del-btn" onclick="deleteLink(${link.id})" title="Remover">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>
    </div>
  </div>`;
}

function filterLinks(cat, btn) {
  currentLinkFilter = cat;
  document.querySelectorAll('.links-filter .filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderLinks(cat === 'todos' ? null : cat);
}

function saveLink(e) {
    e.preventDefault();
    const title = document.getElementById('link-titulo').value.trim();
    const url   = document.getElementById('link-url').value.trim();
    const desc  = document.getElementById('link-desc').value.trim();
    const cat   = document.getElementById('link-categoria').value;
    if (!title || !url) return;

    allLinks.unshift({ id: nextLinkId++, title, url, desc, categoria: cat });
    renderLinks(currentLinkFilter === 'todos' ? null : currentLinkFilter);
    closeModal('link-modal');
    document.getElementById('link-form').reset();
    showToast('Link postado na comunidade! 🔗', 'success');
}

function saveToMyLinks(id) {
    const link = allLinks.find(l => l.id === id);
    if (!link) return;
    
    const user = State.getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const folders = State.getFolders(user.email);
    
    const modalHtml = `
        <div id="save-link-modal" class="modal modal-detail-overlay" style="display: flex; z-index: 10000;">
            <div class="modal-content" style="max-width: 400px; height: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>Salvar nos Meus Links</h2>
                    <button onclick="document.getElementById('save-link-modal').remove()" style="font-size: 24px;">&times;</button>
                </div>
                <p style="margin-bottom: 15px; font-size: 14px; color: var(--gray-700);">Escolha uma pasta para salvar: <strong>${link.title}</strong></p>
                <div class="form-group">
                    <label>Pasta</label>
                    <select id="save-folder-select" class="form-control" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--gray-300);">
                        <option value="">Nenhuma pasta (Geral)</option>
                        ${folders.map(f => `<option value="${f.id}">${f.nome}</option>`).join('')}
                    </select>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button onclick="confirmSaveToMyLinks(${id})" class="btn btn-primary" style="flex: 1;">Salvar</button>
                    <button onclick="document.getElementById('save-link-modal').remove()" class="btn btn-outline" style="flex: 1;">Cancelar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function confirmSaveToMyLinks(id) {
    const link = allLinks.find(l => l.id === id);
    const folderId = document.getElementById('save-folder-select').value;
    const user = State.getCurrentUser();
    
    const linkData = {
        titulo: link.title,
        url: link.url.startsWith('http') ? link.url : `https://${link.url}`,
        descricao: link.desc || '',
        categoria: link.categoria || 'Comunidade',
        folderId: folderId ? parseInt(folderId) : null,
        proprietaria_id: user.email,
        favorito: false
    };
    
    State.saveLink(linkData);
    showToast(`Link "${link.title}" salvo em Meus Links!`, 'success');
    document.getElementById('save-link-modal').remove();
    closeModal('link-detail-modal');
}

function deleteLink(id) {
  allLinks = allLinks.filter(l => l.id !== id);
  renderLinks();
  showToast('Link removido.', 'success');
}

/* ─── MEMBERS ─────────────────────────────── */

let memberRoleFilter = 'todos';

function renderMembers(list) {
  const grid = document.getElementById('members-grid');
  const data = list || allMembers;
  grid.innerHTML = data.map(m => memberCardHTML(m)).join('');
}

function memberCardHTML(m) {
  return `
  <div class="member-card" id="member-${m.id}">
    <div class="member-avatar-wrap">
      <img src="${m.avatar}" alt="${m.name}" />
      ${m.online ? '<span class="online-indicator"></span>' : ''}
    </div>
    <div class="member-card-name">${m.name}</div>
    <div class="member-card-role">${m.role}</div>
    <div class="member-card-skills">
      ${m.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
    </div>
    <button class="member-card-follow" onclick="followMember(${m.id}, this)">Seguir</button>
  </div>`;
}

function filterMemberRole(role, btn) {
  memberRoleFilter = role;
  document.querySelectorAll('.members-filter .filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const filtered = role === 'todos' ? allMembers : allMembers.filter(m => m.role.includes(role));
  renderMembers(filtered);
}

function filterMembers(query) {
  const q = query.toLowerCase();
  const filtered = !q
    ? (memberRoleFilter === 'todos' ? allMembers : allMembers.filter(m => m.role.includes(memberRoleFilter)))
    : allMembers.filter(m => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.skills.some(s => s.toLowerCase().includes(q)));
  renderMembers(filtered);
}

function followMember(id, btn) {
  const following = btn.classList.toggle('following');
  btn.textContent = following ? 'Seguindo ✓' : 'Seguir';
  showToast(following ? 'Você começou a seguir! 💜' : 'Deixou de seguir.', following ? 'success' : '');
}

function followUser(btn) {
  const following = btn.classList.toggle('following');
  btn.textContent = following ? 'Seguindo' : 'Seguir';
}

function viewProfile(id) {
    const member = allMembers.find(m => m.id === id);
    if (member) {
        localStorage.setItem('visitingUser', JSON.stringify({
            email: member.email || `member${id}@example.com`,
            nome_completo: member.name,
            username: member.name.toLowerCase().replace(' ', ''),
            profissao: member.role,
            foto_perfil: member.avatar,
            bio: member.bio || 'Membro da comunidade SheTech.',
            is_member: true
        }));
        window.location.href = 'perfil.html?user=' + id;
    } else {
        showToast('Perfil não encontrado.', 'error');
    }
}

/* ─── SEARCH ──────────────────────────────── */

function initSearch() {
  const input = document.getElementById('community-search');
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (currentTab === 'feed') {
      if (!q) { renderFeed(); return; }
      renderFeed(allPosts.filter(p => p.text.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)));
    } else if (currentTab === 'links') {
      if (!q) { renderLinks(); return; }
      renderLinks(allLinks.filter(l => l.title.toLowerCase().includes(q) || l.url.includes(q)));
    } else if (currentTab === 'members') {
      filterMembers(q);
    }
  });

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); input.focus(); }
  });
}

/* ─── MODALS ──────────────────────────────── */

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  if (id === 'comments-modal') {
    el.classList.add('modal-overlay--detail');
  }
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  el.classList.remove('modal-overlay--detail');
  document.body.style.overflow = '';
}

function closeOnOverlay(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

/* ─── NOTIFICATIONS ───────────────────────── */

function toggleNotifications() {
  const dd = document.getElementById('notif-dropdown');
  dd.classList.toggle('open');
  if (dd.classList.contains('open')) {
    document.getElementById('notif-dot').style.display = 'none';
    document.addEventListener('click', closeNotifOnOutside);
  }
}

function closeNotifOnOutside(e) {
  const dd = document.getElementById('notif-dropdown');
  const btn = document.getElementById('notif-btn');
  if (!dd.contains(e.target) && !btn.contains(e.target)) {
    dd.classList.remove('open');
    document.removeEventListener('click', closeNotifOnOutside);
  }
}

function markAllRead() {
  document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
  showToast('Todas marcadas como lidas.', 'success');
}

/* ─── SIDEBAR ─────────────────────────────── */
// A funcionalidade de sidebar agora é gerenciada pelo Layout.js compartilhado.
// O botão de toggle na topbar chama a função global toggleSidebar se necessário,
// mas o padrão do sistema é usar o botão dentro da sidebar injetado pelo Layout.js.

/* ─── POST OPTIONS ────────────────────────── */

function postMenu(id) {
  // Fechar qualquer dropdown aberto
  document.querySelectorAll('.post-dropdown-menu').forEach(m => m.remove());
  
  const btn = document.querySelector(`#post-${id} .post-options`);
  if (!btn) return;
  
  const post = allPosts.find(p => p.id === id);
  const isOwn = post && post.author === CURRENT_USER.name;

  const menu = document.createElement('div');
  menu.className = 'post-dropdown-menu';
  menu.innerHTML = `
    <button class="post-dropdown-item" onclick="editPost(${id})">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      Editar
    </button>
    <button class="post-dropdown-item post-dropdown-item--danger" onclick="deletePost(${id})">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      Excluir
    </button>
  `;

  btn.parentElement.style.position = 'relative';
  btn.parentElement.appendChild(menu);

  // Fechar ao clicar fora
  setTimeout(() => {
    document.addEventListener('click', function closeMenu(e) {
      if (!menu.contains(e.target) && e.target !== btn) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    });
  }, 0);
}

function editPost(id) {
  document.querySelectorAll('.post-dropdown-menu').forEach(m => m.remove());
  const post = allPosts.find(p => p.id === id);
  if (!post) return;

  const existing = document.getElementById('edit-post-modal');
  if (existing) existing.remove();

  const modalHtml = `
    <div id="edit-post-modal" class="modal-overlay" onclick="closeOnOverlay(event,'edit-post-modal')">
      <div class="modal-box">
        <div class="modal-header">
          <h2>Editar Post</h2>
          <button class="modal-close" onclick="closeModal('edit-post-modal')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="form-group" style="margin-top:16px">
          <label>Texto do post</label>
          <textarea id="edit-post-text" rows="5" style="width:100%;padding:12px;border:1px solid var(--gray-200);border-radius:12px;font-family:inherit;font-size:14px;resize:vertical;">${post.text}</textarea>
        </div>
        <div class="modal-footer" style="margin-top:16px">
          <button type="button" class="btn-ghost" onclick="closeModal('edit-post-modal')">Cancelar</button>
          <button type="button" class="btn-primary" onclick="saveEditedPost(${id})">Salvar</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  openModal('edit-post-modal');
}

function saveEditedPost(id) {
  const text = document.getElementById('edit-post-text').value.trim();
  if (!text) return;
  const post = allPosts.find(p => p.id === id);
  if (post) {
    post.text = text;
    renderFeed();
    showToast('Post atualizado! ✏️', 'success');
  }
  closeModal('edit-post-modal');
  document.getElementById('edit-post-modal')?.remove();
}

function deletePost(id) {
  if (!confirm('Tem certeza que deseja excluir este post?')) return;
  allPosts = allPosts.filter(p => p.id !== id);
  renderFeed();
  showToast('Post excluído.', 'success');
}

function sharePost(id) {
    const post = allPosts.find(p => p.id === id);
    if (!post) return;
    
    const url = encodeURIComponent(window.location.href + '#post-' + id);
    const text = encodeURIComponent(`Confira este post de ${post.author} na comunidade SheTech!`);
    
    const modalHtml = `
        <div id="share-modal" class="modal modal-detail-overlay" style="display: flex; z-index: 9999;">
            <div class="modal-content" style="max-width: 400px; height: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>Compartilhar Post</h2>
                    <button onclick="document.getElementById('share-modal').remove()" style="font-size: 24px;">&times;</button>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                    <a href="https://api.whatsapp.com/send?text=${text}%20${url}" target="_blank" class="btn btn-outline" style="flex-direction: column; gap: 5px; padding: 15px; font-size: 12px;">
                        <i class="icon-message-circle" style="font-size: 20px; color: #25D366;"></i>
                        <span>WhatsApp</span>
                    </a>
                    <a href="https://t.me/share/url?url=${url}&text=${text}" target="_blank" class="btn btn-outline" style="flex-direction: column; gap: 5px; padding: 15px; font-size: 12px;">
                        <i class="icon-send" style="font-size: 20px; color: #0088cc;"></i>
                        <span>Telegram</span>
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" class="btn btn-outline" style="flex-direction: column; gap: 5px; padding: 15px; font-size: 12px;">
                        <i class="icon-facebook" style="font-size: 20px; color: #1877F2;"></i>
                        <span>Facebook</span>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" class="btn btn-outline" style="flex-direction: column; gap: 5px; padding: 15px; font-size: 12px;">
                        <i class="icon-instagram" style="font-size: 20px; color: #E4405F;"></i>
                        <span>Instagram</span>
                    </a>
                    <a href="https://discord.com/channels/@me" target="_blank" class="btn btn-outline" style="flex-direction: column; gap: 5px; padding: 15px; font-size: 12px;">
                        <i class="icon-message-square" style="font-size: 20px; color: #5865F2;"></i>
                        <span>Discord</span>
                    </a>
                    <button onclick="copyPostLink('${window.location.href + '#post-' + id}')" class="btn btn-outline" style="flex-direction: column; gap: 5px; padding: 15px; font-size: 12px;">
                        <i class="icon-copy" style="font-size: 20px; color: var(--pink);"></i>
                        <span>Copiar</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function copyPostLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        showToast('Link copiado!', 'success');
        document.getElementById('share-modal')?.remove();
    });
}

/* ─── TOAST ───────────────────────────────── */

function showToast(msg, type) {
  if (typeof Layout !== 'undefined' && Layout.showToast) {
    Layout.showToast(msg);
  } else {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'toast show' + (type ? ' ' + type : '');
    setTimeout(() => el.classList.remove('show'), 3200);
  }
}

/* ─── UTILS ───────────────────────────────── */

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}