export const headerTemplate = (token) => {
  return `
      <a href="/" class="navigation-link text-black">
        <h1 id="navigation-main" class="btn text-center font-bold mb-10">🚇 지하철 노선도</h1>
      </a>
      <nav class="d-flex justify-center flex-wrap">
        <a href="/stations" class="navigation-link my-1">
          <button id="navigation-stations" class="navigation-button btn bg-white shadow mx-1">🚉 역 관리</button>
        </a>
        <a href="/lines" class="navigation-link my-1">
          <button id="navigation-lines" class="navigation-button btn bg-white shadow mx-1">🛤️ 노선 관리</button>
        </a>
        <a href="/sections" class="navigation-link my-1">
          <button id="navigation-sections" class="navigation-button btn bg-white shadow mx-1">
            🔁 구간 관리
          </button>
        </a>
        <a href="/login" class="navigation-link my-1">
          <button id="navigation-login" class="navigation-button btn bg-white shadow mx-1 ${token ? 'd-none' : ''}">
            👤 로그인
          </button>
        </a>
        <a href="/logout" class="navigation-link my-1">
          <button id="navigation-logout" class="navigation-button btn bg-white shadow mx-1 ${token ? '' : 'd-none'}">
            👤 로그아웃
          </button>
        </a>
      </nav>`;
};
