<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function () {
    //  简介区域卷轴动画
=======
// rules_detail.js - 使用规则详情页专属JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // ===============================
    // 1. 简介区域卷轴动画
    // ===============================
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const introCard = document.getElementById('introCard');

    if (introCard) {
        // 创建卷轴覆盖层元素
        const scrollCover = document.createElement('div');
        scrollCover.className = 'scroll_cover';
        introCard.appendChild(scrollCover);

        // 添加法槌响铃元素
        const bellElement = document.createElement('div');
        bellElement.className = 'bell_animation';
        bellElement.innerHTML = '<i class="fas fa-gavel"></i>';
        introCard.appendChild(bellElement);

<<<<<<< HEAD
=======
        // 文字逐字动画效果（可选）
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        const titleElement = document.getElementById('introTitle');
        const textElement = document.getElementById('introText');

        // 逐字动画函数
        function charAnimation(element) {
            if (!element) return;

            const text = element.textContent;
            element.textContent = '';

            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.className = 'char-animation';
                span.textContent = text[i];
                span.style.animationDelay = `${i * 0.05}s`;
                element.appendChild(span);
            }
        }

        // 滚动触发动画
        function checkIntroScroll() {
            const introSection = document.getElementById('intro_section');
            if (!introSection) return;

            const rect = introSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // 当元素进入视窗时触发动画
            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                if (!introCard.classList.contains('animated')) {
                    // 开始卷轴展开动画
                    introCard.classList.add('animated');

<<<<<<< HEAD
=======
                    // 可选：添加逐字动画效果
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                    setTimeout(() => {
                        if (titleElement) charAnimation(titleElement);
                        if (textElement) charAnimation(textElement);
                    }, 1200);

                    // 移除滚动监听
                    window.removeEventListener('scroll', checkIntroScroll);
                }
            }
        }

        // 初始检查和添加滚动监听
        checkIntroScroll();
        window.addEventListener('scroll', checkIntroScroll);

<<<<<<< HEAD
        // 页面加载后延迟触发
=======
        // 页面加载后延迟触发（确保用户能看到动画）
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        setTimeout(() => {
            checkIntroScroll();
        }, 500);

<<<<<<< HEAD
        // 点击重新触发动画
=======
        // 点击重新触发动画（用于演示）
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        introCard.addEventListener('click', function () {
            if (introCard.classList.contains('animated')) {
                // 重置状态
                introCard.classList.remove('animated');

<<<<<<< HEAD
=======
                // 重置文字（如果是逐字动画）
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                if (titleElement) {
                    const titleSpans = titleElement.querySelectorAll('span');
                    if (titleSpans.length > 0) {
                        titleElement.textContent = '无规矩不成方圆，诚信是校友集市的唯一通行证';
                    }
                }

                if (textElement) {
                    const textSpans = textElement.querySelectorAll('span');
                    if (textSpans.length > 0) {
                        textElement.textContent = '拾光流转，信义为先。本公约旨在为所有校友提供一个公平、安全、透明的物品流转环境。每一笔交易，不仅是对物品的传递，更是对校园诚信文化的守护与传承。';
                    }
                }

                // 延迟重新触发
                setTimeout(() => {
                    introCard.classList.add('animated');
                    setTimeout(() => {
                        if (titleElement) charAnimation(titleElement);
                        if (textElement) charAnimation(textElement);
                    }, 1200);
                }, 100);
            }
        });
    }

<<<<<<< HEAD
    // 规则矩阵卡片动画
=======
    // ===============================
    // 2. 规则矩阵卡片动画
    // ===============================
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const ruleCards = document.querySelectorAll('.rule_card');

    function checkRulesScroll() {
        ruleCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200); // 交错延迟
            }
        });
    }

    if (ruleCards.length > 0) {
        // 初始检查
        checkRulesScroll();
        window.addEventListener('scroll', checkRulesScroll);
    }

<<<<<<< HEAD
    // 认证进度条动画效果
=======
    // ===============================
    // 认证进度条动画效果
    // ===============================
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const rulesProgress = document.getElementById('rulesProgress');
    const rulesProgressFill = document.querySelector('.rules_progress_fill');
    const progressPercent = document.getElementById('progressPercent');

    if (rulesProgress && rulesProgressFill && progressPercent) {
        // 获取卡片元素
        const ruleCards = document.querySelectorAll('.rule_card');

        // 初始进度为0
        let currentProgress = 0;
        let targetProgress = 70; // 目标进度70%
        let isAnimating = false;

        // 更新进度条显示
        function updateProgressBar(progress) {
            rulesProgressFill.style.width = `${progress}%`;
            progressPercent.textContent = `${Math.round(progress)}%`;

            // 根据进度改变颜色
            if (progress < 30) {
                rulesProgressFill.style.background = '#ef4444'; // 红色
            } else if (progress < 70) {
                rulesProgressFill.style.background = '#f59e0b'; // 橙色/金色
            } else {
                rulesProgressFill.style.background = '#10b981'; // 绿色
            }
        }

        // 平滑动画函数
        function animateProgress() {
            if (isAnimating) return;

            isAnimating = true;
            const startTime = Date.now();
            const duration = 2000; // 2秒动画
            const startProgress = currentProgress;

            function step() {
                const elapsed = Date.now() - startTime;
                let progress = Math.min(elapsed / duration, 1);

                // 使用缓动函数
                progress = easeOutCubic(progress);

                currentProgress = startProgress + (targetProgress - startProgress) * progress;
                updateProgressBar(currentProgress);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    isAnimating = false;
                    currentProgress = targetProgress;

                    // 动画完成后添加脉冲效果
                    rulesProgressFill.classList.add('pulse');
                    setTimeout(() => {
                        rulesProgressFill.classList.remove('pulse');
                    }, 1000);
                }
            }

            requestAnimationFrame(step);
        }

        // 缓动函数
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        // 点击卡片增加进度
        ruleCards.forEach(card => {
            card.addEventListener('click', function () {
                // 点击卡片时增加进度
                if (targetProgress < 100) {
                    targetProgress = Math.min(targetProgress + 10, 100);
                    animateProgress();

                    // 添加点击反馈
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                }
            });

            // 鼠标悬停显示提示
            card.addEventListener('mouseenter', function () {
                const cardIndex = this.getAttribute('data-card');
                if (!this.classList.contains('completed')) {
                    this.querySelector('.rule_tip').style.opacity = '1';
                    this.querySelector('.rule_tip').style.transform = 'translateY(0)';
                }
            });

            card.addEventListener('mouseleave', function () {
                this.querySelector('.rule_tip').style.opacity = '0.7';
                this.querySelector('.rule_tip').style.transform = 'translateY(5px)';
            });
        });

        // 滚动到进度条区域时开始动画
        function checkProgressScroll() {
            if (rulesProgress.getBoundingClientRect().top < window.innerHeight * 0.8) {
                if (!rulesProgress.classList.contains('animated')) {
                    rulesProgress.classList.add('animated');
                    animateProgress();
                }
            }
        }

        // 初始检查和添加滚动监听
        checkProgressScroll();
        window.addEventListener('scroll', checkProgressScroll);

        // 页面加载后延迟触发
        setTimeout(() => {
            checkProgressScroll();
        }, 500);
    }

