// JavaScript功能实现

// FAQ切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化FAQ功能
    initFAQ();
    
    // 初始化发布按钮功能
    initPublishButton();
    
    // 初始化卡片悬停效果
    initCardHoverEffects();
    
    // 默认打开第一个FAQ
    openFirstFAQ();
});

// 初始化FAQ功能
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const index = this.getAttribute('data-faq-index');
            toggleFaq(index);
        });
    });
}

// FAQ切换功能
function toggleFaq(index) {
    const answers = document.querySelectorAll('.faq-answer');
    const toggles = document.querySelectorAll('.faq-toggle');
    
    const answer = answers[index];
    const toggle = toggles[index];
    
    // 如果当前FAQ已经打开，则关闭它
    if (answer.classList.contains('open')) {
        answer.classList.remove('open');
        toggle.classList.remove('open');
        return;
    }
    
    // 关闭其他打开的FAQ
    closeAllFAQs();
    
    // 打开当前FAQ
    answer.classList.add('open');
    toggle.classList.add('open');
}

// 关闭所有FAQ
function closeAllFAQs() {
    const answers = document.querySelectorAll('.faq-answer');
    const toggles = document.querySelectorAll('.faq-toggle');
    
    answers.forEach(answer => {
        answer.classList.remove('open');
    });
    
    toggles.forEach(toggle => {
        toggle.classList.remove('open');
    });
}

// 默认打开第一个FAQ
function openFirstFAQ() {
    const firstAnswer = document.querySelector('.faq-answer');
    const firstToggle = document.querySelector('.faq-toggle');
    
    if (firstAnswer && firstToggle) {
        firstAnswer.classList.add('open');
        firstToggle.classList.add('open');
    }
}

// 初始化发布按钮功能
function initPublishButton() {
    const publishBtn = document.getElementById('publishBtn');
    
    if (publishBtn) {
        publishBtn.addEventListener('click', function() {
            startPublishing();
        });
    }
}

