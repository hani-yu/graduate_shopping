// 页面加载完成后执行
$(document).ready(function() {
    console.log('评价中心页面加载完成');
    
    // 初始化页面元素
    initPage();
    
    // 初始化数据可视化
    initCharts();
    
    // 初始化交互功能
    initInteractions();
    
    // 滚动触发动画
    initScrollAnimations();
});

// 页面初始化
function initPage() {
    console.log('初始化评价中心页面');
    
    // 显示页面内容
    $('.reviews-detail-container').css('opacity', '1');
    
    // 初始化时间显示
    updateCurrentTime();
}

// 数据可视化图表
function initCharts() {
    console.log('初始化数据图表');
    
    // 趋势分析图
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['9月', '10月', '11月', '12月', '1月'],
                datasets: [
                    {
                        label: '评价数量',
                        data: [18, 24, 30, 28, 32],
                        borderColor: '#2a9d8f',
                        backgroundColor: 'rgba(42, 157, 143, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: '平均评分',
                        data: [4.5, 4.6, 4.7, 4.8, 4.8],
                        borderColor: '#e9c46a',
                        backgroundColor: 'rgba(233, 196, 106, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 0,
                        title: {
                            display: true,
                            text: '评价数量'
                        }
                    },
                    y1: {
                        position: 'right',
                        beginAtZero: false,
                        min: 4,
                        max: 5,
                        title: {
                            display: true,
                            text: '平均评分'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#2a9d8f',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                }
            }
        });
    }
}

// 交互功能初始化
function initInteractions() {
    console.log('初始化交互功能');
    
    // 1. 块切换动画
    $('.filter-tab').click(function() {
        const filterType = $(this).data('filter');
        $(this).addClass('active').siblings().removeClass('active');
        
        // 瀑布流筛选效果
        filterReviewsByType(filterType);
    });
    
    // 2. 品类标签切换
    $('.category-tab').click(function() {
        const category = $(this).data('category');
        $(this).addClass('active').siblings().removeClass('active');
        
        // 显示对应的品类详情
        showCategoryDetails(category);
    });
    
    // 3. 评分分布交互
    $('.dist-item').hover(
        function() {
            const rating = $(this).data('rating');
            const count = $(this).data('count');
            showRatingTooltip($(this), rating, count);
        },
        function() {
            hideRatingTooltip();
        }
    );
    
    // 4. 标签云交互
    $('.tag').click(function() {
        const tagText = $(this).text().replace(/ [🏅💰✅🤝🌿📦⏱️👨‍🎓]/g, '');
        searchByTag(tagText);
    });
    
    // 5. 瀑布流加载更多
    $('.btn-load-more').click(function() {
        loadMoreReviews();
    });
    
    // 6. 评价回复功能
    $('.btn-reply').click(function() {
        openReplyModal($(this).closest('.pending-review'));
    });
    
    $('.btn-quick-reply').click(function() {
        showQuickReplyOptions($(this).closest('.pending-review'));
    });
    
    // 7. 批量操作
    $('.batch-btn').click(function() {
        const action = $(this).data('action');
        performBatchAction(action);
    });
    
    // 8. 时间范围筛选
    $('#time-range-select').change(function() {
        updateGrowthAnalysis($(this).val());
    });
    
    // 9. 评价搜索
    $('#review-search').on('input', function() {
        searchReviews($(this).val());
    });
    
    // 10. 评分筛选
    $('.filter-btn[data-rating]').click(function() {
        const rating = $(this).data('rating');
        filterReviewsByRating(rating);
        $(this).addClass('active').siblings().removeClass('active');
    });
    
    // 11. 时间筛选
    $('.filter-btn[data-time]').click(function() {
        const timeRange = $(this).data('time');
        filterReviewsByTime(timeRange);
        $(this).addClass('active').siblings().removeClass('active');
    });
    
    // 12. 有帮助按钮
    $('.helpful-btn').click(function() {
        markReviewHelpful($(this));
    });
    
    // 13. 图片查看器
    $('.image-thumb').click(function() {
        openImageViewer($(this).find('img').attr('src'));
    });
    
    // 14. 保存设置
    $('.btn-main').click(function() {
        saveSettings();
    });
}