<<<<<<< HEAD
    // 违规级别交互
=======
    // ===============================
    // 3. 违规级别交互
    // ===============================
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const penaltyLevels = document.querySelectorAll('.penalty_level');

    if (penaltyLevels.length > 0) {
        penaltyLevels.forEach(level => {
            level.addEventListener('mouseenter', function () {
                const levelNum = this.getAttribute('data-level');
                this.style.transform = 'scale(1.05)';
                this.style.zIndex = '10';
            });

            level.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            });

            // 点击显示详细信息
            level.addEventListener('click', function () {
                const levelNum = this.getAttribute('data-level');
                let message = '';

                switch (levelNum) {
                    case '1':
                        message = '轻微违规：首次违规将收到站内警告，信用分扣除10分。3天内无再次违规可申请恢复5分。';
                        break;
                    case '2':
                        message = '中度违规：禁言期间无法发布商品和发送消息。信用分低于70分将失去优先推荐资格。';
                        break;
                    case '3':
                        message = '严重违规：账号永久封禁，违规行为将在平台公示7天。涉及违法行为的将移交学校相关部门处理。';
                        break;
                }

                if (message) {
                    alert(`违规级别 ${levelNum} 详情:\n\n${message}`);
                }
            });
        });
    }

<<<<<<< HEAD
=======
    // ===============================
    // 4. 面交安全指南交互
    // ===============================
    // const checklistBtn = document.getElementById('checklistBtn');
    // const checklistItems = document.querySelectorAll('.checklist_item');

    // if (checklistBtn && checklistItems.length > 0) {
    //     let currentStep = 0;

    //     checklistBtn.addEventListener('click', function() {
    //         if (currentStep < checklistItems.length) {
    //             // 激活当前步骤
    //             const currentItem = checklistItems[currentStep];
    //             currentItem.classList.add('active');

    //             // 更新步骤图标
    //             const checkStatus = currentItem.querySelector('.check_status');
    //             if (checkStatus) {
    //                 checkStatus.innerHTML = '<i class="fas fa-check"></i>';
    //                 checkStatus.style.color = '#0d9488';
    //             }

    //             currentStep++;

    //             // 如果所有步骤完成，显示完成消息
    //             if (currentStep === checklistItems.length) {
    //                 checklistBtn.innerHTML = '<i class="fas fa-check-circle"></i> 验货流程完成';
    //                 checklistBtn.style.background = 'linear-gradient(to right, #0d9488, #064e3b)';
    //                 checklistBtn.disabled = true;

    //                 // 3秒后重置
    //                 setTimeout(() => {
    //                     checklistItems.forEach(item => {
    //                         item.classList.remove('active');
    //                         const status = item.querySelector('.check_status');
    //                         if (status) {
    //                             status.innerHTML = '';
    //                             status.style.color = '';
    //                         }
    //                     });
    //                     checklistBtn.innerHTML = '模拟验货流程';
    //                     checklistBtn.style.background = '';
    //                     checklistBtn.disabled = false;
    //                     currentStep = 0;
    //                 }, 3000);
    //             } else {
    //                 checklistBtn.innerHTML = `下一步 (${currentStep + 1}/4)`;
    //             }
    //         }
    //     });

    //     // 地图位置点交互
    //     const mapLocations = document.querySelectorAll('.map_location');
    //     mapLocations.forEach(location => {
    //         location.addEventListener('click', function() {
    //             const locationName = this.getAttribute('data-location');
    //             const tips = {
    //                 '图书馆大堂': '开放时间: 8:00-22:00 | 监控全覆盖 | 有保安巡逻',
    //                 '学生活动中心': '开放时间: 9:00-21:00 | 有服务台 | 人流量大',
    //                 '食堂入口': '推荐时间: 11:00-13:00, 17:00-19:00 | 光线充足',
    //                 '校门保安亭': '24小时开放 | 最安全 | 推荐贵重物品交易'
    //             };

    //             if (tips[locationName]) {
    //                 alert(`📍 ${locationName}\n\n${tips[locationName]}`);
    //             }
    //         });
    //     });
    // }

