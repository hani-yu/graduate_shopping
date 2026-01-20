$(document).ready(function() {
    // 全局变量
    let chartInstance = null;
    
    // 初始化页面
    initPage();
    
    // 滚动动画效果
    function initScrollAnimations() {
        function checkVisibility() {
            $('.record-block').each(function() {
                const elementTop = $(this).offset().top;
                const elementBottom = elementTop + $(this).outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('visible');
                }
            });
        }
        
        // 初始检查
        checkVisibility();
        
        // 滚动时检查
        $(window).on('scroll', function() {
            checkVisibility();
        });
    }
    
    // 初始化统计卡片动画
    function initStatCards() {
        $('.stat-card').each(function(index) {
            $(this).css({
                'animation-delay': (index * 0.1) + 's',
                'opacity': '0',
                'transform': 'translateY(20px)'
            });
            
            setTimeout(() => {
                $(this).animate({
                    opacity: 1,
                    transform: 'translateY(0)'
                }, 600);
            }, index * 100);
        });
    }
    
    // 初始化物品分析图表
    function initAnalysisChart() {
        const ctx = document.getElementById('itemAnalysisChart').getContext('2d');
        
        // 销毁现有图表实例
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['数码产品', '书籍教材', '生活用品', '服装鞋帽', '运动器材', '其他'],
                datasets: [{
                    data: [42, 25, 15, 8, 6, 4],
                    backgroundColor: [
                        'rgba(13, 148, 136, 0.8)',   // 蓝绿色
                        'rgba(245, 158, 11, 0.8)',   // 金色
                        'rgba(6, 78, 59, 0.8)',      // 深绿色
                        'rgba(239, 68, 68, 0.8)',    // 红色
                        'rgba(139, 92, 246, 0.8)',   // 紫色
                        'rgba(107, 114, 128, 0.8)'   // 灰色
                    ],
                    borderColor: 'white',
                    borderWidth: 3,
                    hoverOffset: 20
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20,
                            font: {
                                size: 14
                            },
                            color: 'var(--faq-green)'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // 切换分析图表类型
    function initChartToggle() {
        $('.toggle-btn').click(function() {
            const type = $(this).data('type');
            
            // 更新按钮状态
            $('.toggle-btn').removeClass('active');
            $(this).addClass('active');
            
            // 添加切换动画
            $(this).addClass('animate__animated animate__pulse');
            setTimeout(() => {
                $(this).removeClass('animate__pulse');
            }, 300);
            
            // 根据类型更新图表数据
            updateChartData(type);
        });
    }
    
    // 更新图表数据
    function updateChartData(type) {
        if (!chartInstance) return;
        
        let data, title;
        
        switch(type) {
            case 'popularity':
                data = [42, 25, 15, 8, 6, 4];
                title = '物品受欢迎度分析';
                break;
            case 'value':
                data = [35, 30, 12, 10, 8, 5];
                title = '物品流转价值分析';
                break;
            case 'speed':
                data = [20, 45, 10, 8, 12, 5];
                title = '物品成交速度分析';
                break;
            default:
                data = [42, 25, 15, 8, 6, 4];
        }
        
        // 添加更新动画
        chartInstance.data.datasets[0].data = data;
        chartInstance.update('active');
        
        // 显示切换提示
        showToast(`已切换到"${title}"`, 'info');
    }
    
    // 初始化筛选功能
    function initFilters() {
        // 闲置物品筛选
        $('#item-filter').change(function() {
            const filter = $(this).val();
            
            $('.item-card').each(function() {
                const status = $(this).hasClass(filter) || filter === 'all';
                $(this).toggle(status);
                
                if (status) {
                    $(this).addClass('animate__animated animate__fadeIn');
                    setTimeout(() => {
                        $(this).removeClass('animate__fadeIn');
                    }, 500);
                }
            });
        });
        
        // 时间周期选择
        $('#period-select').change(function() {
            const period = $(this).val();
            showToast(`已切换到${period}数据`, 'info');
            // 这里可以添加实际的数据更新逻辑
        });
        
        // 订单筛选按钮
        $('.filter-btn').click(function() {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            
            // 添加点击动画
            $(this).addClass('animate__animated animate__pulse');
            setTimeout(() => {
                $(this).removeClass('animate__pulse');
            }, 300);
            
            // 这里可以添加实际的筛选逻辑
        });
        
        // 订单搜索
        $('#order-search-input').on('input', debounce(function() {
            const query = $(this).val().toLowerCase();
            
            if (query.length >= 2) {
                // 执行搜索
                console.log('搜索关键词:', query);
                showToast(`正在搜索"${query}"...`, 'info');
            }
        }, 500));
    }
    
    // 初始化按钮交互
    function initButtonInteractions() {
        // 发布新闲置
        $('#add-item').click(function() {
            showModal('发布新闲置', '即将打开发布页面...', 'success');
        });
        
        // 新预约回收
        $('#new-appointment').click(function() {
            showModal('预约回收服务', '选择要回收的物品类型和时间...', 'info');
        });
        
        // 确认面交完成
        $('.btn-confirm').click(function() {
            const $btn = $(this);
            $btn.html('<i class="fas fa-spinner fa-spin"></i> 确认中...');
            
            setTimeout(() => {
                $btn.html('<i class="fas fa-check"></i> 已确认');
                $btn.addClass('confirmed');
                showToast('面交完成确认成功！', 'success');
            }, 1500);
        });
        
        // 修改面交时间
        $('.btn-modify').click(function() {
            showModal('修改面交时间', '请选择新的面交时间...', 'info');
        });
        
        // 物品操作按钮
        $('.btn-item.edit').click(function(e) {
            e.stopPropagation();
            showToast('即将编辑物品信息', 'info');
        });
        
        $('.btn-item.refresh').click(function(e) {
            e.stopPropagation();
            $(this).addClass('animate__animated animate__rotateIn');
            setTimeout(() => {
                $(this).removeClass('animate__rotateIn');
            }, 500);
            showToast('物品已刷新到最新', 'success');
        });
        
        $('.btn-item.offline').click(function(e) {
            e.stopPropagation();
            const $card = $(this).closest('.item-card');
            $card.addClass('animate__animated animate__fadeOut');
            
            setTimeout(() => {
                $card.removeClass('selling').addClass('expired');
                $card.find('.item-badge').text('已下架').css('background', 'var(--faq-gray)');
                $card.removeClass('animate__fadeOut');
                showToast('物品已下架', 'info');
            }, 500);
        });
    }
    
    // 初始化争议处理
    function initDisputeHandling() {
        $('.btn-dispute-action').click(function() {
            const type = $(this).find('span').text();
            showModal(type, '打开相关处理页面...', 'info');
        });
    }
    
    // 显示提示消息
    function showToast(message, type = 'info') {
        const $toast = $('<div class="toast-message"></div>')
            .text(message)
            .addClass(`toast-${type}`)
            .css({
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '15px 20px',
                borderRadius: '8px',
                color: 'white',
                zIndex: '9999',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                animation: 'slideInRight 0.3s ease-out'
            });
        
        // 根据类型设置背景色
        const bgColors = {
            success: 'linear-gradient(135deg, #10b981, #34d399)',
            error: 'linear-gradient(135deg, var(--faq-red), #f87171)',
            info: 'linear-gradient(135deg, var(--faq-teal), var(--faq-green))',
            warning: 'linear-gradient(135deg, var(--faq-gold), #fbbf24)'
        };
        
        $toast.css('background', bgColors[type] || bgColors.info);
        
        // 添加到页面
        $('body').append($toast);
        
        // 3秒后自动移除
        setTimeout(function() {
            $toast.animate({
                opacity: 0,
                right: '-100px'
            }, 300, function() {
                $(this).remove();
            });
        }, 3000);
    }
    
    // 显示模态框
    function showModal(title, content, type = 'info') {
        const modalId = 'modal-' + Date.now();
        const modalHtml = `
            <div id="${modalId}" class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${content}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-modal confirm">确定</button>
                        <button class="btn-modal cancel">取消</button>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(modalHtml);
        
        // 显示动画
        setTimeout(() => {
            $(`#${modalId}`).addClass('show');
        }, 10);
        
        // 绑定关闭事件
        $(`#${modalId} .modal-close, #${modalId} .cancel`).click(function() {
            closeModal(modalId);
        });
        
        $(`#${modalId} .confirm`).click(function() {
            // 执行确认操作
            closeModal(modalId);
            showToast('操作已确认', 'success');
        });
    }
    
    // 关闭模态框
    function closeModal(modalId) {
        $(`#${modalId}`).removeClass('show');
        setTimeout(() => {
            $(`#${modalId}`).remove();
        }, 300);
    }
    
    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
    
    // 添加CSS动画
    function addAnimations() {
        $('head').append(`
            <style>
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s;
                }
                
                .modal-overlay.show {
                    opacity: 1;
                    visibility: visible;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 16px;
                    width: 90%;
                    max-width: 500px;
                    transform: translateY(-50px);
                    transition: transform 0.3s;
                }
                
                .modal-overlay.show .modal-content {
                    transform: translateY(0);
                }
                
                .modal-header {
                    padding: 20px;
                    border-bottom: 2px solid var(--faq-light-gray);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    margin: 0;
                    color: var(--faq-green);
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--faq-gray);
                }
                
                .modal-body {
                    padding: 20px;
                }
                
                .modal-footer {
                    padding: 20px;
                    border-top: 2px solid var(--faq-light-gray);
                    display: flex;
                    justify-content: flex-end;
                    gap: 15px;
                }
                
                .btn-modal {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                }
                
                .btn-modal.confirm {
                    background: linear-gradient(135deg, var(--faq-teal), var(--faq-green));
                    color: white;
                }
                
                .btn-modal.cancel {
                    background: var(--faq-light);
                    color: var(--faq-gray);
                }
            </style>
        `);
    }
    
    // 页面初始化主函数
    function initPage() {
        addAnimations();
        initScrollAnimations();
        initStatCards();
        initAnalysisChart();
        initChartToggle();
        initFilters();
        initButtonInteractions();
        initDisputeHandling();
        
        // 页面加载动画
        setTimeout(() => {
            $('.page-header').addClass('animate__animated animate__fadeIn');
        }, 300);
        
        // 添加卡片悬停效果
        $('.record-block').hover(
            function() {
                $(this).css('transform', 'translateY(-5px)');
            },
            function() {
                $(this).css('transform', 'translateY(0)');
            }
        );
    }
});