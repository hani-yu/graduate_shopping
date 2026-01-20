$(document).ready(function() {

        const $card = $('.preface_main_card');

    if ($card.length) {
        $card.on('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            
            // 1. 计算鼠标在卡片内的坐标
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 将坐标传递给 CSS 变量（驱动流光）
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);

            // 2. 计算 3D 倾斜角度 (磁吸感)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // 限制旋转角度在 5度以内，防止太乱
            const rotateX = (y - centerY) / 25; 
            const rotateY = (centerX - x) / 25;

            // 应用变换
            $(this).css({
                'transform': `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            });
        });

        // 3. 鼠标离开还原位置
        $card.on('mouseleave', function() {
            $(this).css({
                'transform': 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                'transition': 'all 0.5s ease' // 离开时增加平滑过渡
            });
            // 延迟移除过渡，以免干扰下一次 mousemove
            setTimeout(() => {
                $(this).css('transition', 'box-shadow 0.5s ease');
            }, 500);
        });
    }
    //    // 1. 视差滚动反馈 (针对左侧大字符)
    // $(window).on('scroll', function() {
    //     const scrolled = $(window).scrollTop();
    //     $('.large_char').css('transform', `translateY(${scrolled * 0.1}px)`);
    //     $('.vertical_en').css('transform', `translateY(${scrolled * -0.05}px)`);
    // });

    // // 2. 文字进入视口时的“打字机式”平滑显示
    // const textEl = document.querySelector('.preface_text_content p');
    // const observer = new IntersectionObserver((entries) => {
    //     if(entries[0].isIntersecting) {
    //         // 给文字添加逐行扫描的遮罩动效感 (通过类名控制)
    //         textEl.style.opacity = '1';
    //         textEl.classList.add('animate__animated', 'animate__fadeIn');
            
    //         // 简单的“印章”盖章动效
    //         setTimeout(() => {
    //             $('.mini_seal').css({
    //                 'transform': 'scale(1.2)',
    //                 'opacity': '0.8',
    //                 'transition': '0.3s'
    //             });
    //         }, 1000);
            
    //         observer.unobserve(entries[0].target);
    //     }
    // }, { threshold: 0.5 });

    // observer.observe(textEl);

    // // 3. 磁吸效果：当鼠标在卡片上移动时，背后的装饰字轻轻反向位移
    // $('.preface_main_card').on('mousemove', function(e) {
    //     const x = (window.innerWidth / 2 - e.pageX) * 0.02;
    //     const y = (window.innerHeight / 2 - e.pageY) * 0.02;
    //     $('.preface_deco_bg').css('transform', `translate(${x}px, ${y}px)`);
    // });
    
    // 1. 进度条随滚动触发加载
    const skillObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            $('.progress_fill').each(function() {
                $(this).css('width', $(this).data('width'));
            });
            skillObserver.disconnect();
        }
    }, { threshold: 0.5 });

    if(document.querySelector('.skill_infographic')) {
        skillObserver.observe(document.querySelector('.skill_infographic'));
    }

    // // 2. 核心成员卡片磁吸效果
    // $('.id_card').on('mousemove', function(e) {
    //     const rect = this.getBoundingClientRect();
    //     const x = e.clientX - rect.left;
    //     const y = e.clientY - rect.top;
    //     const centerX = rect.width / 2;
    //     const centerY = rect.height / 2;
        
    //     const rotateX = (centerY - y) / 10;
    //     const rotateY = (x - centerX) / 10;
        
    //     $(this).css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`);
    // });

    // $('.id_card').on('mouseleave', function() {
    //     $(this).css('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)');
    // });

        
    // 成员卡片 3D 效果
    const cards = document.querySelectorAll('.chengyuan_card');

    cards.forEach(c => {
        c.addEventListener('mousemove', e => {
            const rect = c.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 更新 CSS 变量
            c.style.setProperty('--mx', `${x}px`);
            c.style.setProperty('--my', `${y}px`);

            // 计算倾斜
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rx = (y - cy) / 15;
            const ry = (cx - x) / 15;

            c.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
        });

        c.addEventListener('mouseleave', () => {
            c.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
        });
    });

    // 3. 导航栏滚动交互
    $(window).scroll(function() {
        if ($(this).scrollTop() > 60) {
            $('.daohang').addClass('nav_scrolled');
        } else {
            $('.daohang').removeClass('nav_scrolled');
        }
    });

        // 1. 当滚动到这个区域时，进度条和数字才开始动
    const startJineng = () => {
        $('.jineng_card').each(function() {
            const $tiao = $(this).find('.tiao_fill');
            const $shuzi = $(this).find('.num_text');
            const targetWidth = $tiao.css('--w');
            const targetNum = parseInt($shuzi.data('target'));

            // 进度条展开动画
            $tiao.css('width', targetWidth);

            // 数字滚动动画
            $({ count: 0 }).animate({ count: targetNum }, {
                duration: 2000,
                step: function() {
                    $shuzi.text(Math.floor(this.count));
                },
                complete: function() {
                    $shuzi.text(targetNum);
                }
            });
        });
    };

    // 2. 简单的视口监听 (作业常用写法)
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            startJineng();
            observer.disconnect(); 
        }
    }, { threshold: 0.5 });

    const targetArea = document.querySelector('.jineng_section');
    if(targetArea) observer.observe(targetArea);

    // 3. 鼠标在卡片上的倾斜效果 (同步之前的 3D 效果)
    $('.jineng_card').on('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = (y - rect.height/2) / 15;
        const ry = -(x - rect.width/2) / 15;
        $(this).css('transform', `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`);
    });

    $('.jineng_card').on('mouseleave', function() {
        $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)');
    });

        // 1. 招募盒子的背景光跟随效果
    const box = document.getElementById('zhaomuBox');
    const light = document.querySelector('.zhaomu_light');

    if(box && light) {
        box.addEventListener('mousemove', function(e) {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 让光晕层跟随鼠标
            light.style.left = x + 'px';
            light.style.top = y + 'px';
            
            // 盒子稍微倾斜 (3D 磁吸效果)
            const rx = (y - rect.height/2) / 30;
            const ry = -(x - rect.width/2) / 30;
            box.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });

        box.addEventListener('mouseleave', function() {
            box.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }

    // 2. 按钮点击效果
    $('#btnShenqing').click(function() {
        const $btn = $(this);
        $btn.text("正在提交...");
        
        setTimeout(() => {
            $btn.css('background', '#f59e0b').text("申请已提交");
            alert("锦囊收到！我们会尽快通过校园邮箱与你取得联系。");
        }, 1500);
    });
});