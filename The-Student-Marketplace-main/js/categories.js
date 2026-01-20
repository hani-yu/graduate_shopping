$(document).ready(function () {
    // --- 1. 分类页粒子连线动画 (Constellation Effect) ---
    const canvas = document.getElementById('catCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const count = 70; // 粒子数量
        const minDistance = 150; // 连线的最大距离

        function init() {
            // 让 Canvas 画布大小等于 Banner 容器的大小
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }

        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5; // 移动速度
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 1.5 + 1;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                // 边界回弹
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        // 初始化粒子
        function createParticles() {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Star());
            }
        }

        // 绘制连线逻辑
        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // 如果两个点之间的距离小于设定值，则画线
                    if (distance < minDistance) {
                        ctx.beginPath();
                        // 连线的透明度随距离增加而变淡
                        const opacity = 1 - (distance / minDistance);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. 更新并绘制点
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // 2. 绘制连线
            drawLines();

            requestAnimationFrame(loop);
        }

        init();
        createParticles();
        loop();

        window.addEventListener('resize', () => {
            init();
            createParticles();
        });
    }

    // ---  视差偏移  ---
    $(document).on('mousemove', function (e) {
        const x = (window.innerWidth / 2 - e.pageX) * 0.01;
        const y = (window.innerHeight / 2 - e.pageY) * 0.01;
        $('.cat_text_group').css('transform', `translate(${x}px, ${y}px)`);

        $('.cat_floating_elements i').each(function (i) {
            const factor = (i + 1) * 0.02;
            $(this).css('transform', `translate(${-x * factor * 20}px, ${-y * factor * 20}px)`);
        });
    });

    /* -------- 磁性 3D 倾斜效果 -------- */
    $('.product_item').on('mousemove', function (e) {
        const card = $(this);
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 计算旋转角度 (最大 10 度)
        const rotateX = (centerY - y) / 10;
        const rotateY = (x - centerX) / 10;

        card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`);
    });

    $('.product_item').on('mouseleave', function () {
        $(this).css('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)');
    });

    /* 
       分类筛选 + 动画
  */
    $('#categoryFilter li').click(function () {
        const category = $(this).data('cat');

        $(this).addClass('active').siblings().removeClass('active');

        $('.product_item').each(function () {
            const itemCat = $(this).data('category');

            if (category === 'all' || itemCat === category) {
                $(this)
                    .removeClass('hide')
                    .fadeIn(300)
                    .css('transform', 'scale(1)');
            } else {
                $(this)
                    .fadeOut(200)
                    .css('transform', 'scale(0.9)');
            }
        });

        setTimeout(updateCount, 300);
    });



    /* 
    搜索即时筛选
 */
    $('.search_bar_wrap input').on('input', function () {
        const keyword = $(this).val().toLowerCase();

        $('.product_item').each(function () {
            const title = $(this).find('h4').text().toLowerCase();
            if (title.includes(keyword)) {
                $(this).fadeIn(200);
            } else {
                $(this).fadeOut(200);
            }
        });

        updateCount();
    });



    $('.quick_item').click(function () {
        const cat = $(this).data('cat');
        $('#categoryFilter li[data-cat="' + cat + '"]').trigger('click');
    });

    /*  排序点击动画
    */
    $('.sort_options span').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.product_item').addClass('animate__animated animate__fadeInUp');
    });

    /*  滚动进入动画
   */
    $(window).on('scroll', function () {
        $('.product_item').each(function () {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 50) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    });

    setInterval(function () {
        const list = $('.sidebar_trade ul');
        const first = list.find('li').first();
        first.slideUp(400, function () {
            $(this).appendTo(list).show();
        });
    }, 3000);


    /* 更新数量
    */
    function updateCount() {
        const count = $('.product_item:visible').length;
        $('#itemCount').text(count);
    }

    /*  处理从导航栏跳转过来的分类锚点
    */
    function handleHashJump() {
        // 获取地址栏的 hash（例如 #books）
        const hash = window.location.hash.replace('#', '');

        if (hash) {
            // 1. 找到侧边栏中 data-cat 属性等于这个 hash 的选项
            const $targetFilter = $(`#categoryFilter li[data-cat="${hash}"]`);

            if ($targetFilter.length > 0) {
                // 2. 触发点击事件
                $targetFilter.trigger('click');

                // 3. 平滑滚动到商品区域
                $('html, body').animate({
                    scrollTop: $('.content_area').offset().top - 100
                }, 500);
            }
        }
    }

    // 页面加载完成后执行一次
    handleHashJump();

    // 监听地址栏变化（当用户已经在分类页，再次点击顶部导航菜单时触发）
    $(window).on('hashchange', function () {
        handleHashJump();
    });
});
