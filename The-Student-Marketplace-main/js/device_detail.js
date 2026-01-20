<<<<<<< HEAD

$(document).ready(function () {

    /* 模块入场动画 —— 三段式动画
       进入时：淡入 → 上浮 → 轻缩放
   */
=======
// $(document).ready(function() {
    
//     // --- 1. 模块入场动画 (多元动画) ---
//     // 使用 Intersection Observer 实现随滚动逐个浮现
//     const observerOptions = { threshold: 0.1 };
//     const sectionObserver = new IntersectionObserver((entries) => {
//         entries.forEach((entry, index) => {
//             if (entry.isIntersecting) {
//                 // 设置阶梯延迟显现
//                 setTimeout(() => {
//                     $(entry.target).css({
//                         'opacity': '1',
//                         'transform': 'translateY(0)',
//                         'transition': 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)'
//                     });
//                 }, index * 150);
//                 sectionObserver.unobserve(entry.target);
//             }
//         });
//     }, observerOptions);

//     document.querySelectorAll('.management-section').forEach(section => {
//         sectionObserver.observe(section);
//     });


//     // --- 2. 设备“立即下线”交互 (多元 JS 效果) ---
//     $('.btn-warning').on('click', function() {
//         const $item = $(this).closest('.device-item');
//         const deviceName = $item.find('h3').text();
        
//         // 如果点击的是一键下线
//         if ($(this).closest('.batch-action-card').length > 0) {
//             $('#logoutAllDialog').fadeIn(300).css('display', 'flex');
//             return;
//         }

//         // 单个设备下线模拟
//         if(confirm(`确定要将设备 [${deviceName}] 强制下线吗？`)) {
//             // 播放一个“震动并消失”的动画
//             $item.addClass('animate__animated animate__headShake');
            
//             setTimeout(() => {
//                 $item.css({
//                     'transform': 'translateX(100px)',
//                     'opacity': '0',
//                     'transition': 'all 0.6s ease'
//                 });
//                 setTimeout(() => {
//                     $item.slideUp(400, () => {
//                         $item.remove();
//                         updateDeviceCount(); // 更新统计数字
//                     });
//                 }, 300);
//             }, 500);
//         }
//     });


//     // --- 3. 极客扫描反馈 (互动细节) ---
//     // 鼠标滑过设备时，模拟扫描线
//     $('.device-item').on('mouseenter', function() {
//         const $icon = $(this).find('.device-icon');
//         const scanLine = $('<div class="scan-line"></div>').css({
//             'position': 'absolute',
//             'top': '0', 'left': '0', 'width': '100%', 'height': '2px',
//             'background': 'var(--accent-gold)',
//             'box-shadow': '0 0 10px var(--accent-gold)',
//             'z-index': '5'
//         });
//         $icon.append(scanLine);
//         scanLine.animate({ top: '100%' }, 600, function() {
//             $(this).remove();
//         });
//     });


//     // --- 4. 实时统计更新 ---
//     function updateDeviceCount() {
//         const count = $('#online-devices .device-item').length;
//         $('.badge').text(`${count}台在线`).addClass('animate__animated animate__rubberBand');
//         setTimeout(() => $('.badge').removeClass('animate__animated animate__rubberBand'), 1000);
//     }

//     // 关闭弹窗
//     window.closeDialog = function() {
//         $('#logoutAllDialog').fadeOut(300);
//     }

//     window.confirmLogoutAll = function() {
//         $('.devices-list .device-item:not(.current)').each(function(i) {
//             $(this).delay(i * 150).fadeOut(500, function() {
//                 $(this).remove();
//                 updateDeviceCount();
//             });
//         });
//         closeDialog();
//         // 成功反馈
//         const toast = $('<div class="toast">所有远程设备已安全下线</div>').css({
//             'position': 'fixed', 'top': '20px', 'left': '50%', 'transform': 'translateX(-50%)',
//             'background': 'var(--deep-green)', 'color': 'white', 'padding': '12px 30px',
//             'border-radius': '50px', 'z-index': '2000', 'box-shadow': '0 10px 30px rgba(0,0,0,0.2)'
//         });
//         $('body').append(toast);
//         toast.delay(2000).fadeOut(500, function() { $(this).remove(); });
//     }
// });

$(document).ready(function () {

    /* -------------------------------
       1️⃣ 模块入场动画 —— 三段式动画
       进入时：淡入 → 上浮 → 轻缩放
    -------------------------------- */
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
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


<<<<<<< HEAD
    /* 小卡片浮现 —— 逐项延迟
    */
=======
    /* -------------------------------
       2️⃣ 小卡片浮现 —— 逐项延迟
    -------------------------------- */
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
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


<<<<<<< HEAD
    /*设备卡片 Hover 
     */
=======
    /* -------------------------------
       3️⃣ 设备卡片 Hover —— 科技感升级
       增加：轻倾斜 + 高光扫过
    -------------------------------- */
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    $(".device-item").on("mousemove", function (e) {
        const r = this.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        const centerX = r.width / 2;
        const centerY = r.height / 2;

        const rotateX = (y - centerY) / 18;
        const rotateY = (x - centerX) / 18;

        $(this).css({
<<<<<<< HEAD
            transform: `translateX(10px) scale(1.02) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
=======
            transform: `translateX(10px) scale(1.02) rotateX(${ -rotateX }deg) rotateY(${ rotateY }deg)`,
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
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


<<<<<<< HEAD
    /*  立即下线 
     */
=======
    /* -------------------------------
       4️⃣ 立即下线 交互升级
       增加：能量波 + 爆散消失
    -------------------------------- */
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
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


<<<<<<< HEAD
    /*  鼠标扫描线
     */
=======
    /* -------------------------------
       5️⃣ 鼠标扫描线保留 + 优化颜色
    -------------------------------- */
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    $(".device-item").on("mouseenter", function () {
        const scanLine = $('<div class="scan-line"></div>');
        $(this).find(".device-icon").append(scanLine);
        scanLine.animate({ top: "100%" }, 700, function () {
            $(this).remove();
        });
    });


<<<<<<< HEAD
    /* 数量更新动画  */
=======
    /* -------------------------------
       6️⃣ 数量更新动画 —— 弹跳变色
    -------------------------------- */
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
    function updateDeviceCount() {
        const count = $('#online-devices .device-item').length;
        const badge = $('.badge');
        badge.text(`${count}台在线`)
            .addClass('badge-pulse');

        setTimeout(() => badge.removeClass('badge-pulse'), 900);
    }


<<<<<<< HEAD
    /*  全部下线
     */
=======
    /* -------------------------------
       7️⃣ 全部下线动画增强
    -------------------------------- */
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
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

<<<<<<< HEAD

=======
    
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
});
