// furniture_effects.js - 宿舍家具页面交互效果

$(document).ready(function() {
    console.log("安居锦囊·温馨复刻 - 交互效果已加载");
    
    // ============================================
    // 尺寸校验功能
    // ============================================
    $('#checkSize').click(function() {
        const dormNumber = $('#dormNumber').val().trim();
        
        if (!dormNumber) {
            alert('请输入寝室号');
            return;
        }
        
        // 模拟尺寸校验
        const buildingMatch = dormNumber.match(/(\d+)号楼/);
        let resultText = '';
        let dormSpec = '';
        let recommendedItems = '';
        let matchRate = '';
        
        if (buildingMatch) {
            const buildingNum = parseInt(buildingMatch[1]);
            
            // 根据楼号返回不同结果
            if (buildingNum <= 3) {
                resultText = '该梯柜完美适配' + buildingNum + '号楼上铺，尺寸完全匹配。';
                dormSpec = '4人间 · 上铺下桌 · 标准尺寸';
                recommendedItems = '梯柜、床帘、桌面置物架';
                matchRate = '95%';
            } else if (buildingNum <= 6) {
                resultText = '书桌置物架适配' + buildingNum + '号楼书桌尺寸。';
                dormSpec = '4人间 · 独立书桌 · 加大空间';
                recommendedItems = '书架、椅子、收纳箱';
                matchRate = '88%';
            } else {
                resultText = '床头架适合' + buildingNum + '号楼床铺结构。';
                dormSpec = '6人间 · 上下铺 · 紧凑型';
                recommendedItems = '床头架、小桌板、储物篮';
                matchRate = '92%';
            }
        } else {
            resultText = '根据您输入的寝室信息，找到多款适配家具。';
            dormSpec = '标准寝室配置';
            recommendedItems = '通用型家具套装';
            matchRate = '85%';
        }
        
        // 更新结果显示
        $('#matchText').text(resultText);
        $('#dormSpec').text(dormSpec);
        $('#recommendedItems').text(recommendedItems);
        $('#matchRate').text(matchRate);
        
        // 显示结果
        $('#checkResult').fadeIn(500);
        
        // 添加成功动画
        $('.result-success i').css({
            'animation': 'bounce 0.5s'
        });
        
        setTimeout(() => {
            $('.result-success i').css('animation', '');
        }, 500);
    });
    
    // ============================================
    // 拆卸状态切换
    // ============================================
    $('.status-card').click(function() {
        // 移除其他卡片的active状态
        $('.status-card').removeClass('active');
        // 添加当前卡片的active状态
        $(this).addClass('active');
        
        const status = $(this).data('status');
        let detailsText = '';
        
        switch(status) {
            case 'foldable':
                detailsText = '可折叠家具：如折叠桌、收纳箱等，无需工具即可折叠，单人即可搬运。';
                break;
            case 'moveable':
                detailsText = '需整体搬运：如椅子、小柜子等，建议两人搬运，部分带滚轮可推行。';
                break;
            case 'disassembled':
                detailsText = '已拆卸家具：如床架、书桌等，已拆分成部件并包装，附详细安装视频教程。';
                break;
        }
        
        $('#statusDetails').html(`
            <h4>拆卸说明</h4>
            <p>${detailsText}</p>
            <div class="status-tips">
                <p><i class="fas fa-lightbulb"></i> 小贴士：拆卸前请拍照记录，便于重新安装</p>
            </div>
        `);
    });
    
    // ============================================
    // 邻里互助筛选
    // ============================================
    $('.option-btn').click(function() {
        // 移除其他按钮的active状态
        $('.option-btn').removeClass('active');
        // 添加当前按钮的active状态
        $(this).addClass('active');
        
        const building = $(this).data('building');
        let buildingType = '男生宿舍';
        if ([2, 4, 6, 7].includes(building)) {
            buildingType = '女生宿舍';
        }
        
        // 模拟获取该楼栋的物品
        const items = [
            { name: '人体工学椅', price: '¥120', status: '免搬运' },
            { name: '床上书桌', price: '¥65', status: '可折叠' },
            { name: '收纳箱3个', price: '¥40', status: '成套出' },
            { name: '台灯', price: '¥35', status: '即取即用' },
            { name: '床帘套装', price: '¥85', status: '遮光95%' },
            { name: '小冰箱', price: '¥180', status: '制冷良好' }
        ];
        
        let itemsHTML = '';
        items.forEach(item => {
            itemsHTML += `
                <div class="result-item">
                    <h5>${item.name}</h5>
                    <p class="item-price">${item.price}</p>
                    <span class="item-status">${item.status}</span>
                    <button class="btn-contact" data-building="${building}">
                        <i class="fas fa-comment"></i> 联系楼友
                    </button>
                </div>
            `;
        });
        
        $('#neighborItems').html(itemsHTML);
        
        // 更新标题
        $('.result-header h4').html(`<i class="fas fa-exchange-alt"></i> ${buildingType} ${building}号楼 · 免搬运`);
        $('.result-header p').text(`发现${items.length}件可交易物品`);
        
        // 添加联系按钮事件
        $('.btn-contact').click(function() {
            const buildingNum = $(this).data('building');
            alert(`正在连接${buildingNum}号楼交易群...\n请添加楼长微信：dorm${buildingNum}_helper`);
        });
    });
    
    // ============================================
    // 搬运服务预约
    // ============================================
    $('.btn-book').click(function() {
        const service = $(this).data('service');
        let serviceName = '';
        let price = '';
        
        if (service === 'bike') {
            serviceName = '校园"小黄车"搬运';
            price = '起步价¥15（1公里内）';
        } else {
            serviceName = '勤工助学搬运组';
            price = '起步价¥20（含2人）';
        }
        
        // 创建预约表单
        const bookingForm = `
            <div class="booking-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>预约${serviceName}</h4>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>服务详情：${price}</p>
                        <div class="form-group">
                            <label>预约时间</label>
                            <input type="datetime-local" id="bookingTime">
                        </div>
                        <div class="form-group">
                            <label>搬运物品</label>
                            <input type="text" id="items" placeholder="例如：椅子、书桌等">
                        </div>
                        <div class="form-group">
                            <label>联系方式</label>
                            <input type="tel" id="phone" placeholder="请输入手机号">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-cancel">取消</button>
                        <button class="btn-submit">提交预约</button>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(bookingForm);
        
        // 关闭模态框
        $('.close-modal, .btn-cancel').click(function() {
            $('.booking-modal').remove();
        });
        
        // 提交预约
        $('.btn-submit').click(function() {
            const time = $('#bookingTime').val();
            const items = $('#items').val();
            const phone = $('#phone').val();
            
            if (!time || !items || !phone) {
                alert('请填写完整信息');
                return;
            }
            
            alert(`预约成功！\n${serviceName}将在${time}为您服务\n工作人员会提前联系您：${phone}`);
            $('.booking-modal').remove();
        });
    });
    
    // ============================================
    // 家具故事互动
    // ============================================
    $('.story-like').click(function() {
        const likeBtn = $(this);
        const heartIcon = likeBtn.find('i');
        
        if (heartIcon.hasClass('far')) {
            heartIcon.removeClass('far').addClass('fas');
            likeBtn.html('<i class="fas fa-heart"></i> 已感动');
            likeBtn.css({
                'background': 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
                'color': 'white',
                'border-color': '#ff6b6b'
            });
            
            // 添加点赞动画
            heartIcon.css({
                'animation': 'heartBeat 0.5s'
            });
            
            setTimeout(() => {
                heartIcon.css('animation', '');
            }, 500);
        } else {
            heartIcon.removeClass('fas').addClass('far');
            likeBtn.html('<i class="far fa-heart"></i> 感动');
            likeBtn.css({
                'background': 'white',
                'color': '#666',
                'border-color': '#e0e0e0'
            });
        }
    });
    
    $('.btn-add-story').click(function() {
        const storyForm = `
            <div class="story-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>分享你的家具故事</h4>
                        <button class="close-story-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>家具名称</label>
                            <input type="text" id="storyItem" placeholder="例如：我的小台灯">
                        </div>
                        <div class="form-group">
                            <label>你的故事</label>
                            <textarea id="storyText" rows="4" placeholder="这件家具陪伴你的温馨故事..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>联系方式（选填）</label>
                            <input type="text" id="contact" placeholder="微信/电话，用于买家联系">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-cancel-story">取消</button>
                        <button class="btn-submit-story">发布故事</button>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(storyForm);
        
        $('.close-story-modal, .btn-cancel-story').click(function() {
            $('.story-modal').remove();
        });
        
        $('.btn-submit-story').click(function() {
            const item = $('#storyItem').val();
            const text = $('#storyText').val();
            
            if (!item || !text) {
                alert('请填写家具名称和故事内容');
                return;
            }
            
            alert('故事发布成功！\n你的温馨故事将帮助家具找到新的主人。');
            $('.story-modal').remove();
        });
    });
    
    $('.btn-view-more').click(function() {
        alert('更多温馨故事正在整理中...\n欢迎继续关注其他同学分享的家具故事。');
    });
    
    // ============================================
    // 动画效果
    // ============================================
    // 页面滚动动画
    $(window).scroll(function() {
        $('.module').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate');
            }
        });
    });
    
    // 初始触发一次
    $(window).trigger('scroll');
    
    // ============================================
    // 添加CSS动画
    // ============================================
    if (!$('#furniture-animations').length) {
        $('head').append(`
            <style id="furniture-animations">
                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
                
                @keyframes heartBeat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.3); }
                }
                
                .module.animate {
                    animation: fadeInUp 0.6s ease;
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .booking-modal,
                .story-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 10px;
                    padding: 25px;
                    max-width: 500px;
                    width: 90%;
                    animation: modalSlideIn 0.3s ease;
                }
                
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    border-bottom: 2px solid var(--furniture-primary);
                    padding-bottom: 10px;
                }
                
                .modal-header h4 {
                    margin: 0;
                    color: var(--furniture-dark);
                }
                
                .close-modal,
                .close-story-modal {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                }
                
                .form-group {
                    margin-bottom: 15px;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 600;
                    color: var(--furniture-dark);
                }
                
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #e0e0e0;
                    border-radius: 5px;
                    font-family: inherit;
                }
                
                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--furniture-primary);
                }
                
                .modal-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                }
                
                .btn-cancel,
                .btn-cancel-story {
                    padding: 10px 20px;
                    background: #f0f0f0;
                    border: none;
                    border-radius: 5px;
                    color: #666;
                    cursor: pointer;
                }
                
                .btn-submit,
                .btn-submit-story {
                    padding: 10px 20px;
                    background: var(--furniture-primary);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                
                .btn-cancel:hover {
                    background: #e0e0e0;
                }
                
                .btn-submit:hover,
                .btn-submit-story:hover {
                    background: var(--furniture-accent);
                }
                
                .option-btn.active {
                    background: var(--furniture-primary);
                    color: white;
                    border-color: var(--furniture-primary);
                }
                
                .btn-contact {
                    margin-top: 10px;
                    padding: 8px 15px;
                    background: rgba(139, 115, 85, 0.1);
                    border: 1px solid var(--furniture-primary);
                    border-radius: 15px;
                    color: var(--furniture-primary);
                    cursor: pointer;
                    font-size: 14px;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .btn-contact:hover {
                    background: var(--furniture-primary);
                    color: white;
                }
                
                .result-item {
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    padding: 15px;
                    text-align: center;
                }
                
                .result-item h5 {
                    margin: 0 0 10px 0;
                    color: var(--furniture-dark);
                }
                
                .item-price {
                    font-weight: bold;
                    color: var(--furniture-primary);
                    margin-bottom: 8px;
                }
                
                .item-status {
                    display: inline-block;
                    background: rgba(124, 179, 66, 0.1);
                    color: var(--furniture-success);
                    padding: 3px 10px;
                    border-radius: 12px;
                    font-size: 12px;
                    margin-bottom: 10px;
                }
                
                .status-tips {
                    margin-top: 15px;
                    padding: 10px;
                    background: rgba(255, 193, 7, 0.1);
                    border-radius: 5px;
                    font-size: 14px;
                }
                
                .status-tips i {
                    color: #ffc107;
                    margin-right: 8px;
                }
            </style>
        `);
    }
    
    console.log("所有交互效果加载完成");
});