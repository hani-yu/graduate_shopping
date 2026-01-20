document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.product_item');
    const filterBtns = document.querySelectorAll('.filter_btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 切换按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterType = btn.getAttribute('data-type');

            cards.forEach(card => {
                const cardType = card.getAttribute('data-category');

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

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.top = '0';
                }, index * 100);
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

    const feedInner = document.querySelector('.feed_inner');
    if (feedInner) {
        setInterval(() => {
            const first = feedInner.children[0];
            feedInner.style.transition = "transform .5s ease";
            feedInner.style.transform = "translateY(-36px)";

            setTimeout(() => {
                feedInner.style.transition = "none";
                feedInner.appendChild(first);
                feedInner.style.transform = "translateY(0)";
            }, 500);
        }, 3000);
    }

    const card = document.getElementById('heroCard');
    const icon = document.querySelector('.parallax_icon');

    if (card && icon) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            icon.style.transform = `translate3d(${moveX}px, ${moveY}px, 50px) rotate(10deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            icon.style.transform = `translate3d(0, 0, 0) rotate(0deg)`;
        });
    }

    const colCards = document.querySelectorAll('.collection_card');

    colCards.forEach(card => {
        // 光随指动
        card.addEventListener('mousemove', (e) => {
            const { left, top } = card.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.8) 0%, #ffffff 50%)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '#ffffff';
        });

        // 入场动画
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = 'all 0.8s ease-out';
    });

    const colObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    colCards.forEach(card => colObserver.observe(card));

    const wishCards = document.querySelectorAll('.wish_card');

    wishCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });

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

    wishCards.forEach(card => wishObserver.observe(card));

    document.querySelectorAll('.btn_helper').forEach(btn => {
        btn.addEventListener('click', function () {
            this.innerHTML = '<i class="fas fa-check"></i> 已通知同学';
            this.style.color = '#10b981';
            this.style.pointerEvents = 'none';
        });
    });

    /** ====== 倒计时 ====== **/
    const timerDisplay = document.querySelector("#timer");
    if (timerDisplay) {
        startTimer(60 * 60 * 3, timerDisplay); // 3 小时
    }

}); // DOMContentLoaded 结束

/** ====== 倒计时函数 ====== **/
function startTimer(duration, display) {
    let timer = duration;

    const interval = setInterval(() => {
        let hours = Math.floor(timer / 3600);
        let minutes = Math.floor((timer % 3600) / 60);
        let seconds = Math.floor(timer % 60);

        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        display.textContent = `${hours}:${minutes}:${seconds}`;

        if (timer <= 0) {
            clearInterval(interval); // 倒计时结束
        } else {
            timer--;
        }
    }, 1000);
}
