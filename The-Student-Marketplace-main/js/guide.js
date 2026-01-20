$(document).ready(function() {

      /* -------- 1. Canvas 粒子动画 (保持不变) -------- */
    const canvas = document.getElementById('guideCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;

    function initCanvas() {
        if(!canvas) return;
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
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/150})`;
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

    if(canvas) {
        initCanvas();
        createParticles();
        animateParticles();
    }

    /* -------- 2. 鼠标视差效果 (保持不变) -------- */
    $(document).on('mousemove', function(e) {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        const moveX = (window.innerWidth / 2 - mouseX) * 0.02;
        const moveY = (window.innerHeight / 2 - mouseY) * 0.02;
        $('.guide_text_group').css('transform', `translate(${moveX}px, ${moveY}px)`);
        $('.guide_floating_elements i').each(function() {
            const depth = $(this).hasClass('icon_4') ? 0.05 : 0.03;
            $(this).css('transform', `translate(${-moveX * depth * 50}px, ${-moveY * depth * 50}px)`);
        });
    });

    // 效果 1: 返回顶部按钮显示隐藏
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#goTop').fadeIn().css('display', 'flex');
        } else {
            $('#goTop').fadeOut();
        }
    });

    // 效果 2: 点击返回顶部平滑滚动
    $('#goTop').click(function() {
        $('html, body').animate({scrollTop: 0}, 600);
    });

    // 效果 3: 搜索框内容筛选
    $('#guideSearch').on('keyup', function() {
        let value = $(this).val().toLowerCase();
        $(".news_card, .res_item, .step_box, .coupon, .social_card").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // 效果 4: 简单加载动画（每个模块卡片淡入）
    $('.news_card, .res_item, .step_box, .coupon, .social_card').each(function(i) {
        $(this).delay(i * 150).queue(function(next){
            $(this).addClass('animate__animated animate__fadeInUp');
            next();
        });
    });

        // 1. 分类过滤功能
    $('.filter_btn').on('click', function() {
        const filter = $(this).data('filter');
        
        // 激活按钮样式
        $('.filter_btn').removeClass('active');
        $(this).addClass('active');

        // 列表过滤动画
        if (filter === 'all') {
            $('.news_item').fadeIn(400);
        } else {
            $('.news_item').hide();
            $(`.news_item.${filter}`).fadeIn(400);
        }
    });

    // 2. 磁吸按钮效果 (Read More 按钮)
    $('.read_more_btn').on('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        $(this).css('transform', `translate(${x * 0.3}px, ${y * 0.3}px)`);
    });

    $('.read_more_btn').on('mouseleave', function() {
        $(this).css('transform', `translate(0, 0)`);
    });

    // 3. 数字滚动预览量 (简单模拟)
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // 触发：当模块进入视口时执行
    let observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting){
            $('.views').each(function() {
                const finalValue = parseInt($(this).text().replace(/[^\d]/g, ''));
                animateValue(this, 0, finalValue, 2000);
            });
            observer.disconnect(); // 只执行一次
        }
    });
    observer.observe(document.querySelector('#news'));

        // 价值估算器逻辑
    $('#calcBtn').click(function() {
        const books = parseInt($('#bookNum').val()) || 0;
        const apps = parseInt($('#appNum').val()) || 0;
        
        // 假设平均一本书15元，一个电器100元
        const total = (books * 15) + (apps * 100);
        
        $('#moneyText').text(total);
        $('#calcResult').fadeIn();
        
        // 简单的数字跳动效果
        $({ countNum: 0 }).animate({ countNum: total }, {
            duration: 1000,
            step: function() {
                $('#moneyText').text(Math.floor(this.countNum));
            },
            complete: function() {
                $('#moneyText').text(total);
            }
        });
    });

    // 物品卡片进入视口时的脉冲动画
    const circulationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.flow_item').each(function(i) {
                    setTimeout(() => {
                        $(this).addClass('animate__animated animate__pulse');
                    }, i * 200);
                });
            }
        });
    });
    
    const flowSection = document.querySelector('.flow_container');
    if (flowSection) circulationObserver.observe(flowSection);


        $('.claim_btn').click(function(e) {
        e.stopPropagation(); // 防止触发卡片点击
        const $btn = $(this);
        const $card = $btn.closest('.welfare_ticket');
        
        if($card.hasClass('claimed')) return;

        // 按钮加载动画
        $btn.html('<i class="fas fa-spinner fa-spin"></i> 发放中...');
        
        setTimeout(() => {
            // 改变状态
            $card.addClass('claimed animate__animated animate__headShake');
            $btn.html('<i class="fas fa-check"></i> 已领取');
            
            // 弹出提示
            showToast("领取成功！请在【个人中心-优惠券】查看");
            
            // 简单的纸屑掉落效果 (可用Canvas实现更华丽的)
            createConfetti(e.pageX, e.pageY);
            
        }, 800);
    });

    // 吐司提示函数
    function showToast(msg) {
        const toast = $('<div class="welfare_toast">' + msg + '</div>');
        $('body').append(toast);
        toast.css({
            'position': 'fixed',
            'bottom': '50px',
            'left': '50%',
            'transform': 'translateX(-50%)',
            'background': 'rgba(0,0,0,0.8)',
            'color': '#fff',
            'padding': '12px 25px',
            'border-radius': '50px',
            'z-index': '9999',
            'font-size': '0.9rem'
        }).fadeIn().delay(2000).fadeOut(function() { $(this).remove(); });
    }

    // 简单粒子点缀
    function createConfetti(x, y) {
        for(let i=0; i<15; i++) {
            const $p = $('<div class="confetti"></div>');
            $('body').append($p);
            const colors = ['#0d9488', '#f59e0b', '#14b8a6', '#fbbf24'];
            $p.css({
                'position': 'absolute',
                'left': x,
                'top': y,
                'width': '8px',
                'height': '8px',
                'background': colors[Math.floor(Math.random()*colors.length)],
                'border-radius': '50%',
                'z-index': '9998'
            }).animate({
                left: x + (Math.random()-0.5) * 200,
                top: y + (Math.random()-0.5) * 200,
                opacity: 0
            }, 1000, function() { $(this).remove(); });
        }
    }

        $('.social_item').on('mousemove', function(e) {
        const card = $(this);
        const cardWidth = card.outerWidth();
        const cardHeight = card.outerHeight();
        const centerX = card.offset().left + cardWidth / 2;
        const centerY = card.offset().top + cardHeight / 2;
        const mouseX = e.pageX - centerX;
        const mouseY = e.pageY - centerY;
        
        const rotateX = (-mouseY / (cardHeight / 2)) * 10; // 限制旋转角度
        const rotateY = (mouseX / (cardWidth / 2)) * 10;
        
        card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    });

    $('.social_item').on('mouseleave', function() {
        $(this).css('transform', `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    });

    // 2. 滚动进入时的错落动画
    const socialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.social_item').each(function(i) {
                    setTimeout(() => {
                        $(this).addClass('animate__animated animate__fadeInUp');
                        $(this).css('opacity', '1');
                    }, i * 150);
                });
                socialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const socialGrid = document.querySelector('.social_grid');
    if (socialGrid) {
        $('.social_item').css('opacity', '0'); // 初始化隐藏
        socialObserver.observe(socialGrid);
    }

        const socialItems = document.querySelectorAll('.social_item');

    socialItems.forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            
            // 1. 计算鼠标在卡片内的百分比坐标 (用于流光)
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            item.style.setProperty('--m-x', `${x}px`);
            item.style.setProperty('--m-y', `${y}px`);

            // 2. 计算 3D 倾斜角度 (磁吸感)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 12; // 控制倾斜幅度
            const rotateY = (centerX - x) / 12;

            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // 3. 内部元素视差：图标弹出更多
            const icon = item.querySelector('.social_icon');
            if(icon) {
                icon.style.transform = `translateZ(50px) translateX(${(x - centerX)/10}px) translateY(${(y - centerY)/10}px)`;
            }
        });

        // 鼠标离开时平滑还原
        item.addEventListener('mouseleave', () => {
            item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            const icon = item.querySelector('.social_icon');
            if(icon) icon.style.transform = `translateZ(0) translateX(0) translateY(0)`;
        });
    });

    console.log("校园生活指南页面JS效果加载完成！");
});
