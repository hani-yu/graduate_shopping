document.addEventListener('DOMContentLoaded', function() {
    // 1. 初始化页面交互
    initPageInteractions();
    
    // 2. FAQ展开/收起功能
    initFAQToggle();
    
    // 3. 时间表筛选功能
    initScheduleFilter();
    
    // 4. 动画效果
    initAnimations();
    
    // 5. 打印功能
    initPrintFunctionality();
    
    // 6. 返回顶部按钮
    initBackToTop();
    
    // 7. 页面加载进度指示
    initPageLoadIndicator();
});

// 初始化页面交互
function initPageInteractions() {
    console.log('大件回收公告详情页已加载');
    
    // 页面加载完成提示
    setTimeout(() => {
        showPageReadyNotification();
    }, 500);
    
    // 添加页面滚动监听
    window.addEventListener('scroll', handleScroll);
    
    // 初始化锚点平滑滚动
    initSmoothScroll();
    
    // 初始化工具提示
    initTooltips();
    
    // 初始化预约状态模拟
    initBookingStatusSimulation();
}

// FAQ展开/收起功能
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // 关闭其他FAQ项
            if (!isActive) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        otherAnswer.style.maxHeight = null;
                    }
                });
            }
            
            // 切换当前项
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                // 添加展开动画
                animateFAQOpen(item);
            } else {
                answer.style.maxHeight = null;
            }
            
            // 添加点击反馈
            addClickFeedback(this);
        });
    });
    
    // 默认打开第一个FAQ项
    if (faqItems.length > 0) {
        setTimeout(() => {
            faqItems[0].classList.add('active');
            const firstAnswer = faqItems[0].querySelector('.faq-answer');
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }, 1000);
    }
}

// FAQ展开动画
function animateFAQOpen(faqItem) {
    const answer = faqItem.querySelector('.answer-content');
    const children = answer.children;
    
    // 为子元素添加延迟动画
    Array.from(children).forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            child.style.transition = 'all 0.3s ease';
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 时间表筛选功能
function initScheduleFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const dateGroups = document.querySelectorAll('.date-group');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选时间组
            dateGroups.forEach(group => {
                const area = group.dataset.area;
                
                if (filter === 'all') {
                    group.style.display = 'block';
                    setTimeout(() => {
                        group.style.opacity = '1';
                        group.style.transform = 'translateY(0)';
                    }, 10);
                } else if (area === filter) {
                    group.style.display = 'block';
                    setTimeout(() => {
                        group.style.opacity = '1';
                        group.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    group.style.opacity = '0';
                    group.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        group.style.display = 'none';
                    }, 300);
                }
            });
            
            // 添加点击反馈
            addClickFeedback(this);
            
            // 显示筛选结果提示
            showFilterResult(filter);
        });
    });
}

// 显示筛选结果提示
function showFilterResult(filter) {
    const resultText = {
        'all': '显示所有区域的时间安排',
        'east': '筛选：东区宿舍时间安排',
        'west': '筛选：西区宿舍时间安排',
        'graduate': '筛选：研究生/国际公寓时间安排'
    };
    
    showToast(resultText[filter] || '筛选已更新');
}

// 动画效果初始化
function initAnimations() {
    // 观察器配置
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // 内容区域动画
                if (element.classList.contains('content-section')) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        element.style.transition = 'all 0.6s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                // 卡片动画
                if (element.classList.contains('detail-card') || 
                    element.classList.contains('time-slot-card') ||
                    element.classList.contains('service-card') ||
                    element.classList.contains('channel-card')) {
                    element.classList.add('animated');
                }
                
                // 步骤动画
                if (element.classList.contains('process-step')) {
                    const stepNumber = element.querySelector('.number-circle');
                    if (stepNumber) {
                        stepNumber.style.transform = 'scale(0)';
                        setTimeout(() => {
                            stepNumber.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            stepNumber.style.transform = 'scale(1)';
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);
    
    // 观察所有内容区域和卡片
    document.querySelectorAll('.content-section, .detail-card, .time-slot-card, .service-card, .channel-card, .process-step').forEach(el => {
        observer.observe(el);
    });
    
    // 添加数字计数动画
    initNumberCounting();
}

// 数字计数动画
function initNumberCounting() {
    const counters = document.querySelectorAll('.stat-value, .time-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        
        if (!isNaN(target) && target > 0) {
            animateCounter(counter, target);
        }
    });
}

// 数字动画
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const interval = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // 保持原始文本中的非数字部分
        const originalText = element.textContent;
        const nonNumeric = originalText.replace(/\d+/g, '');
        element.textContent = Math.round(current) + nonNumeric;
    }, interval);
}