// 滚动触发动画
function initScrollAnimations() {
    // 监听滚动事件
    $(window).scroll(function() {
        checkBlockVisibility();
    });
    
    // 初始检查
    checkBlockVisibility();
}

// 检查块是否可见
function checkBlockVisibility() {
    $('.reviews-block').each(function() {
        const block = $(this);
        const blockTop = block.offset().top;
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop + windowHeight * 0.8 > blockTop) {
            if (!block.hasClass('visible')) {
                block.addClass('visible');
                
                // 延迟显示内部动画
                const blockNum = block.data('block');
                setTimeout(() => {
                    animateBlockContent(blockNum);
                }, 300);
            }
        }
    });
}

// 动画块内容
function animateBlockContent(blockNum) {
    switch(blockNum) {
        case 1:
            // 数据卡片动画
            $('.stats-item').each(function(index) {
                $(this).css({
                    opacity: 0,
                    transform: 'translateY(20px)'
                }).delay(index * 100).animate({
                    opacity: 1,
                    transform: 'translateY(0)'
                }, 500);
            });
            
            // 进度条动画
            $('.dist-fill').each(function() {
                const width = $(this).css('width');
                $(this).css('width', '0').animate({
                    width: width
                }, 1000);
            });
            break;
            
        case 2:
            // 评价卡片动画
            $('.review-card').each(function(index) {
                $(this).css({
                    opacity: 0,
                    transform: 'translateY(30px)'
                }).delay(index * 150).animate({
                    opacity: 1,
                    transform: 'translateY(0)'
                }, 600);
            });
            break;
            
        case 5:
            // 进度条动画
            $('.progress-fill').each(function() {
                const width = $(this).css('width');
                $(this).css('width', '0').animate({
                    width: width
                }, 800);
            });
            break;
    }
}

// 瀑布流筛选功能
function filterReviewsByType(filterType) {
    console.log('筛选评价类型:', filterType);
    
    $('.review-card').each(function() {
        const card = $(this);
        const cardType = card.hasClass('highlight') ? 'highlight' : 
                        card.hasClass('recent') ? 'recent' : 
                        card.hasClass('useful') ? 'useful' : 'all';
        
        if (filterType === 'all' || cardType === filterType) {
            card.fadeIn(300);
        } else {
            card.fadeOut(300);
        }
    });
    
    // 重新排列瀑布流
    setTimeout(() => {
        rearrangeMasonry();
    }, 350);
}

// 显示品类详情
function showCategoryDetails(category) {
    console.log('显示品类详情:', category);
    
    $('.category-info').removeClass('active').hide();
    $(`.category-info[data-category="${category}"]`).addClass('active').fadeIn(500);
}

// 评分分布提示
function showRatingTooltip(element, rating, count) {
    const tooltip = $('<div class="rating-tooltip"></div>');
    tooltip.html(`
        <strong>${rating}星评价</strong><br>
        共${count}条<br>
        占比：${Math.round((count/128)*100)}%
    `);
    
    tooltip.css({
        position: 'absolute',
        background: 'rgba(42, 157, 143, 0.95)',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '8px',
        fontSize: '0.9rem',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        pointerEvents: 'none'
    });
    
    const offset = element.offset();
    tooltip.css({
        left: offset.left + element.width() + 15,
        top: offset.top
    });
    
    $('body').append(tooltip);
}

function hideRatingTooltip() {
    $('.rating-tooltip').remove();
}

// 按标签搜索
function searchByTag(tagText) {
    console.log('按标签搜索:', tagText);
    
    $('#review-search').val(tagText).trigger('input');
    
    // 添加搜索动画
    $('.search-box').css({
        animation: 'pulse 0.5s'
    });
    
    setTimeout(() => {
        $('.search-box').css('animation', '');
    }, 500);
}

