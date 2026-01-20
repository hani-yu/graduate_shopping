document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有动画效果
    initAnimations();
    
    // 初始化分类导航
    initCategoryNavigation();
    
    // 初始化学习阶段标签页
    initStageTabs();
    
    // 初始化FAQ交互
    initFAQ();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化CTA按钮
    initCTAButton();
    
    // 初始化粒子动画效果
    initParticles();
});

// 动画效果初始化
function initAnimations() {
    // 标题文字动画
    const title = document.querySelector('.page-title');
    if (title) {
        const text = title.textContent;
        title.innerHTML = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * 0.05}s`;
            span.classList.add('char-animation');
            title.appendChild(span);
        });
    }
    
    // 添加星星动画延迟
    document.querySelectorAll('.rating-stars i').forEach((star, i) => {
        star.style.setProperty('--i', i);
    });
}

// 分类导航
function initCategoryNavigation() {
    const navItems = document.querySelectorAll('.category-nav-item');
    const detailsContainers = document.querySelectorAll('.category-details');
    
    // 添加动画类
    navItems.forEach(item => {
        setTimeout(() => {
            item.classList.add('animated');
        }, 200);
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // 更新导航状态
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            detailsContainers.forEach(detail => {
                detail.classList.remove('active');
                if (detail.id === `${category}-details`) {
                    detail.classList.add('active');
                    
                    // 添加卡片动画
                    const cards = detail.querySelectorAll('.subject-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 100);
                    });
                }
            });
            
            // 添加点击动画效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // 初始加载第一类卡片动画
    const firstCards = document.querySelector('.category-details.active')?.querySelectorAll('.subject-card');
    firstCards?.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animated');
        }, index * 100);
    });
}

// 学习阶段标签页
function initStageTabs() {
    const stageBtns = document.querySelectorAll('.stage-btn');
    const stagePanes = document.querySelectorAll('.stage-pane');
    
    stageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const stage = this.dataset.stage;
            
            // 更新按钮状态
            stageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            stagePanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${stage}-pane`) {
                    pane.classList.add('active');
                    
                    // 添加子元素动画
                    const features = pane.querySelectorAll('.feature');
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.style.opacity = '0';
                            feature.style.transform = 'translateX(-20px)';
                            feature.style.transition = 'all 0.5s ease';
                            
                            setTimeout(() => {
                                feature.style.opacity = '1';
                                feature.style.transform = 'translateX(0)';
                            }, 10);
                        }, index * 100);
                    });
                }
            });
            
            // 添加涟漪效果
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            Object.assign(ripple.style, {
                position: 'absolute',
                borderRadius: '50%',
                background: 'rgba(66, 133, 244, 0.3)',
                transform: 'scale(0)',
                animation: 'ripple 0.6s linear',
                pointerEvents: 'none'
            });
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            Object.assign(ripple.style, {
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px'
            });
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// FAQ交互
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 关闭其他FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前FAQ
            item.classList.toggle('active');
            
            // 添加数字动画
            const number = this.querySelector('.faq-number');
            number.style.transform = 'scale(0.8)';
            setTimeout(() => {
                number.style.transform = '';
            }, 200);
        });
    });
    
    // 随机打开一个FAQ
    const randomIndex = Math.floor(Math.random() * faqItems.length);
    setTimeout(() => {
        faqItems[randomIndex].classList.add('active');
    }, 1000);
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // 页面章节
                if (element.classList.contains('content-section')) {
                    element.classList.add('visible');
                    
                    // 添加子元素动画
                    const certItems = element.querySelectorAll('.cert-item');
                    certItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animated');
                        }, index * 100);
                    });
                    
                    const standardCards = element.querySelectorAll('.standard-card');
                    standardCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 100);
                    });
                    
                    const featureItems = element.querySelectorAll('.feature-item');
                    featureItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animated');
                        }, index * 100);
                    });
                    
                    const optionCards = element.querySelectorAll('.option-card');
                    optionCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 100);
                    });
                    
                    const processSteps = element.querySelectorAll('.process-step');
                    processSteps.forEach((step, index) => {
                        setTimeout(() => {
                            step.classList.add('animated');
                        }, index * 150);
                    });
                    
                    const tipCards = element.querySelectorAll('.tip-card');
                    tipCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 100);
                    });
                    
                    const ratingCards = element.querySelectorAll('.rating-card');
                    ratingCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 100);
                    });
                    
                    const overviewItems = element.querySelectorAll('.overview-item');
                    overviewItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animated');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // 观察所有章节和元素
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
    
    // 添加页面滚动指示器
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    Object.assign(progressBar.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #4285f4, #34a853)',
        width: '0%',
        zIndex: 1000,
        transition: 'width 0.3s ease',
        boxShadow: '0 2px 10px rgba(66, 133, 244, 0.3)'
    });
    document.body.appendChild(progressBar);
    
    // 更新滚动进度条
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // 添加视差效果
        const scrolledPx = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.page-header');
        if (header) {
            header.style.transform = `translateY(${scrolledPx * 0.5}px)`;
        }
    });
}

