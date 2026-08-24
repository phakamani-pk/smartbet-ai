const focusCards = [
  { tag: 'AI model', value: '8.4/10', note: 'Signal strength above baseline' },
  { tag: 'Risk score', value: 'Low', note: 'Volatility remains controlled' },
  { tag: 'Streak', value: '4 wins', note: 'Last 4 analysis sessions positive' },
];

const stats = [
  { label: 'Total analyses', value: '156', trend: '+12%' },
  { label: 'Win rate', value: '73%', trend: '+4.2%' },
  { label: 'Budget used', value: '$420', trend: '-8%' },
  { label: 'Savings', value: '$180', trend: '+18%' },
];

const chartValues = [52, 68, 62, 84, 90, 78, 96];
const sportsEdge = [
  { label: 'Team form', value: 'Chelsea' },
  { label: 'Underdog value', value: 'Bologna +1.6' },
  { label: 'Goal trend', value: 'Over 2.5' },
];

const hotNumbers = [7, 23, 41, 12, 29];
const coldNumbers = [5, 16, 33, 48, 54];
const lotteryBars = [74, 68, 61, 58, 49, 42];

const matches = [
  { league: 'Premier League', teamA: 'Arsenal', teamB: 'Man City', oddA: '1.82', oddB: '3.40', time: 'Tonight • 8:00 PM' },
  { league: 'Serie A', teamA: 'Juventus', teamB: 'Inter', oddA: '2.10', oddB: '2.80', time: 'Tonight • 9:30 PM' },
  { league: 'NBA', teamA: 'Lakers', teamB: 'Warriors', oddA: '1.94', oddB: '2.95', time: 'Tomorrow • 10:00 PM' },
];

const chatMessages = [
  { author: 'bot', text: 'I see a strong pattern in low-risk number clusters and underdog over-performance in the last 7 days.' },
  { author: 'user', text: 'Which bets have the best value tonight?' },
  { author: 'bot', text: 'Chelsea to win, Bologna +1.6, and over 2.5 in the Juventus vs Inter matchup look strongest on current market data.' },
];

const promptIdeas = ['Value picks', 'Hot numbers', 'Budget check', 'Responsible play'];
const quickActions = ['AI summary', 'Lottery scan', 'Sports picks', 'Budget check'];
const marketWatch = [
  { name: 'Lottery momentum', value: '+11.6%' },
  { name: 'Sports over market', value: '+2.4%' },
  { name: 'Client retention', value: '92%' },
];
const signalChecklist = [
  { label: 'Odds quality check', state: 'Passed' },
  { label: 'Budget guard', state: 'Active' },
  { label: 'Cold streak alert', state: 'Clear' },
];
const predictionFeed = [
  { name: 'Powerball hot streak', score: '76%' },
  { name: 'Premier League value', score: '71%' },
  { name: 'NBA underdog trend', score: '68%' },
];
const watchlist = [
  { name: 'Lucky 7', status: 'High confidence' },
  { name: 'Bologna +1.6', status: 'Momentum' },
  { name: 'Over 2.5 goals', status: 'Stable' },
];

const focusGrid = document.getElementById('focusGrid');
const quickActionsEl = document.getElementById('quickActions');
const statsGrid = document.getElementById('statsGrid');
const lotteryTrend = document.getElementById('lotteryTrend');
const sportsEdgeList = document.getElementById('sportsEdgeList');
const hotNumbersEl = document.getElementById('hotNumbers');
const coldNumbersEl = document.getElementById('coldNumbers');
const lotteryBarsEl = document.getElementById('lotteryBars');
const matchGrid = document.getElementById('matchGrid');
const chatThread = document.getElementById('chatThread');
const promptRow = document.getElementById('promptRow');
const marketWatchEl = document.getElementById('marketWatch');
const signalChecklistEl = document.getElementById('signalChecklist');
const predictionFeedEl = document.getElementById('predictionFeed');
const watchlistEl = document.getElementById('watchlist');
const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.panel');

function renderQuickActions() {
  quickActionsEl.innerHTML = quickActions
    .map((action) => `<button class="quick-action">${action}</button>`)
    .join('');
}

function renderFocusCards() {
  focusGrid.innerHTML = focusCards
    .map(
      (card) => `
        <article class="focus-card">
          <span class="tag">${card.tag}</span>
          <strong>${card.value}</strong>
          <span>${card.note}</span>
        </article>
      `
    )
    .join('');
}

function renderStats() {
  statsGrid.innerHTML = stats
    .map(
      (stat) => `
        <article class="stat-card">
          <p class="label">${stat.label}</p>
          <div class="value">
            <strong>${stat.value}</strong>
            <span class="trend">${stat.trend}</span>
          </div>
        </article>
      `
    )
    .join('');
}