// 加载更多评价
function loadMoreReviews() {
    console.log('加载更多评价');
    
    const btn = $('.btn-load-more');
    btn.html('<i class="fas fa-spinner fa-spin"></i> 加载中...').prop('disabled', true);
    
    // 模拟加载延迟
    setTimeout(() => {
        // 这里可以添加AJAX请求加载更多数据
        
        // 示例：添加更多评价卡片
        const newReviews = [
            {
                type: 'highlight',
                name: '张同学',
                meta: '外语学院 · 2028届',
                date: '2024-01-12',
                rating: 5,
                text: '买到的词典里夹着一张异国明信片，学姐说她曾经带着这本词典去交换学习。这不仅仅是本词典，更是一段旅程的记忆。',
                item: '《牛津高阶英汉双解词典》+ 明信片',
                helpful: 15,
                views: 98
            },
            {
                type: 'recent',
                name: '陈同学',
                meta: '医学院 · 2030届',
                date: '2024-01-15',
                rating: 4.5,
                text: '实验器材很齐全，保存完好。学长还特意录制了使用视频，非常贴心。',
                item: '医学实验器材套装',
                helpful: 8,
                views: 67
            }
        ];
        
        newReviews.forEach((review, index) => {
            const reviewCard = createReviewCard(review);
            $('#reviews-masonry').append(reviewCard);
            
            // 动画显示新卡片
            setTimeout(() => {
                $(reviewCard).css({
                    opacity: 0,
                    transform: 'translateY(20px)'
                }).animate({
                    opacity: 1,
                    transform: 'translateY(0)'
                }, 500);
            }, index * 200);
        });
        
        // 恢复按钮状态
        btn.html('<i class="fas fa-sync-alt"></i> 加载更多评价').prop('disabled', false);
        
        // 重新排列瀑布流
        rearrangeMasonry();
        
        // 显示加载成功提示
        showNotification('成功加载2条新评价', 'success');
    }, 1500);
}

// 创建评价卡片
function createReviewCard(review) {
    const stars = '★'.repeat(Math.floor(review.rating)) + (review.rating % 1 ? '½' : '');
    
    return `
        <div class="review-card ${review.type}">
            <div class="review-header">
                <div class="reviewer-avatar">${review.name.charAt(0)}</div>
                <div class="reviewer-info">
                    <div class="reviewer-name">${review.name}</div>
                    <div class="reviewer-meta">${review.meta}</div>
                </div>
                <div class="review-date">${review.date}</div>
            </div>
            
            <div class="review-rating">
                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(review.rating))}
                ${review.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                <span class="rating-text">${review.rating.toFixed(1)}</span>
            </div>
            
            <div class="review-content">
                <p class="review-text">"${review.text}"</p>
                
                <div class="item-info">
                    <i class="fas fa-box"></i>
                    <span>成交物品：${review.item}</span>
                </div>
            </div>
            
            <div class="review-footer">
                <div class="review-stats">
                    <button class="helpful-btn">
                        <i class="fas fa-thumbs-up"></i>
                        <span>有帮助 (${review.helpful})</span>
                    </button>
                    <span class="view-count">
                        <i class="fas fa-eye"></i> 被浏览${review.views}次
                    </span>
                </div>
            </div>
        </div>
    `;
}

// 重新排列瀑布流
function rearrangeMasonry() {
    // 简单的瀑布流实现
    const container = $('#reviews-masonry');
    const cards = container.find('.review-card:visible');
    
    // 重置位置
    cards.css({
        position: 'relative',
        top: 0
    });
    
    // 这里可以添加更复杂的瀑布流布局逻辑
}

