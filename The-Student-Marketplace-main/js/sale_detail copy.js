// 热门闪购·限时秒杀详情页交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化全局倒计时
    initGlobalCountdown();
    
    // 初始化抢购结果标签页
    initOutcomeTabs();
    
    // 初始化FAQ折叠面板
    initFAQAccordion();
    
    // 初始化页面动画效果
    initPageAnimations();
    
    // 初始化底部导航
    initFooterNavigation();
    
    // 添加动态效果
    addDynamicEffects();

    
});

// 全局倒计时功能
function initGlobalCountdown() {
    // 设置闪购结束时间（示例：24小时后）
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            // 倒计时结束
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        // 计算小时、分钟、秒
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // 更新显示
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // 最后5分钟添加闪烁效果
        if (timeLeft < 5 * 60 * 1000) {
            const digits = document.querySelectorAll('.countdown-digit');
            digits.forEach(digit => {
                if (Math.floor(Date.now() / 500) % 2 === 0) {
                    digit.style.backgroundColor = '#ef4444'; // 更亮的红色
                } else {
                    digit.style.backgroundColor = 'var(--flash-red)';
                }
            });
        }
    }
    
    // 立即更新一次
    updateCountdown();
    
    // 每秒更新一次
    setInterval(updateCountdown, 1000);
}

// 抢购结果标签页功能
function initOutcomeTabs() {
    const outcomeBtns = document.querySelectorAll('.outcome-btn');
    const outcomePanes = document.querySelectorAll('.outcome-pane');
    
    outcomeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const outcome = this.getAttribute('data-outcome');
            
            // 移除所有标签页的激活状态
            outcomeBtns.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // 隐藏所有标签内容
            outcomePanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // 激活当前标签页
            this.classList.add('active');
            
            // 显示对应标签内容
            const targetPane = document.getElementById(`${outcome}-pane`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
    
    // 为标签按钮添加悬停效果
    outcomeBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = 'rgba(13, 148, 136, 0.1)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// FAQ折叠面板功能
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            // 如果当前FAQ已经打开，则关闭它
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
                toggle.classList.remove('active');
                return;
            }
            
            // 关闭所有打开的FAQ
            closeAllFAQs();
            
            // 打开当前FAQ
            answer.classList.add('active');
            toggle.classList.add('active');
        });
    });
    
    // 默认打开第一个FAQ
    if (faqQuestions.length > 0) {
        const firstAnswer = faqQuestions[0].nextElementSibling;
        const firstToggle = faqQuestions[0].querySelector('.faq-toggle');
        firstAnswer.classList.add('active');
        firstToggle.classList.add('active');
    }
}

// 关闭所有FAQ
function closeAllFAQs() {
    const faqAnswers = document.querySelectorAll('.faq-answer');
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqAnswers.forEach(answer => {
        answer.classList.remove('active');
    });
    
    faqToggles.forEach(toggle => {
        toggle.classList.remove('active');
    });
}

// 页面动画效果
function initPageAnimations() {
    // 卡片悬停效果
    const cards = document.querySelectorAll('.rule-item, .grade-card, .service-card, .delivery-card, .fairness-card, .reminder-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 流程步骤悬停效果
    const flowSteps = document.querySelectorAll('.flow-step');
    
    flowSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            const number = this.querySelector('.flow-number');
            if (number) {
                number.style.transform = 'scale(1.1)';
                number.style.boxShadow = '0 5px 15px rgba(13, 148, 136, 0.3)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            const number = this.querySelector('.flow-number');
            if (number) {
                number.style.transform = 'scale(1)';
                number.style.boxShadow = 'none';
            }
        });
    });
    
    // 品质等级卡片特殊效果
    const gradeCards = document.querySelectorAll('.grade-card');
    
    gradeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.grade-badge');
            if (badge) {
                badge.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.grade-badge');
            if (badge) {
                badge.style.transform = 'rotate(0) scale(1)';
            }
        });
    });
    
    // 服务卡片图标动画
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(15deg) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    });
}

// 底部导航功能
function initFooterNavigation() {
    const footerLinks = document.querySelectorAll('.footer-navigation a');
    
    // 平滑滚动到对应部分
    footerLinks.forEach(link => {
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
        
        // 悬停效果
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 监听滚动，高亮当前部分
    const sections = document.querySelectorAll('.content-section');
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
                footerLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 添加动态效果
function addDynamicEffects() {
    // 时间线动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // 延迟显示动画
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
        
        // 初始状态
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 倒计时数字跳动效果
    const countdownDigits = document.querySelectorAll('.countdown-digit');
    
    setInterval(() => {
        countdownDigits.forEach(digit => {
            digit.style.transform = 'scale(1.05)';
            setTimeout(() => {
                digit.style.transform = 'scale(1)';
            }, 150);
        });
    }, 1000);
    
    // 高亮的时间线项闪烁效果
    const highlightItem = document.querySelector('.timeline-item.highlight');
    if (highlightItem) {
        setInterval(() => {
            highlightItem.style.borderLeft = '4px solid var(--flash-red)';
            highlightItem.style.paddingLeft = '26px';
            setTimeout(() => {
                highlightItem.style.borderLeft = 'none';
                highlightItem.style.paddingLeft = '30px';
            }, 500);
        }, 2000);
    }
}

// 添加CSS类用于当前激活的部分
const flashsaleStyles = document.createElement('style');
flashsaleStyles.textContent = `
    .footer-navigation a.active {
        color: var(--light-teal) !important;
        background-color: rgba(255, 255, 255, 0.2) !important;
        border-color: rgba(255, 255, 255, 0.3) !important;
    }
    
    /* 打印样式 */
    @media print {
        .page-header,
        .page-footer,
        .outcome-nav,
        .footer-navigation,
        .global-countdown {
            display: none !important;
        }
        
        .content-section {
            break-inside: avoid;
            box-shadow: none !important;
            border: 1px solid #ddd !important;
        }
        
        .grade-cards,
        .service-grid,
        .delivery-options,
        .fairness-grid {
            grid-template-columns: 1fr !important;
        }
        
        .faq-answer:not(.active) {
            max-height: none !important;
            display: block !important;
            padding: 0 25px 25px !important;
        }
    }
    
    /* 辅助功能：键盘导航 */
    .using-keyboard a:focus,
    .using-keyboard button:focus,
    .using-keyboard .outcome-btn:focus,
    .using-keyboard .faq-question:focus {
        outline: 3px solid var(--accent-gold);
        outline-offset: 3px;
    }
    
    /* 页面加载动画 */
    @keyframes sectionFadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .content-section {
        animation: sectionFadeIn 0.6s ease forwards;
        opacity: 0;
    }
    
    #rules { animation-delay: 0.1s; }
    #process { animation-delay: 0.2s; }
    #quality { animation-delay: 0.3s; }
    #fairness { animation-delay: 0.4s; }
    #faq { animation-delay: 0.5s; }
`;
document.head.appendChild(flashsaleStyles);

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
});

// 页面加载完成后的动画
window.addEventListener('load', function() {
    const header = document.querySelector('.page-header');
    if (header) {
        header.style.animation = 'headerFadeIn 0.8s ease';
    }
    
    const headerStyle = document.createElement('style');
    headerStyle.textContent = `
        @keyframes headerFadeIn {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(headerStyle);
    
    // 确保所有内容都显示出来
    setTimeout(() => {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.opacity = '1';
        });
    }, 100);
});