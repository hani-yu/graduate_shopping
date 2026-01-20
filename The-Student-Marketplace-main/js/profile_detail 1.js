$(document).ready(function () {
    // 滚动动画效果
    function checkVisibility() {
        $('.detail-section').each(function () {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    // 初始检查
    checkVisibility();

    // 滚动时检查
    $(window).on('scroll', function () {
        checkVisibility();
    });

    // 卡片浮动动画
    setInterval(function () {
        $('.coupon-preview-card').toggleClass('animate__pulse');
    }, 3000);

    // 领取按钮点击效果
    $('.btn-claim').click(function () {
        const $btn = $(this);
        const originalText = $btn.html();

        // 添加点击动画
        $btn.addClass('animate__animated animate__pulse');
        $btn.html('<i class="fas fa-spinner fa-spin"></i> 领取中...');

        // 模拟领取过程
        setTimeout(function () {
            $btn.removeClass('animate__pulse');
            $btn.addClass('animate__bounceIn');
            $btn.html('<i class="fas fa-check"></i> 领取成功！');
            $btn.css('background', 'linear-gradient(135deg, var(--faq-teal), var(--faq-green))');

            // 更新状态
            $('.coupon-status').html('<i class="fas fa-check-circle" style="margin-right: 8px;"></i>已领取');

            // 3秒后恢复
            setTimeout(function () {
                $btn.removeClass('animate__bounceIn');
                $btn.html(originalText);
            }, 3000);
        }, 1500);
    });

    // 分享按钮点击效果
    $('.btn-share').click(function () {
        const $btn = $(this);
        $btn.addClass('animate__animated animate__tada');

        setTimeout(function () {
            $btn.removeClass('animate__tada');
            alert('分享功能即将开放，敬请期待！');
        }, 1000);
    });

    // 推荐卡片点击效果
    $('.recommend-btn').click(function () {
        $(this).addClass('animate__animated animate__headShake');

        setTimeout(function () {
            $('.recommend-btn').removeClass('animate__headShake');
        }, 1000);
    });

    // 页面加载时的入场动画
    setTimeout(function () {
        $('.coupon-preview-section').addClass('animate__fadeIn');
    }, 300);

    // 信息卡片悬停效果增强
    $('.info-card, .process-step, .courier-card, .recommend-card').hover(
        function () {
            $(this).addClass('animate__animated animate__pulse');
        },
        function () {
            $(this).removeClass('animate__pulse');
        }
    );


    // 新增：关键成就进度条
    function initAchievementProgress() {
        $('.login-failed').each(function () {
            const $row = $(this);
            const current = parseInt($row.data('current'), 10);
            const total = parseInt($row.data('total'), 10);
            const percent = Math.floor((current / total) * 100);

            const $fill = $row.find('.progress-fill');
            const $text = $row.find('.progress-text');

            // 动画填充进度条
            setTimeout(function () {
                $fill.css('width', percent + '%');
            }, 100);

            // 动态显示百分比
            let displayed = 0;
            const interval = setInterval(function () {
                if (displayed >= percent) {
                    clearInterval(interval);
                } else {
                    displayed++;
                    $text.text(displayed + '%');
                }
            }, 15);

            // 给旋转图标添加闪烁效果
            const $icon = $row.find('.status-failed i');
            setInterval(function () {
                $icon.fadeOut(200).fadeIn(200);
            }, 1000);
        });
    }

    // 调用初始化
    initAchievementProgress();
});