// 打开回复模态框
function openReplyModal(reviewElement) {
    const reviewerName = reviewElement.find('.reviewer-name').text();
    const reviewText = reviewElement.find('.pending-text').text();
    
    // 创建回复模态框
    const modal = $(`
        <div class="reply-modal">
            <div class="modal-content">
                <h3><i class="fas fa-reply"></i> 回复 ${reviewerName}</h3>
                <div class="original-review">
                    <strong>原评价：</strong>
                    <p>"${reviewText}"</p>
                </div>
                <textarea class="reply-input" placeholder="请输入您的回复..." rows="4"></textarea>
                <div class="modal-actions">
                    <button class="btn-secondary cancel-btn">取消</button>
                    <button class="btn-main submit-reply-btn">发送回复</button>
                </div>
            </div>
        </div>
    `);
    
    // 添加到页面
    $('body').append(modal);
    
    // 事件绑定
    modal.find('.cancel-btn').click(function() {
        modal.remove();
    });
    
    modal.find('.submit-reply-btn').click(function() {
        const replyText = modal.find('.reply-input').val();
        if (replyText.trim()) {
            submitReply(reviewElement, replyText);
            modal.remove();
        } else {
            alert('请输入回复内容');
        }
    });
    
    // 点击模态框外部关闭
    modal.click(function(e) {
        if ($(e.target).hasClass('reply-modal')) {
            modal.remove();
        }
    });
}

// 显示快捷回复选项
function showQuickReplyOptions(reviewElement) {
    const options = [
        { text: '感谢您的评价！', icon: 'heart' },
        { text: '很高兴物品对您有帮助！', icon: 'smile' },
        { text: '祝您使用愉快！', icon: 'thumbs-up' },
        { text: '欢迎下次光临！', icon: 'handshake' }
    ];
    
    const optionsPanel = $(`
        <div class="quick-reply-panel">
            <h4>快捷回复</h4>
            <div class="options-list">
                ${options.map(opt => `
                    <button class="quick-option" data-text="${opt.text}">
                        <i class="fas fa-${opt.icon}"></i> ${opt.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `);
    
    // 定位并显示
    const position = reviewElement.find('.btn-quick-reply').offset();
    optionsPanel.css({
        position: 'absolute',
        left: position.left,
        top: position.top + 40,
        zIndex: 1000
    });
    
    $('body').append(optionsPanel);
    
    // 事件绑定
    optionsPanel.find('.quick-option').click(function() {
        const replyText = $(this).data('text');
        submitReply(reviewElement, replyText);
        optionsPanel.remove();
    });
    
    // 点击外部关闭
    setTimeout(() => {
        $(document).one('click', function(e) {
            if (!$(e.target).closest('.quick-reply-panel, .btn-quick-reply').length) {
                optionsPanel.remove();
            }
        });
    }, 100);
}

// 提交回复
function submitReply(reviewElement, replyText) {
    console.log('提交回复:', replyText);
    
    // 模拟提交
    reviewElement.fadeOut(300, function() {
        $(this).remove();
        updatePendingCount();
        showNotification('回复已发送', 'success');
    });
}

// 更新待回复计数
function updatePendingCount() {
    const pendingCount = $('.pending-review:not(.dispute)').length;
    $('.management-stats .pending span').text(`待回复：${pendingCount}条`);
}

// 执行批量操作
function performBatchAction(action) {
    console.log('执行批量操作:', action);
    
    switch(action) {
        case 'thank':
            batchThankReviews();
            break;
        case 'reply':
            batchReplyReviews();
            break;
        case 'export':
            exportReviews();
            break;
    }
}

// 批量感谢评价
function batchThankReviews() {
    showConfirmation('确认一键感谢所有好评？', () => {
        // 模拟批量操作
        $('.review-card.highlight, .review-card.recent, .review-card.useful').each(function() {
            const helpfulBtn = $(this).find('.helpful-btn');
            const currentCount = parseInt(helpfulBtn.text().match(/\d+/)[0]) || 0;
            helpfulBtn.html(`<i class="fas fa-thumbs-up"></i><span>有帮助 (${currentCount + 1})</span>`);
        });
        
        showNotification('已为所有好评点赞感谢', 'success');
    });
}

// 批量回复相似评价
function batchReplyReviews() {
    showConfirmation('确认批量回复相似评价？', () => {
        const replyText = '感谢您的评价！很高兴您对物品满意，祝您使用愉快！';
        
        $('.pending-review:not(.dispute)').each(function() {
            submitReply($(this), replyText);
        });
    });
}

// 导出评价记录
function exportReviews() {
    console.log('导出评价记录');
    
    // 模拟导出过程
    $('.batch-btn[data-action="export"]').html('<i class="fas fa-spinner fa-spin"></i> 导出中...').prop('disabled', true);
    
    setTimeout(() => {
        // 创建CSV数据
        const csvData = [
            ['时间', '买家', '评分', '评价内容', '回复状态'],
            ['2024-01-10', '苏同学', '5.0', '学长人超级好！买到的《数据结构》教材里还夹了他手写的复试笔记...', '已回复'],
            ['2024-01-14', '王同学', '4.5', '烧水壶和护眼灯都非常新，价格也很合理...', '已回复'],
            ['2024-01-05', '李同学', '5.0', '人体工学椅非常舒服，腰部支撑特别好...', '已回复']
        ];
        
        const csvContent = csvData.map(row => row.join(',')).join('\n');
        
        // 创建下载链接
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `评价记录_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 恢复按钮状态
        $('.batch-btn[data-action="export"]').html('<i class="fas fa-download"></i> 导出评价记录').prop('disabled', false);
        
        showNotification('评价记录已导出', 'success');
    }, 2000);
}

