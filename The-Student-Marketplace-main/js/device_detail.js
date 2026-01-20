
$(document).ready(function () {

    /* 模块入场动画 —— 三段式动画
       进入时：淡入 → 上浮 → 轻缩放
   */
    const observerOptions = { threshold: 0.15 };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const el = $(entry.target);

                // 设定多阶段效果
                setTimeout(() => {
                    el.css({
                        opacity: '1',
                        transform: 'translateY(0) scale(1)',
                        filter: 'blur(0px)',
                        transition:
                            'opacity .9s ease, transform 1s cubic-bezier(.2,1,.22,1), filter .8s ease'
                    });
                }, index * 180);

                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.management-section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(45px) scale(.96)";
        section.style.filter = "blur(4px)";
        sectionObserver.observe(section);
    });


    /* 小卡片浮现 —— 逐项延迟
    */
    function revealItems(selector) {
        const items = document.querySelectorAll(selector);
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        $(entry.target).addClass("card-reveal");
                    }, i * 120);
                    itemObserver.unobserve(entry.target);
                }
            });
        });
        items.forEach(i => itemObserver.observe(i));
    }

    revealItems(".trusted-card");
    revealItems(".policy-mini-card");
    revealItems(".batch-mini-card");


    /*设备卡片 Hover 
     */
    $(".device-item").on("mousemove", function (e) {
        const r = this.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        const centerX = r.width / 2;
        const centerY = r.height / 2;

        const rotateX = (y - centerY) / 18;
        const rotateY = (x - centerX) / 18;

        $(this).css({
            transform: `translateX(10px) scale(1.02) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform .2s ease-out"
        });

        // 光带
        $(this).find(".device-icon").css({
            background: `radial-gradient(circle at ${x}px ${y}px,
                rgba(13,148,136,.35),
                rgba(13,148,136,.05))`
        });
    });

    $(".device-item").on("mouseleave", function () {
        $(this).css({
            transform: "translateX(0) scale(1)",
        });
    });


    /*  立即下线 
     */
    $('.btn-warning').on('click', function () {
        const $item = $(this).closest('.device-item');
        const deviceName = $item.find('h3').text();

        if ($(this).closest('.batch-action-card').length > 0) {
            $('#logoutAllDialog').fadeIn(300).css('display', 'flex');
            return;
        }

        if (confirm(`确定要将设备 [${deviceName}] 强制下线吗？`)) {

            // 能量波
            const boom = $('<span class="energy-boom"></span>');
            $item.append(boom);
            setTimeout(() => boom.remove(), 600);

            // 爆散 → 消失
            setTimeout(() => {
                $item.css({
                    transform: "scale(.8) translateX(80px)",
                    opacity: "0",
                    filter: "blur(4px)",
                    transition: "all .55s cubic-bezier(.4,1,.6,1)"
                });

                setTimeout(() => {
                    $item.slideUp(350, () => {
                        $item.remove();
                        updateDeviceCount();
                    });
                }, 380);
            }, 260);
        }
    });


    /*  鼠标扫描线
     */
    $(".device-item").on("mouseenter", function () {
        const scanLine = $('<div class="scan-line"></div>');
        $(this).find(".device-icon").append(scanLine);
        scanLine.animate({ top: "100%" }, 700, function () {
            $(this).remove();
        });
    });


    /* 数量更新动画  */
    function updateDeviceCount() {
        const count = $('#online-devices .device-item').length;
        const badge = $('.badge');
        badge.text(`${count}台在线`)
            .addClass('badge-pulse');

        setTimeout(() => badge.removeClass('badge-pulse'), 900);
    }


    /*  全部下线
     */
    window.closeDialog = function () {
        $('#logoutAllDialog').fadeOut(300);
    }

    window.confirmLogoutAll = function () {

        $('.devices-list .device-item:not(.current)').each(function (i) {
            $(this).delay(i * 120).css({
                transform: "scale(.8) translateY(-20px)",
                opacity: "0",
                transition: "all .6s cubic-bezier(.16,.84,.44,1)"
            }).fadeOut(450, function () {
                $(this).remove();
                updateDeviceCount();
            });
        });

        closeDialog();

        // Toast ✔
        const toast = $('<div class="toast">所有远程设备已安全下线</div>').css({
            position: 'fixed',
            top: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--deep-green)',
            color: 'white',
            padding: '12px 34px',
            borderRadius: '60px',
            zIndex: '2000',
            boxShadow: '0 10px 30px rgba(0,0,0,.25)',
            opacity: 0
        });

        $('body').append(toast);
        toast.animate({ opacity: 1, top: "28px" }, 300)
            .delay(2200)
            .fadeOut(500, function () {
                $(this).remove();
            });
    }


});
