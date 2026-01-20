$(document).ready(function () {
    /* -------- Canvas 粒子连线 -------- */
    const canvas = document.getElementById('userCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 80;

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                for (let j = i; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 150})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        }

        initCanvas();
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
        animate();
        window.addEventListener('resize', initCanvas);
    }

    /* -------- 鼠标视差效果 -------- */
    $(document).on('mousemove', function (e) {
        const moveX = (window.innerWidth / 2 - e.pageX) * 0.01;
        const moveY = (window.innerHeight / 2 - e.pageY) * 0.01;
        $('.user_text_group').css('transform', `translate(${moveX}px, ${moveY}px)`);
        $('.user_floating_elements i').css('transform', `translate(${-moveX * 2}px, ${-moveY * 2}px)`);
    });

    // 导航栏滚动变色
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.daohang').addClass('nav_scrolled');
        } else {
            $('.daohang').removeClass('nav_scrolled');
        }
    });

    // 统计数字跳动效果
    $('.num').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            step: function (now) {
                $(this).text(now.toFixed(now > 100 ? 0 : 1));
            }
        });
    });

    // 收藏项 3D 悬浮
    $('.treasure_item').on('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const rotateX = (e.clientY - rect.top - rect.height / 2) / 10;
        const rotateY = -(e.clientX - rect.left - rect.width / 2) / 10;
        $(this).css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    });

    // 数字滚动与环形进度执行
    const animateStats = () => {
        $('.stat_premium_card').each(function () {
            const $card = $(this);
            const $num = $card.find('.num');
            const target = parseFloat($num.data('target'));
            const decimals = $num.data('decimal') || 0;
            const $meter = $card.find('.meter');

            // 数字滚动动画
            $({ countNum: 0 }).animate({ countNum: target }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $num.text(this.countNum.toFixed(decimals));
                },
                complete: function () {
                    $num.text(target.toFixed(decimals));
                }
            });

            // 环形进度条动画
            // 假设流转目标是50件，碳减排目标30kg，诚信满分1000
            let percent = 0;
            if ($num.data('target') == 12) percent = (12 / 50);
            if ($num.data('target') == 15.8) percent = (15.8 / 30);
            if ($num.data('target') == 850) percent = (850 / 1000);

            const offset = 283 - (283 * percent);
            $meter.css('stroke-dashoffset', offset);
        });
    };

    // 视口观察器：进入画面再开始动画
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    if (document.querySelector('.stats_premium')) {
        observer.observe(document.querySelector('.stats_premium'));
    }

    // 磁吸 3D 效果
    $('.stat_premium_card').on('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y - rect.height / 2) / 10;
        const rotateY = -(x - rect.width / 2) / 10;
        $(this).css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    });

    $('.stat_premium_card').on('mouseleave', function () {
        $(this).css('transform', `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    });

    // 差异化入场动画
    const entryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = $(entry.target);

                // 左右差异化飞入
                const xVal = target.hasClass('left_entry') ? -50 : 50;

                target.animate({
                    opacity: 1,
                    left: 0
                }, {
                    duration: 800,
                    step: function (now, fx) {
                        if (fx.prop === "opacity") {
                            const move = xVal * (1 - now);
                            $(this).css('transform', `translateX(${move}px)`);
                        }
                    },
                    complete: function () {
                        // 入场完成后，触发“印章落下”
                        $(this).addClass('stamped');
                        // 模拟敲章震动
                        $(this).find('.entry_card').addClass('animate__animated animate__headShake');
                    }
                });

                entryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.history_entry').forEach(el => entryObserver.observe(el));

    // 点击卡片的“纸张卷动”效果 (差异化JS)
    $('.entry_card').click(function () {
        const card = $(this);
        // 模拟档案被翻阅的视觉反馈
        card.css('transition', '0.2s');
        card.css('transform', 'rotateX(10deg) scale(0.98)');

        setTimeout(() => {
            card.css('transform', 'rotateX(0deg) scale(1.02)');
            console.log("正在调取该卷宗详情...");
        }, 200);
    });

    // 分类按钮切换逻辑
    $('.treasure_filter button').click(function () {
        $('.treasure_filter button').removeClass('active');
        $(this).addClass('active');

        // 增加点击时的震动反馈
        $(this).addClass('animate__animated animate__headShake');
        setTimeout(() => {
            $(this).removeClass('animate__animated animate__headShake');
        }, 500);
    });

    // 磁吸效果：按钮轻微随鼠标移动
    const filterButtons = document.querySelectorAll('.treasure_filter button');

    filterButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // 按钮轻微偏移
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px) translateY(-3px)`;

            // 内部文字反向位移（视差）
            btn.style.paddingLeft = `${30 + x * 0.1}px`;
            btn.style.paddingRight = `${30 - x * 0.1}px`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
            btn.style.padding = `10px 30px`;
        });
    });

    // 点击时的“锦囊开启”声效反馈
    $('.treasure_filter button').on('mousedown', function () {
        $(this).css('transform', 'scale(0.95)');
    });
    $('.treasure_filter button').on('mouseup', function () {
        $(this).css('transform', 'scale(1.05)');
    });

    // 视差漫游：图片随鼠标方向轻微移动
    $('.treasure_box').on('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // 计算移动百分比
        const moveX = (mouseX / rect.width - 0.5) * 20; // 移动范围20px
        const moveY = (mouseY / rect.height - 0.5) * 20;

        $(this).find('.parallax_img').css({
            'transform': `translate(${moveX}px, ${moveY}px) scale(1.1)`
        });
    });

    $('.treasure_box').on('mouseleave', function () {
        $(this).find('.parallax_img').css({
            'transform': `translate(0, 0) scale(1)`
        });
    });

    // 锦匣闪烁效果：在悬停时产生随机的金色小闪光
    $('.treasure_box').hover(function () {
        this.sparkleTimer = setInterval(() => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const $sparkle = $('<div class="box_sparkle"></div>').css({
                'left': x + '%',
                'top': y + '%'
            });
            $(this).append($sparkle);
            setTimeout(() => $sparkle.remove(), 800);
        }, 200);
    }, function () {
        clearInterval(this.sparkleTimer);
    });

    const style = document.createElement('style');
    style.innerHTML = `
@keyframes floating-card {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}`;
    document.head.appendChild(style);

    // 评价卡片的随机微动 (差异化动效)
    // 让卡片在页面上有一种轻轻漂浮的感觉
    $('.review_letter').each(function (index) {
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        $(this).css({
            'animation': `floating-card ${randomDuration}s ease-in-out ${randomDelay}s infinite`
        });
    });

    // 点击评价产生“点赞”红心效果
    $('.review_letter').click(function (e) {
        const heart = $('<i class="fas fa-heart"></i>');
        const x = e.pageX;
        const y = e.pageY;

        $('body').append(heart);
        heart.css({
            'position': 'absolute',
            'left': x - 10,
            'top': y - 10,
            'color': '#ef4444',
            'font-size': '1.5rem',
            'z-index': '9999',
            'pointer-events': 'none'
        }).animate({
            top: y - 100,
            opacity: 0,
            fontSize: '3rem'
        }, 800, function () {
            $(this).remove();
        });
    });

    // 模拟安全扫描效果
    $('.scan_btn').click(function () {
        const $btn = $(this);
        const $score = $('.score_num');
        const $radar = $('.radar_line');

        $btn.html('<i class="fas fa-sync-alt fa-spin"></i> 正在安全检测...');
        $radar.css('animation-duration', '0.5s'); // 加速旋转

        let currentScore = 85;
        const interval = setInterval(() => {
            let temp = Math.floor(Math.random() * 100);
            $score.text(temp);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            $score.text(100).css('color', '#10b981');
            $btn.html('<i class="fas fa-check"></i> 检测完毕：环境安全');
            $radar.css('animation-duration', '2s');
            alert("扫描完成！已为您阻拦 3 次可疑登录尝试，账户状态：完美。");
        }, 2500);
    });

    // 密码强度实时反馈
    $('#newPwdInput').on('input', function () {
        const val = $(this).val();
        let strength = 0;
        if (val.length > 6) strength += 30;
        if (/[A-Z]/.test(val)) strength += 30;
        if (/[0-9]/.test(val)) strength += 40;

        const $bar = $('#strengthBar');
        $bar.css('width', strength + '%');

        if (strength < 40) $bar.css('background', '#ef4444');
        else if (strength < 70) $bar.css('background', '#f59e0b');
        else $bar.css('background', '#10b981');
    });

    // 点击展开高级表单
    $('.btn_action_toggle').click(function () {
        const targetId = $(this).data('target');
        if (targetId) {
            $(`#${targetId}`).toggleClass('active');
            $(this).text($(this).text() === "修改" ? "收起" : "修改");
        }
    });

    // 处理按钮点击的状态切换
    $('.btn_action_toggle').click(function () {
        const $btn = $(this);
        const targetId = $btn.data('target');

        // 切换按钮自身的 active 类
        $btn.toggleClass('active_btn');

        // 切换折叠表单
        if (targetId) {
            $(`#${targetId}`).toggleClass('active');

            // 改变文字内容
            const isOpened = $(`#${targetId}`).hasClass('active');
            $btn.find('span').text(isOpened ? "收起面板" : "安全修改");
        }

        // 增加震动反馈
        $btn.addClass('animate__animated animate__pulse');
        setTimeout(() => $btn.removeClass('animate__animated animate__pulse'), 500);
    });

    // 磁吸效果 (针对所有 vault 操作按钮)
    const actionBtns = document.querySelectorAll('.btn_vault_action');
    actionBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateX(${btn.classList.contains('active_btn') ? 0 : 0}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });
});