// CTA按钮效果
function initCTAButton() {
    const ctaButton = document.getElementById('startJourney');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // 创建粒子爆炸效果
            createParticleExplosion(this);
            
            // 添加按钮动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 显示解锁动画
            showUnlockAnimation();
            
            // 滚动到解锁条件部分
            document.querySelector('#guide').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // 为导航链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 添加点击动画
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // 平滑滚动
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 解锁动画
function showUnlockAnimation() {
    const animationContainer = document.createElement('div');
    animationContainer.className = 'unlock-animation';
    Object.assign(animationContainer.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
    
    const unlockText = document.createElement('div');
    unlockText.textContent = '🎓 学霸笔记锦囊已解锁！';
    Object.assign(unlockText.style, {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#4285f4',
        textAlign: 'center',
        opacity: '0',
        transform: 'scale(0.5)',
        animation: 'unlockText 2s ease forwards',
        textShadow: '0 0 20px rgba(66, 133, 244, 0.5)'
    });
    
    animationContainer.appendChild(unlockText);
    document.body.appendChild(animationContainer);
    
    // 创建CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes unlockText {
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            20% {
                opacity: 1;
                transform: scale(1.2);
            }
            40% {
                transform: scale(1);
            }
            60% {
                transform: rotate(-5deg);
            }
            80% {
                transform: rotate(5deg);
            }
            100% {
                opacity: 0;
                transform: scale(1) rotate(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // 清理
    setTimeout(() => {
        document.body.removeChild(animationContainer);
        document.head.removeChild(style);
    }, 2000);
}

// 粒子系统
function initParticles() {
    const header = document.querySelector('.page-header');
    
    // 创建粒子
    for (let i = 0; i < 20; i++) {
        createParticle(header);
    }
    
    // 在标签上添加悬浮粒子效果
    document.querySelectorAll('.tag, .stage-btn, .faq-question').forEach(element => {
        element.addEventListener('mouseenter', function() {
            createParticleExplosion(this, 5);
        });
    });
}

// 创建单个粒子
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const size = Math.random() * 4 + 2;
    const colors = ['#4285f4', '#34a853', '#fbbc05', '#ea4335'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    Object.assign(particle.style, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        background: color,
        borderRadius: '50%',
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        opacity: Math.random() * 0.5 + 0.2,
        animation: `float ${Math.random() * 10 + 10}s linear infinite`,
        animationDelay: Math.random() * 5 + 's'
    });
    
    // 添加CSS动画
    if (!document.querySelector('#particle-animations')) {
        const style = document.createElement('style');
        style.id = 'particle-animations';
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                }
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    container.appendChild(particle);
    
    // 定期重新生成粒子位置
    setTimeout(() => {
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
    }, 5000);
}

// 创建粒子爆炸效果
function createParticleExplosion(element, count = 15) {
    const rect = element.getBoundingClientRect();
    const colors = ['#4285f4', '#34a853', '#fbbc05', '#ea4335'];
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        
        const size = Math.random() * 6 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        Object.assign(particle.style, {
            position: 'fixed',
            width: size + 'px',
            height: size + 'px',
            background: color,
            borderRadius: '50%',
            top: rect.top + rect.height / 2 + 'px',
            left: rect.left + rect.width / 2 + 'px',
            pointerEvents: 'none',
            zIndex: 1000,
            transform: 'translate(0, 0)'
        });
        
        document.body.appendChild(particle);
        
        // 动画
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 50 + 30;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += vx;
            y += vy;
            vy += 0.5; // 重力
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl + 1-5 快速导航
    if (e.ctrlKey && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const sections = [
            '#quality',
            '#categories',
            '#guide',
            '#faq',
            '#feedback'
        ];
        const target = sections[parseInt(e.key) - 1];
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 添加视觉反馈
            element.style.boxShadow = '0 0 0 3px #4285f4';
            setTimeout(() => {
                element.style.boxShadow = '';
            }, 1000);
        }
    }
    
    // 空格键滚动
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    }
});

// 添加鼠标悬停效果增强
document.querySelectorAll('.cert-item, .standard-card, .feature-item, .subject-card, .option-card, .tip-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '';
    });
});

// 页面加载完成的动画
window.addEventListener('load', function() {
    // 添加加载完成动画
    document.body.classList.add('loaded');
    
    // 添加欢迎消息
    setTimeout(() => {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.textContent = '欢迎来到学霸笔记锦囊！';
        Object.assign(welcomeMsg.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'linear-gradient(45deg, #4285f4, #34a853)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(66, 133, 244, 0.3)',
            zIndex: '1000',
            animation: 'slideInRight 0.5s ease forwards',
            opacity: '0'
        });
        document.body.appendChild(welcomeMsg);
        
        setTimeout(() => {
            welcomeMsg.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            welcomeMsg.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => {
                document.body.removeChild(welcomeMsg);
            }, 500);
        }, 3000);
        
        // 添加CSS动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideOutRight {
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.head.removeChild(style);
        }, 3500);
    }, 1000);
});