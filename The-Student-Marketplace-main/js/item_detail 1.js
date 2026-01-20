$(document).ready(function() {
    // 初始化页面
    initPage();
    
    // 初始化操作按钮
    function initActionButtons() {
        // 在线聊天
        $('.btn-action.chat').click(function() {
            const $btn = $(this);
            $btn.html('<i class="fas fa-spinner fa-spin"></i> 连接中...');
            
            setTimeout(() => {
                $btn.html('<i class="fas fa-comment-dots"></i> 在线聊天');
                showModal('在线聊天', '已连接到卖家张学长，可以开始聊天了', 'success');
            }, 1500);
        });
        
        // 预约看物
        $('.btn-action.schedule').click(function() {
            showModal('预约看物时间', 
                `<div class="time-selector">
                    <h4>请选择您方便的看物时间：</h4>
                    <div class="time-slots">
                        <button class="time-slot">今天 14:00-16:00</button>
                        <button class="time-slot">今天 18:00-20:00</button>
                        <button class="time-slot">明天 10:00-12:00</button>
                        <button class="time-slot">明天 14:00-16:00</button>
                    </div>
                </div>`, 
                'info'
            );
            
            // 绑定时间选择
            setTimeout(() => {
                $('.time-slot').click(function() {
                    const time = $(this).text();
                    showToast(`已预约${time}看物，卖家将尽快确认`, 'success');
                    closeAllModals();
                });
            }, 100);
        });
        
        // 卖家其他在售
        $('.btn-action.view-items').click(function() {
            showModal('卖家其他在售物品', 
                `<div class="seller-items">
                    <h4>张学长的其他物品：</h4>
                    <div class="item-list">
                        <div class="item">
                            <i class="fas fa-book"></i>
                            <span>《算法导论》第三版 - ¥55</span>
                        </div>
                        <div class="item">
                            <i class="fas fa-laptop"></i>
                            <span>MacBook Air 保护壳 - ¥35</span>
                        </div>
                        <div class="item">
                            <i class="fas fa-gamepad"></i>
                            <span>Switch游戏卡带 - ¥120</span>
                        </div>
                    </div>
                </div>`, 
                'info'
            );
        });
        
        // 立即购买
        $('.option-btn.buy').click(function() {
            if (confirm(`确定要立即购买"九成新人体工学椅"吗？\n价格：¥120\n配送方式：请选择后确认`)) {
                const $btn = $(this);
                $btn.html('<i class="fas fa-spinner fa-spin"></i> 处理中...');
                $btn.prop('disabled', true);
                
                setTimeout(() => {
                    $btn.html('<i class="fas fa-check"></i> 购买成功');
                    $btn.addClass('confirmed');
                    showModal('购买成功', 
                        '订单已生成！\n请尽快与卖家联系确认交易细节\n订单号：DD20260115001', 
                        'success'
                    );
                    
                    // 3秒后更新收藏状态
                    setTimeout(() => {
                        $('.option-btn.favorite').removeClass('active');
                        $('.option-btn.favorite').html('<i class="far fa-heart"></i> 加入收藏');
                    }, 3000);
                }, 2000);
            }
        });
        
        // 发起议价
        $('.option-btn.bargain').click(function() {
            showModal('发起议价', 
                `<div class="bargain-form">
                    <h4>当前价格：¥120</h4>
                    <div class="price-suggestions">
                        <button class="price-btn" data-price="110">¥110</button>
                        <button class="price-btn" data-price="100">¥100</button>
                        <button class="price-btn" data-price="90">¥90</button>
                    </div>
                    <div class="custom-price">
                        <input type="number" placeholder="或输入自定义价格" min="50" max="120" step="5">
                        <button class="btn-submit">发送议价</button>
                    </div>
                </div>`, 
                'info'
            );
            
            // 绑定议价按钮
            setTimeout(() => {
                $('.price-btn').click(function() {
                    const price = $(this).data('price');
                    showToast(`已发送议价请求：¥${price}，等待卖家回应`, 'info');
                    closeAllModals();
                });
                
                $('.btn-submit').click(function() {
                    const customPrice = $('.custom-price input').val();
                    if (customPrice && customPrice >= 50 && customPrice <= 120) {
                        showToast(`已发送议价请求：¥${customPrice}，等待卖家回应`, 'info');
                        closeAllModals();
                    } else {
                        showToast('请输入有效价格（50-120元之间）', 'error');
                    }
                });
            }, 100);
        });
        
        // 预约面交
        $('.option-btn.meetup').click(function() {
            showModal('预约面交', 
                `<div class="meetup-form">
                    <h4>选择面交地点：</h4>
                    <div class="location-options">
                        <button class="location-btn" data-location="图书馆大门">
                            <i class="fas fa-university"></i> 图书馆大门
                        </button>
                        <button class="location-btn" data-location="食堂一楼">
                            <i class="fas fa-utensils"></i> 食堂一楼
                        </button>
                        <button class="location-btn" data-location="宿舍8号楼大厅">
                            <i class="fas fa-home"></i> 宿舍8号楼大厅
                        </button>
                    </div>
                    <div class="meetup-time">
                        <h5>选择时间：</h5>
                        <input type="datetime-local" id="meetupTime">
                    </div>
                </div>`, 
                'info'
            );
            
            // 设置默认时间为明天下午2点
            setTimeout(() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(14, 0, 0, 0);
                const formattedTime = tomorrow.toISOString().slice(0, 16);
                $('#meetupTime').val(formattedTime);
                
                $('.location-btn').click(function() {
                    const location = $(this).data('location');
                    const time = $('#meetupTime').val();
                    if (time) {
                        const date = new Date(time);
                        const formattedDate = date.toLocaleString('zh-CN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        showToast(`已预约${location}面交，时间：${formattedDate}`, 'success');
                        closeAllModals();
                    } else {
                        showToast('请选择面交时间', 'warning');
                    }
                });
            }, 100);
        });
        
        // 收藏按钮
        $('.option-btn.favorite').click(function() {
            const $btn = $(this);
            if ($btn.hasClass('active')) {
                if (confirm('确定要从收藏中移除这个物品吗？')) {
                    $btn.html('<i class="far fa-heart"></i> 加入收藏');
                    $btn.removeClass('active');
                    showToast('已从收藏中移除', 'info');
                }
            } else {
                $btn.html('<i class="fas fa-heart"></i> 已收藏');
                $btn.addClass('active');
                showToast('已添加到收藏', 'success');
            }
        });
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
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button class="btn-modal cancel">取消</button>
                        <button class="btn-modal confirm">确定</button>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(modalHtml);
        
        // 添加模态框样式
        if (!$('#modal-styles').length) {
            $('head').append(`
                <style id="modal-styles">
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
                        max-height: 80vh;
                        overflow-y: auto;
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
                        background: linear-gradient(135deg, var(--faq-teal), var(--faq-green));
                        color: white;
                        border-radius: 16px 16px 0 0;
                    }
                    
                    .modal-header h3 {
                        margin: 0;
                        font-size: 18px;
                    }
                    
                    .modal-close {
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: white;
                    }
                    
                    .modal-body {
                        padding: 25px;
                        color: var(--faq-green);
                    }
                    
                    .modal-footer {
                        padding: 20px;
                        border-top: 2px solid var(--faq-light-gray);
                        display: flex;
                        justify-content: flex-end;
                        gap: 15px;
                    }
                    
                    .btn-modal {
                        padding: 10px 25px;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    
                    .btn-modal.confirm {
                        background: linear-gradient(135deg, var(--faq-teal), var(--faq-green));
                        color: white;
                    }
                    
                    .btn-modal.cancel {
                        background: var(--faq-light);
                        color: var(--faq-gray);
                        border: 2px solid var(--faq-light-gray);
                    }
                    
                    .time-selector, .seller-items, .bargain-form, .meetup-form {
                        margin: 15px 0;
                    }
                    
                    .time-slots, .location-options {
                        display: grid;
                        gap: 10px;
                        margin: 15px 0;
                    }
                    
                    .time-slot, .location-btn, .price-btn {
                        padding: 12px;
                        border: 2px solid var(--faq-light-gray);
                        background: white;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.3s;
                        text-align: left;
                    }
                    
                    .time-slot:hover, .location-btn:hover, .price-btn:hover {
                        border-color: var(--faq-teal);
                        background: rgba(13, 148, 136, 0.1);
                    }
                    
                    .price-suggestions {
                        display: flex;
                        gap: 10px;
                        margin: 15px 0;
                    }
                    
                    .price-btn {
                        flex: 1;
                        text-align: center;
                        font-weight: 600;
                        color: var(--faq-gold);
                    }
                    
                    .custom-price {
                        display: flex;
                        gap: 10px;
                        margin-top: 20px;
                    }
                    
                    .custom-price input {
                        flex: 1;
                        padding: 12px;
                        border: 2px solid var(--faq-light-gray);
                        border-radius: 8px;
                    }
                    
                    .custom-price input:focus {
                        outline: none;
                        border-color: var(--faq-teal);
                    }
                    
                    .btn-submit {
                        padding: 12px 20px;
                        background: linear-gradient(135deg, var(--faq-teal), var(--faq-green));
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                    }
                    
                    .item-list {
                        margin: 15px 0;
                    }
                    
                    .item {
                        padding: 12px;
                        border-bottom: 1px solid var(--faq-light-gray);
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    
                    .item:last-child {
                        border-bottom: none;
                    }
                    
                    .item i {
                        color: var(--faq-teal);
                    }
                    
                    #meetupTime {
                        width: 100%;
                        padding: 12px;
                        border: 2px solid var(--faq-light-gray);
                        border-radius: 8px;
                        margin-top: 10px;
                    }
                    
                    #meetupTime:focus {
                        outline: none;
                        border-color: var(--faq-teal);
                    }
                </style>
            `);
        }
        
        // 显示动画
        setTimeout(() => {
            $(`#${modalId}`).addClass('show');
        }, 10);
        
        // 绑定关闭事件
        $(`#${modalId} .modal-close, #${modalId} .cancel`).click(function() {
            closeModal(modalId);
        });
        
        $(`#${modalId} .confirm`).click(function() {
            closeModal(modalId);
            showToast('操作已确认', 'success');
        });
    }
    
    // 关闭所有模态框
    function closeAllModals() {
        $('.modal-overlay').removeClass('show');
        setTimeout(() => {
            $('.modal-overlay').remove();
        }, 300);
    }
    
    // 关闭单个模态框
    function closeModal(modalId) {
        $(`#${modalId}`).removeClass('show');
        setTimeout(() => {
            $(`#${modalId}`).remove();
        }, 300);
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
    
    // 添加动画效果
    function addAnimations() {
        // 添加必要的CSS动画
        if (!$('#anim-styles').length) {
            $('head').append(`
                <style id="anim-styles">
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
                    
                    @keyframes pulse {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                    
                    .option-btn.buy {
                        animation: pulse 2s infinite;
                    }
                    
                    .method-card:hover .method-icon {
                        animation: rotateIcon 0.5s ease-out;
                    }
                    
                    @keyframes rotateIcon {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }
                </style>
            `);
        }
        
        // 卡片悬停效果
        $('.specs-card, .method-card, .safety-item, .review-card').hover(
            function() {
                $(this).css('transform', 'translateY(-5px)');
                $(this).css('box-shadow', '0 10px 25px rgba(0, 0, 0, 0.1)');
            },
            function() {
                $(this).css('transform', 'translateY(0)');
                $(this).css('box-shadow', 'none');
            }
        );
        
        // 按钮点击动画
        $('.btn-action, .option-btn').click(function() {
            $(this).addClass('animate__animated animate__pulse');
            setTimeout(() => {
                $(this).removeClass('animate__pulse');
            }, 300);
        });
    }
    
    // 页面初始化主函数
    function initPage() {
        addAnimations();
        initActionButtons();
        
        // 添加页面加载动画
        $('.item-main-section').addClass('animate__animated animate__fadeIn');
        
        // 绑定评价查看更多
        $('.view-all-link').click(function(e) {
            e.preventDefault();
            showModal('所有评价', '加载所有评价列表...', 'info');
            setTimeout(() => {
                showToast('正在加载所有32条评价', 'success');
            }, 1000);
        });
        
        // 价格标签动画
        setInterval(() => {
            $('.discount-rate').addClass('animate__animated animate__tada');
            setTimeout(() => {
                $('.discount-rate').removeClass('animate__tada');
            }, 1000);
        }, 5000);
    }
});