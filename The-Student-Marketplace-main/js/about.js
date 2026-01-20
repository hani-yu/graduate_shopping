<<<<<<< HEAD
$(document).ready(function () {

    /* -------- Canvas 粒子动画 -------- */
=======
$(document).ready(function() {

    /* -------- 1. Canvas 粒子动画 (保持不变) -------- */
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const canvas = document.getElementById('bannerCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;

    function initCanvas() {
<<<<<<< HEAD
        if (!canvas) return;
=======
        if(!canvas) return;
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
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

    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
<<<<<<< HEAD
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`;
=======
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/150})`;
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

<<<<<<< HEAD
    if (canvas) {
=======
    if(canvas) {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        initCanvas();
        createParticles();
        animateParticles();
    }

<<<<<<< HEAD
    /* --------  鼠标视差效果 -------- */
    $(document).on('mousemove', function (e) {
=======
    /* -------- 2. 鼠标视差效果 (保持不变) -------- */
    $(document).on('mousemove', function(e) {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        const moveX = (window.innerWidth / 2 - mouseX) * 0.02;
        const moveY = (window.innerHeight / 2 - mouseY) * 0.02;
        $('.text_group').css('transform', `translate(${moveX}px, ${moveY}px)`);
<<<<<<< HEAD
        $('.floating_elements i').each(function () {
=======
        $('.floating_elements i').each(function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            const depth = $(this).hasClass('icon_4') ? 0.05 : 0.03;
            $(this).css('transform', `translate(${-moveX * depth * 50}px, ${-moveY * depth * 50}px)`);
        });
    });

<<<<<<< HEAD
    /* --------  打字机效果逻辑 -------- */
=======
    /* -------- 3. 打字机效果逻辑 (整合进显现逻辑) -------- */
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const $typewriter = $('.dynamic_text');
    const fullText = $typewriter.text();
    $typewriter.text(''); // 先清空，等待滚动到位置再触发
    let hasTyped = false; // 确保只打一次字

<<<<<<< HEAD
    const runTypewriter = function () {
=======
    const runTypewriter = function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        if (hasTyped) return;
        hasTyped = true;
        let i = 0;
        const timer = setInterval(() => {
            $typewriter.text(fullText.substring(0, i + 1));
            i++;
            if (i >= fullText.length) clearInterval(timer);
        }, 100);
    };

<<<<<<< HEAD
    /* -------- 滚动淡入动画 (Reveal) -------- */
    const reveal = function () {
        $('.reveal').each(function () {
            const $this = $(this);
            const top = $this.offset().top;
            const winBottom = $(window).scrollTop() + $(window).height();

            if (winBottom > top + 50) {
                $this.addClass('active');

                // 如果是使命区域，触发打字机
=======
    /* -------- 4. 滚动淡入动画 (Reveal) -------- */
    const reveal = function() {
        $('.reveal').each(function() {
            const $this = $(this);
            const top = $this.offset().top;
            const winBottom = $(window).scrollTop() + $(window).height();
            
            if (winBottom > top + 50) {
                $this.addClass('active');
                
                // 【核心修改】：如果是使命区域，触发打字机
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                if ($this.attr('id') === 'mission' || $this.find('.dynamic_text').length > 0) {
                    runTypewriter();
                }
            }
        });
    };

<<<<<<< HEAD
    /* -------- 数字滚动统计  -------- */
    const startCounter = function () {
        $('.counter').each(function () {
=======
    /* -------- 5. 数字滚动统计 (保持不变) -------- */
    const startCounter = function() {
        $('.counter').each(function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            const $this = $(this);
            if ($this.hasClass('done')) return;

            const target = +$this.attr('data-target');
<<<<<<< HEAD

=======
            
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            // 1. 数字滚动
            $({ countNum: 0 }).animate({ countNum: target }, {
                duration: 2500,
                easing: 'swing',
<<<<<<< HEAD
                step: function () { $this.text(Math.ceil(this.countNum)); },
                complete: function () {
                    $this.text(target);
                    $this.addClass('done');
                    // 2. 如果是好评率，在数字滚动完后触发圆环
                    if ($this.closest('.progress_box').length > 0) {
=======
                step: function() { $this.text(Math.ceil(this.countNum)); },
                complete: function() { 
                    $this.text(target); 
                    $this.addClass('done');
                    // 2. 如果是好评率，在数字滚动完后触发圆环
                    if($this.closest('.progress_box').length > 0) {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                        const offset = 283 - (283 * target / 100);
                        $this.closest('.progress_box').find('.bar').css('stroke-dashoffset', offset);
                    }
                }
            });
        });
    };

    /* 在滚动监听中触发 */
<<<<<<< HEAD
    $(window).on('scroll load', function () {
=======
    $(window).on('scroll load', function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        const statsBox = $('#stats');
        if (statsBox.hasClass('active')) {
            startCounter();
        }
    });

<<<<<<< HEAD
    const handleNavScroll = function () {
=======
    /* -------- 6. FAQ 与 导航栏 (保持不变) -------- */
    // $('.faq_question').click(function() {
    //     $(this).next('.faq_answer').slideToggle(300);
    //     $(this).parent('.faq_box').toggleClass('active');
    //     $('.faq_answer').not($(this).next()).slideUp(300);
    //     $('.faq_box').not($(this).parent()).removeClass('active');
    // });

    const handleNavScroll = function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        if ($(window).scrollTop() > 50) {
            $('nav.daohang').addClass('nav_scrolled');
        } else {
            $('nav.daohang').removeClass('nav_scrolled');
        }
    };

<<<<<<< HEAD
    /* ------- FAQ 增强交互 -------- */
    $('.wenti_header').on('click', function () {
        const $item = $(this).closest('.wenti_item');
        const $daan = $item.find('.daan_box');

        // 切换当前点击项的 active 类
        $item.toggleClass('active');

=======
    /* -------- 12. FAQ 增强交互 -------- */
    $('.wenti_header').on('click', function() {
        const $item = $(this).closest('.wenti_item');
        const $daan = $item.find('.daan_box');
        
        // 切换当前点击项的 active 类
        $item.toggleClass('active');
        
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        // 弹性动画反馈
        if ($item.hasClass('active')) {
            $item.css('transform', 'scale(1.02)');
            setTimeout(() => { $item.css('transform', 'scale(1)'); }, 200);
        }

<<<<<<< HEAD
        $('.wenti_item').not($item).removeClass('active');
    });

    /* -------- 统一滚动监听 -------- */
    $(window).on('scroll load', function () {
=======
        // 关闭其他已经打开的项 (让界面保持整洁)
        $('.wenti_item').not($item).removeClass('active');
    });

    /* -------- 7. 统一滚动监听 -------- */
    $(window).on('scroll load', function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        reveal();
        handleNavScroll();
        const statsBox = $('.stats_box');
        if (statsBox.length && $(window).scrollTop() + $(window).height() > statsBox.offset().top + 100) {
            startCounter();
        }
    });

<<<<<<< HEAD
    /* -------- 校园卡片交互效果 -------- */
    $('.campus_card').on('mousemove', function (e) {
=======
    /* -------- 8. 校园卡片交互效果 -------- */
    $('.campus_card').on('mousemove', function(e) {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        const card = $(this);
        const cardOffset = card.offset();
        const cardWidth = card.outerWidth();
        const cardHeight = card.outerHeight();
<<<<<<< HEAD

        const mouseX = (e.pageX - cardOffset.left) / cardWidth - 0.5;
        const mouseY = (e.pageY - cardOffset.top) / cardHeight - 0.5;

        const tiltX = mouseY * 20;
        const tiltY = -mouseX * 20;

        card.css('transform', `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`);
    });

    $('.campus_card').on('mouseleave', function () {
        $(this).css('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    });

    /* --------团队卡片视差跟随 -------- */
    $('.team_card_wrapper').on('mousemove', function (e) {
=======
        
        // 计算鼠标相对于卡片中心的位置 (-0.5 到 0.5)
        const mouseX = (e.pageX - cardOffset.left) / cardWidth - 0.5;
        const mouseY = (e.pageY - cardOffset.top) / cardHeight - 0.5;
        
        // 这里的 20 是倾斜的角度灵敏度
        const tiltX = mouseY * 20;
        const tiltY = -mouseX * 20;
        
        card.css('transform', `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`);
    });

    $('.campus_card').on('mouseleave', function() {
        $(this).css('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    });

    /* -------- 9. 团队卡片视差跟随 -------- */
    $('.team_card_wrapper').on('mousemove', function(e) {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        const $inner = $(this).find('.team_card_inner');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
<<<<<<< HEAD

        // 只有在未翻转状态（或轻微）增加偏移
        const xRot = (y - rect.height / 2) / 10;
        const yRot = (rect.width / 2 - x) / 10;

        if (!$(this).is(':hover')) {
            $inner.css('transform', `rotateY(0deg) rotateX(0deg)`);
        } else {
        }
    });

    /* -------- 历程进度条生长 JS -------- */
    const handleTimelineProgress = function () {
=======
        
        // 只有在未翻转状态（或轻微）增加偏移
        const xRot = (y - rect.height / 2) / 10;
        const yRot = (rect.width / 2 - x) / 10;
        
        // 如果想要在翻转时依然有视差，需要更复杂的逻辑，
        // 这里我们仅在鼠标进入时提供一个微小的倾斜感
        if (!$(this).is(':hover')) {
            $inner.css('transform', `rotateY(0deg) rotateX(0deg)`);
        } else {
            // 注意：翻转本身是通过 CSS hover 控制的，这里可以做一些微调
        }
    });

    /* -------- 10. 历程进度条生长 JS -------- */
    const handleTimelineProgress = function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        const $timeline = $('.shijian_zhou_box');
        if (!$timeline.length) return;

        const scrollPos = $(window).scrollTop() + $(window).height() / 1.5;
        const timelineTop = $timeline.offset().top;
        const timelineHeight = $timeline.height();

        // 1. 计算进度条百分比
        let progress = scrollPos - timelineTop;
        if (progress < 0) progress = 0;
        if (progress > timelineHeight) progress = timelineHeight;
<<<<<<< HEAD

=======
        
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        const percent = (progress / timelineHeight) * 100;
        $('#licheng_progress').css('height', percent + '%');

        // 2. 检查每个节点是否被“激活”
<<<<<<< HEAD
        $('.licheng_item').each(function () {
=======
        $('.licheng_item').each(function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            const itemTop = $(this).offset().top;
            if (scrollPos > itemTop + 50) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    };

    /* 整合进原来的滚动监听 */
<<<<<<< HEAD
    $(window).on('scroll load', function () {
=======
    $(window).on('scroll load', function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        // ... 原有的函数调用
        handleTimelineProgress();
    });

<<<<<<< HEAD
    /* -------- 守则卡片微光跟随 -------- */
    $('.shiyong_guize_card').on('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        $(this).css('background', `radial-gradient(circle at ${x}px ${y}px, rgba(13, 148, 136, 0.06) 0%, rgba(255, 255, 255, 0.85) 60%)`);
    });

    $('.shiyong_guize_card').on('mouseleave', function () {
=======
    /* -------- 11. 安全卡片微光跟随 -------- */
    // $('.anquan_baozhang_card').on('mousemove', function(e) {
    //     const rect = this.getBoundingClientRect();
    //     const x = e.clientX - rect.left;
    //     const y = e.clientY - rect.top;
        
    //     // 创建一个动态渐变背景，随着鼠标移动
    //     $(this).css('background', `radial-gradient(circle at ${x}px ${y}px, rgba(13, 148, 136, 0.08) 0%, rgba(255, 255, 255, 0.8) 50%)`);
    // });

    // $('.anquan_baozhang_card').on('mouseleave', function() {
    //     $(this).css('background', 'rgba(255, 255, 255, 0.8)');
    // });

    /* -------- 11. 守则卡片微光跟随 -------- */
    $('.shiyong_guize_card').on('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        $(this).css('background', `radial-gradient(circle at ${x}px ${y}px, rgba(13, 148, 136, 0.06) 0%, rgba(255, 255, 255, 0.85) 60%)`);
    });

    $('.shiyong_guize_card').on('mouseleave', function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        $(this).css('background', 'rgba(255, 255, 255, 0.85)');
    });

    $(window).resize(initCanvas);
    setTimeout(reveal, 200);

    // 循环提醒动画
<<<<<<< HEAD
    setInterval(function () {
=======
    setInterval(function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        // 使用 animate.css 的 pulse 效果
        $('.mini_explore_tag').addClass('animate__animated animate__pulse');
        $('.Lmini_explore_tag').addClass('animate__animated animate__pulse');
        $('.Rmini_explore_tag').addClass('animate__animated animate__pulse');
        $('.Fmini_explore_tag').addClass('animate__animated animate__pulse');
<<<<<<< HEAD

        // 动画结束后移除类，以便下次触发
        setTimeout(function () {
=======
        
        // 动画结束后移除类，以便下次触发
        setTimeout(function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            $('.mini_explore_tag').removeClass('animate__animated animate__pulse');
            $('.Lmini_explore_tag').addClass('animate__animated animate__pulse');
            $('.Rmini_explore_tag').addClass('animate__animated animate__pulse');
            $('.Fmini_explore_tag').addClass('animate__animated animate__pulse');
        }, 1000);
    }, 5000); // 每 5 秒提醒一次
});