>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const yanhuoBtn = document.getElementById("yanhuoBtn");
    const yanhuoItems = document.querySelectorAll(".yanhuo_xiang");
    const jinDu = document.querySelector(".jinDu_nei");

    if (yanhuoBtn && yanhuoItems.length > 0) {
        let step = 0;

        yanhuoBtn.addEventListener("click", () => {
            if (step < yanhuoItems.length) {
                const now = yanhuoItems[step];
                now.classList.add("active");

                const status = now.querySelector(".yanhuo_zhuangtai");
                status.innerHTML = "<i class='fas fa-check'></i>";
                status.style.color = "#0d9488";

                step++;
                jinDu.style.width = (step / yanhuoItems.length * 100) + "%";

                yanhuoBtn.innerHTML = step === 4 ? "完成确认" : "下一步 (" + (step + 1) + "/4)";
            }

            if (step === yanhuoItems.length) {
                yanhuoBtn.disabled = true;
                yanhuoBtn.style.background = "linear-gradient(to right,#0d9488,#064e3b)";
                yanhuoBtn.innerHTML = "<i class='fas fa-check-circle'></i> 验货完成";

                yanhuoYanHua();

                setTimeout(() => {
                    yanhuoItems.forEach(i => {
                        i.classList.remove("active");
                        i.querySelector(".yanhuo_zhuangtai").innerHTML = "";
                    })
                    jinDu.style.width = "0%";
                    yanhuoBtn.disabled = false;
                    yanhuoBtn.innerHTML = "开始模拟验货流程";
                    step = 0;
                }, 3500)
            }
        });
    }

    /* 地图点击提示 */
    document.querySelectorAll(".ditu_dian").forEach(d => {
        d.addEventListener("click", () => {
            const name = d.getAttribute("data-name");
            const info = {
                "图书馆大堂": "📚 8:00-22:00 | 监控全覆盖 | 保安巡逻",
                "学生活动中心": "🎉 9:00-21:00 | 人多安全 | 有服务台",
                "食堂入口": "🍽 推荐 11:00-13:00 / 17:00-19:00",
                "校门保安亭": "🛡 24小时 | 安全等级最高 | 推荐贵重物品交易"
            };
            alert("📍 " + name + "\n\n" + info[name]);
        });
    });

    /* —— 完成烟花动画 —— */
    function yanhuoYanHua() {
        const yanhuo = document.createElement("div");
        yanhuo.style.position = "fixed";
        yanhuo.style.top = "50%";
        yanhuo.style.left = "50%";
        yanhuo.style.transform = "translate(-50%,-50%)";
        yanhuo.style.fontSize = "26px";
        yanhuo.innerHTML = "🎉 交易流程安全完成！";
        document.body.appendChild(yanhuo);
        setTimeout(() => yanhuo.remove(), 1500);
    }

<<<<<<< HEAD
=======
    // ===============================
    // 5. 成色标准表交互
    // ===============================
    // const tableRows = document.querySelectorAll('.table_row');
    // const visualSegments = document.querySelectorAll('.visual_segment');

    // if (tableRows.length > 0) {
    //     tableRows.forEach(row => {
    //         row.addEventListener('mouseenter', function () {
    //             const rowClass = this.classList[1]; // row_new, row_good, row_fair
    //             this.style.transform = 'translateX(10px)';
    //             this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';

    //             // 高亮对应的视觉条段
    //             visualSegments.forEach(segment => {
    //                 if (segment.classList.contains(rowClass.replace('row_', 'segment_'))) {
    //                     segment.style.transform = 'scaleY(1.2)';
    //                 }
    //             });
    //         });

    //         row.addEventListener('mouseleave', function () {
    //             this.style.transform = 'translateX(0)';
    //             this.style.boxShadow = '';

    //             // 恢复视觉条段
    //             visualSegments.forEach(segment => {
    //                 segment.style.transform = 'scaleY(1)';
    //             });
    //         });
    //     });
    // }

>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const conditionRows = document.querySelectorAll('.student_table_row');

    conditionRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.transition = "0.4s";
            row.style.boxShadow = "0 12px 28px rgba(0,0,0,.15)";
        });

        row.addEventListener('mouseleave', () => {
            row.style.boxShadow = "none";
        });

        row.addEventListener('click', () => {
            alert("📌 已选择：" + row.querySelector(".condition_level_badge").innerText);
        });
    });

    /* 视觉条呼吸动画 */
    const visualPieces = document.querySelectorAll('.visual_piece');
    let activeIndex = 0;

    setInterval(() => {
        visualPieces.forEach(p => p.style.transform = "scale(1)");
        visualPieces[activeIndex].style.transform = "scale(1.1)";
        activeIndex = (activeIndex + 1) % visualPieces.length;
    }, 1500);


<<<<<<< HEAD
    // 页面滚动动画全局管理