// 立即发布按钮功能
function startPublishing() {
    // 创建模态框
    const modal = document.createElement('div');
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
    
    modal.innerHTML = `
        <div style="
            background-color: white;
            border-radius: 16px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            position: relative;
        ">
            <button id="closeModal" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-slate);
                cursor: pointer;
            ">×</button>
            
            <h2 style="color: var(--deep-green); margin-bottom: 15px; font-size: 1.8rem;">
                <i class="fas fa-rocket" style="margin-right: 10px;"></i>准备发布物品
            </h2>
            
            <p style="margin-bottom: 25px; color: var(--text-slate); line-height: 1.6;">
                请确保您已准备好以下内容：
            </p>
            
            <div style="background-color: var(--paper-white); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                    <div style="background-color: var(--theme-teal); color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
                        1
                    </div>
                    <div>
                        <strong style="color: var(--deep-green);">物品清晰照片</strong>
                        <p style="margin-top: 5px; color: var(--text-slate); font-size: 0.95rem;">至少3张不同角度的照片</p>
                    </div>
                </div>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                    <div style="background-color: var(--theme-teal); color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
                        2
                    </div>
                    <div>
                        <strong style="color: var(--deep-green);">物品详细信息</strong>
                        <p style="margin-top: 5px; color: var(--text-slate); font-size: 0.95rem;">购买时间、价格、使用状况等</p>
                    </div>
                </div>
                
                <div style="display: flex; align-items: flex-start;">
                    <div style="background-color: var(--theme-teal); color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
                        3
                    </div>
                    <div>
                        <strong style="color: var(--deep-green);">合理的定价预期</strong>
                        <p style="margin-top: 5px; color: var(--text-slate); font-size: 0.95rem;">参考平台智能估价工具</p>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px;">
                <button id="continuePublish" style="
                    flex: 1;
                    background-color: var(--theme-teal);
                    color: white;
                    border: none;
                    padding: 15px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s;
                ">继续发布</button>
                
                <button id="cancelPublish" style="
                    flex: 1;
                    background-color: var(--light-gray);
                    color: var(--text-slate);
                    border: none;
                    padding: 15px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s;
                ">稍后再发</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 关闭模态框功能
    modal.querySelector('#closeModal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('#cancelPublish').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // 继续发布功能
    modal.querySelector('#continuePublish').addEventListener('click', function() {
        document.body.removeChild(modal);
        
        // 这里可以添加实际跳转逻辑
        // window.location.href = "/publish";
        
        // 模拟跳转
        setTimeout(() => {
            alert("正在跳转到发布页面...\n\n发布流程已启动，请按照页面提示完成发布。");
        }, 300);
    });
    
    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// 初始化卡片悬停效果
function initCardHoverEffects() {
    const stepCards = document.querySelectorAll('.step-card');
    const itemGuides = document.querySelectorAll('.item-guide');
    
    // 步骤卡片悬停效果
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 20px var(--hover-shadow-color)';
            this.style.borderColor = 'var(--theme-teal)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'var(--border-color)';
        });
    });
    
    // 物品指南卡片悬停效果
    itemGuides.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px var(--shadow-color)';
            this.style.borderColor = 'var(--theme-teal)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'var(--border-color)';
        });
    });
}

// 添加滚动到顶部按钮
document.addEventListener('DOMContentLoaded', function() {
    // 创建滚动到顶部按钮
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--theme-teal);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 100;
        box-shadow: 0 3px 10px rgba(13, 148, 136, 0.3);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // 滚动事件监听
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // 点击滚动到顶部
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 按钮悬停效果
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--deep-green)';
        this.style.transform = 'translateY(-5px)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--theme-teal)';
        this.style.transform = 'translateY(0)';
    });

    const $steps = $('.route-step');
    const path = document.getElementById('route-path');

    // 1. 动态绘制连接所有“歪卡片”中心的线
    function drawRouteLine() {
        let d = "";
        $steps.each(function(index) {
            const rect = this.getBoundingClientRect();
            const containerRect = document.querySelector('.publish-route-wrapper').getBoundingClientRect();
            const scrollLeft = document.querySelector('.publish-route-wrapper').scrollLeft;

            // 计算卡片中心点坐标
            const x = rect.left + rect.width / 2 - containerRect.left + scrollLeft;
            const y = rect.top + rect.height / 2 - containerRect.top;

            if (index === 0) d += `M ${x} ${y}`;
            else {
                // 使用二次贝塞尔曲线让线有弧度
                const prevRect = $steps[index - 1].getBoundingClientRect();
                const prevX = prevRect.left + prevRect.width / 2 - containerRect.left + scrollLeft;
                const prevY = prevRect.top + prevRect.height / 2 - containerRect.top;
                const cpX = (prevX + x) / 2;
                d += ` Q ${cpX} ${prevY - 20}, ${x} ${y}`;
            }
        });
        path.setAttribute('d', d);
        
        // 设置虚线动画初始状态
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
    }

    // 2. 滚动观察器：一步步显现
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            // A. 先动线
            $(path).animate({ strokeDashoffset: 0 }, 2000);
            
            // B. 卡片依次跳出
            $steps.each(function(i) {
                setTimeout(() => {
                    $(this).addClass('active');
                    // 每一个卡片出来时发出一声微小的动效感（CSS控制）
                }, i * 400); // 每个间隔400ms
            });
            
            observer.disconnect();
        }
    }, { threshold: 0.2 });

    const target = document.querySelector('.publish-route-wrapper');
    if(target) {
        drawRouteLine();
        observer.observe(target);
    }

    // 窗口缩放重绘线
    $(window).on('resize', drawRouteLine);

        const $prepSteps = $('.prep-step');
    const prepPath = document.getElementById('prep-line-path');

    // 1. 绘制第一部分的波浪线
    function drawPrepLine() {
        if (!prepPath) return;
        
        let d = "";
        $prepSteps.each(function(index) {
            const rect = this.getBoundingClientRect();
            const containerRect = document.querySelector('.prep-route-wrapper').getBoundingClientRect();
            
            // 计算卡片中心
            const x = rect.left + rect.width / 2 - containerRect.left;
            const y = rect.top + rect.height / 2 - containerRect.top;

            if (index === 0) {
                d += `M ${x} ${y}`;
            } else {
                const prevRect = $prepSteps[index - 1].getBoundingClientRect();
                const prevX = prevRect.left + prevRect.width / 2 - containerRect.left;
                const prevY = prevRect.top + prevRect.height / 2 - containerRect.top;
                
                // 使用控制点创建平滑曲线
                const cpX = (prevX + x) / 2;
                d += ` C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y}`;
            }
        });
        
        prepPath.setAttribute('d', d);
        const length = prepPath.getTotalLength();
        prepPath.style.strokeDasharray = length;
        prepPath.style.strokeDashoffset = length;
    }

    // 2. 观察滚动触发动画
    const prepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 先跑线动画
                $(prepPath).animate({ strokeDashoffset: 0 }, 1500);
                
                // 卡片依次弹出
                $prepSteps.each(function(i) {
                    setTimeout(() => {
                        $(this).addClass('active');
                    }, i * 500 + 300);
                });
                
                prepObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const prepTrigger = document.querySelector('.prep-route-wrapper');
    if (prepTrigger) {
        drawPrepLine();
        prepObserver.observe(prepTrigger);
    }

    // 适配窗口大小
    window.addEventListener('resize', drawPrepLine);
});