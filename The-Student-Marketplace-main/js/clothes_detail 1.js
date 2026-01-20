document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product_item');
    const filterBtns = document.querySelectorAll('.filter_btn');

    // 1. 3D 磁力倾斜效果
    // cards.forEach(card => {
    //     card.addEventListener('mousemove', (e) => {
    //         const rect = card.getBoundingClientRect();
    //         const x = e.clientX - rect.left; // 鼠标在卡片内的X坐标
    //         const y = e.clientY - rect.top;  // 鼠标在卡片内的Y坐标

    //         const centerX = rect.width / 2;
    //         const centerY = rect.height / 2;

    //         // 计算旋转角度 (最大旋转5度)
    //         const rotateX = ((y - centerY) / centerY) * -5;
    //         const rotateY = ((x - centerX) / centerX) * 5;

    //         card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    //     });

    //     card.addEventListener('mouseleave', () => {
    //         card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    //     });
    // });

    // 2. 分类过滤逻辑
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 切换按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterType = btn.getAttribute('data-type');

            cards.forEach(card => {
                const cardType = card.getAttribute('data-category');

                // 添加消失动画
                if (filterType === 'all' || cardType === filterType) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 3. 入场渐显动画
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.top = '0';
                }, index * 100); // 错开入场时间
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.position = 'relative';
        card.style.top = '30px';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // 1. 倒计时 JS
    function startTimer(duration, display) {
        let timer = duration, hours, minutes, seconds;
        // setInterval(() => {
        //     hours = parseInt(timer / 3600, 10);
        //     minutes = parseInt((timer % 3600) / 60, 10);
        //     seconds = parseInt(timer % 60, 10);

        //     hours = hours < 10 ? "0" + hours : hours;
        //     minutes = minutes < 10 ? "0" + minutes : minutes;
        //     seconds = seconds < 10 ? "0" + seconds : seconds;

        //     display.textContent = hours + ":" + minutes + ":" + seconds;

        //     if (--timer < 0) timer = duration;
        // }, 1000);

        setInterval(() => {
            const firstItem = feedList.querySelector('.feed_item');
            feedList.style.transition = 'margin-top 0.5s ease-in';
            feedList.style.marginTop = '-36px'; // 这里的数字要和 CSS 的 height 一致

            setTimeout(() => {
                feedList.style.transition = 'none';
                feedList.appendChild(firstItem);
                feedList.style.marginTop = '0';
            }, 500);
        }, 3500); // 稍微放慢滚动速度，字大了需要时间看清
    }
    const threeHours = 60 * 60 * 3;
    startTimer(threeHours, document.querySelector('#timer'));

    // 2. 动态语录滚动
    const feedList = document.querySelector('#feedList');
    setInterval(() => {
        const firstItem = feedList.querySelector('.feed_item');
        feedList.style.transition = 'margin-top 0.5s ease-in';
        feedList.style.marginTop = '-30px';

        setTimeout(() => {
            feedList.style.transition = 'none';
            feedList.appendChild(firstItem);
            feedList.style.marginTop = '0';
        }, 500);
    }, 3000);

    const card = document.getElementById('heroCard');
    const icon = document.querySelector('.parallax_icon');

    // 1. 3D 旋转逻辑 (加大旋转幅度)
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 这里的 10 和 15 是旋转倍数，数字越大效果越猛
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 25;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // 2. 视差位移逻辑 (让图标往鼠标相反方向动)
    const moveX = (x - centerX) / 10;
    const moveY = (y - centerY) / 10;
    icon.style.transform = `translate3d(${moveX}px, ${moveY}px, 50px) rotate(10deg)`;
});

// 鼠标离开还原
document.getElementById('heroCard').addEventListener('mouseleave', () => {
    const card = document.getElementById('heroCard');
    const icon = document.querySelector('.parallax_icon');
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    icon.style.transform = `translate3d(0, 0, 0) rotate(0deg)`;

    // 为专题卡片增加“光随指动”的微妙视觉感
    const colCards = document.querySelectorAll('.collection_card');

    colCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { left, top } = card.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            // 创建一个跟随鼠标的微弱光影
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.8) 0%, #ffffff 50%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '#ffffff';
        });
    });

    // 入场动画增强：让专题卡片从左侧滑入
    const colObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    colCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = 'all 0.8s ease-out';
        colObserver.observe(card);
    });

    // 为求书卡片增加微弱的入场动画和漂浮感
    const wishCards = document.querySelectorAll('.wish_card');

    const wishObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    wishCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        wishObserver.observe(card);
    });

    // 点击“我有此书”的模拟交互
    document.querySelectorAll('.btn_helper').forEach(btn => {
        btn.addEventListener('click', function () {
            this.innerHTML = '<i class="fas fa-check"></i> 已通知同学';
            this.style.color = '#10b981'; // 变成绿色
            this.style.pointerEvents = 'none';
        });
    });
});