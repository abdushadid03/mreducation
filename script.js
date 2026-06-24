// =============================================
//           تبديل الوضع الداكن / الفاتح
// =============================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// التحقق من التفضيل المحفوظ
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// =============================================
//           محاكاة تسجيل الدخول
// =============================================
const loginBtn = document.getElementById('login-btn');
const userProfile = document.getElementById('user-profile');
const userName = document.getElementById('user-name');

const loggedUser = localStorage.getItem('loggedUser');
if (loggedUser) {
    loginBtn.style.display = 'none';
    userProfile.style.display = 'flex';
    userName.textContent = loggedUser;
}

// دالة تسجيل الخروج (يمكن إضافتها في أي مكان)
function logout() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isPremium');
    location.reload();
}

// =============================================
//           عرض رسائل منبثقة
// =============================================
function showMessage(text, type = 'info') {
    const msg = document.createElement('div');
    const bgColor = type === 'success' ? '#48bb78' : type === 'error' ? '#fc8181' : '#4299e1';
    msg.style.cssText = `
        position: fixed;
        top: 25px;
        left: 50%;
        transform: translateX(-50%);
        padding: 14px 40px;
        border-radius: 40px;
        background: ${bgColor};
        color: white;
        font-weight: 700;
        font-size: 17px;
        z-index: 9999;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        direction: rtl;
        font-family: 'Tajawal', sans-serif;
    `;
    msg.textContent = text;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 4500);
}

// =============================================
//           معالجة روابط URL
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const grade = params.get('grade');
    const subject = params.get('subject');

    if (grade) {
        console.log(`📚 عرض محتوى الصف ${grade}`);
        // يمكنك هنا توجيه المستخدم إلى محتوى الصف المطلوب
    }

    if (subject) {
        console.log(`🔬 عرض محتوى المادة ${subject}`);
    }
});

// =============================================
//           تضمين فيديو يوتيوب
// =============================================
function embedYouTube(videoId, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:16px;">
                <iframe 
                    style="position:absolute;top:0;left:0;width:100%;height:100%;"
                    src="https://www.youtube.com/embed/${videoId}" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
    }
}
// =============================================
//           قائمة الجوال
// =============================================
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// إغلاق القائمة عند الضغط خارجها
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// إغلاق القائمة عند الضغط على رابط
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});
// =============================================
//           إصلاح القوائم المنسدلة على الجوال
// =============================================

// الحصول على جميع عناصر dropdown
const dropdowns = document.querySelectorAll('.dropdown > a');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        // فقط على الشاشات الصغيرة
        if (window.innerWidth <= 768) {
            e.preventDefault();
            
            // الحصول على القائمة المنسدلة التابعة لهذا العنصر
            const menu = this.nextElementSibling;
            
            // إغلاق جميع القوائم الأخرى أولاً
            document.querySelectorAll('.dropdown-menu').forEach(m => {
                if (m !== menu) {
                    m.style.display = 'none';
                }
            });
            
            // تبديل عرض القائمة الحالية
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        }
    });
});

// إغلاق القوائم عند الضغط خارجها
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(m => {
            m.style.display = 'none';
        });
    }
});
