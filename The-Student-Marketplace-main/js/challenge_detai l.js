document.addEventListener('DOMContentLoaded', function() {
    // 1. 排行榜标签页切换
    initRankingTabs();
    
    // 2. 任务进度动画
    initTaskProgress();
    
    // 3. 时间线动画
    initTimelineAnimation();
    
    // 4. 侧边栏交互
    initSidebarInteractions();
    
    // 5. 卡片悬停效果
    initCardHoverEffects();
    
    // 6. 实时数据更新
    initLiveDataUpdates();
});

// 排行榜标签页切换
function initRankingTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${tabId}-rank`) {
                    pane.classList.add('active');
                    
                    // 添加入场动画
                    const cards = pane.querySelectorAll('.rank-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
            
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 任务进度动画
function initTaskProgress() {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        const progressText = item.querySelector('.task-progress');
        if (progressText) {
            const match = progressText.textContent.match(/\((\d+)\/(\d+)\)/);
            if (match) {
                const current = parseInt(match[1]);
                const total = parseInt(match[2]);
                const percent = (current / total) * 100;
                
                // 创建进度条
                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressBar.innerHTML = `
                    <div class="progress-fill" style="width: ${percent}%"></div>
                `;
                
                // 添加到任务项
                const progressContainer = document.createElement('div');
                progressContainer.className = 'progress-container';
                progressContainer.appendChild(progressBar);
                item.appendChild(progressContainer);
                
                // 添加进度条样式
                const style = document.createElement('style');
                style.textContent = `
                    .progress-container {
                        margin-top: 0.5rem;
                        width: 100%;
                    }
                    
                    .progress-bar {
                        height: 4px;
                        background: var(--gray-200);
                        border-radius: 2px;
                        overflow: hidden;
                    }
                    
                    .progress-fill {
                        height: 100%;
                        background: linear-gradient(90deg, var(--theme-teal), var(--deep-green));
                        border-radius: 2px;
                        transition: width 1s ease;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    });
}

