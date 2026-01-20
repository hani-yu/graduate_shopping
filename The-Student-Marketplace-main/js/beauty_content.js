// beauty_effects.js - 简化版交互效果

$(document).ready(function () {

  console.log('拾光容颜·悦己锦盒页面加载完成');

  // ===== 1. 用户反馈卡片轮播 =====
  function initReviewCarousel() {
    const $reviewsContainer = $('.swatch-reviews');
    const $reviewCards = $('.review-card');

    if ($reviewCards.length === 0) return;

    // 创建轮播容器
    const $carouselContainer = $('<div class="review-carousel-container"></div>');
    const $carouselTrack = $('<div class="review-carousel-track"></div>');

    // 复制卡片以创建连续滚动效果
    $reviewCards.each(function (index) {
      const $card = $(this).clone().addClass('review-carousel-card');
      $carouselTrack.append($card);
    });

    // 再复制一次，实现无缝滚动
    $reviewCards.each(function (index) {
      const $card = $(this).clone().addClass('review-carousel-card');
      $carouselTrack.append($card);
    });

    $carouselContainer.append($carouselTrack);
    $reviewsContainer.html($carouselContainer);

    // 设置轮播参数
    const cardHeight = $reviewCards.outerHeight(true) + 20; // 卡片高度 + 间距
    const totalCards = $reviewCards.length * 2; // 双倍卡片
    let currentPosition = 0;
    let autoScrollInterval;

    // 开始自动滚动
    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        currentPosition--;

        // 如果滚动到一半，重置到开始位置
        if (currentPosition <= -($reviewCards.length * cardHeight)) {
          currentPosition = 0;
          $carouselTrack.css('transition', 'none');
          $carouselTrack.css('transform', `translateY(${currentPosition}px)`);

          // 强制重绘
          $carouselTrack.height();

          // 恢复过渡效果
          setTimeout(() => {
            $carouselTrack.css('transition', 'transform 0.5s ease');
          }, 50);
        } else {
          $carouselTrack.css('transform', `translateY(${currentPosition}px)`);
        }
      }, 3000); // 每3秒滚动一次
    }

    // 初始化样式
    $carouselContainer.css({
      'height': cardHeight * 2 + 'px', // 显示两张卡片的高度
      'overflow': 'hidden',
      'position': 'relative'
    });

    $carouselTrack.css({
      'transition': 'transform 0.5s ease',
      'position': 'relative'
    });

    $('.review-carousel-card').css({
      'margin-bottom': '20px'
    });

    // 添加悬停暂停功能
    $carouselContainer.hover(
      function () {
        clearInterval(autoScrollInterval);
      },
      function () {
        startAutoScroll();
      }
    );

    // 开始轮播
    startAutoScroll();

    console.log('用户反馈轮播初始化完成，共 ' + $reviewCards.length + ' 张卡片');
  }

  // ===== 2. 成分百科轮播 =====
  function initIngredientCarousel() {
    const $ingredientButtons = $('.ingredient-btn');
    const $ingredientDetail = $('#ingredientDetail');

    if ($ingredientButtons.length === 0) return;

    // 成分数据
    const ingredients = {
      vitaminc: {
        name: '维生素C (维C)',
        type: '抗氧化 · 美白',
        effects: '抗氧化、提亮肤色、促进胶原蛋白生成',
        skinType: '所有肤质（敏感肌建议建立耐受）',
        usage: '白天使用需配合防晒，晚间使用效果更佳',
        notes: '避免与烟酰胺、水杨酸等高浓度酸类同时使用',
        products: ['倩碧维C精华', '科颜氏淡斑精华', '修丽可CE精华']
      },
      hyaluronic: {
        name: '玻尿酸 (透明质酸)',
        type: '保湿 · 锁水',
        effects: '强力保湿、锁水、填充细纹',
        skinType: '所有肤质，特别适合干性皮肤',
        usage: '早晚使用，洁面后第一步，配合封闭性产品锁水',
        notes: '分子量不同效果不同，大分子表面保湿，小分子深层补水',
        products: ['太阳社玻尿酸原液', '修丽可B5精华', '薇姿89精华']
      },
      retinol: {
        name: '视黄醇 (A醇)',
        type: '抗老 · 淡纹',
        effects: '促进胶原蛋白、淡化细纹、改善毛孔',
        skinType: '耐受皮，干性、油性均可（敏感肌慎用）',
        usage: '晚间使用，从低浓度开始建立耐受',
        notes: '孕期哺乳期禁用，需严格防晒',
        products: ['露得清A醇晚霜', '理肤泉A醇精华', 'Murad视黄醇精华']
      },
      niacinamide: {
        name: '烟酰胺 (维生素B3)',
        type: '控油 · 美白',
        effects: '控油、美白、修复屏障、抗炎',
        skinType: '所有肤质，特别适合油性痘痘肌',
        usage: '早晚使用，可搭配多种成分',
        notes: '少数人可能不耐受，建议从低浓度开始',
        products: ['Olay小白瓶', 'The Ordinary烟酰胺精华', 'SK-II小灯泡']
      },
      salicylic: {
        name: '水杨酸 (BHA)',
        type: '祛痘 · 清洁',
        effects: '溶解油脂、清洁毛孔、抗炎祛痘',
        skinType: '油性、混合性、痘痘肌（干敏皮慎用）',
        usage: '局部点涂或每周2-3次全脸使用',
        notes: '使用后注意保湿防晒，避免与其他酸类叠加',
        products: ['宝拉珍选水杨酸', 'Stridex水杨酸棉片', '理肤泉K乳']
      }
    };

    let currentIndex = 0;
    const ingredientKeys = Object.keys(ingredients);
    let autoSwitchInterval;

    // 更新成分显示
    function updateIngredient(ingredientKey) {
      const ingredient = ingredients[ingredientKey];

      // 更新按钮状态
      $ingredientButtons.removeClass('active');
      $ingredientButtons.filter(`[data-ingredient="${ingredientKey}"]`).addClass('active');

      // 更新详情内容
      $ingredientDetail.find('h4').text(ingredient.name);
      $ingredientDetail.find('.ingredient-type').text(ingredient.type);

      const $content = $ingredientDetail.find('.detail-content');
      $content.html(`
        <p><strong>主要功效：</strong>${ingredient.effects}</p>
        <p><strong>适合肤质：</strong>${ingredient.skinType}</p>
        <p><strong>使用建议：</strong>${ingredient.usage}</p>
        <p><strong>注意事项：</strong>${ingredient.notes}</p>
      `);

      // 更新产品标签
      const $productTags = $ingredientDetail.find('.product-tags');
      $productTags.empty();

      ingredient.products.forEach(product => {
        $productTags.append(`<span class="product-tag">${product}</span>`);
      });

      // 添加动画效果
      $ingredientDetail.css({
        'opacity': '0',
        'transform': 'translateY(10px)'
      });

      setTimeout(() => {
        $ingredientDetail.css({
          'opacity': '1',
          'transform': 'translateY(0)',
          'transition': 'all 0.3s ease'
        });
      }, 10);
    }

    // 自动切换到下一个成分
    function nextIngredient() {
      currentIndex = (currentIndex + 1) % ingredientKeys.length;
      updateIngredient(ingredientKeys[currentIndex]);
    }

    // 开始自动轮播
    function startIngredientCarousel() {
      autoSwitchInterval = setInterval(nextIngredient, 4000); // 每4秒切换一次
    }

    // 点击按钮切换成分
    $ingredientButtons.on('click', function () {
      const ingredientKey = $(this).data('ingredient');
      currentIndex = ingredientKeys.indexOf(ingredientKey);
      updateIngredient(ingredientKey);

      // 重置自动轮播
      clearInterval(autoSwitchInterval);
      startIngredientCarousel();
    });

    // 添加悬停暂停功能
    $('.ingredient-selector').hover(
      function () {
        clearInterval(autoSwitchInterval);
      },
      function () {
        startIngredientCarousel();
      }
    );

    // 初始化第一个成分
    updateIngredient(ingredientKeys[currentIndex]);

    // 开始自动轮播
    startIngredientCarousel();

    console.log('成分百科轮播初始化完成，共 ' + ingredientKeys.length + ' 种成分');
  }


  // ===== 4. 页面加载动画 =====
  function initPageAnimations() {
    // 模块渐入动画
    $('.module').each(function (index) {
      $(this).css({
        'opacity': '0',
        'transform': 'translateY(20px)'
      });

      setTimeout(() => {
        $(this).css({
          'opacity': '1',
          'transform': 'translateY(0)',
          'transition': 'all 0.6s ease'
        });
      }, index * 100);
    });

    // Hero区域动画
    setTimeout(() => {
      $('.hero_content').css({
        'opacity': '1',
        'transform': 'translateY(0)',
        'transition': 'all 0.8s ease'
      });
    }, 300);
  }

  // ===== 初始化所有功能 =====
  initPageAnimations();
  initReviewCarousel();
  initIngredientCarousel();
  initSimpleInteractions();

  // 添加一些样式到页面
  addCustomStyles();
});

