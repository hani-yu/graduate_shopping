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

    // -------------------- 流程步骤动画 --------------------
    function animateProcessSteps() {
        $('.process-step').each(function (index) {
            const stepTop = $(this).offset().top;
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();

            // 当步骤进入视口 80% 时触发动画
            if (stepTop < scrollTop + windowHeight * 0.8 && !$(this).hasClass('step-visible')) {
                $(this).addClass('step-visible animate__animated animate__fadeInUp');

                // 延迟添加连接线生长效果
                setTimeout(() => {
                    $(this).find('.step-number').css({
                        'background': 'linear-gradient(135deg, var(--faq-teal), var(--faq-green))',
                        'color': '#fff',
                        'box-shadow': '0 4px 12px rgba(0,0,0,0.15)'
                    });

                    // 动态绘制箭头连接线
                    if (index < $('.process-step').length - 1) {
                        const nextStep = $('.process-step').eq(index + 1);
                        const line = $('<div class="step-line"></div>').appendTo($(this));
                        line.animate({ height: nextStep.offset().top - $(this).offset().top - $(this).outerHeight() + 10 }, 800);
                    }
                }, index * 300);
            }
        });
    }

    // 初始触发
    animateProcessSteps();

    // 滚动触发
    $(window).on('scroll', animateProcessSteps);

    // -------------------- 当前步骤高亮 --------------------
    function highlightCurrentStep() {
        const scrollTop = $(window).scrollTop();
        $('.process-step').each(function () {
            const stepTop = $(this).offset().top;
            const stepBottom = stepTop + $(this).outerHeight();

            if (scrollTop + 100 >= stepTop && scrollTop + 100 < stepBottom) {
                $(this).addClass('current-step');
            } else {
                $(this).removeClass('current-step');
            }
        });
    }

    $(window).on('scroll', highlightCurrentStep);
    highlightCurrentStep();

    // -------------------- 完成步骤动画 --------------------
    $('.btn-claim').click(function () {
        const $btn = $(this);
        setTimeout(function () {
            $('.process-step').each(function (i) {
                const stepNumber = $(this).find('.step-number');
                stepNumber.css({
                    'background': 'linear-gradient(135deg, var(--faq-gold), var(--faq-orange))',
                    'color': '#fff'
                }).addClass('animate__animated animate__rubberBand');
            });
        }, 1500); // 同步领取成功动画
    });

    // -------------------- 信息卡片翻转效果 --------------------
    $('.info-card, .courier-card, .recommend-card').each(function () {
        const card = $(this);
        card.wrap('<div class="card-container"></div>'); // 外层容器用于3D翻转

        const backContent = $('<div class="card-back"></div>').html('<p style="padding:10px;color:#fff;font-size:14px;">更多详情请查看平台说明</p>');
        card.after(backContent);

        card.parent().hover(
            function () {
                $(this).addClass('flipped');
            },
            function () {
                $(this).removeClass('flipped');
            }
        );
    });

});

document.querySelectorAll('.step-item, .process-step').forEach(step => {
    step.addEventListener('mouseenter', () => step.style.transform += ' translateY(-5px)');
    step.addEventListener('mouseleave', () => step.style.transform = step.style.transform.replace(' translateY(-5px)', ''));
});
document.querySelectorAll('.step-item, .process-step').forEach(step => {
    step.addEventListener('click', () => {
        step.classList.add('animate__animated', 'animate__flash');
        setTimeout(() => step.classList.remove('animate__flash'), 800);
    });
});