// 更新成长分析
function updateGrowthAnalysis(timeRange) {
    console.log('更新成长分析时间范围:', timeRange);
    
    // 这里可以添加根据时间范围更新图表数据的逻辑
    showNotification(`已切换到${timeRange}数据`, 'info');
}

// 搜索评价
function searchReviews(keyword) {
    console.log('搜索评价:', keyword);
    
    if (!keyword.trim()) {
        // 显示所有评价
        $('.review-card, .pending-review').show();
        return;
    }
    
    $('.review-card, .pending-review').each(function() {
        const text = $(this).text().toLowerCase();
        if (text.includes(keyword.toLowerCase())) {
            $(this).show();
            
            // 高亮关键词
            highlightText($(this), keyword);
        } else {
            $(this).hide();
        }
    });
    
    // 重新排列瀑布流
    rearrangeMasonry();
}

// 高亮文本
function highlightText(element, keyword) {
    const regex = new RegExp(`(${keyword})`, 'gi');
    element.html(element.html().replace(regex, '<mark>$1</mark>'));
}

// 按评分筛选
function filterReviewsByRating(rating) {
    console.log('按评分筛选:', rating);
    
    $('.review-card').each(function() {
        const card = $(this);
        const ratingValue = parseFloat(card.find('.rating-text').text());
        
        let showCard = true;
        if (rating !== 'all') {
            if (rating === '5') showCard = ratingValue >= 5;
            else if (rating === '4') showCard = ratingValue >= 4;
            else if (rating === '3') showCard = ratingValue <= 3;
        }
        
        if (showCard) {
            card.fadeIn(300);
        } else {
            card.fadeOut(300);
        }
    });
    
    rearrangeMasonry();
}

// 按时间筛选
function filterReviewsByTime(timeRange) {
    console.log('按时间筛选:', timeRange);
    
    // 这里可以添加实际的时间筛选逻辑
    showNotification(`已筛选${timeRange}的评价`, 'info');
}

// 标记有帮助
function markReviewHelpful(button) {
    const currentCount = parseInt(button.find('span').text().match(/\d+/)[0]) || 0;
    const newCount = currentCount + 1;
    
    button.html(`<i class="fas fa-thumbs-up"></i><span>有帮助 (${newCount})</span>`);
    button.css({
        background: 'linear-gradient(135deg, #28a745, #20c997)',
        color: 'white',
        borderColor: '#28a745'
    });
    
    showNotification('感谢您的反馈！', 'success');
}

// 打开图片查看器
function openImageViewer(imageUrl) {
    const viewer = $(`
        <div class="image-viewer">
            <div class="viewer-content">
                <button class="close-viewer">&times;</button>
                <img src="${imageUrl}" alt="查看图片">
                <div class="image-info">点击任意位置关闭</div>
            </div>
        </div>
    `);
    
    $('body').append(viewer);
    
    viewer.find('.close-viewer').click(() => viewer.remove());
    viewer.click((e) => {
        if ($(e.target).hasClass('image-viewer')) {
            viewer.remove();
        }
    });
}

