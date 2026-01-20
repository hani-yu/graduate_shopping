<<<<<<< HEAD
=======
// news_detail.js - 新闻详情页面交互效果

>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
$(document).ready(function () {

  console.log('新闻详情页面加载完成');

  // ===== 初始化AOS动画 =====
  AOS.init({
    duration: 800,
    once: true,
    offset: 100
  });

  // ===== 常见问题折叠功能 =====
  function initFAQ() {
    const $faqItems = $('.faq-item');

    $faqItems.on('click', function () {
      const $this = $(this);
      const $answer = $this.find('.faq-answer');
      const $toggleIcon = $this.find('.faq-toggle i');

      // 如果当前是展开状态，则关闭
      if ($this.hasClass('active')) {
        $answer.css('max-height', '0');
        $this.removeClass('active');
        $toggleIcon.removeClass('fa-minus').addClass('fa-plus');
      } else {
        // 关闭其他所有FAQ
        $faqItems.removeClass('active');
        $faqItems.find('.faq-answer').css('max-height', '0');
        $faqItems.find('.faq-toggle i').removeClass('fa-minus').addClass('fa-plus');

        // 展开当前FAQ
        $this.addClass('active');
        $answer.css('max-height', $answer[0].scrollHeight + 'px');
        $toggleIcon.removeClass('fa-plus').addClass('fa-minus');
      }
    });

    // 默认展开第一个FAQ
    $faqItems.first().addClass('active').find('.faq-answer').css('max-height', '1000px');
    $faqItems.first().find('.faq-toggle i').removeClass('fa-plus').addClass('fa-minus');

    console.log('FAQ折叠功能初始化完成');
  }

  // ===== 表单交互效果 =====
  function initFormInteractions() {
    // 文件上传区域效果
    const $uploadArea = $('.upload-area');

    $uploadArea.on('click', function () {
      alert('文件上传功能\n\n在完整版本中，这里将实现真实的文件上传功能，支持多图上传、预览和删除。');
    });

    $uploadArea.on('dragover', function (e) {
      e.preventDefault();
      $(this).css({
        'border-color': '#3498db',
        'background': 'rgba(52, 152, 219, 0.1)'
      });
    });

    $uploadArea.on('dragleave', function () {
      $(this).css({
        'border-color': '#e9ecef',
        'background': '#f8f9fa'
      });
    });

    // 表单提交
    $('.submit-btn').on('click', function (e) {
      e.preventDefault();

      const $btn = $(this);
      const originalText = $btn.html();

      // 添加加载效果
      $btn.html('<i class="fas fa-spinner fa-spin"></i> 提交中...');
      $btn.prop('disabled', true);

      // 模拟提交过程
      setTimeout(() => {
        alert('预约提交成功！\n\n我们的工作人员将在1个工作日内通过电话与您联系确认具体上门时间。\n\n请保持手机畅通！');

        // 恢复按钮状态
        $btn.html(originalText);
        $btn.prop('disabled', false);

<<<<<<< HEAD
        // 清空表单
=======
        // 清空表单（模拟）
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
        $('.form-preview-input, .form-preview-textarea, .form-preview-select').val('');
      }, 1500);
    });

    // 输入框聚焦效果
    $('.form-preview-input, .form-preview-textarea, .form-preview-select').on('focus', function () {
      $(this).css({
        'border-color': '#3498db',
        'box-shadow': '0 0 0 3px rgba(52, 152, 219, 0.1)'
      });
    }).on('blur', function () {
      $(this).css({
        'border-color': '#e9ecef',
        'box-shadow': 'none'
      });
    });

    console.log('表单交互效果初始化完成');
  }

  // ===== 时间轴动画效果 =====
  function initTimelineEffects() {
    const $timelineItems = $('.timeline-item');

    // 添加滚动监听
    $(window).on('scroll', function () {
      $timelineItems.each(function () {
        const $item = $(this);
        const itemTop = $item.offset().top;
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        if (itemTop < scrollTop + windowHeight - 100) {
          $item.addClass('visible');
        }
      });
    });

    // 触发一次滚动事件
    $(window).trigger('scroll');

    console.log('时间轴动画效果初始化完成');
  }

  // ===== 类别卡片悬停效果 =====
  function initCategoryHover() {
    const $categoryCards = $('.category-card');

    $categoryCards.on('mouseenter', function () {
      const $icon = $(this).find('.category-icon');
      $icon.css({
        'transform': 'scale(1.1) rotate(5deg)',
        'transition': 'transform 0.3s ease'
      });
    }).on('mouseleave', function () {
      const $icon = $(this).find('.category-icon');
      $icon.css({
        'transform': 'scale(1) rotate(0deg)',
        'transition': 'transform 0.3s ease'
      });
    });
  }

  // ===== 时间轴动画效果 =====
  function initTimelineEffects() {
    const $timelineItems = $('.timeline-item');

    // 初始化位置和透明度
    $timelineItems.each(function (index) {
      $(this).css({
        'opacity': 0,
        'transform': index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)',
        'transition': 'all 0.6s ease'
      });
    });

    // 添加滚动监听
    $(window).on('scroll', function () {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();

      $timelineItems.each(function (index) {
        const $item = $(this);
        const itemTop = $item.offset().top;

        if (!$item.hasClass('visible') && itemTop < scrollTop + windowHeight - 100) {
          $item.addClass('visible');

          // 延迟动画实现错落效果
          setTimeout(() => {
            $item.css({
              'opacity': 1,
              'transform': 'translateX(0)'
            });
          }, index * 150);
        }
      });
    });

    // 触发一次滚动事件
    $(window).trigger('scroll');

    console.log('时间轴动画效果初始化完成');
  }


  // ===== 相关服务卡片效果 =====
  function initServiceCards() {
    const $serviceCards = $('.service-card');
    const $serviceLinks = $('.service-link');

    $serviceCards.on('mouseenter', function () {
      $(this).find('.service-icon').css({
        'transform': 'rotate(15deg) scale(1.1)',
        'transition': 'transform 0.4s ease'
      });
    }).on('mouseleave', function () {
      $(this).find('.service-icon').css({
        'transform': 'rotate(0deg) scale(1)',
        'transition': 'transform 0.4s ease'
      });
    });

    $serviceLinks.on('click', function (e) {
      e.preventDefault();
      const serviceName = $(this).closest('.service-card').find('h3').text();
      alert(`查看 ${serviceName} 详情\n\n完整版本将跳转到对应服务页面`);
    });
  }

<<<<<<< HEAD
=======
  // ===== 页面加载进度模拟 =====
  // function initPageProgress() {
  //   const $readingProgress = $('<div class="reading-progress"></div>');
  //   $('body').append($readingProgress);

  //   $(window).on('scroll', function() {
  //     const scrollTop = $(window).scrollTop();
  //     const docHeight = $(document).height();
  //     const winHeight = $(window).height();
  //     const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

  //     $readingProgress.css('width', scrollPercent + '%');
  //   });

  //   // 添加进度条样式
  //   $('<style>').text(`
  //     .reading-progress {
  //       position: fixed;
  //       top: 0;
  //       left: 0;
  //       width: 0%;
  //       height: 3px;
  //       background: linear-gradient(to right, #3498db, #2ecc71);
  //       z-index: 9999;
  //       transition: width 0.3s ease;
  //     }
  //   `).appendTo('head');
  // }

>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
  // ===== 初始化所有功能 =====
  function initAllFeatures() {
    initFAQ();
    initFormInteractions();
    initTimelineEffects();
    initCategoryHover();
    initHeatChartAnimation();
    initBreadcrumb();
    initServiceCards();
    initPageProgress();

    console.log('所有交互功能初始化完成');
  }

  // 页面加载完成后初始化
  setTimeout(initAllFeatures, 100);

<<<<<<< HEAD
=======
  // ===== 添加一些额外的交互效果 =====
>>>>>>> 21c3d52686c9a679495ab37cfe1359263f350514
  $(window).on('load', function () {
    // 页面加载完成后的动画
    $('.content-box').each(function (index) {
      $(this).css({
        'opacity': '1',
        'transform': 'translateY(0)',
        'transition': 'all 0.6s ease ' + (index * 0.1) + 's'
      });
    });
  });

});