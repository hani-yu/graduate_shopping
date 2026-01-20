// 毕业季·云端拍卖会详情页交互功能

document.addEventListener('DOMContentLoaded', function () {
    // 初始化买家流程标签页
    initBuyerTabs();

    // 初始化专场导航
    initSessionNavigation();

    // 初始化规则折叠面板
    initRulesAccordion();

    // 初始化FAQ折叠面板
    initFAQAccordion();

    // 初始化CTA按钮
    initCTAButtons();

    // 初始化页面动画
    initPageAnimations();

    // 初始化买家流程步骤动画
    initBuyerStepsAnimation();

    // 初始化卖家流程步骤动画
    initSellerStepsAnimation();


    // 初始化底部导航
    initFooterNavigation();
});

// 买家流程标签页功能
function initBuyerTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // 移除所有标签页的激活状态
            tabBtns.forEach(tab => {
                tab.classList.remove('active');
            });

            // 隐藏所有标签内容
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });

            // 激活当前标签页
            this.classList.add('active');

            // 显示对应标签内容
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // 为标签按钮添加悬停效果
    tabBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = 'rgba(13, 148, 136, 0.1)';
            }
        });

        btn.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// 专场导航功能
function initSessionNavigation() {
    const sessionNavItems = document.querySelectorAll('.session-nav-item');
    const sessionDetails = document.querySelectorAll('.session-details');

    sessionNavItems.forEach(item => {
        item.addEventListener('click', function () {
            const session = this.getAttribute('data-session');

            // 移除所有专场导航的激活状态
            sessionNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });

            // 隐藏所有专场详情
            sessionDetails.forEach(detail => {
                detail.classList.remove('active');
            });

            // 激活当前专场导航
            this.classList.add('active');

            // 显示对应专场详情
            const targetDetail = document.getElementById(`${session}-details`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });

    // 为专场导航项添加悬停效果
    sessionNavItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 5px 15px var(--shadow-color)';
            }
        });

        item.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
}

// 规则折叠面板功能
function initRulesAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    accordionHeaders.forEach((header, index) => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const toggle = this.querySelector('.accordion-toggle');

            // 切换当前面板的展开/收起状态
            content.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    });

    // 默认展开第一个规则
    if (accordionHeaders.length > 0) {
        const firstContent = accordionHeaders[0].nextElementSibling;
        const firstToggle = accordionHeaders[0].querySelector('.accordion-toggle');
        firstContent.classList.add('active');
        firstToggle.classList.add('active');
    }
}

// FAQ折叠面板功能
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function () {
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

// CTA按钮功能
function initCTAButtons() {
    const joinBuyerBtn = document.getElementById('joinAsBuyer');
    const joinSellerBtn = document.getElementById('joinAsSeller');

    if (joinBuyerBtn) {
        joinBuyerBtn.addEventListener('click', function () {
            showParticipationModal('buyer');
        });

        // 悬停效果
        joinBuyerBtn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });

        joinBuyerBtn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    }

    if (joinSellerBtn) {
        joinSellerBtn.addEventListener('click', function () {
            showParticipationModal('seller');
        });

        // 悬停效果
        joinSellerBtn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });

        joinSellerBtn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    }
}

