// Firebase 설정
const firebaseConfig = {
    // Firebase 설정을 여기에 입력하세요
};

// 화면 전환 관리
const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.nav-btn');

function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove('active');
        if (screen.id === screenId + 'Screen') {
            screen.classList.add('active');
        }
    });

    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.screen === screenId) {
            btn.classList.add('active');
        }
    });
}

// 네비게이션 버튼 이벤트 리스너
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        showScreen(btn.dataset.screen);
    });
});

// 폼 제출 처리
const sellForm = document.getElementById('sellForm');
const buyForm = document.getElementById('buyForm');

function handleFormSubmit(event, type) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        type: type,
        propertyType: formData.get('propertyType'),
        address: formData.get('address'),
        buildingName: formData.get('buildingName'),
        area: formData.get('area'),
        price: formData.get('price'),
        description: formData.get('description'),
        timestamp: new Date().toISOString(),
        userId: 'current-user-id' // Firebase 인증 후 실제 사용자 ID로 대체
    };
    
    // Firebase에 데이터 저장
    console.log('Submitting form:', data);
    event.target.reset();
}

sellForm.addEventListener('submit', (e) => handleFormSubmit(e, 'sell'));
buyForm.addEventListener('submit', (e) => handleFormSubmit(e, 'buy'));

// 검색 기능
const searchInput = document.getElementById('searchInput');
const locationSearch = document.getElementById('locationSearch');

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    // 검색 로직 구현
    console.log('Searching for:', searchTerm);
}

searchInput.addEventListener('input', handleSearch);
locationSearch.addEventListener('input', handleSearch);

// 지역 필터
const cityFilter = document.getElementById('cityFilter');
const districtFilter = document.getElementById('districtFilter');

function updateDistricts() {
    const selectedCity = cityFilter.value;
    // 선택된 시/도에 따라 구/군 옵션 업데이트
    console.log('Selected city:', selectedCity);
}

cityFilter.addEventListener('change', updateDistricts);

// 채팅 목록 렌더링
function renderChatList(chats) {
    const chatList = document.querySelector('.chat-list');
    chatList.innerHTML = chats.map(chat => `
        <div class="chat-item">
            <div class="chat-avatar"></div>
            <div class="chat-info">
                <div class="chat-name">${chat.name}</div>
                <div class="chat-preview">${chat.lastMessage}</div>
            </div>
        </div>
    `).join('');
}

// 게시판 목록 렌더링
function renderBulletinList(posts) {
    const bulletinList = document.querySelector('.bulletin-list');
    bulletinList.innerHTML = posts.map(post => `
        <div class="bulletin-item">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <button class="chat-btn">채팅하기</button>
        </div>
    `).join('');
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    showScreen('home');
    
    // 샘플 데이터로 렌더링
    renderChatList([
        { name: '사용자1', lastMessage: '안녕하세요!' },
        { name: '사용자2', lastMessage: '매물 문의드립니다.' }
    ]);
    
    renderBulletinList([
        { title: '강남 아파트 매매', description: '강남구 역삼동, 전용 84m²' },
        { title: '신촌 원룸 임대', description: '서대문구 창천동, 전용 20m²' }
    ]);
});

// Google Maps 초기화 (API 키 필요)
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.5665, lng: 126.9780 }, // 서울 중심 좌표
        zoom: 11
    });
}