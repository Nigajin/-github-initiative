export const APP_NAME = "디딤 (Didim)";

// 챗봇 시스템 지침은 제거하고, 앱 전반의 톤앤매너 유지용으로 남겨둘 수 있으나 현재는 사용처가 없으므로 제거하거나 유지합니다.
// 여기서는 챌린지 데이터 위주로 구성합니다.

export const INITIAL_TASKS = [
    { id: '1', text: '기지개 켜기', completed: false, difficulty: 'easy' },
    { id: '2', text: '물 한 잔 마시기', completed: false, difficulty: 'easy' },
    { id: '3', text: '창문 열고 환기하기', completed: false, difficulty: 'medium' },
];

export const INITIAL_CHALLENGES = [
    { 
        id: 'c1', 
        title: '책상 정리하기', 
        description: '공부를 시작하기 전, 주변을 정돈해보세요. 마음도 정돈됩니다.', 
        category: 'study', 
        xp: 50, 
        completed: false,
        icon: '🧹'
    },
    { 
        id: 'c2', 
        title: '집 앞 편의점 다녀오기', 
        description: '잠깐의 바깥 공기는 기분 전환에 큰 도움이 됩니다.', 
        category: 'outdoor', 
        xp: 100, 
        completed: false,
        icon: '🏪'
    },
    { 
        id: 'c3', 
        title: '도서관/카페 방문하기', 
        description: '다른 사람들이 있는 공간에 잠시 머물러보세요.', 
        category: 'outdoor', 
        xp: 300, 
        completed: false,
        icon: '📚'
    },
    { 
        id: 'c4', 
        title: '30분 독서 또는 공부', 
        description: '타이머를 켜고 딱 30분만 무언가에 집중해보세요.', 
        category: 'study', 
        xp: 200, 
        completed: false,
        icon: '📝'
    },
    { 
        id: 'c5', 
        title: '이불 개기', 
        description: '아침의 작은 성공이 하루를 바꿉니다.', 
        category: 'life', 
        xp: 30, 
        completed: false,
        icon: '🛏️'
    },
];

export const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 800, 1200, 2000, 3000];