// 显示参与模态框
function showParticipationModal(role) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'participation-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;

    const title = role === 'buyer' ? '买家参与准备' : '卖家参与准备';
    const steps = role === 'buyer' ?
        ['完成实名认证', '设置支付方式', '参与模拟竞拍', '选择专场参与'] :
        ['提交拍卖申请', '准备物品素材', '设定拍卖价格', '参与直播互动'];

    modal.innerHTML = `
        <div class="modal-content" style="
            background-color: white;
            border-radius: 16px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            position: relative;
            animation: modalFadeIn 0.3s ease;
        ">
            <button class="modal-close" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-slate);
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.3s;
            ">×</button>
            
            <h2 style="color: var(--deep-green); margin-bottom: 20px; font-size: 1.8rem; text-align: center;">
                <i class="fas fa-${role === 'buyer' ? 'shopping-cart' : 'store'}" style="margin-right: 10px;"></i>${title}
            </h2>
            
            <p style="color: var(--text-slate); margin-bottom: 30px; text-align: center; line-height: 1.6;">
                ${role === 'buyer' ?
            '作为买家参与拍卖，您需要完成以下准备：' :
            '作为卖家提交物品拍卖，您需要完成以下准备：'}
            </p>
            
            <div style="margin-bottom: 30px;">
                ${steps.map((step, index) => `
                    <div style="display: flex; align-items: flex-start; margin-bottom: 20px; padding: 15px; background-color: var(--light-gray); border-radius: 10px; transition: all 0.3s;">
                        <div style="background-color: var(--theme-teal); color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">
                            ${index + 1}
                        </div>
                        <div style="color: var(--text-slate);">${step}</div>
                    </div>
                `).join('')}
            </div>
            
            <div style="display: flex; gap: 15px;">
                <button id="startProcess" style="
                    flex: 1;
                    background-color: var(--theme-teal);
                    color: white;
                    border: none;
                    padding: 15px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                ">开始准备</button>
                
                <button id="cancelProcess" style="
                    flex: 1;
                    background-color: var(--light-gray);
                    color: var(--text-slate);
                    border: none;
                    padding: 15px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                ">稍后处理</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .modal-close:hover {
            background-color: var(--light-gray);
        }
        
        #startProcess:hover {
            background-color: var(--deep-green);
            transform: translateY(-2px);
        }
        
        #cancelProcess:hover {
            background-color: #e2e8f0;
        }
    `;
    document.head.appendChild(style);

    // 关闭模态框功能
    modal.querySelector('.modal-close').addEventListener('click', function () {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });

    modal.querySelector('#cancelProcess').addEventListener('click', function () {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });

    // 开始准备功能
    modal.querySelector('#startProcess').addEventListener('click', function () {
        document.body.removeChild(modal);
        document.head.removeChild(style);

        // 模拟跳转到对应页面
        setTimeout(() => {
            alert(`正在跳转到${role === 'buyer' ? '买家' : '卖家'}准备页面...\n\n请按照步骤完成参与准备。`);
        }, 300);
    });

    // 点击模态框背景关闭
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });
}

