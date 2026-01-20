$(document).ready(function () {

    // --- 1. 导航栏滚动变色 ---
    $(window).scroll(function () {
        if ($(this).scrollTop() > 60) {
            $('.daohang').addClass('nav_scrolled');
        } else {
            $('.daohang').removeClass('nav_scrolled');
        }
    });

    // --- 2. 简介卡片入场动画 (jianjie_donghua) ---
    const jianjieObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            $('#jianjieCard').addClass('animate__fadeInUp');
            jianjieObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.3 });

    const jianjieEl = document.querySelector('.jianjie_new');
    if (jianjieEl) jianjieObserver.observe(jianjieEl);


    // --- 3. 时间轴逻辑 (shijian_zhou) ---
    function handleTimeline() {
        const scrollPos = $(window).scrollTop() + ($(window).height() * 0.85);
        const $zhouBox = $('.shiguang_zhou_box');

        if ($zhouBox.length > 0) {
            const zhouTop = $zhouBox.offset().top;
            const zhouHeight = $zhouBox.height();
            let progress = scrollPos - zhouTop;
            if (progress < 0) progress = 0;
            if (progress > zhouHeight) progress = zhouHeight;
            $('#zhouLine').css('height', progress + 'px');

            $('.zhou_ka_wrap').each(function () {
                if (scrollPos > $(this).offset().top + 100) {
                    $(this).addClass('active_ka');
                }
            });
        }
    }
    $(window).on('scroll', handleTimeline);
    handleTimeline();


    // --- 4. 突破点平移切入 (tupo_reveal) ---
    const tupoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 找到内部的卡片并激活
                $(entry.target).addClass('active_ka').css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
                tupoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.tupo_ka').forEach(ka => tupoObserver.observe(ka));


    // --- 5. 折线图生长逻辑 (quxian_shengzhang) ---
    const path = document.getElementById('growthPath');
    if (path) { // 安全检查：只有找到路径才执行
        const pathLength = path.getTotalLength();
        $(path).css({
            'stroke-dasharray': pathLength,
            'stroke-dashoffset': pathLength
        });

        const runQuxian = () => {
            $(path).animate({ 'stroke-dashoffset': 0 }, { duration: 3000, easing: 'linear' });
            $('.shui_mo_area').delay(500).animate({ opacity: 1 }, 1500);
            $('.quxian_dian').each(function () {
                const $dian = $(this);
                const delay = parseFloat($dian.data('delay')) * 1000;
                const target = parseInt($dian.find('.pao_num').data('target'));
                setTimeout(() => {
                    $dian.addClass('active');
                    $({ val: 0 }).animate({ val: target }, {
                        duration: 1500,
                        step: function () { $dian.find('.pao_num').text(Math.floor(this.val)); },
                        complete: function () { $dian.find('.pao_num').text(target + "+"); }
                    });
                }, delay);
            });
        };

        const qxObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runQuxian();
                qxObserver.disconnect();
            }
        }, { threshold: 0.4 });
        const qxTarget = document.querySelector('.zhe_xian_board');
        if (qxTarget) qxObserver.observe(qxTarget);
    }

    // 锦囊交互效果

    const jinangs = document.querySelectorAll('.jinang');
    const book = document.getElementById('subscribeBook');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const emailInput = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');

    // 当前打开的锦囊索引
    let openJinangIndex = -1;

    // 为每个锦囊添加点击事件
    jinangs.forEach((jinang, index) => {
        jinang.addEventListener('click', function () {
            // 如果点击的是已打开的锦囊，则关闭它
            if (this.classList.contains('open')) {
                this.classList.remove('open');
                openJinangIndex = -1;
            } else {
                // 关闭之前打开的锦囊
                if (openJinangIndex !== -1) {
                    jinangs[openJinangIndex].classList.remove('open');
                }

                // 打开当前点击的锦囊
                this.classList.add('open');
                openJinangIndex = index;
            }
        });

        // 添加随机浮动动画延迟
        jinang.style.animationDelay = `${index * 0.2}s`;
    });

    // 书本交互效果
    book.addEventListener('click', function () {
        this.classList.toggle('open');
    });

    // 订阅按钮点击事件
    subscribeBtn.addEventListener('click', function () {
        const email = emailInput.value.trim();

        // 简单的邮箱验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            alert('请输入邮箱地址');
            emailInput.focus();
            return;
        }

        if (!emailRegex.test(email)) {
            alert('请输入有效的邮箱地址');
            emailInput.focus();
            return;
        }

        // 模拟订阅成功
        subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 订阅中...';
        subscribeBtn.disabled = true;

        setTimeout(() => {
            successMessage.classList.add('show');
            subscribeBtn.innerHTML = '订阅成功';
            subscribeBtn.style.background = '#6ab04c';

            // 3秒后重置表单
            setTimeout(() => {
                emailInput.value = '';
                successMessage.classList.remove('show');
                subscribeBtn.innerHTML = '立即订阅';
                subscribeBtn.style.background = '';
                subscribeBtn.disabled = false;

                // 关闭书本
                book.classList.remove('open');
            }, 3000);
        }, 1500);
    });

    // 邮箱输入框回车事件
    emailInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            subscribeBtn.click();
        }
    });

    // 添加锦囊自动轮换展示效果
    let autoRotateInterval = setInterval(() => {
        if (openJinangIndex === -1) {
            // 如果没有打开的锦囊，随机打开一个
            const randomIndex = Math.floor(Math.random() * jinangs.length);
            jinangs[randomIndex].classList.add('open');
            openJinangIndex = randomIndex;
        } else {
            // 关闭当前锦囊
            jinangs[openJinangIndex].classList.remove('open');

            // 计算下一个锦囊索引
            openJinangIndex = (openJinangIndex + 1) % jinangs.length;

            // 打开下一个锦囊
            jinangs[openJinangIndex].classList.add('open');
        }
    }, 5000);

    // 鼠标悬停时暂停自动轮换
    const jinangContainer = document.getElementById('jinangContainer');
    jinangContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });

    jinangContainer.addEventListener('mouseleave', () => {
        autoRotateInterval = setInterval(() => {
            if (openJinangIndex === -1) {
                const randomIndex = Math.floor(Math.random() * jinangs.length);
                jinangs[randomIndex].classList.add('open');
                openJinangIndex = randomIndex;
            } else {
                jinangs[openJinangIndex].classList.remove('open');
                openJinangIndex = (openJinangIndex + 1) % jinangs.length;
                jinangs[openJinangIndex].classList.add('open');
            }
        }, 5000);
    });

    // 订阅部分
    const subscribeBtnNew = document.getElementById('subscribeBtnNew');
    const emailInputNew = document.getElementById('emailInputNew');
    const frequencySelect = document.getElementById('frequencySelect');
    const successMessageNew = document.getElementById('successMessageNew');

    subscribeBtnNew.addEventListener('click', function () {
        const email = emailInputNew.value.trim();
        const frequency = frequencySelect.value;

        // 简单的邮箱验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const eduRegex = /\.edu$/i;

        if (!email) {
            alert('请输入邮箱地址');
            emailInputNew.focus();
            return;
        }

        if (!emailRegex.test(email)) {
            alert('请输入有效的邮箱地址');
            emailInputNew.focus();
            return;
        }

        // 检查是否为校园邮箱（.edu域名）
        if (!eduRegex.test(email)) {
            if (!confirm('检测到非校园邮箱，是否继续订阅？\n推荐使用校园邮箱(.edu)获得最佳体验。')) {
                return;
            }
        }

        // 显示加载状态
        const originalText = subscribeBtnNew.innerHTML;
        subscribeBtnNew.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 订阅中...';
        subscribeBtnNew.disabled = true;

        // 模拟API请求延迟
        setTimeout(() => {
            // 显示成功消息
            successMessageNew.classList.add('show');

            // 更新按钮状态
            subscribeBtnNew.innerHTML = '<i class="fas fa-check"></i> 已订阅';
            subscribeBtnNew.style.background = 'linear-gradient(to right, #10b981, #059669)';
            subscribeBtnNew.disabled = true;

            // 添加轻微的书页翻动效果
            const bookPages = document.querySelectorAll('.book_left_content, .book_right_page');
            bookPages.forEach(page => {
                page.style.transform = 'translateX(5px)';
                setTimeout(() => {
                    page.style.transform = 'translateX(0)';
                }, 300);
            });

            // 5秒后重置表单（实际应用中应该保持订阅状态）
            setTimeout(() => {
                emailInputNew.value = '';
                frequencySelect.value = 'weekly';
                successMessageNew.classList.remove('show');
                subscribeBtnNew.innerHTML = originalText;
                subscribeBtnNew.style.background = '';
                subscribeBtnNew.disabled = false;
            }, 5000);

            // 记录订阅信息（实际应用中应该发送到后端）
            console.log('订阅成功:', { email, frequency, timestamp: new Date().toISOString() });

        }, 1500);
    });

    // 邮箱输入框回车事件
    emailInputNew.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            subscribeBtnNew.click();
        }
    });

});