// 校友权益·专属福利详情页交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化等级导航功能
    initLevelNavigation();
    
    // 初始化滚动监听
    initScrollSpy();
    
    // 初始化页面动画
    initAnimations();
    
    // 初始化底部链接滚动
    initFooterLinks();
});

// 等级导航功能
function initLevelNavigation() {
    const levelNavItems = document.querySelectorAll('.level-nav-item');
    const levelDetails = document.querySelectorAll('.level-details');
    
    levelNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            
            // 移除所有激活状态
            levelNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // 隐藏所有等级详情
            levelDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            
            // 激活当前导航项
            this.classList.add('active');
            
            // 显示对应等级详情
            const targetDetail = document.getElementById(`${level}-details`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });
    
    // 为等级导航项添加悬停效果
    levelNavItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = 'var(--light-gray)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// 滚动监听，高亮当前部分
function initScrollSpy() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.footer-links a');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                
                // 更新底部导航链接状态
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
                
                // 为当前部分添加视觉反馈
                sections.forEach(section => {
                    section.classList.remove('section-active');
                });
                entry.target.classList.add('section-active');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // 点击底部链接平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 页面动画效果
function initAnimations() {
    // 卡片悬停效果
    const cards = document.querySelectorAll('.mechanism-card, .unlock-card, .scenario-card, .transition-card, .value-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 步骤卡片特殊效果
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            const stepNumber = this.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1.1)';
                stepNumber.style.boxShadow = '0 5px 15px rgba(13, 148, 136, 0.4)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            const stepNumber = this.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1)';
                stepNumber.style.boxShadow = '0 3px 10px rgba(13, 148, 136, 0.3)';
            }
        });
    });
    
    // 问题项目悬停效果
    const issueItems = document.querySelectorAll('.issue-item');
    
    issueItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--light-gray)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
}

// 底部链接交互
function initFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 添加CSS类用于当前激活的部分
const style = document.createElement('style');
style.textContent = `
    .section-active {
        border-left: 5px solid var(--theme-teal);
    }
    
    .footer-links a.active {
        color: var(--light-teal) !important;
        background-color: rgba(255, 255, 255, 0.15) !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

// 添加打印样式
const printStyle = document.createElement('style');
printStyle.media = 'print';
printStyle.textContent = `
    .level-navigation,
    .footer-links {
        display: none !important;
    }
    
    .content-section {
        break-inside: avoid;
        box-shadow: none !important;
        border: 1px solid #ddd !important;
    }
    
    .page-header {
        background: #064e3b !important;
        color: white !important;
        -webkit-print-color-adjust: exact;
    }
`;
document.head.appendChild(printStyle);

// 辅助功能：键盘导航支持
document.addEventListener('keydown', function(e) {
    // Tab键导航时的高亮效果
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
});

// 添加键盘导航样式
const keyboardNavStyle = document.createElement('style');
keyboardNavStyle.textContent = `
    .using-keyboard a:focus,
    .using-keyboard button:focus {
        outline: 3px solid var(--accent-gold);
        outline-offset: 3px;
    }
`;
document.head.appendChild(keyboardNavStyle);