// 保存设置
function saveSettings() {
    console.log('保存设置');
    
    // 收集所有设置
    const settings = {
        securityLevel: $('#securityLevel').val(),
        autoLogout: $('#autoLogout').is(':checked'),
        notifications: {
            email: $('#notifyEmail').is(':checked'),
            sms: $('#notifySMS').is(':checked'),
            app: $('#notifyApp').is(':checked')
        },
        privacy: {
            showOnline: $('#showOnline').is(':checked'),
            showActivity: $('#showActivity').is(':checked')
        }
    };
    
    // 模拟保存过程
    showNotification('设置已保存', 'success');
    
    // 这里可以添加实际保存到服务器的逻辑
    // $.ajax({
    //     url: '/api/settings/save',
    //     method: 'POST',
    //     data: JSON.stringify(settings),
    //     contentType: 'application/json',
    //     success: function(response) {
    //         showNotification('设置已保存', 'success');
    //     },
    //     error: function() {
    //         showNotification('保存失败，请重试', 'error');
    //     }
    // });
}

// 显示确认对话框
function showConfirmation(message, onConfirm) {
    const dialog = $(`
        <div class="confirmation-dialog">
            <div class="dialog-content">
                <h4><i class="fas fa-exclamation-circle"></i> 确认操作</h4>
                <p>${message}</p>
                <div class="dialog-actions">
                    <button class="btn-secondary cancel-btn">取消</button>
                    <button class="btn-warning confirm-btn">确认</button>
                </div>
            </div>
        </div>
    `);
    
    $('body').append(dialog);
    
    dialog.find('.cancel-btn').click(() => dialog.remove());
    dialog.find('.confirm-btn').click(() => {
        onConfirm();
        dialog.remove();
    });
    
    dialog.click((e) => {
        if ($(e.target).hasClass('confirmation-dialog')) {
            dialog.remove();
        }
    });
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = $(`
        <div class="notification ${type}">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        </div>
    `);
    
    // 添加到页面
    $('body').append(notification);
    
    // 动画显示
    notification.css({
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        background: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        opacity: 0,
        transform: 'translateX(100px)'
    });
    
    notification.animate({
        opacity: 1,
        transform: 'translateX(0)'
    }, 300);
    
    // 关闭按钮事件
    notification.find('.close-notification').click(() => {
        notification.animate({
            opacity: 0,
            transform: 'translateX(100px)'
        }, 300, () => notification.remove());
    });
    
    // 自动关闭
    setTimeout(() => {
        if (notification.length) {
            notification.animate({
                opacity: 0,
                transform: 'translateX(100px)'
            }, 300, () => notification.remove());
        }
    }, 3000);
}

// 更新当前时间
function updateCurrentTime() {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    $('.update-time').text(`数据更新至：${formattedDate}`);
}

// 添加CSS样式
function addCustomStyles() {
    const styles = `
        .notification {
            transition: all 0.3s ease;
        }
        
        .reply-modal, .confirmation-dialog, .image-viewer {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .modal-content, .dialog-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .quick-reply-panel {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            min-width: 300px;
        }
        
        .quick-option {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            text-align: left;
            border: 1px solid var(--border-color);
            background: white;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .quick-option:hover {
            background: var(--light-color);
            border-color: var(--primary-color);
        }
        
        mark {
            background: linear-gradient(135deg, #ffd166, #ffd166);
            padding: 2px 5px;
            border-radius: 3px;
        }
        
        .image-viewer .viewer-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        }
        
        .image-viewer img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
        }
        
        .close-viewer {
            position: absolute;
            top: -15px;
            right: -15px;
            width: 40px;
            height: 40px;
            background: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
    `;
    
    $('head').append(`<style>${styles}</style>`);
}

// 初始化自定义样式
addCustomStyles();

// 页面卸载时清理
$(window).on('beforeunload', function() {
    // 清理操作
    console.log('页面即将卸载');
});