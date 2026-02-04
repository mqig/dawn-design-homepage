// 高级动画控制

// ========== 字母动画控制器 ==========
class LetterAnimator {
    constructor(element) {
        this.element = element;
        this.letters = [];
        this.init();
    }

    init() {
        const text = this.element.textContent;
        this.element.innerHTML = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('letter');
            span.style.setProperty('--i', index);
            this.element.appendChild(span);
            this.letters.push(span);
        });
    }

    animate(type = 'wave') {
        this.letters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.05}s`;
            letter.classList.add(`animate-${type}`);
        });
    }
}

// ========== 视差滚动效果 ==========
class ParallaxScroller {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.update());
        this.update();
    }

    update() {
        const scrollTop = window.pageYOffset;

        this.elements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = -(scrollTop * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ========== 打字机效果 ==========
class TypeWriter {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
    }

    start() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// ========== 图片懒加载 ==========
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        this.images.forEach(img => imageObserver.observe(img));
    }
}

// ========== 光标轨迹效果 ==========
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addPoint(e.clientX, e.clientY);
        });

        this.animate();
    }

    addPoint(x, y) {
        const point = document.createElement('div');
        point.className = 'cursor-trail-point';
        point.style.left = x + 'px';
        point.style.top = y + 'px';
        document.body.appendChild(point);

        this.trail.push(point);

        // 限制轨迹点数量
        if (this.trail.length > this.maxTrail) {
            const removed = this.trail.shift();
            removed.remove();
        }

        // 自动移除
        setTimeout(() => {
            point.remove();
            const index = this.trail.indexOf(point);
            if (index > -1) {
                this.trail.splice(index, 1);
            }
        }, 500);
    }

    animate() {
        this.trail.forEach((point, index) => {
            const life = index / this.trail.length;
            point.style.opacity = life;
            point.style.transform = `scale(${life})`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ========== 滚动进度指示器 ==========
class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        progress.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progress);
        this.bar = progress.querySelector('.scroll-progress-bar');
    }

    init() {
        window.addEventListener('scroll', () => this.update());
        this.update();
    }

    update() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        this.bar.style.width = scrolled + '%';
    }
}

// ========== 文字光晕效果增强 ==========
class GlowText {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.addEventListener('mouseenter', () => {
            this.element.style.textShadow = 'var(--glow-intense)';
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.textShadow = 'var(--glow-primary)';
        });
    }
}

// ========== 页面加载动画序列 ==========
class PageLoadSequence {
    constructor() {
        this.elements = [
            { selector: '.hero-title', delay: 0 },
            { selector: '.hero-subtitle', delay: 200 },
            { selector: '.hero-description', delay: 400 },
            { selector: '.hero-cta', delay: 600 }
        ];
    }

    play() {
        this.elements.forEach(item => {
            setTimeout(() => {
                const el = document.querySelector(item.selector);
                if (el) {
                    el.classList.add('loaded');
                }
            }, item.delay);
        });
    }
}

// ========== 3D倾斜效果 ==========
class TiltEffect {
    constructor(element, maxTilt = 15) {
        this.element = element;
        this.maxTilt = maxTilt;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * this.maxTilt;
            const rotateY = ((centerX - x) / centerX) * this.maxTilt;

            this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    }
}

// ========== 初始化所有动画效果 ==========
document.addEventListener('DOMContentLoaded', () => {
    // 视差滚动
    if (document.querySelectorAll('[data-parallax]').length > 0) {
        new ParallaxScroller();
    }

    // 懒加载
    new LazyLoader();

    // 滚动进度条
    new ScrollProgress();

    // 页面加载序列
    const loadSequence = new PageLoadSequence();
    setTimeout(() => loadSequence.play(), 100);

    // 为项目卡片添加倾斜效果（可选）
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        // new TiltEffect(item, 5); // 取消注释以启用3D倾斜
    });

    // 光晕文字效果
    const glowTexts = document.querySelectorAll('.glow-text');
    glowTexts.forEach(text => new GlowText(text));
});

// ========== 性能监控 ==========
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frames = 0;
    }

    start() {
        this.measure();
    }

    measure() {
        const now = performance.now();
        this.frames++;

        if (now >= this.lastTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
            this.frames = 0;
            this.lastTime = now;

            // 如果FPS过低，可以禁用某些动画
            if (this.fps < 30) {
                console.warn('Low FPS detected:', this.fps);
                document.body.classList.add('low-performance');
            }
        }

        requestAnimationFrame(() => this.measure());
    }
}

// 开发模式下启用性能监控
if (window.location.hostname === 'localhost') {
    const monitor = new PerformanceMonitor();
    monitor.start();
}

// ========== 导出动画类 ==========
window.Animations = {
    LetterAnimator,
    ParallaxScroller,
    TypeWriter,
    LazyLoader,
    CursorTrail,
    ScrollProgress,
    GlowText,
    PageLoadSequence,
    TiltEffect,
    PerformanceMonitor
};
