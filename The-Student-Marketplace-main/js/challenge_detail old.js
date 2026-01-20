document.addEventListener('DOMContentLoaded', function() {

    // ====== FAQ折叠逻辑 ======
    initFAQAccordion();

    // ====== 页面悬停动画 ======
    initPageAnimations();

    // ====== outcome 面板切换 ======
    initOutcomeTabs();

    // ====== 键盘导航支持 ======
    initKeyboardNavigation();

    // ====== 页面加载动画 ======
    initPageLoadAnimations();

});

// ====== FAQ折叠 ======
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');

            if(answer.classList.contains('active')) {
                answer.classList.remove('active');
                toggle.classList.remove('active');
                return;
            }

            closeAllFAQs();
            answer.classList.add('active');
            toggle.classList.add('active');
        });
    });

    // 默认打开第一个 FAQ
    if(faqQuestions.length > 0) {
        const firstAnswer = faqQuestions[0].nextElementSibling;
        const firstToggle = faqQuestions[0].querySelector('.faq-toggle');
        firstAnswer.classList.add('active');
        firstToggle.classList.add('active');
    }
}

function closeAllFAQs() {
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.faq-toggle').forEach(t => t.classList.remove('active'));
}

// ====== outcome 面板切换 ======
function initOutcomeTabs() {
    const tabs = document.querySelectorAll('.outcome-btn');
    const panes = document.querySelectorAll('.outcome-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除其他按钮 active
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const target = this.getAttribute('data-outcome');

            // 显示对应面板，隐藏其他面板
            panes.forEach(pane => {
                if(pane.id === target + '-pane') {
                    pane.classList.add('active');
                    pane.style.display = 'block';
                } else {
                    pane.classList.remove('active');
                    pane.style.display = 'none';
                }
            });
        });
    });

    // 初始化：只显示成功面板
    panes.forEach(pane => {
        if(!pane.classList.contains('active')) {
            pane.style.display = 'none';
        }
    });
}

// ====== 页面悬停动画 ======
function initPageAnimations() {
    // 卡片悬停
    const cards = document.querySelectorAll('.rule-item, .grade-card, .service-card, .delivery-card, .fairness-card, .reminder-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-5px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    });

    // 流程步骤悬停
    const flowSteps = document.querySelectorAll('.flow-step');
    flowSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            const number = this.querySelector('.flow-number');
            if(number) {
                number.style.transform = 'scale(1.1)';
                number.style.boxShadow = '0 5px 15px rgba(13,148,136,0.3)';
            }
        });
        step.addEventListener('mouseleave', function() {
            const number = this.querySelector('.flow-number');
            if(number) {
                number.style.transform = 'scale(1)';
                number.style.boxShadow = 'none';
            }
        });
    });

    // 品质等级卡片
    document.querySelectorAll('.grade-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const badge = card.querySelector('.grade-badge');
            if(badge) badge.style.transform = 'rotate(10deg) scale(1.1)';
        });
        card.addEventListener('mouseleave', () => {
            const badge = card.querySelector('.grade-badge');
            if(badge) badge.style.transform = 'rotate(0) scale(1)';
        });
    });

    // 服务卡片图标
    document.querySelectorAll('.service-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => icon.style.transform = 'rotate(15deg) scale(1.1)');
        icon.addEventListener('mouseleave', () => icon.style.transform = 'rotate(0) scale(1)');
    });
}

// ====== 键盘导航 ======
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Tab') document.body.classList.add('using-keyboard');
    });
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
}

// ====== 页面加载动画 ======
function initPageLoadAnimations() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
}
