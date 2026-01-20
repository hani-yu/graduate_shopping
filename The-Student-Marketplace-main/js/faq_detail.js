// faq_detail.js - 常见问题详情页专属JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // ===============================
    // 1. 搜索功能
    // ===============================
    const faqSearch = document.getElementById('faqSearch');
    const searchBtn = document.getElementById('searchBtn');
    const searchTags = document.querySelectorAll('.search_tag');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const suggestionsList = searchSuggestions.querySelector('.suggestions_list');
    const searchResults = document.getElementById('searchResults');
    const resultsList = searchResults.querySelector('.results_list');
    const resultsCount = document.getElementById('resultsCount');

    // 问题数据库（示例）
    const faqDatabase = [
        {
            question: "如何修改绑定的手机号？",
            answer: "在用户中心→账号设置→安全设置中修改手机号，需要原手机号验证码确认。",
            category: "注册登录",
            keywords: ["修改手机", "手机号", "绑定手机", "更换手机"],
            popularity: 85
        },
        {
            question: "忘记密码如何找回？",
            answer: "点击登录页的'忘记密码'，通过邮箱验证重置密码。如果没有收到邮件，请联系客服。",
            category: "注册登录",
            keywords: ["忘记密码", "密码找回", "重置密码", "登录问题"],
            popularity: 92
        },
        {
            question: "发布商品需要哪些照片？",
            answer: "至少需要3张不同角度的实物照片：正面、侧面、细节特写。照片要求清晰，无过度美化。",
            category: "发布买卖",
            keywords: ["商品发布", "照片要求", "实物照片", "上传照片"],
            popularity: 78
        },
        {
            question: "如何描述商品成色？",
            answer: "请参考平台的成色标准表：九成新、六成新、瑕疵件。需如实描述使用痕迹和功能状态。",
            category: "发布买卖",
            keywords: ["成色描述", "商品成色", "使用痕迹", "成色标准"],
            popularity: 76
        },
        {
            question: "商品描述不符怎么办？",
            answer: "先与卖家友好沟通，如无法解决可在平台发起争议，上传证据等待仲裁。",
            category: "争议维权",
            keywords: ["描述不符", "争议处理", "维权", "商品纠纷"],
            popularity: 81
        },
        {
            question: "推荐的面交地点有哪些？",
            answer: "图书馆大堂、学生活动中心、食堂入口、校门保安亭旁等校内安全区域。",
            category: "物流面交",
            keywords: ["面交地点", "交易地点", "安全交易", "校内面交"],
            popularity: 89
        },
        {
            question: "如何联系人工客服？",
            answer: "工作日上午9:00-18:00可拨打400-123-4567，或通过用户中心在线客服咨询。",
            category: "其他",
            keywords: ["人工客服", "联系客服", "客服电话", "技术支持"],
            popularity: 65
        }
    ];

    // 搜索功能
    function performSearch(keyword) {
        if (!keyword.trim()) return;

        // 更新搜索框内容
        faqSearch.value = keyword;

        // 清空之前的结果
        suggestionsList.innerHTML = '';
        resultsList.innerHTML = '';

        // 搜索匹配的问题
        const results = faqDatabase.filter(item => {
            const searchText = (item.question + item.answer + item.category + item.keywords.join(' ')).toLowerCase();
            return searchText.includes(keyword.toLowerCase());
        });

        // 按相关度排序
        results.sort((a, b) => {
            const aRelevance = calculateRelevance(a, keyword);
            const bRelevance = calculateRelevance(b, keyword);
            return bRelevance - aRelevance;
        });

        // 显示搜索结果
        if (results.length > 0) {
            resultsCount.textContent = results.length;

            results.forEach((item, index) => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result_item';
                resultItem.innerHTML = `
                    <h5>${item.question}</h5>
                    <p style="color: #64748b; font-size: 0.9rem; margin-top: 8px; line-height: 1.5;">
                        ${item.answer.substring(0, 100)}...
                    </p>
                    <div style="display: flex; justify-content: space-between; margin-top: 15px; font-size: 0.85rem;">
                        <span style="color: #0d9488; background: rgba(13,148,136,0.1); padding: 3px 10px; border-radius: 12px;">
                            ${item.category}
                        </span>
                        <span style="color: #f59e0b;">
                            <i class="fas fa-star"></i> ${item.popularity}%相关度
                        </span>
                    </div>
                `;

                resultItem.addEventListener('click', () => {
                    showAnswerDetail(item);
                });

                resultsList.appendChild(resultItem);
            });

            searchResults.classList.add('show');
            searchSuggestions.classList.remove('show');
        } else {
            // 没有搜索结果
            resultsList.innerHTML = `
                <div class="no_results" style="text-align: center; padding: 40px; color: #64748b;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; color: #cbd5e1;"></i>
                    <h4 style="color: #475569; margin-bottom: 10px;">未找到相关问题</h4>
                    <p>请尝试使用其他关键词搜索，或直接联系客服</p>
                </div>
            `;
            searchResults.classList.add('show');
            searchSuggestions.classList.remove('show');
        }
    }

    // 计算相关度
    function calculateRelevance(item, keyword) {
        let score = 0;
        const keywordLower = keyword.toLowerCase();

        // 标题匹配得分最高
        if (item.question.toLowerCase().includes(keywordLower)) {
            score += 100;
        }

        // 关键词匹配
        if (item.keywords.some(k => k.toLowerCase().includes(keywordLower))) {
            score += 80;
        }

        // 内容匹配
        if (item.answer.toLowerCase().includes(keywordLower)) {
            score += 50;
        }

        // 类别匹配
        if (item.category.toLowerCase().includes(keywordLower)) {
            score += 30;
        }

        // 加上热度得分
        score += item.popularity * 0.1;

        return score;
    }

    // 显示问题详情
    function showAnswerDetail(item) {
        // 创建详情模态框
        const modal = document.createElement('div');
        modal.className = 'faq_detail_modal';
        modal.innerHTML = `
            <div class="modal_overlay"></div>
            <div class="modal_content">
                <div class="modal_header">
                    <h3>${item.question}</h3>
                    <button class="modal_close">&times;</button>
                </div>
                <div class="modal_body">
                    <div class="answer_category">
                        <i class="fas fa-tag"></i>
                        <span>${item.category}</span>
                        <div class="popularity_badge">
                            <i class="fas fa-fire"></i>
                            ${item.popularity}%相关度
                        </div>
                    </div>
                    <div class="answer_content">
                        <p>${item.answer}</p>
                    </div>
                    <div class="answer_keywords">
                        <h5><i class="fas fa-hashtag"></i> 相关关键词</h5>
                        <div class="keywords_list">
                            ${item.keywords.map(keyword => `<span class="keyword_tag">${keyword}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="modal_footer">
                    <button class="btn_contact_support">
                        <i class="fas fa-headset"></i> 联系客服
                    </button>
                    <button class="btn_close_modal">关闭</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .faq_detail_modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .modal_overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
            }
            
            .modal_content {
                position: relative;
                background: white;
                border-radius: 15px;
                width: 90%;
                max-width: 700px;
                max-height: 90vh;
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
                animation: slideUp 0.4s ease;
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .modal_header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 25px 30px;
                background: linear-gradient(135deg, #064e3b, #086553);
                color: white;
            }
            
            .modal_header h3 {
                margin: 0;
                font-size: 1.4rem;
                flex: 1;
                line-height: 1.4;
            }
            
            .modal_close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                line-height: 1;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 20px;
                transition: all 0.3s ease;
            }
            
            .modal_close:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .modal_body {
                padding: 30px;
                overflow-y: auto;
                max-height: 60vh;
            }
            
            .answer_category {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f1f5f9;
            }
            
            .answer_category i {
                color: #0d9488;
                font-size: 1.2rem;
            }
            
            .answer_category span {
                background: rgba(13, 148, 136, 0.1);
                color: #0d9488;
                padding: 6px 15px;
                border-radius: 20px;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .popularity_badge {
                margin-left: auto;
                background: rgba(245, 158, 11, 0.1);
                color: #92400e;
                padding: 6px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .answer_content {
                margin-bottom: 30px;
            }
            
            .answer_content p {
                color: #475569;
                line-height: 1.8;
                font-size: 1.05rem;
            }
            
            .answer_keywords h5 {
                color: #064e3b;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 1.1rem;
            }
            
            .keywords_list {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .keyword_tag {
                background: #f8fafc;
                color: #475569;
                padding: 6px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                border: 1px solid #e2e8f0;
            }
            
            .modal_footer {
                padding: 20px 30px;
                background: #f9fbfa;
                display: flex;
                justify-content: flex-end;
                gap: 15px;
                border-top: 1px solid #f1f5f9;
            }
            
            .btn_contact_support, .btn_close_modal {
                padding: 12px 25px;
                border-radius: 8px;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                border: none;
                transition: all 0.3s ease;
            }
            
            .btn_contact_support {
                background: linear-gradient(to right, #0d9488, #064e3b);
                color: white;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .btn_contact_support:hover {
                background: linear-gradient(to right, #086553, #043024);
            }
            
            .btn_close_modal {
                background: #e2e8f0;
                color: #475569;
            }
            
            .btn_close_modal:hover {
                background: #cbd5e1;
            }
        `;
        document.head.appendChild(style);

        // 绑定事件
        modal.querySelector('.modal_close').addEventListener('click', closeModal);
        modal.querySelector('.btn_close_modal').addEventListener('click', closeModal);
        modal.querySelector('.btn_contact_support').addEventListener('click', () => {
            closeModal();
            // 跳转到客服联系部分
            document.getElementById('contact_section').scrollIntoView({ behavior: 'smooth' });
        });

        modal.querySelector('.modal_overlay').addEventListener('click', closeModal);

        function closeModal() {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        }

        // ESC键关闭
        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', closeOnEsc);
            }
        });
    }

    // 搜索框输入事件
    faqSearch.addEventListener('input', function () {
        const keyword = this.value.trim();

        if (keyword.length >= 2) {
            // 显示搜索建议
            showSearchSuggestions(keyword);
        } else {
            searchSuggestions.classList.remove('show');
            searchResults.classList.remove('show');
        }
    });

    // 搜索按钮点击
    searchBtn.addEventListener('click', () => {
        performSearch(faqSearch.value);
    });

    // 回车搜索
    faqSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(faqSearch.value);
        }
    });

    // 搜索标签点击
    searchTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const keyword = tag.getAttribute('data-keyword');
            performSearch(keyword);
        });
    });

    // 显示搜索建议
    function showSearchSuggestions(keyword) {
        const suggestions = faqDatabase
            .filter(item => {
                const searchText = (item.question + item.keywords.join(' ')).toLowerCase();
                return searchText.includes(keyword.toLowerCase());
            })
            .slice(0, 5);

        if (suggestions.length > 0) {
            suggestionsList.innerHTML = '';

            suggestions.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion_item';
                suggestionItem.innerHTML = `
                    <div style="font-weight: 600; color: #064e3b; margin-bottom: 5px;">${item.question}</div>
                    <div style="font-size: 0.85rem; color: #64748b;">${item.category} · ${item.keywords[0]}</div>
                `;

                suggestionItem.addEventListener('click', () => {
                    performSearch(item.question);
                });

                suggestionsList.appendChild(suggestionItem);
            });

            searchSuggestions.classList.add('show');
        } else {
            searchSuggestions.classList.remove('show');
        }
    }

    // ===============================
    // 2. 手风琴功能
    // ===============================
    const accordionItems = document.querySelectorAll('.accordion_item');
    const faqItems = document.querySelectorAll('.faq_item');

    // 分类手风琴切换
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion_header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // 关闭其他分类
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // 切换当前分类
            item.classList.toggle('active', !isActive);
        });
    });

    // FAQ项目切换
    faqItems.forEach(item => {
        const question = item.querySelector('.faq_question');
        const toggle = item.querySelector('.faq_toggle');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // 切换当前FAQ
            item.classList.toggle('active');

            // 更新图标
            if (isActive) {
                toggle.classList.remove('fa-times');
                toggle.classList.add('fa-plus');
            } else {
                toggle.classList.remove('fa-plus');
                toggle.classList.add('fa-times');
            }
        });
    });

    // ===============================
    // 3. 视频教程功能
    // ===============================
    const watchVideoBtn = document.getElementById('watchVideoBtn');
    const playBtn = document.querySelector('.play_btn');

    if (watchVideoBtn) {
        watchVideoBtn.addEventListener('click', () => {
            openVideoModal();
        });
    }

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            openVideoModal();
        });
    }

    function openVideoModal() {
        const modal = document.createElement('div');
        modal.className = 'video_modal';
        modal.innerHTML = `
            <div class="modal_overlay"></div>
            <div class="modal_content">
                <div class="modal_header">
                    <h3>商品发布教程视频</h3>
                    <button class="modal_close">&times;</button>
                </div>
                <div class="modal_body">
                    <div class="video_wrapper">
                        <div class="video_placeholder" style="height: 300px; background: linear-gradient(135deg, #1e293b, #334155); display: flex; align-items: center; justify-content: center; border-radius: 10px;">
                            <i class="fas fa-play-circle" style="font-size: 4rem; color: rgba(255,255,255,0.7);"></i>
                        </div>
                        <div class="video_info" style="padding: 20px;">
                            <h4 style="color: #064e3b; margin-bottom: 15px;">1分钟学会发布高吸引力商品</h4>
                            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                                视频教程正在制作中，敬请期待！本教程将包含：商品拍摄技巧、文案撰写方法、定价策略和发布时机选择。
                            </p>
                            <div class="video_stats" style="display: flex; gap: 20px; color: #64748b;">
                                <span><i class="fas fa-eye"></i> 即将上线</span>
                                <span><i class="fas fa-clock"></i> 01:30</span>
                                <span><i class="fas fa-calendar-alt"></i> 2026.01</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 关闭功能
        modal.querySelector('.modal_close').addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });

        modal.querySelector('.modal_overlay').addEventListener('click', () => {
            modal.querySelector('.modal_close').click();
        });
    }

    // ===============================
    // 4. 快速自助入口
    // ===============================
    const quickCards = document.querySelectorAll('.quick_card');

    quickCards.forEach(card => {
        card.addEventListener('click', function () {
            const action = this.getAttribute('data-action');

            // 点击反馈
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            // 根据动作执行不同操作
            switch (action) {
                case 'modifyPhone':
                    showActionModal('修改手机号', '请在用户中心→账号设置→安全设置中进行手机号修改，需要原手机验证码确认。');
                    break;
                case 'resetPassword':
                    showActionModal('找回密码', '点击登录页的"忘记密码"链接，通过注册邮箱接收重置链接，24小时内有效。');
                    break;
                case 'contactSupport':
                    // 跳转到客服联系部分
                    document.getElementById('contact_section').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'reportIssue':
                    showActionModal('举报反馈', '在用户中心→帮助与反馈→举报中心提交举报，请提供详细证据。平台将在24小时内处理。');
                    break;
            }
        });
    });

    function showActionModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'action_modal';
        modal.innerHTML = `
            <div class="modal_overlay"></div>
            <div class="modal_content">
                <div class="modal_header">
                    <h3>${title}</h3>
                    <button class="modal_close">&times;</button>
                </div>
                <div class="modal_body">
                    <p>${content}</p>
                    <div style="background: rgba(245,158,11,0.1); padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 3px solid #f59e0b;">
                        <i class="fas fa-lightbulb"></i>
                        <strong>小贴士：</strong> 如需进一步帮助，请返回页面底部联系客服。
                    </div>
                </div>
                <div class="modal_footer">
                    <button class="btn_modal_close">知道了</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 关闭功能
        const closeBtns = modal.querySelectorAll('.modal_close, .btn_modal_close');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
        });

        modal.querySelector('.modal_overlay').addEventListener('click', () => {
            modal.querySelector('.modal_close').click();
        });
    }

    // ===============================
    // 5. 问题解决进度图表
    // ===============================
    const chartBars = document.querySelectorAll('.chart_bar');

    // 动画显示进度条
    function animateProgressBars() {
        chartBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            const fill = bar.querySelector('.bar_fill');

            // 延迟动画
            setTimeout(() => {
                fill.style.height = `${value}%`;
            }, 300);
        });
    }

    // 滚动触发动画
    function checkProgressScroll() {
        const progressSection = document.getElementById('progress_section');
        if (!progressSection) return;

        const rect = progressSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
            if (!progressSection.classList.contains('animated')) {
                progressSection.classList.add('animated');
                animateProgressBars();

                // 统计数字动画
                // const statNumbers = document.querySelectorAll('.stat_number');
                // statNumbers.forEach(stat => {
                //     const target = parseInt(stat.textContent);
                //     const isTime = stat.textContent.includes('h');
                //     animateCounter(stat, target, isTime);
                // });
                const statItems = document.querySelectorAll('.stat_item');
                statItems.forEach(item => {
                    const statNumber = item.querySelector('.stat_number');
                    const originalText = statNumber.textContent.trim();
                    animateStatNumber(statNumber, originalText);
                });
            }
        }
    }

    // 数字计数器动画
    // function animateCounter(element, target, isTime = false) {
    //     let current = 0;
    //     const increment = target / 50;
    //     const duration = 1500;
    //     const stepTime = duration / 50;

    //     const timer = setInterval(() => {
    //         current += increment;
    //         if (current >= target) {
    //             current = target;
    //             clearInterval(timer);
    //         }

    //         element.textContent = isTime ? `${Math.round(current)}h` : Math.round(current).toLocaleString();
    //     }, stepTime);
    // }

    function animateStatNumber(element, targetText) {
        // 解析目标文本，分离数字和单位
        let numberStr = '';
        let unit = '';

        // 提取数字部分
        for (let char of targetText) {
            if (char >= '0' && char <= '9') {
                numberStr += char;
            } else if (char === '%' || char === 'h') {
                unit = char;
                break;
            }
        }

        const targetNumber = parseInt(numberStr) || 0;
        let current = 0;

        // 根据数字大小设置合适的动画步长
        let stepCount;
        if (targetNumber <= 100) {
            stepCount = 50;
        } else {
            stepCount = Math.min(100, Math.floor(targetNumber / 10));
        }

        const increment = targetNumber / stepCount;
        const duration = 1500;
        const stepTime = duration / stepCount;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(timer);
            }

            // 显示带单位的数字
            if (unit === 'h') {
                element.textContent = `${Math.round(current)}${unit}`;
            } else if (unit === '%') {
                element.textContent = `${Math.round(current)}${unit}`;
            } else {
                element.textContent = Math.round(current).toLocaleString();
            }
        }, stepTime);
    }

    // 初始检查和滚动监听
    checkProgressScroll();
    window.addEventListener('scroll', checkProgressScroll);

    // ===============================
    // 6. 客服留言表单
    // ===============================
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    const charCount = document.getElementById('charCount');
    const messageTextarea = document.getElementById('contactMessage');
    const uploadArea = document.getElementById('uploadArea');
    const fileUpload = document.getElementById('fileUpload');
    const fileList = document.getElementById('fileList');

    let uploadedFiles = [];

    // 字符计数
    messageTextarea.addEventListener('input', function () {
        const length = this.value.length;
        charCount.textContent = length;

        if (length > 500) {
            this.value = this.value.substring(0, 500);
            charCount.textContent = 500;
        }

        // 颜色提示
        if (length > 450) {
            charCount.style.color = '#ef4444';
        } else if (length > 300) {
            charCount.style.color = '#f59e0b';
        } else {
            charCount.style.color = '#94a3b8';
        }
    });

    // 文件上传
    uploadArea.addEventListener('click', () => {
        fileUpload.click();
    });

    // 拖拽上传
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#0d9488';
        uploadArea.style.background = 'rgba(13, 148, 136, 0.05)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '';
        uploadArea.style.background = '';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        uploadArea.style.background = '';

        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileUpload.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        for (let file of files) {
            // 检查文件类型和大小
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(file.type)) {
                alert('只支持 JPG, PNG, PDF 格式的文件');
                continue;
            }

            if (file.size > maxSize) {
                alert(`文件 ${file.name} 超过5MB限制`);
                continue;
            }

            // 添加到文件列表
            uploadedFiles.push(file);
            updateFileList();
        }

        // 重置文件输入
        fileUpload.value = '';
    }

    function updateFileList() {
        fileList.innerHTML = '';

        uploadedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file_item';
            fileItem.innerHTML = `
                <div class="file_info">
                    <i class="fas ${getFileIcon(file.type)}"></i>
                    <div>
                        <div class="file_name">${file.name}</div>
                        <div class="file_size">${formatFileSize(file.size)}</div>
                    </div>
                </div>
                <button class="file_remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;

            fileList.appendChild(fileItem);
        });

        // 绑定删除事件
        fileList.querySelectorAll('.file_remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                uploadedFiles.splice(index, 1);
                updateFileList();
            });
        });
    }

    function getFileIcon(type) {
        if (type.startsWith('image/')) return 'fa-image';
        if (type === 'application/pdf') return 'fa-file-pdf';
        return 'fa-file';
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    // 表单提交
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // 获取表单数据
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            category: document.getElementById('contactCategory').value,
            message: messageTextarea.value,
            files: uploadedFiles.map(file => file.name)
        };

        // 简单验证
        if (!formData.name || !formData.email || !formData.category || !formData.message) {
            alert('请填写所有必填字段');
            return;
        }

        // 显示提交状态
        const submitBtn = this.querySelector('.btn_submit_message');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
        submitBtn.disabled = true;

        // 模拟API请求
        setTimeout(() => {
            // 显示成功消息
            contactForm.style.display = 'none';
            contactSuccess.classList.add('show');

            // 重置表单
            setTimeout(() => {
                contactForm.reset();
                uploadedFiles = [];
                updateFileList();
                charCount.textContent = '0';
                contactForm.style.display = 'block';
                contactSuccess.classList.remove('show');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 5000);

            // 记录提交（实际项目中应发送到后端）
            console.log('留言提交:', formData);
        }, 2000);
    });

    // ===============================
    // 7. 页面滚动动画
    // ===============================
    const animatedElements = document.querySelectorAll('.section_box');

    function checkAnimations() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }

    // 初始检查和滚动监听
    checkAnimations();
    window.addEventListener('scroll', checkAnimations);

    // ===============================
    // 8. 页面加载效果
    // ===============================
    function showLoadingProgress() {
        const loadingBar = document.createElement('div');
        loadingBar.id = 'pageLoadingBar';
        loadingBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(to right, #0d9488, #f59e0b);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(loadingBar);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            loadingBar.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingBar.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(loadingBar);
                    }, 500);
                }, 300);
            }
        }, 100);
    }

    window.addEventListener('load', showLoadingProgress);
});