// 时间线动画
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.6s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// 侧边栏交互
function initSidebarInteractions() {
    const viewProgressBtn = document.querySelector('.sidebar-btn.view-progress');
    const shareProgressBtn = document.querySelector('.sidebar-btn.share-progress');
    
    if (viewProgressBtn) {
        viewProgressBtn.addEventListener('click', function() {
            // 显示个人进度详情
            showProgressDetail();
            
            // 按钮动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    if (shareProgressBtn) {
        shareProgressBtn.addEventListener('click', function() {
            // 显示分享选项
            showShareOptions();
            
            // 按钮动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}

// 卡片悬停效果
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.task-card, .rank-card, .theme-card, .rule-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
}

// 实时数据更新
function initLiveDataUpdates() {
    // 更新倒计时
    updateCountdown();
    
    // 更新排名数据
    updateRankingData();
    
    // 更新个人进度
    updatePersonalProgress();
}

// 更新倒计时
function updateCountdown() {
    const endDate = new Date('2023-06-15T23:59:59');
    
    function update() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            // 更新页面中的倒计时显示
            const countdownElements = document.querySelectorAll('.countdown-display');
            countdownElements.forEach(el => {
                el.innerHTML = `
                    <span class="countdown-item">${days}天</span>
                    <span class="countdown-item">${hours}小时</span>
                    <span class="countdown-item">${minutes}分钟</span>
                `;
            });
        }
    }
    
    update();
    setInterval(update, 60000); // 每分钟更新一次
}

// 更新排名数据
function updateRankingData() {
    // 模拟实时排名变化
    const rankCards = document.querySelectorAll('.rank-card .stat-value');
    
    setInterval(() => {
        rankCards.forEach(card => {
            const currentValue = parseInt(card.textContent.replace(/[^\d]/g, ''));
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, 或 1
            
            if (change !== 0 && currentValue + change > 0) {
                card.textContent = card.textContent.replace(/\d+/, currentValue + change);
                
                // 添加变化动画
                card.style.transform = 'scale(1.1)';
                card.style.color = change > 0 ? 'var(--success)' : 'var(--error)';
                
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.color = '';
                }, 500);
            }
        });
    }, 10000); // 每10秒随机更新一次
}

// 更新个人进度
function updatePersonalProgress() {
    const progressValues = {
        'success-flow': 38,
        'good-reviews': 127,
        'invited-friends': 8,
        'eco-stories': 3,
        'total-points': 1245
    };
    
    // 模拟进度增长
    setInterval(() => {
        // 随机增加一些进度
        const randomKey = Object.keys(progressValues)[Math.floor(Math.random() * Object.keys(progressValues).length)];
        progressValues[randomKey] += Math.floor(Math.random() * 3);
        
        // 更新显示
        updateProgressDisplay(progressValues);
    }, 15000); // 每15秒随机更新一次
}

// 更新进度显示
function updateProgressDisplay(values) {
    // 这里可以根据具体的DOM结构来更新显示
    console.log('更新个人进度:', values);
}

// 显示个人进度详情
function showProgressDetail() {
    // 创建进度详情模态框
    const modal = document.createElement('div');
    modal.className = 'progress-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-chart-line"></i> 我的挑战进度详情</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="progress-charts">
                    <!-- 进度图表内容 -->
                    <div class="chart-section">
                        <h4>任务完成情况</h4>
                        <div class="chart-placeholder">
                            任务进度图表
                        </div>
                    </div>
                    <div class="chart-section">
                        <h4>积分增长趋势</h4>
                        <div class="chart-placeholder">
                            积分增长图表
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn download-report">
                    <i class="fas fa-download"></i> 下载进度报告
                </button>
                <button class="modal-btn close-btn">关闭</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .progress-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: var(--radius-xl);
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }
        
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid var(--gray-200);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            color: var(--deep-green);
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--gray-500);
            cursor: pointer;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .close-modal:hover {
            background: var(--gray-100);
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .progress-charts {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .chart-section h4 {
            color: var(--deep-green);
            margin-bottom: 1rem;
        }
        
        .chart-placeholder {
            height: 200px;
            background: var(--gray-100);
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--gray-500);
            border: 2px dashed var(--gray-300);
        }
        
        .modal-footer {
            padding: 1.5rem;
            border-top: 1px solid var(--gray-200);
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
        }
        
        .modal-btn {
            padding: 0.75rem 1.5rem;
            border-radius: var(--radius-md);
            border: 1px solid var(--gray-300);
            background: white;
            color: var(--gray-700);
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .modal-btn.download-report:hover {
            border-color: var(--theme-teal);
            color: var(--theme-teal);
        }
        
        .modal-btn.close-btn:hover {
            border-color: var(--gray-500);
            color: var(--gray-800);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // 关闭模态框
    const closeBtn = modal.querySelector('.close-modal');
    const closeBtn2 = modal.querySelector('.close-btn');
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        modal.querySelector('.modal-content').style.animation = 'slideDown 0.3s ease';
        
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// 显示分享选项
function showShareOptions() {
    const shareOptions = [
        { name: '微信', icon: 'fa-weixin', color: '#07C160' },
        { name: 'QQ', icon: 'fa-qq', color: '#12B7F5' },
        { name: '微博', icon: 'fa-weibo', color: '#E6162D' },
        { name: '朋友圈', icon: 'fa-share-square', color: var('--theme-teal') }
    ];
    
    const shareToast = document.createElement('div');
    shareToast.className = 'share-toast';
    shareToast.innerHTML = `
        <div class="toast-header">
            <h5>分享我的挑战进度</h5>
        </div>
        <div class="share-options">
            ${shareOptions.map(option => `
                <button class="share-option" style="--option-color: ${option.color}">
                    <i class="fab ${option.icon}"></i>
                    <span>${option.name}</span>
                </button>
            `).join('')}
        </div>
    `;
    
    document.body.appendChild(shareToast);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .share-toast {
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: white;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            border: 1px solid var(--gray-200);
            width: 200px;
            z-index: 2000;
            animation: slideInRight 0.3s ease;
        }
        
        .toast-header {
            padding: 1rem;
            border-bottom: 1px solid var(--gray-200);
        }
        
        .toast-header h5 {
            margin: 0;
            color: var(--deep-green);
            font-size: 0.875rem;
        }
        
        .share-options {
            padding: 1rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
        }
        
        .share-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: white;
            border: 1px solid var(--gray-200);
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .share-option:hover {
            transform: translateY(-2px);
            border-color: var(--option-color);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .share-option i {
            font-size: 1.5rem;
            color: var(--option-color);
        }
        
        .share-option span {
            font-size: 0.75rem;
            color: var(--gray-600);
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // 3秒后自动消失
    setTimeout(() => {
        shareToast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (shareToast.parentNode) {
                document.body.removeChild(shareToast);
                document.head.removeChild(style);
            }
        }, 300);
    }, 3000);
    
    // 点击分享选项
    shareToast.querySelectorAll('.share-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.querySelector('span').textContent;
            alert(`已分享到${platform}`);
            
            shareToast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(shareToast);
                document.head.removeChild(style);
            }, 300);
        });
    });
}