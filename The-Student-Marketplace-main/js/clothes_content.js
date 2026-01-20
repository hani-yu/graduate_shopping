$(document).ready(function() {
    
    // ============================================
    // 效果1: 尺码魔方 - 动态人体形态模拟
    // ============================================
    function updateBodyVisualization() {
        const height = $('#heightSlider').val();
        const weight = $('#weightSlider').val();
        
        // 更新数值显示
        $('#heightValue, #visualHeight').text(height);
        $('#weightValue, #visualWeight').text(weight);
        
        // 核心交互：根据身高体重计算身材比例，实时调整预览图
        // 模拟计算 BMI 后的视觉形变
        const bmi = weight / ((height/100) * (height/100));
        let scaleX = 0.8 + (bmi / 40); // 宽度受体重影响
        let scaleY = 0.7 + (height / 200); // 高度受身高影响
        
        $('#mannequinBase').css({
            'transform': `scale(${scaleX}, ${scaleY})`,
            'filter': `hue-rotate(${bmi * 2}deg)`
        });

        // 智能尺码计算
        let size = "M";
        if (bmi > 24) size = "L/XL";
        else if (bmi < 18) size = "S";
        $('#recommendedSize').text(size);
        $('#matchRate').text(Math.floor(98 - Math.abs(22-bmi)*2) + "%");
    }

    $('#heightSlider, #weightSlider').on('input', updateBodyVisualization);
    updateBodyVisualization(); // 初始化


    // ============================================
    // 效果2: 真人试穿 - 丝滑叠层系统
    // ============================================
    $('.outfit-item').on('click', function() {
        $('.outfit-item').removeClass('active');
        $(this).addClass('active');

        const outfitType = $(this).data('outfit');
        const desc = $(this).data('desc');
        
        // 1. 模拟衣物切场动画
        $('#outfitOverlay').fadeOut(200, function() {
            // 这里换成对应的衣物PNG贴图
            $(this).css({
                'background': `url('images/clothes/${outfitType}.png') center/contain no-repeat`,
                'display': 'block',
                'height': '100%',
                'width': '100%',
                'position': 'absolute',
                'top': '0',
                'z-index': '5'
            }).fadeIn(400);
        });

        // 2. 数据条动效
        $('.stat-fill').each(function() {
            const val = $(this).data('value');
            $(this).animate({ 'width': val + '%' }, 800);
        });

        $('#outfitInfo p').fadeOut(200, function() {
            $(this).text(desc).fadeIn();
        });
    });


    // ============================================
    // 效果3: 面料显微镜 - Canvas 局部放大效果
    // ============================================
    $('.image-zoom').on('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        $(this).css('background-position', `${x}% ${y}%`);
    });

    $('.btn-view-detail').on('click', function() {
        $('#fabricViewer').fadeIn().css('display', 'flex');
        // 模拟加载面料数据
        const itemName = $(this).closest('.clothing-info').find('h3').text();
        $('#fabricName').text(itemName + " - 经纬密度分析");
    });

    $('.btn-close-viewer').on('click', function() {
        $('#fabricViewer').fadeOut();
    });


    // ============================================
    // 效果4: 闲置回收 - 碳减排实时看板
    // ============================================
    function animateStats() {
        $('.stat-value').each(function() {
            const $this = $(this);
            const target = parseInt($this.text().replace(',', ''));
            $({ count: 0 }).animate({ count: target }, {
                duration: 2000,
                step: function() {
                    $this.text(Math.floor(this.count).toLocaleString());
                }
            });
        });
    }

    // 交叉观察器：当滚动到回收盒时启动数字动画
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateStats();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.recycle-box'));

});