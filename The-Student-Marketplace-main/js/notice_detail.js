document.addEventListener('DOMContentLoaded', function() {

    // ====== FAQ折叠逻辑 ======
    initFAQAccordion();

    // ====== 页面悬停动画 ======
    initPageAnimations();


    initProcessTimelineScroll(); // 启动滚动动画
    initOutcomeTabs();  


    // ====== 键盘导航支持 ======
    initKeyboardNavigation();

    // ====== 页面加载动画 ======
    initPageLoadAnimations();

});
// ====== outcome 面板切换 ======
function initOutcomeTabs() {
    const tabs = document.querySelectorAll('.outcome-btn');
    const panes = document.querySelectorAll('.outcome-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const target = this.getAttribute('data-outcome');

            panes.forEach(pane => {
                if(pane.id === target + '-pane') {
                    pane.classList.add('active');
                    pane.style.display = 'block';
                    animateOutcomePane(pane);
                } else {
                    pane.classList.remove('active');
                    pane.style.display = 'none';
                }
            });
        });
    });

    panes.forEach(pane => {
        if(!pane.classList.contains('active')) pane.style.display = 'none';
        else animateOutcomePane(pane);
    });
}

// outcome 面板内动画
function animateOutcomePane(pane) {
    const steps = pane.querySelectorAll('.success-step, .option-item, .issue-item');
    steps.forEach((step, i) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        setTimeout(() => {
            step.style.transition = 'all 0.5s ease';
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, i * 150);
    });
}
/**
 * 抢购流程时间轴滚动显示逻辑
 */
function initProcessTimelineScroll() {
    // 选中所有的步骤项
    const timelineItems = document.querySelectorAll('.process-timeline .timeline-item');
    
    if (timelineItems.length === 0) return;

    // 1. 初始化状态：隐藏所有步骤，准备动画
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // 使用更平滑的曲线
    });

    // 2. 配置 IntersectionObserver (交叉观察器)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 只要 10% 进入视口就触发
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                
                const siblings = Array.from(item.parentNode.querySelectorAll('.timeline-item'));
                const index = siblings.indexOf(item);

                // 3. 执行顺序显示动画
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200); // 每个步骤之间间隔 200ms，节奏感更好

                // 动画触发后停止观察该节点
                obs.unobserve(item);
            }
        });
    }, observerOptions);

    // 开始观察每一个步骤节点
    timelineItems.forEach(item => observer.observe(item));
}

// ====== 页面悬停动画 ======
function initPageAnimations() {
    // 流程步骤悬停
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // tips-box 悬停效果
    const tips = document.querySelectorAll('.tips-grid .tip-item');
    tips.forEach(tip => {
        tip.addEventListener('mouseenter', () => {
            tip.style.transform = 'translateY(-5px) scale(1.03)';
            tip.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
        });
        tip.addEventListener('mouseleave', () => {
            tip.style.transform = 'translateY(0) scale(1)';
            tip.style.boxShadow = 'none';
        });
    });
}

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