function renderTrend() {
  lotteryTrend.innerHTML = chartValues
    .map((value) => `<div class="trend-bar" style="height: ${value}%"></div>`)
    .join('');
}

function renderSportsEdge() {
  sportsEdgeList.innerHTML = sportsEdge
    .map(
      (item) => `
        <li>
          <span>${item.label}</span>
          <span>${item.value}</span>
        </li>
      `
    )
    .join('');
}

function renderNumberPills(container, values, type = 'hot') {
  const className = type === 'hot' ? 'number-pill' : 'number-pill';
  container.innerHTML = values
    .map((value) => `<span class="${className}">${value}</span>`)
    .join('');
}

function renderBars() {
  lotteryBarsEl.innerHTML = lotteryBars
    .map(
      (value, index) => `
        <div class="bar-item">
          <span>${index + 1}</span>
          <div class="bar-track">
            <span class="bar-fill" style="width:${value}%"></span>
          </div>
          <strong>${value}%</strong>
        </div>
      `
    )
    .join('');
}

function renderMatches() {
  matchGrid.innerHTML = matches
    .map(
      (match) => `
        <article class="match-card">
          <div class="match-head">
            <span class="mini-label">${match.league}</span>
            <span class="odd-tag">Live</span>
          </div>
          <div class="team-row">
            <strong>${match.teamA}</strong>
            <span class="odd-tag">${match.oddA}</span>
          </div>
          <div class="team-row">
            <strong>${match.teamB}</strong>
            <span class="odd-tag">${match.oddB}</span>
          </div>
          <div class="match-footer">
            <span>${match.time}</span>
            <span>Model edge: 76%</span>
          </div>
        </article>
      `
    )
    .join('');
}

function renderChat() {
  chatThread.innerHTML = chatMessages
    .map(
      (message) => `
        <div class="message ${message.author}">
          ${message.text}
        </div>
      `
    )
    .join('');
}

function renderPrompts() {
  promptRow.innerHTML = promptIdeas
    .map((idea) => `<button class="prompt-chip">${idea}</button>`)
    .join('');
}

function renderMarketWatch() {
  marketWatchEl.innerHTML = marketWatch
    .map(
      (item) => `
        <div class="market-item">
          <div class="name">${item.name}</div>
          <div class="value">${item.value}</div>
        </div>
      `
    )
    .join('');
}

function renderSignalChecklist() {
  signalChecklistEl.innerHTML = signalChecklist
    .map(
      (item) => `
        <div class="toggle-item">
          <div class="label">${item.label}</div>
          <div class="state">${item.state}</div>
          <span class="status-dot"></span>
        </div>
      `
    )
    .join('');
}

function renderPredictionFeed() {
  predictionFeedEl.innerHTML = predictionFeed
    .map(
      (item) => `
        <div class="feed-item">
          <div>
            <strong>${item.name}</strong>
            <span>AI generated</span>
          </div>
          <span class="feed-score">${item.score}</span>
        </div>
      `
    )
    .join('');
}

function renderWatchlist() {
  watchlistEl.innerHTML = watchlist
    .map(
      (item) => `
        <div class="watch-item">
          <div>
            <strong>${item.name}</strong>
            <span>${item.status}</span>
          </div>
          <span class="watch-score">Live</span>
        </div>
      `
    )
    .join('');
}

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((nav) => nav.classList.remove('active'));
    item.classList.add('active');

    panels.forEach((panel) => {
      const isActive = panel.id === item.dataset.target;
      panel.classList.toggle('active-panel', isActive);
    });
  });
});

const refreshButton = document.getElementById('refreshInsight');
refreshButton.addEventListener('click', () => {
  const randomValue = Math.floor(Math.random() * 12) + 68;
  const heroTitle = document.querySelector('.hero-card h3');
  heroTitle.textContent = `${randomValue}% predictive confidence`;

  const randomStat = Math.floor(Math.random() * 25) + 12;
  const statValue = document.querySelector('.stat-card .value strong');
  if (statValue) {
    statValue.textContent = `${randomStat}%`;
  }
});

renderQuickActions();
renderFocusCards();
renderStats();
renderTrend();
renderSportsEdge();
renderNumberPills(hotNumbersEl, hotNumbers, 'hot');
renderNumberPills(coldNumbersEl, coldNumbers, 'cold');
renderBars();
renderMatches();
renderChat();
renderPrompts();
renderMarketWatch();
renderSignalChecklist();
renderPredictionFeed();
renderWatchlist();
