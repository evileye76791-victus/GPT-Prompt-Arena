// PROMPT DATA REPOSITORY
const promptsData = [
  {
    id: 1,
    title: "Cinematic Anime Boy vs Monster Battle",
    tag: "Sora / Midjourney",
    mediaType: "image",
    mediaUrl: "", 
    prompt: "An epic cinematic anime shot of a young boy facing an enormous towering shadow monster in a rain-soaked futuristic city. Dynamic low-angle camera angle, glowing blue energy aura surrounding the boy, neon reflections on wet asphalt, volumetric lighting, hyper-detailed action anime style, 8k resolution, photorealistic masterpiece."
  },
  {
    id: 2,
    title: "Master ChatGPT Coding Assistant",
    tag: "ChatGPT / Claude",
    mediaType: "none",
    mediaUrl: "",
    prompt: "You are an elite Senior Full-Stack Engineer and Architect. When I present a code snippet or request, analyze it step-by-step for performance optimizations, memory leaks, and edge cases. Always respond with clean, production-ready, modular code accompanied by precise explanations."
  },
  {
    id: 3,
    title: "Cyberpunk Street Samurai Character Design",
    tag: "Midjourney v6",
    mediaType: "image",
    mediaUrl: "",
    prompt: "Full-body portrait of a female cyberpunk samurai standing under glowing hologram signages in a misty Tokyo street. Cybernetic armor with gold accents, katana with glowing plasma edge, vibrant contrast, Unreal Engine 5 render, extremely detailed face features --ar 9:16 --v 6.0"
  }
];

let activePromptObj = null;

// RENDER GRID CARDS
function renderGrid() {
  const gridContainer = document.getElementById('explore-grid');
  const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
  
  gridContainer.innerHTML = '';

  const filteredData = promptsData.filter(item => {
    return item.title.toLowerCase().includes(searchInput) || 
           item.prompt.toLowerCase().includes(searchInput) ||
           item.tag.toLowerCase().includes(searchInput);
  });

  if (filteredData.length === 0) {
    gridContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 24px 0;">No prompts found matching your search.</p>`;
    return;
  }

  filteredData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => openFullPage(item.id);

    let mediaHtml = '';
    if (item.mediaType === 'image' && item.mediaUrl) {
      mediaHtml = `<img src="${item.mediaUrl}" alt="${item.title}" class="card-media">`;
    }

    card.innerHTML = `
      ${mediaHtml}
      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-snippet">${item.prompt}</p>
        <div class="card-action-bar">
          <span class="tag">${item.tag}</span>
          <button class="open-btn">View Prompt</button>
        </div>
      </div>
    `;

    gridContainer.appendChild(card);
  });
}

// OPEN DETAIL VIEW
function openFullPage(id) {
  const item = promptsData.find(p => p.id === id);
  if (!item) return;

  activePromptObj = item;

  document.getElementById('fullTitle').innerText = item.title;
  document.getElementById('fullTag').innerText = item.tag;
  document.getElementById('fullPromptText').innerText = item.prompt;

  const mediaBox = document.getElementById('fullMediaBox');
  if (item.mediaType === 'image' && item.mediaUrl) {
    mediaBox.style.display = 'block';
    mediaBox.innerHTML = `<img src="${item.mediaUrl}" alt="${item.title}">`;
  } else {
    mediaBox.style.display = 'none';
    mediaBox.innerHTML = '';
  }

  document.getElementById('full-detail-page').classList.add('active');
}

// CLOSE DETAIL VIEW
function closeFullPage() {
  document.getElementById('full-detail-page').classList.remove('active');
  activePromptObj = null;
}

// COPY PROMPT TO CLIPBOARD
function copyFullPrompt() {
  if (!activePromptObj) return;

  navigator.clipboard.writeText(activePromptObj.prompt).then(() => {
    const btnHeader = document.getElementById('fullCopyBtnHeader');
    const btnMain = document.getElementById('fullCopyBtnMain');

    btnHeader.innerText = 'Copied!';
    btnMain.innerText = 'Copied to Clipboard!';

    setTimeout(() => {
      btnHeader.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy`;
      btnMain.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Full Prompt`;
    }, 2000);
  });
}

// INITIAL RENDER
document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
});