=======
    // ===============================
    // 6. 规则测试小工具
    // ===============================
    const quizContainer = document.querySelector('.quiz_container');

    if (quizContainer) {
        const quizQuestions = [
            {
                question: "在平台上发布商品时，至少需要上传几张实物照片？",
                options: ["A. 1张", "B. 2张", "C. 3张", "D. 越多越好"],
                correct: "C",
                explanation: "根据平台规则，必须上传至少3张不同角度的实物照片，确保商品描述真实。"
            },
            {
                question: "发现卖家商品描述与实物严重不符，应该怎么办？",
                options: [
                    "A. 直接给差评",
                    "B. 先与卖家沟通，协商解决",
                    "C. 在平台上举报并申请仲裁",
                    "D. 自认倒霉"
                ],
                correct: "C",
                explanation: "应先通过平台举报系统提交证据，由仲裁委员会处理，避免私下冲突。"
            },
            {
                question: "以下哪种情况会被列入黑名单？",
                options: [
                    "A. 轻微沟通不当",
                    "B. 一次忘记回复消息",
                    "C. 恶意欺诈或售假",
                    "D. 价格标注稍高"
                ],
                correct: "C",
                explanation: "只有严重违规如欺诈、售假等行为会被永久封禁并列入黑名单。"
            },
            {
                question: "推荐的面交地点是哪里？",
                options: [
                    "A. 校外偏僻小巷",
                    "B. 宿舍房间内",
                    "C. 图书馆大堂等校内公共场所",
                    "D. 深夜的操场"
                ],
                correct: "C",
                explanation: "必须选择校内公共场所，如图书馆大堂、学生活动中心等有监控和人流的地方。"
            },
            {
                question: "商品标注'九成新'的标准是什么？",
                options: [
                    "A. 有一点使用痕迹",
                    "B. 几乎无使用痕迹，功能完好",
                    "C. 有明显磨损但能用",
                    "D. 包装已拆封就算"
                ],
                correct: "B",
                explanation: "'九成新'标准：几乎无使用痕迹，包装配件齐全，功能完好如新。"
            }
        ];

        let currentQuestionIndex = 0;
        let userAnswers = [];
        let score = 0;

        const questionText = document.getElementById('questionText');
        const currentQuestionSpan = document.getElementById('currentQuestion');
        const quizProgress = document.getElementById('quizProgress');
        const questionContainer = document.getElementById('questionContainer');
        const resultContainer = document.getElementById('resultContainer');
        const finalScoreSpan = document.getElementById('finalScore');
        const resultLevel = document.getElementById('resultLevel');
        const resultFeedback = document.getElementById('resultFeedback');
        const nextBtn = document.getElementById('nextQuestion');
        const prevBtn = document.getElementById('prevQuestion');
        const submitBtn = document.getElementById('submitQuiz');
        const restartBtn = document.getElementById('restartQuiz');
        const quizOptions = document.querySelectorAll('.quiz_option');

        // 初始化测试
        function initQuiz() {
            currentQuestionIndex = 0;
            userAnswers = [];
            score = 0;
            resultContainer.style.display = 'none';
            questionContainer.style.display = 'block';
            updateQuestion();
            updateNavigation();
        }

        // 更新题目
        function updateQuestion() {
            const question = quizQuestions[currentQuestionIndex];
            questionText.textContent = question.question;
            currentQuestionSpan.textContent = currentQuestionIndex + 1;

            // 更新选项
            quizOptions.forEach((option, index) => {
                const optionText = option.querySelector('.option_text');
                optionText.textContent = question.options[index].substring(3); // 去掉"A. "前缀
                option.setAttribute('data-option', String.fromCharCode(65 + index)); // A, B, C, D

                // 重置选项状态
                option.classList.remove('selected', 'correct', 'wrong');
            });

            // 恢复用户已选答案
            if (userAnswers[currentQuestionIndex]) {
                const selectedOption = document.querySelector(`.quiz_option[data-option="${userAnswers[currentQuestionIndex]}"]`);
                if (selectedOption) {
                    selectedOption.classList.add('selected');
                }
            }

            // 更新进度条
            const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
            quizProgress.style.width = `${progress}%`;
        }

        // 更新导航按钮状态
        function updateNavigation() {
            prevBtn.disabled = currentQuestionIndex === 0;
            nextBtn.disabled = currentQuestionIndex === quizQuestions.length - 1;
            submitBtn.style.display = currentQuestionIndex === quizQuestions.length - 1 ? 'inline-block' : 'none';
            nextBtn.style.display = currentQuestionIndex === quizQuestions.length - 1 ? 'none' : 'inline-block';
        }

        // 选项点击事件
        quizOptions.forEach(option => {
            option.addEventListener('click', function () {
                // 移除其他选项的选择状态
                quizOptions.forEach(opt => opt.classList.remove('selected'));

                // 标记当前选项
                this.classList.add('selected');

                // 保存答案
                const selectedOption = this.getAttribute('data-option');
                userAnswers[currentQuestionIndex] = selectedOption;
            });
        });

        // 下一题
        nextBtn.addEventListener('click', function () {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                updateQuestion();
                updateNavigation();
            }
        });

        // 上一题
        prevBtn.addEventListener('click', function () {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                updateQuestion();
                updateNavigation();
            }
        });

        // 提交测试
        submitBtn.addEventListener('click', function () {
            // 计算分数
            score = 0;
            userAnswers.forEach((answer, index) => {
                if (answer === quizQuestions[index].correct) {
                    score += 20;
                }
            });

            // 显示结果
            questionContainer.style.display = 'none';
            resultContainer.style.display = 'block';

            finalScoreSpan.textContent = score;

            // 根据分数显示等级和反馈
            let level = '', feedback = '';
            if (score >= 90) {
                level = '规则专家';
                feedback = '您对平台规则了如指掌，是合格的拾光者！感谢您为校园诚信流转做出的贡献。';
            } else if (score >= 70) {
                level = '熟悉规则';
                feedback = '您对平台规则有较好的了解，可以顺畅使用平台进行物品流转。';
            } else if (score >= 50) {
                level = '基本了解';
                feedback = '您对平台规则有基本了解，建议下载完整版公约进一步学习。';
            } else {
                level = '需要学习';
                feedback = '建议仔细阅读本页内容，并通过测试后再开始使用平台进行交易。';
            }

            resultLevel.innerHTML = `<span class="level_badge">${level}</span>`;
            resultFeedback.textContent = feedback;
        });

        // 重新测试
        restartBtn.addEventListener('click', initQuiz);

        // 初始化
        initQuiz();
    }

    // // ===============================
    // // 7. 下载公约PDF交互
    // // ===============================
    // const downloadBtn = document.getElementById('downloadBtn');
    // const previewBtn = document.getElementById('previewBtn');
    // const downloadSuccess = document.getElementById('downloadSuccess');

    // if (downloadBtn) {
    //     downloadBtn.addEventListener('click', function () {
    //         // 显示下载中状态
    //         const originalText = downloadBtn.innerHTML;
    //         downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 下载中...';
    //         downloadBtn.disabled = true;

    //         // 模拟下载过程
    //         setTimeout(() => {
    //             // 显示成功消息
    //             downloadSuccess.style.display = 'flex';
    //             downloadBtn.innerHTML = '<i class="fas fa-check"></i> 已下载';
    //             downloadBtn.style.background = '#10b981';

    //             // 模拟文件下载（实际项目中应链接真实文件）
    //             const link = document.createElement('a');
    //             link.href = '#'; // 实际应为PDF文件URL
    //             link.download = '校友集市流转公约_v2.1.pdf';
    //             link.click();

    //             // 5秒后重置
    //             setTimeout(() => {
    //                 downloadSuccess.style.display = 'none';
    //                 downloadBtn.innerHTML = originalText;
    //                 downloadBtn.style.background = '';
    //                 downloadBtn.disabled = false;
    //             }, 5000);
    //         }, 1500);
    //     });
    // }

    // if (previewBtn) {
    //     previewBtn.addEventListener('click', function () {
    //         alert('在线预览功能正在开发中...\n\n目前请下载PDF文件查看完整内容。');
    //     });
    // }

    // ===============================
    // 8. 页面滚动动画全局管理
    // ===============================
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const animatedElements = document.querySelectorAll('.animate__animated');

    function checkAllAnimations() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                // 如果元素有特定的动画类但未激活，添加激活类
                if (element.classList.contains('animate__fadeIn') && !element.classList.contains('animate__active')) {
                    element.classList.add('animate__active');
                }
            }
        });
    }

    // 初始检查
    checkAllAnimations();
    window.addEventListener('scroll', checkAllAnimations);

