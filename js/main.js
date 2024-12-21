// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = '#fff';
    }
});

// 页面加载动画
window.addEventListener('load', function() {
    const loader = document.querySelector('.loading-overlay');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// 数字增长动画
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 监听元素进入视口
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('number')) {
                const value = entry.target.getAttribute('data-value');
                animateValue(entry.target, 0, value, 2000);
            }
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// 观察所有需要动画的元素
document.querySelectorAll('.number, .fade-in, .slide-in').forEach(el => {
    observer.observe(el);
});

// 平滑滚动优化
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 产品筛选功能
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 更新按钮状态
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// 技术参数标签页切换
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 更新按钮状态
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // 更新面板显示
        const targetPanel = document.getElementById(button.getAttribute('data-tab'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        targetPanel.classList.add('active');
    });
});

// 添加滚动动画
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// 添加滚动进度条
const addScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// 添加表单验证
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('input[type="text"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;

        // 简单验证
        if (!name || !phone || !email || !message) {
            alert('请填写完整信息');
            return;
        }

        // 模拟提交
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';
        
        setTimeout(() => {
            alert('提交成功！我们会尽快与您联系。');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = '提交咨询';
        }, 1500);
    });
}

// 添加图片懒加载
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });
};

// 数字滚动动画
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 动画持续时间（毫秒）
        const step = target / (duration / 16); // 每16ms更新一次
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        
        // 当元素进入视口时开始动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// 页面加载完成后初始化动画
document.addEventListener('DOMContentLoaded', () => {
    addScrollProgress();
    lazyLoadImages();
    animateNumbers();
});

// 导航栏交互
const navToggle = document.querySelector('.nav-toggle');
const navWrapper = document.querySelector('.nav-wrapper');
const navLinks = document.querySelectorAll('.nav-links a');

// 汉堡菜单点击事件
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navWrapper.classList.toggle('active');
});

// 导航链接点击事件
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // 移除所有active类
        navLinks.forEach(l => l.classList.remove('active'));
        // 添加active类到当前点击的链接
        link.classList.add('active');
        // 如果是移动端，点击后关闭菜单
        if (window.innerWidth <= 992) {
            navToggle.classList.remove('active');
            navWrapper.classList.remove('active');
        }
    });
});

// 滚动监听
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // 更新当前活动的导航项
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const id = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// 移动端优化
document.addEventListener('DOMContentLoaded', () => {
    // 移动端菜单点击关闭
    const mobileMenuLinks = document.querySelectorAll('.nav-links a');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navToggle = document.querySelector('.nav-toggle');

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navWrapper.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // 移动端表格滚动提示
    const tables = document.querySelectorAll('.specs-table');
    tables.forEach(table => {
        if (table.scrollWidth > table.clientWidth) {
            const scrollHint = document.createElement('div');
            scrollHint.className = 'mobile-scroll-hint';
            scrollHint.textContent = '← 左右滑动查看更多 →';
            table.parentNode.insertBefore(scrollHint, table);
        }
    });

    // 优化移动端点击延迟
    document.addEventListener('touchstart', function() {}, false);

    // 处理移动端图片加载
    const images = document.querySelectorAll('img[data-src]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // 回退到 Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // 移动端表单优化
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                window.scrollTo(0, window.scrollY);
            });
        });
    });
});

// 移动端性能优化
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // 延迟加载非关键资源
        const deferredImages = document.querySelectorAll('img[data-defer]');
        deferredImages.forEach(img => {
            img.src = img.dataset.defer;
        });
    });
} 