// 打印功能
function initPrintFunctionality() {
    // 创建打印按钮
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn';
    printBtn.innerHTML = '<i class="fas fa-print"></i> 打印本页';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 120px;
        right: 20px;
        background: var(--theme-teal);
        color: white;
        padding: 10px 16px;
        border-radius: var(--radius-lg);
        border: none;
        cursor: pointer;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: inherit;
        font-size: 14px;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(printBtn);
    
    // 打印按钮点击事件
    printBtn.addEventListener('click', function() {
        printPage();
    });
    
    // 悬停效果
    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 20px rgba(13, 148, 136, 0.3)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = 'var(--shadow-lg)';
    });
}

// 打印页面
function printPage() {
    showToast('正在准备打印...', 'info');
    
    // 保存原始样式
    const originalStyles = {};
    const elementsToHide = document.querySelectorAll('.main-nav, .page-banner, .main-footer, .print-btn');
    
    elementsToHide.forEach(el => {
        originalStyles[el] = el.style.display;
        el.style.display = 'none';
    });
    
    // 添加打印样式
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            body {
                font-size: 12pt;
                line-height: 1.5;
            }
            .content-section {
                break-inside: avoid;
                margin-bottom: 20pt;
                border: 1px solid #ddd !important;
                box-shadow: none !important;
            }
            .notice-header {
                border: 2px solid #333 !important;
            }
            button, .filter-btn, .q-toggle {
                display: none !important;
            }
            .faq-answer {
                max-height: none !important;
            }
        }
    `;
    document.head.appendChild(printStyle);
    
    // 执行打印
    setTimeout(() => {
        window.print();
        
        // 恢复样式
        setTimeout(() => {
            elementsToHide.forEach(el => {
                el.style.display = originalStyles[el];
            });
            document.head.removeChild(printStyle);
            showToast('打印完成', 'success');
        }, 500);
    }, 500);
}

// 返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 60px;
        right: 20px;
        width: 48px;
        height: 48px;
        background: var(--deep-green);
        color: white;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
            setTimeout(() => {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.transform = 'scale(1)';
            }, 10);
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // 点击动画
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    // 悬停效果
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 20px rgba(6, 78, 59, 0.3)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = 'var(--shadow-lg)';
    });
}

// 页面加载进度指示
function initPageLoadIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'page-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--theme-teal), var(--deep-green));
        z-index: 9999;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px rgba(13, 148, 136, 0.5);
    `;
    
    document.body.appendChild(progressBar);
    
    // 模拟加载进度
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // 加载完成
            setTimeout(() => {
                progressBar.style.opacity = '0';
                setTimeout(() => {
                    progressBar.remove();
                }, 500);
            }, 300);
        }
        progressBar.style.width = progress + '%';
    }, 100);
}

// 页面滚动处理
function handleScroll() {
    const scrollY = window.pageYOffset;
    const sections = document.querySelectorAll('.content-section');
    
    // 更新活动导航
    updateActiveNav(scrollY, sections);
    
    // 视差效果
    applyParallax(scrollY);
}

// 更新活动导航
function updateActiveNav(scrollY, sections) {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });
    
    // 如果有页面内导航，可以在这里高亮对应项
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
}

// 应用视差效果
function applyParallax(scrollY) {
    const parallaxElements = document.querySelectorAll('.detail-card, .service-card');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.05 * (index % 3 + 1);
        const yPos = -(scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
}

// 初始化平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 添加点击反馈
                addClickFeedback(this);
            }
        });
    });
}

// 初始化工具提示
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        const tooltipText = el.dataset.tooltip;
        
        el.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--deep-green);
                color: white;
                padding: 6px 12px;
                border-radius: var(--radius-sm);
                font-size: 12px;
                white-space: nowrap;
                z-index: 10000;
                pointer-events: none;
                transform: translateY(-100%) translateX(-50%);
                left: 50%;
                top: -8px;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            // 定位
            const rect = el.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.top = (rect.top - 8) + 'px';
            
            // 显示
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            // 保存引用
            el._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (this._tooltip && this._tooltip.parentNode) {
                        document.body.removeChild(this._tooltip);
                        delete this._tooltip;
                    }
                }, 200);
            }
        });
    });
}

// 初始化预约状态模拟
function initBookingStatusSimulation() {
    const bookingElements = document.querySelectorAll('.slot-status');
    
    // 模拟实时状态变化
    setInterval(() => {
        bookingElements.forEach(el => {
            if (Math.random() > 0.7) { // 30%概率改变状态
                const currentStatus = el.classList[1];
                const statuses = ['available', 'limited', 'full'];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                if (newStatus !== currentStatus) {
                    el.classList.remove(currentStatus);
                    el.classList.add(newStatus);
                    
                    switch (newStatus) {
                        case 'available':
                            el.textContent = '可预约';
                            break;
                        case 'limited':
                            el.textContent = '少量名额';
                            break;
                        case 'full':
                            el.textContent = '已约满';
                            break;
                    }
                    
                    // 添加状态变化动画
                    el.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        el.style.transform = '';
                    }, 300);
                }
            }
        });
    }, 10000); // 每10秒更新一次
}

