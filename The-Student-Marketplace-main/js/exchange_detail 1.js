$(document).ready(function() {

    // --- 交互 A: 博古价值动态天平 (Value Balance) ---
    // 逻辑：基于第一部分的对比区，模拟天平因价值差产生的实时倾斜动画
    function updateBalance() {
        const leftValue = 150; // 模拟苏同学的资料价
        const rightValue = 180; // 模拟雅思资料价
        const diff = rightValue - leftValue;
        
        // 计算倾斜角度 (最高不超过15度)
        const angle = Math.min(Math.max(diff / 5, -15), 15);
        
        $('.compare-arrow i').css({
            'transform': `rotate(${angle}deg)`,
            'transition': 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
        });

        // 差价文字跳动效果
        $({ val: 0 }).animate({ val: diff }, {
            duration: 2000,
            step: function() {
                $('.value-diff span').text("价值差：约¥" + Math.floor(this.val));
            }
        });
    }


    // --- 交互 B: 薪火传承路径图 (Heritage Path) ---
    // 逻辑：在进度区，点击时间线节点，模拟资料在校友间流转的光效
    $('.timeline-item').on('mouseenter', function() {
        $(this).find('.timeline-dot').css({
            'box-shadow': '0 0 20px #f59e0b',
            'transform': 'scale(1.5)'
        });
        
        // 生成粒子光效随鼠标滑动
        createParticles(this);
    });

    function createParticles(element) {
        const particle = $('<div class="heritage-spark"></div>').css({
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: '#f59e0b',
            borderRadius: '50%',
            left: '50%',
            top: '50%'
        });
        $(element).append(particle);
        particle.animate({
            top: '-50px',
            opacity: 0
        }, 800, function() { $(this).remove(); });
    }


    // --- 交互 C: 信用雷达数据解析 (Trust Radar) ---
    // 逻辑：将原本死板的信誉数据转化为动态的“扫描”质感
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            $('.stat-value').each(function() {
                const target = parseInt($(this).text());
                $({ count: 0 }).animate({ count: target }, {
                    duration: 1500,
                    step: function() {
                        if(target > 10) $(this).text(Math.floor(this.count)); 
                    }
                });
            });
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(document.querySelector('.rating-display'));


    // --- 交互 D: 智能匹配气泡提醒 (Smart Bubble) ---
    // 逻辑：模拟系统在后台“扫描”了用户的背包，弹出的惊喜提醒
    setTimeout(function() {
        $('.match-hint').addClass('animate__animated animate__bounceIn');
        
        // 动态打字机效果显示匹配结果
        const hintText = "智能匹配：发现您背包中的《托福》可补差价交换！";
        const hintSpan = $('.match-hint span');
        hintSpan.text("");
        let i = 0;
        const timer = setInterval(() => {
            hintSpan.text(hintSpan.text() + hintText[i]);
            i++;
            if (i >= hintText.length) clearInterval(timer);
        }, 50);
    }, 2000);


    // --- 按钮交互逻辑 ---
    $('.btn-primary').on('click', function() {
        $(this).html('<i class="fas fa-spinner fa-spin"></i> 发起中...');
        setTimeout(() => {
            alert('交换请求已送达苏同学！请在“个人中心-我的申请”中查看进度。');
            $(this).html('<i class="fas fa-check"></i> 已申请');
        }, 1500);
    });

    // 初始化天平
    updateBalance();


        // ============================================
    // 效果1: 胶囊自动避让逻辑 (解决与 Footer 冲突)
    // ============================================
    $(window).scroll(function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        var footerHeight = $('.footer_area').outerHeight();

        // 当滚动到距离底部还有 footer 高度时，隐藏胶囊
        if ((scrollHeight - scrollPosition) < footerHeight) {
            $('.action-footer').addClass('hide-on-bottom');
        } else {
            $('.action-footer').removeClass('hide-on-bottom');
        }
    });

    // ============================================
    // 效果2: 智能匹配“数字心跳”与“打字机”
    // ============================================
    function initSmartHint() {
        const $percentSpan = $('.hint-content span');
        const fullText = "您拥有的《考研英语真题精解》与本交换匹配度 ";
        const targetPercent = 79;
        
        // 打字机效果
        $percentSpan.text("");
        let i = 0;
        const typing = setInterval(() => {
            if (i < fullText.length) {
                $percentSpan.append(fullText[i]);
                i++;
            } else {
                clearInterval(typing);
                // 数字滚动效果
                $({count: 0}).animate({count: targetPercent}, {
                    duration: 1000,
                    step: function() {
                        $('.match-percent').text(Math.floor(this.count) + "%");
                    },
                    complete: function() {
                        $('.match-percent').addClass('animate__animated animate__pulse animate__infinite');
                    }
                });
            }
        }, 30);
    }

    $('.hint-content span').html('正在扫描匹配项...');
    setTimeout(initSmartHint, 1000);

    
    // ============================================
    // 效果3: 按钮多重交互 (波纹与状态切换)
    // ============================================
    
    // 我有意向按钮 - 点击状态
    $('.btn-primary').on('click', function() {
        const $btn = $(this);
        $btn.html('<i class="fas fa-circle-notch fa-spin"></i> 处理中...');
        
        setTimeout(() => {
            $btn.css('background', '#10b981').html('<i class="fas fa-check"></i> 意向已发送');
            // 触发一个小的成功特效（如震动）
            $btn.addClass('animate__animated animate__rubberBand');
        }, 1200);
    });

    // 关注按钮 - 切换收藏
    $('.btn-favorite').on('click', function() {
        $(this).toggleClass('is-active');
        const icon = $(this).find('i');
        if($(this).hasClass('is-active')) {
            icon.removeClass('far').addClass('fas').css('color', '#f87171');
        } else {
            icon.removeClass('fas').addClass('far').css('color', '#fff');
        }
    });

    // ============================================
    // 效果4: 鼠标悬浮视差位移
    // ============================================
    $('.action-footer').on('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = (x - rect.width/2) / 40;
        const dy = (y - rect.height/2) / 10;
        
        $(this).css('transform', `translateX(calc(-50% + ${dx}px)) translateY(${dy}px)`);
    });

    $('.action-footer').on('mouseleave', function() {
        $(this).css('transform', `translateX(-50%) translateY(0)`);
    });
});