// 遍历每一个进度条容器
$('.progress-fill').each(function () {
  var $this = $(this);
  var targetWidth = $this.attr('style').match(/width:\s*(\d+)%/)[1]; // 读取目标百分比
  $this.css('width', '0%'); // 初始宽度为0

  // 动画增长到目标宽度
  $({ width: 0 }).animate({ width: targetWidth }, {
    duration: 1500, // 动画持续时间1.5秒
    easing: 'swing',
    step: function (now) {
      $this.css('width', now + '%');
      // 同步更新右侧百分比数字
      $this.closest('.progress-container').find('.progress-value').text(Math.round(now) + '%');
    }
  });
});

// ===== 5. 添加自定义样式 =====
function addCustomStyles() {
  const style = `
    <style>
      /* 用户反馈轮播样式 */
      .review-carousel-container {
        position: relative;
        border-radius: 12px;
        background: linear-gradient(135deg, #fff5f7, #fff);
        padding: 15px;
        box-shadow: 0 4px 12px rgba(255, 107, 157, 0.08);
      }
      
      .review-carousel-track {
        will-change: transform;
      }
      
      .review-carousel-card {
        background: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        border-left: 4px solid #ff6b9d;
      }
      
      /* 肤质测试结果样式 */
      .skin-test-result {
        background: white;
        border-radius: 10px;
        padding: 20px;
        margin-top: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        animation: fadeIn 0.5s ease;
      }
      
      .skin-test-result h5 {
        color: #333;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }
      
      .skin-test-result p {
        margin-bottom: 10px;
        color: #666;
      }
      
      .btn-close-test {
        background: #ff6b9d;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        margin-top: 10px;
        transition: all 0.3s;
      }
      
      .btn-close-test:hover {
        background: #e0558c;
        transform: translateY(-2px);
      }
      
      /* 成分切换动画 */
      .ingredient-detail {
        transition: all 0.3s ease !important;
      }
      
      /* 页面加载完成动画 */
      .hero_content {
        opacity: 0;
        transform: translateY(-20px);
      }
      
      /* 简单动画 */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      /* 悬停效果增强 */
      .beauty-item:hover .item-image {
        transform: scale(1.03);
        transition: transform 0.5s ease;
      }
      
      .warning-card:hover .warning-icon {
        transform: rotate(10deg) scale(1.1);
        transition: transform 0.3s ease;
      }
      
      /* 按钮涟漪效果 */
      .btn-skin-test, .btn-view-detail, .btn-buy-package {
        position: relative;
        overflow: hidden;
      }
      
      .btn-skin-test:active::after,
      .btn-view-detail:active::after,
      .btn-buy-package:active::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%);
        transform-origin: 50% 50%;
      }
      
      .btn-skin-test:active::after,
      .btn-view-detail:active::after,
      .btn-buy-package:active::after {
        animation: ripple 1s ease-out;
      }
      
      @keyframes ripple {
        0% {
          transform: scale(0, 0);
          opacity: 0.5;
        }
        100% {
          transform: scale(40, 40);
          opacity: 0;
        }
      }
    </style>
  `;

  $('head').append(style);
}