// 页面动画效果
function initPageAnimations() {
    // 卡片悬停效果
    const cards = document.querySelectorAll('.info-card, .feature-card, .process-step, .rule-card, .highlight-item, .feature-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // 表格行悬停效果
    const tableRows = document.querySelectorAll('.table-row');

    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function () {
            this.style.backgroundColor = 'var(--light-gray)';
        });

        row.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
        });
    });

    // 折叠面板悬停效果
    const accordionHeaders = document.querySelectorAll('.accordion-header, .faq-question');

    accordionHeaders.forEach(header => {
        header.addEventListener('mouseenter', function () {
            if (!this.nextElementSibling.classList.contains('active')) {
                this.style.backgroundColor = 'var(--light-gray)';
            }
        });

        header.addEventListener('mouseleave', function () {
            if (!this.nextElementSibling.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// 底部导航功能
function initFooterNavigation() {
    const footerLinks = document.querySelectorAll('.footer-navigation a');

    // 平滑滚动到对应部分
    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
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
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function () {
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

// 添加活动CSS类
const auctionStyles = document.createElement('style');
auctionStyles.textContent = `
    .footer-navigation a.active {
        color: var(--light-teal) !important;
        background-color: rgba(255, 255, 255, 0.15) !important;
    }
    
    /* 专场导航项的悬停颜色 */
    .session-nav-item[data-session="week1"]:hover:not(.active) {
        border-color: rgba(59, 130, 246, 0.3);
    }
    
    .session-nav-item[data-session="week2"]:hover:not(.active) {
        border-color: rgba(139, 92, 246, 0.3);
    }
    
    .session-nav-item[data-session="week3"]:hover:not(.active) {
        border-color: rgba(236, 72, 153, 0.3);
    }
    
    .session-nav-item[data-session="final"]:hover:not(.active) {
        border-color: rgba(249, 115, 22, 0.3);
    }
    
    /* 打印样式 */
    @media print {
        .page-header,
        .page-footer,
        .session-navigation,
        .tab-buttons,
        .footer-navigation,
        .cta-buttons {
            display: none !important;
        }
        
        .content-section {
            break-inside: avoid;
            box-shadow: none !important;
            border: 1px solid #ddd !important;
        }
        
        .session-details:not(.active) {
            display: none !important;
        }
        
        .session-details.active {
            display: block !important;
        }
    }
    
    /* 辅助功能：键盘导航 */
    .using-keyboard a:focus,
    .using-keyboard button:focus,
    .using-keyboard .tab-btn:focus,
    .using-keyboard .session-nav-item:focus,
    .using-keyboard .accordion-header:focus,
    .using-keyboard .faq-question:focus {
        outline: 3px solid var(--accent-gold);
        outline-offset: 3px;
    }
`;
document.head.appendChild(auctionStyles);

// 键盘导航支持
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('using-keyboard');
});

// 页面加载完成后的动画
window.addEventListener('load', function () {
    const header = document.querySelector('.page-header');
    if (header) {
        header.style.animation = 'headerFadeIn 0.8s ease';
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes headerFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // 添加页面加载完成后的滚动动画
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.style.animation = 'sectionFadeIn 0.5s ease forwards';
        section.style.opacity = '0';
    });

    const sectionStyle = document.createElement('style');
    sectionStyle.textContent = `
        @keyframes sectionFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(sectionStyle);
});

function initBuyerStepsAnimation() {
    const tabPanes = document.querySelectorAll('.tab-pane');

    function animateSteps(pane) {
        const steps = pane.querySelectorAll('.step-item');
        steps.forEach((step, i) => {
            if (!step.classList.contains('visible')) {
                const rect = step.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight * 0.85) {
                    step.classList.add('visible', 'animate__animated', 'animate__fadeInUp');
                    step.style.animationDelay = `${i * 0.15}s`;

                    // 数字突出效果
                    const number = step.querySelector('.step-number');
                    if (number) {
                        number.style.transition = 'all 0.5s ease';
                        number.style.transform = 'scale(1.3)';
                        number.style.background = 'linear-gradient(135deg, var(--faq-teal), var(--faq-green))';
                        setTimeout(() => {
                            number.style.transform = 'scale(1)';
                        }, 600);
                    }
                }
            }
        });
    }

    function checkAllTabs() {
        tabPanes.forEach(pane => {
            if (pane.classList.contains('active')) {
                animateSteps(pane);
            }
        });
    }

    window.addEventListener('scroll', checkAllTabs);
    checkAllTabs();
}


function initSellerStepsAnimation() {
    const steps = document.querySelectorAll('.seller-process .process-step');

    steps.forEach((step, i) => {
        step.style.opacity = '0';
        step.style.transform = i % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        step.style.transition = 'all 0.6s ease';
    });

    function animateSteps() {
        steps.forEach(step => {
            const rect = step.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.85 && !step.classList.contains('visible')) {
                step.classList.add('visible');
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';

                // 小箭头连接线动画
                const line = document.createElement('div');
                line.className = 'step-line';
                line.style.height = '0';
                line.style.width = '4px';
                line.style.background = 'linear-gradient(135deg, var(--faq-teal), var(--faq-green))';
                line.style.position = 'absolute';
                line.style.left = '50%';
                line.style.top = '100%';
                line.style.transform = 'translateX(-50%)';
                step.appendChild(line);

                setTimeout(() => {
                    if (line) {
                        line.style.transition = 'height 0.8s ease';
                        line.style.height = step.nextElementSibling ? `${step.nextElementSibling.offsetTop - step.offsetTop - step.offsetHeight + 10}px` : '0';
                    }
                }, 200);
            }
        });
    }

    window.addEventListener('scroll', animateSteps);
    animateSteps();
}