<<<<<<< HEAD
    // 页面加载进度指示
=======
    // ===============================
    // 9. 页面加载进度指示
    // ===============================
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    function showPageLoaded() {
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

        // 模拟页面加载进度
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
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

    // 页面加载完成后显示进度条
    window.addEventListener('load', showPageLoaded);

<<<<<<< HEAD
    // 返回顶部按钮
=======
    // ===============================
    // 10. 返回顶部按钮
    // ===============================
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--law-teal);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 100;
        box-shadow: 0 5px 15px rgba(13, 148, 136, 0.3);
    `;
    document.body.appendChild(backToTopBtn);

    // 滚动显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    });

    // 点击返回顶部
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
<<<<<<< HEAD
    // 流转使用步骤功能
=======
        // ===============================
    // 流转使用步骤功能
    // ===============================
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const roleTabs = document.querySelectorAll('.role_tab');
    const sellerSteps = document.getElementById('sellerSteps');
    const buyerSteps = document.getElementById('buyerSteps');
    const stepItems = document.querySelectorAll('.step_item');
<<<<<<< HEAD

    if (roleTabs.length > 0) {
        // 角色切换
        roleTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const role = this.getAttribute('data-role');

                // 更新激活状态
                roleTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                //显示对应的流程
=======
    
    if (roleTabs.length > 0) {
        // 角色切换
        roleTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const role = this.getAttribute('data-role');
                
                // 更新激活状态
                roleTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // 显示对应的流程
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                if (role === 'seller') {
                    sellerSteps.classList.add('active');
                    buyerSteps.classList.remove('active');
                } else {
                    sellerSteps.classList.remove('active');
                    buyerSteps.classList.add('active');
                }
<<<<<<< HEAD

=======
                
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                // 重置步骤动画
                resetStepAnimations(role);
            });
        });
<<<<<<< HEAD
        function resetStepAnimations(role) {

            // 切换显示谁
            if (role === 'seller') {
                sellerSteps.classList.add('active');
                buyerSteps.classList.remove('active');
            } else {
                buyerSteps.classList.add('active');
                sellerSteps.classList.remove('active');
            }

            // 当前步骤组
            const currentSteps = role === 'seller'
                ? sellerSteps.querySelectorAll('.step_item')
                : buyerSteps.querySelectorAll('.step_item');


            currentSteps.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
            });

            // 逐条播放动画
            currentSteps.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'all 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 200);
            });
        }




=======
        
        // 步骤动画效果
        function resetStepAnimations(role) {
            // 移除所有步骤的动画类
            stepItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
            });
            
            // 延迟添加动画
            setTimeout(() => {
                const currentSteps = role === 'seller' ? 
                    sellerSteps.querySelectorAll('.step_item') : 
                    buyerSteps.querySelectorAll('.step_item');
                
                currentSteps.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }, 300);
        }
        
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        // 初始显示卖家流程动画
        setTimeout(() => {
            resetStepAnimations('seller');
        }, 500);
<<<<<<< HEAD

        // 步骤点击效果
        stepItems.forEach(item => {
            item.addEventListener('click', function () {
                const stepNum = this.getAttribute('data-step');
                const currentRole = document.querySelector('.role_tab.active').getAttribute('data-role');

=======
        
        // 步骤点击效果
        stepItems.forEach(item => {
            item.addEventListener('click', function() {
                const stepNum = this.getAttribute('data-step');
                const currentRole = document.querySelector('.role_tab.active').getAttribute('data-role');
                
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                // 添加点击反馈
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
<<<<<<< HEAD

                console.log(`${currentRole}流程 - 步骤${stepNum}被点击`);

                if (!this.classList.contains('expanded')) {
                    this.classList.add('expanded');

=======
                
                // 显示步骤详情（可扩展）
                console.log(`${currentRole}流程 - 步骤${stepNum}被点击`);
                
                // 可以为每个步骤添加详细展开内容
                if (!this.classList.contains('expanded')) {
                    this.classList.add('expanded');
                    
                    // 这里可以添加详细内容的显示逻辑
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                    const stepContent = this.querySelector('.step_content p');
                    if (stepContent) {
                        const originalText = stepContent.textContent;
                        const detailedText = getStepDetails(currentRole, stepNum);
<<<<<<< HEAD

                        stepContent.textContent = detailedText;

=======
                        
                        stepContent.textContent = detailedText;
                        
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                        // 3秒后恢复
                        setTimeout(() => {
                            stepContent.textContent = originalText;
                            this.classList.remove('expanded');
                        }, 3000);
                    }
                }
            });
        });
<<<<<<< HEAD

        // 获取步骤详细内容
=======
        
        // 获取步骤详细内容（示例）
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        function getStepDetails(role, step) {
            const details = {
                'seller': {
                    '1': '详细要求：照片需包括正面、侧面、细节特写，大小不超过5MB，格式为JPG/PNG，不得使用过度美化的滤镜。',
                    '2': '成色描述需严格按照平台标准，价格应参考同类商品市场价，最高不超过原价的85%。',
                    '3': '建议设置消息提醒，保持24小时内回复率90%以上，沟通记录将影响信用评分。',
                    '4': '推荐地点：图书馆大堂、学生活动中心、食堂入口等校内监控覆盖区域。',
                    '5': '评价需客观真实，分享物品的故事和使用感受，优秀的评价可获得额外信用积分。'
                },
                'buyer': {
                    '1': '可使用高级筛选：按价格区间、成色等级、发布时间、卖家信用等条件精准查找。',
                    '2': '沟通前可查看卖家的历史评价和回复速度，明确询问商品瑕疵和使用问题。',
                    '3': '建议选择白天时段（9:00-18:00），可邀请同学陪同，避免单独前往偏僻地点。',
                    '4': '验货清单：外观检查、功能测试、配件核对、原装验证、试用体验。',
                    '5': '评价内容将公开显示，帮助其他买家做决策，同时也是对卖家诚信的监督。'
                }
            };
<<<<<<< HEAD

            return details[role]?.[step] || '详细内容正在完善中...';
        }

=======
            
            return details[role]?.[step] || '详细内容正在完善中...';
        }
        
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        // 滚动触发步骤动画
        function checkStepsScroll() {
            const stepsSection = document.getElementById('steps_section');
            if (!stepsSection) return;
<<<<<<< HEAD

            const rect = stepsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                // 激活当前显示流程的动画
                const activeRole = document.querySelector('.role_tab.active').getAttribute('data-role');
                const currentSteps = activeRole === 'seller' ?
                    sellerSteps.querySelectorAll('.step_item') :
                    buyerSteps.querySelectorAll('.step_item');

=======
            
            const rect = stepsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                // 激活当前显示流程的动画
                const activeRole = document.querySelector('.role_tab.active').getAttribute('data-role');
                const currentSteps = activeRole === 'seller' ? 
                    sellerSteps.querySelectorAll('.step_item') : 
                    buyerSteps.querySelectorAll('.step_item');
                
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                currentSteps.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
<<<<<<< HEAD

=======
                
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                // 移除滚动监听
                window.removeEventListener('scroll', checkStepsScroll);
            }
        }
<<<<<<< HEAD

        // 初始检查和添加滚动监听
        checkStepsScroll();
        window.addEventListener('scroll', checkStepsScroll);

=======
        
        // 初始检查和添加滚动监听
        checkStepsScroll();
        window.addEventListener('scroll', checkStepsScroll);
        
        // 模拟流程完成（可选功能）
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        const simulateCompleteBtn = document.createElement('button');
        simulateCompleteBtn.className = 'simulate_complete_btn';
        simulateCompleteBtn.innerHTML = '<i class="fas fa-play-circle"></i> 模拟流程演示';
        simulateCompleteBtn.style.cssText = `
            display: block;
            margin: 30px auto 0;
            padding: 12px 25px;
            background: #0d9488;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
