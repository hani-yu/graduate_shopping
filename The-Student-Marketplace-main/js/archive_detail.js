$(document).ready(function () {
    $(window).scroll(function () {
        // 滚动超过 60 像素时切换状态
        if ($(this).scrollTop() > 60) {
            $('.daohang').addClass('nav_scrolled');
        } else {
            $('.daohang').removeClass('nav_scrolled');
        }
    });

<<<<<<< HEAD
    // 实现卡片的 3D 磁吸倾斜
=======
    // 1. 实现卡片的 3D 磁吸倾斜
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const cards = document.querySelectorAll('.v_card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
        });
    });

<<<<<<< HEAD
    // 使用 Intersection Observer 实现卡片交错淡入
=======
    // 2. 使用 Intersection Observer 实现卡片交错淡入
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    entry.target.style.opacity = '1';
                }, index * 150); // 150ms 的延迟错开
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.v_card_wrapper').forEach(card => {
        card.style.opacity = '0'; // 初始隐藏
        revealObserver.observe(card);
    });

<<<<<<< HEAD
    // 背景粒子 Canvas 
=======
    // 1. 背景粒子 Canvas (数字化流动感)
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const canvas = document.getElementById('impactCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const count = 40;

        function init() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.speedX;
                if (this.x > canvas.width) this.x = 0;
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
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }

        init();
        for (let i = 0; i < count; i++) particles.push(new Particle());
        animate();
    }

<<<<<<< HEAD
    // 数字滚动触发
=======
    // 2. 数字滚动触发
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const startCounting = () => {
        $('.num_count').each(function () {
            const $this = $(this);
            const target = parseFloat($this.data('target'));
            const decimal = $this.data('decimal') || 0;

            $({ countNum: 0 }).animate({ countNum: target }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $this.text(this.countNum.toFixed(decimal));
                },
                complete: function () {
                    $this.text(target.toFixed(decimal));
                }
            });
        });
    };

<<<<<<< HEAD
    // 滚动监听
=======
    // 3. 滚动监听
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounting();
            // 让卡片整体做一个脉冲进入效果
            $('.impact_glass_board').addClass('animate__animated animate__zoomIn');
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.impact_premium'));

<<<<<<< HEAD
    //模拟卷轴展开时的动态阴影
    $('.archive_scroll_item').on('mouseenter', function () {
=======
    // 1. 模拟卷轴展开时的动态阴影
    $('.archive_scroll_item').on('mouseenter', function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        $(this).find('.scroll_bottom').css({
            'box-shadow': '0 10px 25px rgba(0,0,0,0.15)',
            'transition': '0.6s'
        });
    });

<<<<<<< HEAD
    $('.archive_scroll_item').on('mouseleave', function () {
        $(this).find('.scroll_bottom').css('box-shadow', '0 4px 10px rgba(0,0,0,0.2)');
    });

    // 视口入场引导：卷轴排队轻轻下坠
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.archive_scroll_item').each(function (i) {
=======
    $('.archive_scroll_item').on('mouseleave', function() {
        $(this).find('.scroll_bottom').css('box-shadow', '0 4px 10px rgba(0,0,0,0.2)');
    });

    // 2. 视口入场引导：卷轴排队轻轻下坠
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.archive_scroll_item').each(function(i) {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
                    setTimeout(() => {
                        $(this).addClass('animate__animated animate__bounceInDown');
                    }, i * 150);
                });
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const grid = document.querySelector('.scroll_library_grid');
<<<<<<< HEAD
    if (grid) scrollObserver.observe(grid);

    //  数字跳动 (针对统计卷轴)
    function countUp() {
        $('.num').each(function () {
=======
    if(grid) scrollObserver.observe(grid);

    // 3. 数字跳动 (针对统计卷轴)
    function countUp() {
        $('.num').each(function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
            const $this = $(this);
            const target = parseInt($this.text());
            $({ val: 0 }).animate({ val: target }, {
                duration: 2000,
<<<<<<< HEAD
                step: function () { $this.text(Math.floor(this.val)); },
                complete: function () { $this.text(target); }
            });
        });
    }

    //  悬停时的视觉增强：让把手稍微旋转
    $('.scroll_case').hover(function () {
        $(this).find('.knob').css('transform', 'rotate(10deg)');
    }, function () {
        $(this).find('.knob').css('transform', 'rotate(0deg)');
    });

    // 统计数字滚动效果
=======
                step: function() { $this.text(Math.floor(this.val)); },
                complete: function() { $this.text(target); }
            });
        });
    }
    
     // 1. 悬停时的视觉增强：让把手稍微旋转
    $('.scroll_case').hover(function() {
        $(this).find('.knob').css('transform', 'rotate(10deg)');
    }, function() {
        $(this).find('.knob').css('transform', 'rotate(0deg)');
    });

    // 2. 统计数字滚动效果
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    const animateNumbers = (el) => {
        const target = parseInt(el.text());
        $({ val: 0 }).animate({ val: target }, {
            duration: 2000,
<<<<<<< HEAD
            step: function () { el.text(Math.floor(this.val) + "+"); },
            complete: function () { el.text(target + "+"); }
=======
            step: function() { el.text(Math.floor(this.val) + "+"); },
            complete: function() { el.text(target + "+"); }
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        });
    };

    // 当统计卷轴第一次展开时触发数字
<<<<<<< HEAD
    $('.stat_scroll').one('mouseenter', function () {
=======
    $('.stat_scroll').one('mouseenter', function() {
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        animateNumbers($(this).find('.num_bold'));
    });
});