// 显示页面就绪通知
function showPageReadyNotification() {
    const notification = document.createElement('div');
    notification.className = 'page-ready-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>页面加载完成！所有公告内容已就绪。</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: white;
        border-radius: var(--radius-lg);
        padding: 12px 16px;
        box-shadow: var(--shadow-xl);
        border-left: 4px solid var(--success);
        z-index: 1000;
        transform: translateX(120%);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// 显示Toast消息
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 样式
    const colors = {
        success: { bg: '#10b981', icon: '✓' },
        error: { bg: '#ef4444', icon: '⚠' },
        warning: { bg: '#f59e0b', icon: '⚠' },
        info: { bg: '#3b82f6', icon: 'ℹ' }
    };
    
    const color = colors[type] || colors.info;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: ${color.bg};
        color: white;
        padding: 12px 24px;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 500;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 90%;
        text-align: center;
    `;
    
    // 添加图标
    const icon = document.createElement('span');
    icon.textContent = color.icon;
    icon.style.cssText = `
        font-size: 16px;
        font-weight: bold;
    `;
    toast.prepend(icon);
    
    // 显示
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // 3秒后移除
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 400);
    }, 3000);
}

// 添加点击反馈
function addClickFeedback(element) {
    // 创建涟漪效果
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(13, 148, 136, 0.2);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    // 计算位置和大小
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // 添加到元素
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // 移除涟漪元素
    setTimeout(() => {
        if (ripple.parentNode === element) {
            element.removeChild(ripple);
        }
    }, 600);
    
    // 添加涟漪动画
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl + P 打印
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        printPage();
    }
    
    // ESC 关闭所有弹窗
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    // 数字键1-5快速导航
    if (e.key >= '1' && e.key <= '5') {
        const sections = [
            'service-details',
            'booking-process',
            'schedule',
            'faq',
            'contact'
        ];
        
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
            const section = document.getElementById(sections[index]);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 80,
                    behavior: 'smooth'
                });
                showToast(`已跳转到：${section.querySelector('h2').textContent}`);
            }
        }
    }
});

// 关闭所有弹窗
function closeAllModals() {
    const modals = document.querySelectorAll('.modal, .notification, .tooltip');
    modals.forEach(modal => {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
}

// 页面卸载前的确认
window.addEventListener('beforeunload', function(e) {
    // 如果有未保存的数据，可以添加确认对话框
    // 例如：if (hasUnsavedChanges) {
    //     e.preventDefault();
    //     e.returnValue = '您有未保存的更改，确定要离开吗？';
    // }
});

// 复制功能支持
function initCopyFunctionality() {
    // 添加复制按钮到重要信息部分
    const copyElements = document.querySelectorAll('.contact-detail, .time-range');
    
    copyElements.forEach(el => {
        el.style.cursor = 'pointer';
        el.title = '点击复制';
        
        el.addEventListener('click', function() {
            const textToCopy = this.textContent.replace(/\s+/g, ' ').trim();
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showToast('已复制到剪贴板', 'success');
                })
                .catch(() => {
                    // 降级方案
                    const textarea = document.createElement('textarea');
                    textarea.value = textToCopy;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    showToast('已复制到剪贴板', 'success');
                });
        });
    });
}

// 初始化复制功能
setTimeout(initCopyFunctionality, 1000);

// 性能监控
function initPerformanceMonitoring() {
    // 页面加载时间
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log(`页面加载完成，耗时：${loadTime}ms`);
        
        // 如果加载时间过长，显示提示
        if (loadTime > 3000) {
            setTimeout(() => {
                showToast('页面内容较多，加载可能需要一些时间', 'info');
            }, 1000);
        }
    });
    
    // 内存使用警告
    let memoryWarnShown = false;
    setInterval(() => {
        if (performance.memory) {
            const usedMB = performance.memory.usedJSHeapSize / 1048576;
            const totalMB = performance.memory.totalJSHeapSize / 1048576;
            
            if (usedMB > totalMB * 0.8 && !memoryWarnShown) {
                console.warn('内存使用率过高：', Math.round(usedMB/totalMB*100) + '%');
                memoryWarnShown = true;
            }
        }
    }, 30000);
}

// 初始化性能监控
initPerformanceMonitoring();

// 离线检测
window.addEventListener('online', function() {
    showToast('网络连接已恢复', 'success');
});

window.addEventListener('offline', function() {
    showToast('网络连接已断开，部分功能可能不可用', 'warning');
});

// 页面可见性API
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('页面被隐藏');
    } else {
        console.log('页面恢复显示');
        // 可以在这里刷新数据
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误：', e.error);
    // 可以在这里发送错误报告
});

// 页面卸载清理
window.addEventListener('unload', function() {
    // 清理工作
    console.log('页面卸载中...');
});