<<<<<<< HEAD

        simulateCompleteBtn.addEventListener('mouseenter', function () {
            this.style.background = '#064e3b';
            this.style.transform = 'translateY(-2px)';
        });

        simulateCompleteBtn.addEventListener('mouseleave', function () {
            this.style.background = '#0d9488';
            this.style.transform = 'translateY(0)';
        });

        simulateCompleteBtn.addEventListener('click', function () {
            const activeRole = document.querySelector('.role_tab.active').getAttribute('data-role');
            const currentSteps = activeRole === 'seller' ?
                sellerSteps.querySelectorAll('.step_item') :
                buyerSteps.querySelectorAll('.step_item');

            // 禁用按钮
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 演示中...';

=======
        
        simulateCompleteBtn.addEventListener('mouseenter', function() {
            this.style.background = '#064e3b';
            this.style.transform = 'translateY(-2px)';
        });
        
        simulateCompleteBtn.addEventListener('mouseleave', function() {
            this.style.background = '#0d9488';
            this.style.transform = 'translateY(0)';
        });
        
        simulateCompleteBtn.addEventListener('click', function() {
            const activeRole = document.querySelector('.role_tab.active').getAttribute('data-role');
            const currentSteps = activeRole === 'seller' ? 
                sellerSteps.querySelectorAll('.step_item') : 
                buyerSteps.querySelectorAll('.step_item');
            
            // 禁用按钮
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 演示中...';
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            // 模拟步骤完成动画
            currentSteps.forEach((item, index) => {
                setTimeout(() => {
                    item.style.borderLeftColor = '#10b981';
                    item.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.2)';
<<<<<<< HEAD

=======
                    
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                    // 标记完成
                    const marker = item.querySelector('.step_number');
                    marker.style.background = '#10b981';
                    marker.style.borderColor = '#10b981';
                    marker.style.color = 'white';
                    marker.innerHTML = '<i class="fas fa-check"></i>';
<<<<<<< HEAD

=======
                    
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                    // 完成动画
                    item.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        item.style.transform = '';
                    }, 300);
                }, index * 800);
            });
<<<<<<< HEAD

=======
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            // 完成后重置
            setTimeout(() => {
                currentSteps.forEach(item => {
                    item.style.borderLeftColor = '';
                    item.style.boxShadow = '';
<<<<<<< HEAD

=======
                    
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                    const marker = item.querySelector('.step_number');
                    marker.style.background = '';
                    marker.style.borderColor = '';
                    marker.style.color = '';
                    marker.textContent = marker.getAttribute('data-step');
                });
<<<<<<< HEAD

=======
                
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                this.disabled = false;
                this.innerHTML = '<i class="fas fa-play-circle"></i> 模拟流程演示';
            }, 5000);
        });
