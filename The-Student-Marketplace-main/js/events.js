$(document).ready(function () {
    /* -------- Canvas 粒子动画-------- */
    const canvas = document.getElementById('eventsCanvas');
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
        $('.events_text_group').css('transform', `translate(${moveX}px, ${moveY}px)`);
    });

    // 闪购倒计时功能
    function updateCountdowns() {
        $('.countdown').each(function () {
            // 读取持续时长（秒）
            const duration = $(this).data('duration');

            // 进入页面时，给每个倒计时生成一个新的结束时间
            if (!$(this).data('end-time')) {
                $(this).data('end-time', Date.now() + duration * 1000);
            }

            const endTime = $(this).data('end-time');
            const now = Date.now();
            const distance = endTime - now;

            if (distance <= 0) {
                $(this).html("00:00:00");
                return;
            }

            const hours = Math.floor(distance / 1000 / 60 / 60);
            const minutes = Math.floor(distance / 1000 / 60 % 60);
            const seconds = Math.floor(distance / 1000 % 60);

            const h = hours < 10 ? '0' + hours : hours;
            const m = minutes < 10 ? '0' + minutes : minutes;
            const s = seconds < 10 ? '0' + seconds : seconds;

            $(this).html(`${h}:${m}:${s}`);
        });
    }

    setInterval(updateCountdowns, 1000);
    // 抢购按钮点击动效
    $('.flash_btn').click(function () {
        if ($(this).text() === "已抢完") return;

        $(this).html('<i class="fas fa-spinner fa-spin"></i> 抢购中...');
        setTimeout(() => {
            $(this).css('background', '#94a3b8').text("已抢完").prop('disabled', true);
            alert("恭喜！抢购成功，请在个人中心查看订单。");
        }, 1200);
    });

    // 领取赠品交互
    $('.claim_gift_btn').click(function () {
        const giftTitle = $(this).siblings('h4').text();

        // 模拟领取状态
        $(this).text("领取成功").css({
            "background": "#94a3b8",
            "cursor": "default"
        }).prop('disabled', true);

        // 弹出高级提示框
        alert(`恭喜！您已成功领取【${giftTitle}】。请凭核销码至校内“校友集市互助站”领取实物。`);
    });

    // 交换意向交互
    $('.interest_btn').click(function () {
        const $btn = $(this);
        const originalText = $btn.text();

        // 模拟匹配过程
        $btn.html('<i class="fas fa-heartbeat animate__animated animate__heartBeat animate__infinite"></i> 正在匹配缘分...');

        setTimeout(() => {
            $btn.css({
                "background": "#0d9488",
                "color": "#fff",
                "border-color": "#0d9488"
            }).text("匹配请求已发送");

            // 弹出提示
            alert("缘分值已满！匹配请求已发送给对方，请关注【个人中心-消息中心】。");
        }, 1500);
    });

    //  3D 视差效果 (针对竞赛卡片)
    $('.contest_card').on('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        $(this).css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    });

    $('.contest_card').on('mouseleave', function () {
        $(this).css('transform', `perspective(1000px) rotateX(0deg) rotateY(0deg)`);
    });

    // 点击参赛效果
    $('.join_btn:not(.disabled)').click(function () {
        const btn = $(this);
        btn.html('<i class="fas fa-check"></i> 报名成功');
        btn.css('background', '#f59e0b');

        // 模拟人数增加
        const progressSpan = btn.siblings('.contest_main').find('.progress_text span:first-child');
        progressSpan.addClass('animate__animated animate__bounceIn').text('当前参与：+1');

        alert("恭喜！您已成功参与挑战赛。发布商品将自动累计竞赛积分。");
    });

    //  日历点击激活状态
    $('.calendar_day').click(function () {
        $('.calendar_day').removeClass('active').css('border-color', 'rgba(13,148,136,0.1)');
        $(this).addClass('active').css('border-color', '#0d9488');
    });

    const $list = $('#noticeList');
    const $items = $('.notice_item');
    const itemHeight = 180; // 对应 CSS 中的高度
    let currentIndex = 0;
    const totalItems = $items.length;

    // 自动滚动函数
    function scrollNotices() {
        currentIndex++;
        if (currentIndex >= totalItems) {
            // 到达末尾后平滑回到开头
            $list.css('transition', 'none');
            currentIndex = 0;
            $list.css('transform', `translateY(0)`);
            // 强制重绘
            $list[0].offsetHeight;
            $list.css('transition', 'all 0.5s ease');
        } else {
            $list.css('transform', `translateY(-${currentIndex * itemHeight}px)`);
        }
    }

    // 设置定时器
    let autoScroll = setInterval(scrollNotices, 4000);

    // 鼠标悬停停止滚动
    $('.notice_viewport').hover(
        function () { clearInterval(autoScroll); },
        function () { autoScroll = setInterval(scrollNotices, 4000); }
    );

    // 手动控制按钮
    $('#nextNotice').click(function () {
        scrollNotices();
    });

    $('#prevNotice').click(function () {
        currentIndex--;
        if (currentIndex < 0) currentIndex = totalItems - 1;
        $list.css('transform', `translateY(-${currentIndex * itemHeight}px)`);
    });

    // 呼吸动画 - 查看规则按钮
    (function () {
        const btn = document.getElementById("flashsale_rule_btn");
        if (!btn) return;

        let scale = 1;
        let growing = true;

        function breathe() {
            if (growing) {
                scale += 0.002;
                if (scale >= 1.06) growing = false;
            } else {
                scale -= 0.002;
                if (scale <= 1) growing = true;
            }

            btn.style.transform = `scale(${scale})`;
            requestAnimationFrame(breathe);
        }

        breathe();
    })();


});
