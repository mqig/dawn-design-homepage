// 主要交互逻辑

// ========== DOM内容加载完成后初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProjectHover();
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
});

// ========== 导航功能 ==========
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 滚动时高亮当前区域
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========== 项目悬停效果 ==========
function initProjectHover() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const preview = item.querySelector('.project-preview');
        
        item.addEventListener('mouseenter', (e) => {
            // 添加悬停状态
            item.classList.add('hovering');
            
            // 动态调整预览位置（跟随鼠标）
            item.addEventListener('mousemove', handleMouseMove);
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hovering');
            item.removeEventListener('mousemove', handleMouseMove);
        });
    });
    
    function handleMouseMove(e) {
        const item = e.currentTarget;
        const preview = item.querySelector('.project-preview');
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 微妙的视差效果
        const moveX = (x / rect.width - 0.5) * 10;
        const moveY = (y / rect.height - 0.5) * 10;
        
        if (preview) {
            preview.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    }
}

// ========== 滚动动画 ==========
function initScrollAnimations() {
    // 使用Intersection Observer API实现滚动触发动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // 只触发一次动画
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    animatedElements.forEach(el => observer.observe(el));
    
    // 为项目卡片添加reveal类
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

// ========== 返回顶部 ==========
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========== 平滑滚动 ==========
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // 跳过空锚点
            if (href === '#' || !href) return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // 减去导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== 鼠标跟随光晕效果（可选高级功能） ==========
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        // 添加平滑追踪效果
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
}

// 如果需要鼠标光晕效果，取消下面的注释
// initCursorGlow();

// ========== 性能优化：节流函数 ==========
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== 工具函数：检测移动设备 ==========
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 移动设备优化
if (isMobile()) {
    document.body.classList.add('is-mobile');
    
    // 在移动设备上禁用某些动画以提升性能
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .is-mobile .project-preview {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
}

// ========== 预加载图片 ==========
function preloadImages() {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const image = new Image();
            image.src = src;
        }
    });
}

// 页面加载完成后预加载图片
window.addEventListener('load', preloadImages);

// ========== 导出函数供外部使用 ==========
window.PersonalSite = {
    throttle,
    isMobile
};