<<<<<<< HEAD

=======
        
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        // 将模拟按钮添加到容器中
        const stepsArea = document.querySelector('.steps_area .container');
        if (stepsArea) {
            stepsArea.appendChild(simulateCompleteBtn);
        }
    }

<<<<<<< HEAD
    // 下载公约PDF功能
=======
        // ===============================
    // 下载公约PDF功能
    // ===============================
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const downloadBtn = document.getElementById('downloadBtn');
    const previewBtn = document.getElementById('previewBtn');
    const downloadSuccess = document.getElementById('downloadSuccess');
    const downloadCountSpan = document.querySelector('.download_info .info_item:nth-child(3) span');
<<<<<<< HEAD

    if (downloadBtn) {
        let downloadCount = 1248; // 初始下载次数
        let isDownloading = false;

=======
    
    if (downloadBtn) {
        let downloadCount = 1248; // 初始下载次数
        let isDownloading = false;
        
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        // 更新下载次数显示
        function updateDownloadCount() {
            if (downloadCountSpan) {
                downloadCountSpan.textContent = `已下载: ${downloadCount.toLocaleString()} 次`;
            }
        }
<<<<<<< HEAD

        // 下载按钮点击事件
        downloadBtn.addEventListener('click', function () {
            if (isDownloading) return;

            isDownloading = true;
            const originalText = downloadBtn.innerHTML;

=======
        
        // 下载按钮点击事件
        downloadBtn.addEventListener('click', function() {
            if (isDownloading) return;
            
            isDownloading = true;
            const originalText = downloadBtn.innerHTML;
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            // 显示下载中状态
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 下载中...';
            downloadBtn.disabled = true;
            previewBtn.disabled = true;
<<<<<<< HEAD

=======
            
            // 模拟下载过程（实际项目中应链接真实PDF文件）
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            setTimeout(() => {
                // 增加下载计数
                downloadCount++;
                updateDownloadCount();
<<<<<<< HEAD

                // 显示成功消息
                downloadSuccess.classList.add('show');

                // 更新按钮状态
                downloadBtn.innerHTML = '<i class="fas fa-check"></i> 已下载';
                downloadBtn.style.background = 'linear-gradient(to right, #10b981, #059669)';

                // 模拟文件下载
                simulateFileDownload();

                recordDownload();

=======
                
                // 显示成功消息
                downloadSuccess.classList.add('show');
                
                // 更新按钮状态
                downloadBtn.innerHTML = '<i class="fas fa-check"></i> 已下载';
                downloadBtn.style.background = 'linear-gradient(to right, #10b981, #059669)';
                
                // 模拟文件下载
                simulateFileDownload();
                
                // 记录下载（实际项目中应发送到后端）
                recordDownload();
                
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                // 5秒后重置状态
                setTimeout(() => {
                    downloadSuccess.classList.remove('show');
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.style.background = '';
                    downloadBtn.disabled = false;
                    previewBtn.disabled = false;
                    isDownloading = false;
                }, 5000);
            }, 2000);
        });
<<<<<<< HEAD

        // 预览按钮点击事件
        previewBtn.addEventListener('click', function () {
            // 打开预览模态框
            openPreviewModal();
        });

=======
        
        // 预览按钮点击事件
        previewBtn.addEventListener('click', function() {
            // 打开预览模态框
            openPreviewModal();
        });
        
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        // 模拟文件下载
        function simulateFileDownload() {
            // 创建一个临时链接进行下载
            const link = document.createElement('a');
<<<<<<< HEAD
            link.href = '#';
            link.download = '校友集市流转公约_v2.1.pdf';
            link.click();

=======
            link.href = '#'; // 实际应为PDF文件URL
            link.download = '校友集市流转公约_v2.1.pdf';
            link.click();
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            // 添加下载动画效果
            const icon = document.querySelector('.download_icon i');
            icon.style.transform = 'scale(1.2)';
            icon.style.color = '#10b981';
<<<<<<< HEAD

=======
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
                icon.style.color = 'white';
            }, 500);
<<<<<<< HEAD

=======
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            // 卡片动画效果
            const card = document.querySelector('.download_card');
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 300);
        }
<<<<<<< HEAD

=======
        
        // 记录下载信息（示例）
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        function recordDownload() {
            const downloadData = {
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                totalDownloads: downloadCount
            };
<<<<<<< HEAD

            console.log('下载记录:', downloadData);

        }

=======
            
            console.log('下载记录:', downloadData);
            
            // 实际项目中应发送到后端API
            // fetch('/api/downloads', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify(downloadData)
            // });
        }
        
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        // 打开预览模态框
        function openPreviewModal() {
            // 创建预览模态框
            const modal = document.createElement('div');
            modal.className = 'pdf_preview_modal';
            modal.innerHTML = `
                <div class="modal_overlay"></div>
                <div class="modal_content">
                    <div class="modal_header">
                        <h3>《校友集市流转公约》预览</h3>
                        <button class="modal_close">&times;</button>
                    </div>
                    <div class="modal_body">
                        <div class="preview_placeholder">
                            <i class="fas fa-file-pdf"></i>
                            <h4>PDF预览功能</h4>
                            <p>在线预览功能正在开发中...</p>
                            <p>当前版本请下载完整PDF文件查看</p>
                        </div>
                        <div class="preview_tips">
                            <h5>公约主要内容：</h5>
                            <ul>
                                <li>第一章：总则与基本原则</li>
                                <li>第二章：用户权利与义务</li>
                                <li>第三章：商品发布规范</li>
                                <li>第四章：交易流程规则</li>
                                <li>第五章：纠纷处理机制</li>
                                <li>第六章：违规处罚细则</li>
                                <li>第七章：附则</li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal_footer">
                        <button class="btn_modal_download">
                            <i class="fas fa-download"></i> 下载完整版
                        </button>
                        <button class="btn_modal_close">关闭预览</button>
                    </div>
                </div>
            `;
<<<<<<< HEAD

            document.body.appendChild(modal);

=======
            
            document.body.appendChild(modal);
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            // 添加样式
            const style = document.createElement('style');
            style.textContent = `
                .pdf_preview_modal {
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
                    max-width: 600px;
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
                    align-items: center;
                    padding: 20px 25px;
                    background: #064e3b;
                    color: white;
                }
                
                .modal_header h3 {
                    margin: 0;
                    font-size: 1.3rem;
                }
                
                .modal_close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    line-height: 1;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal_body {
                    padding: 30px;
                    overflow-y: auto;
                    max-height: 60vh;
                }
                
                .preview_placeholder {
                    text-align: center;
                    padding: 30px;
                    background: #f8fafc;
                    border-radius: 10px;
                    margin-bottom: 25px;
                }
                
                .preview_placeholder i {
                    font-size: 4rem;
                    color: #ef4444;
                    margin-bottom: 15px;
                }
                
                .preview_placeholder h4 {
                    color: #064e3b;
                    margin-bottom: 10px;
                }
                
                .preview_placeholder p {
                    color: #64748b;
                    margin: 5px 0;
                }
                
                .preview_tips h5 {
                    color: #064e3b;
                    margin-bottom: 15px;
                    font-size: 1.1rem;
                }
                
                .preview_tips ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .preview_tips li {
                    padding: 8px 0;
                    color: #475569;
                    border-bottom: 1px dashed #e2e8f0;
                    padding-left: 20px;
                    position: relative;
                }
                
                .preview_tips li:before {
                    content: "•";
                    color: #0d9488;
                    position: absolute;
                    left: 0;
                }
                
                .modal_footer {
                    padding: 20px 25px;
                    background: #f9fbfa;
                    display: flex;
                    justify-content: flex-end;
                    gap: 15px;
                }
                
                .btn_modal_download, .btn_modal_close {
                    padding: 10px 25px;
                    border-radius: 8px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    border: none;
                    transition: all 0.3s ease;
                }
                
                .btn_modal_download {
                    background: linear-gradient(to right, #ef4444, #dc2626);
                    color: white;
                }
                
                .btn_modal_download:hover {
                    background: linear-gradient(to right, #dc2626, #b91c1c);
                }
                
                .btn_modal_close {
                    background: #e2e8f0;
                    color: #475569;
                }
                
                .btn_modal_close:hover {
                    background: #cbd5e1;
                }
            `;
            document.head.appendChild(style);
<<<<<<< HEAD

=======
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            // 绑定事件
            const closeBtns = modal.querySelectorAll('.modal_close, .btn_modal_close');
            closeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        document.head.removeChild(style);
                    }, 300);
                });
            });
<<<<<<< HEAD

=======
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            modal.querySelector('.btn_modal_download').addEventListener('click', () => {
                downloadBtn.click();
                modal.querySelector('.btn_modal_close').click();
            });
<<<<<<< HEAD

=======
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            // 点击遮罩层关闭
            modal.querySelector('.modal_overlay').addEventListener('click', () => {
                modal.querySelector('.btn_modal_close').click();
            });
<<<<<<< HEAD

=======
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            // ESC键关闭
            document.addEventListener('keydown', function closeOnEsc(e) {
                if (e.key === 'Escape') {
                    modal.querySelector('.btn_modal_close').click();
                    document.removeEventListener('keydown', closeOnEsc);
                }
            });
        }
<<<<<<< HEAD

        // 初始更新下载次数
        updateDownloadCount();

=======
        
        // 初始更新下载次数
        updateDownloadCount();
        
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        // 添加下载次数动画效果
        if (downloadCountSpan) {
            const countElement = downloadCountSpan.querySelector('span') || downloadCountSpan;
            countElement.classList.add('download_count');
        }
    }
<<<<<<< HEAD

=======
    
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
});