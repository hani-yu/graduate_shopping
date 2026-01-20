// resource_library.js - 课程资料库页面交互效果

$(document).ready(function() {
  
  console.log('课程资料库页面加载完成');
  
  // ===== 初始化AOS动画 =====
  AOS.init({
    duration: 800,
    once: true,
    offset: 100
  });
  
  // ===== 1. 学科分类导航标签切换 =====
  function initCategoryTabs() {
    const $tabBtns = $('.tab-btn');
    const $tabContents = $('.tab-content');
    
    $tabBtns.on('click', function() {
      const tabId = $(this).data('tab');
      
      // 更新按钮状态
      $tabBtns.removeClass('active');
      $(this).addClass('active');
      
      // 显示对应内容
      $tabContents.removeClass('active');
      $(`#tab-${tabId}`).addClass('active');
      
      // 如果是标签云，初始化标签大小
      if (tabId === 'hot-tags') {
        initTagCloud();
      }
      
      console.log(`切换到 ${$(this).text()} 标签`);
    });
  }
  
  // ===== 2. 标签云效果 =====
  function initTagCloud() {
    const $tags = $('.tag-lg, .tag-md, .tag-sm');
    
    $tags.each(function() {
      const weight = $(this).data('weight') || 5;
      
      // 根据权重设置样式
      if (weight >= 8) {
        $(this).addClass('tag-lg');
      } else if (weight >= 6) {
        $(this).addClass('tag-md');
      } else {
        $(this).addClass('tag-sm');
      }
      
      // 添加点击事件
      $(this).on('click', function() {
        const tagText = $(this).text();
        
        // 模拟搜索
        $('.search-input').val(tagText);
        $('.search-btn').click();
        
        // 添加点击反馈
        $(this).css({
          'transform': 'scale(0.95)',
          'transition': 'transform 0.2s ease'
        });
        
        setTimeout(() => {
          $(this).css('transform', 'scale(1)');
        }, 200);
      });
    });
    
    console.log('标签云初始化完成');
  }
  
  // ===== 3. 学霸笔记筛选功能 =====
  function initNotesFilter() {
    const $filterBtns = $('.filter-btn');
    const $noteCards = $('.note-card');
    const $sortSelect = $('.sort-select');
    
    // 按分类筛选
    $filterBtns.on('click', function() {
      const filter = $(this).data('filter');
      
      // 更新按钮状态
      $filterBtns.removeClass('active');
      $(this).addClass('active');
      
      // 显示/隐藏笔记卡片
      if (filter === 'all') {
        $noteCards.show();
      } else {
        $noteCards.hide();
        $(`.note-card[data-category="${filter}"]`).show();
      }
      
      console.log(`筛选笔记分类: ${filter}`);
    });
    
    // 排序功能
    $sortSelect.on('change', function() {
      const sortBy = $(this).val();
      const $visibleCards = $noteCards.filter(':visible');
      const $container = $('.notes-grid');
      
      // 获取所有可见卡片数据
      const cardsData = $visibleCards.map(function() {
        const $card = $(this);
        return {
          element: $card,
          rating: parseFloat($card.data('rating')) || 0,
          downloads: parseInt($card.find('.note-stats span:first-child').text().replace(/,/g, '')) || 0,
          text: $card.find('h3').text().toLowerCase()
        };
      }).get();
      
      // 排序
      cardsData.sort((a, b) => {
        switch(sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'downloads':
            return b.downloads - a.downloads;
          case 'recent':
            return Math.random() - 0.5; // 模拟最近更新
          case 'name':
            return a.text.localeCompare(b.text);
          default:
            return 0;
        }
      });
      
      // 重新排列卡片
      $container.empty();
      cardsData.forEach(card => {
        $container.append(card.element);
      });
      
      console.log(`按 ${$(this).find('option:selected').text()} 排序`);
    });
    
    // 笔记下载和预览
    $('.btn-download-note').on('click', function() {
      const $btn = $(this);
      const noteName = $(this).closest('.note-card').find('h3').text();
      const points = $(this).text().match(/\d+/)?.[0] || 5;
      
      // 检查积分
      const userPoints = 256; // 假设用户有256积分
      
      if (userPoints >= points) {
        // 模拟下载过程
        $btn.html('<i class="fas fa-spinner fa-spin"></i> 下载中...');
        $btn.prop('disabled', true);
        
        setTimeout(() => {
          alert(`下载成功: ${noteName}\n\n扣除 ${points} 积分，剩余积分: ${userPoints - points}`);
          $btn.html(`<i class="fas fa-download"></i> 下载 (${points}积分)`);
          $btn.prop('disabled', false);
          
          // 更新下载计数
          const $downloadCount = $btn.closest('.note-card').find('.note-stats span:first-child');
          const current = parseInt($downloadCount.text().replace(/,/g, '')) || 0;
          $downloadCount.html(`<i class="fas fa-download"></i> ${(current + 1).toLocaleString()}`);
        }, 1500);
      } else {
        alert(`积分不足！\n\n需要 ${points} 积分，您当前只有 ${userPoints} 积分\n请上传资料或参与社区活动获取更多积分`);
      }
    });
    
    $('.btn-preview-note').on('click', function() {
      const noteName = $(this).closest('.note-card').find('h3').text();
      alert(`预览笔记: ${noteName}\n\n完整版将打开在线预览器，支持缩放、搜索、翻页等功能`);
    });
    
    console.log('学霸笔记筛选功能初始化完成');
  }
  
  // ===== 4. 时间线导航 =====
  function initTimelineNavigation() {
    const $timelineBtns = $('.timeline-nav-btn');
    const $timelineContents = $('.timeline-content');
    
    $timelineBtns.on('click', function() {
      const semester = $(this).data('semester');
      
      // 更新按钮状态
      $timelineBtns.removeClass('active');
      $(this).addClass('active');
      
      // 显示对应时间线内容
      $timelineContents.removeClass('active');
      $(`#timeline-${semester}`).addClass('active');
      
      // 添加动画效果
      const $activeContent = $(`#timeline-${semester}`);
      $activeContent.find('.update-item').each(function(index) {
        $(this).css({
          'opacity': '0',
          'transform': 'translateX(-20px)'
        });
        
        setTimeout(() => {
          $(this).css({
            'opacity': '1',
            'transform': 'translateX(0)',
            'transition': 'all 0.5s ease'
          });
        }, index * 100);
      });
      
      console.log(`切换到 ${semester} 学期时间线`);
    });
    
    // 下载更新项
    $('.btn-download-update').on('click', function() {
      const $item = $(this).closest('.update-item');
      const itemName = $item.find('h5').text();
      
      alert(`开始下载: ${itemName}\n\n文件将保存到您的下载文件夹中`);
    });
  }
  
  // ===== 5. 智能搜索功能 =====
  function initSmartSearch() {
    const $searchBtn = $('.search-btn');
    const $advancedSearchBtn = $('.advanced-search-btn');
    const $searchInput = $('.search-input');
    const $advancedFilters = $('.advanced-filters');
    let isAdvancedOpen = false;
    
    // 基本搜索
    $searchBtn.on('click', function() {
      const query = $searchInput.val().trim();
      
      if (!query) {
        $searchInput.focus();
        return;
      }
      
      // 模拟搜索过程
      $(this).html('<i class="fas fa-spinner fa-spin"></i> 搜索中...');
      $(this).prop('disabled', true);
      
      setTimeout(() => {
        const results = Math.floor(Math.random() * 200) + 50;
        alert(`搜索 "${query}"\n\n找到 ${results} 个相关结果\n\n结果页面将展示所有匹配的资料`);
        
        $(this).html('搜索');
        $(this).prop('disabled', false);
        
        // 添加到搜索历史
        addToSearchHistory(query);
      }, 1000);
    });
    
    // 回车搜索
    $searchInput.on('keypress', function(e) {
      if (e.which === 13) {
        $searchBtn.click();
      }
    });
    
    // 高级搜索
    $advancedSearchBtn.on('click', function() {
      isAdvancedOpen = !isAdvancedOpen;
      
      if (isAdvancedOpen) {
        $advancedFilters.slideDown(300);
        $(this).html('<i class="fas fa-times"></i> 收起筛选');
      } else {
        $advancedFilters.slideUp(300);
        $(this).html('<i class="fas fa-sliders-h"></i> 高级筛选');
      }
    });
    
    // 搜索历史点击
    $('.history-tag').on('click', function() {
      const query = $(this).text();
      $searchInput.val(query);
      $searchBtn.click();
    });
    
    // 热门搜索点击
    $('.popular-tag').on('click', function() {
      const query = $(this).text().split(' ')[0];
      $searchInput.val(query);
      $searchBtn.click();
    });
    
    // 查看推荐
    $('.btn-view-recommendation').on('click', function() {
      const recName = $(this).closest('.recommendation-card').find('h4').text();
      alert(`查看推荐: ${recName}\n\n将跳转到该资料的详细页面`);
    });
    
    console.log('智能搜索功能初始化完成');
  }
  
  // ===== 6. 学习工具交互 =====
  function initLearningTools() {
    const $toolBtns = $('.btn-use-tool');
    const $communityTabBtns = $('.community-tab-btn');
    const $communityTabContents = $('.community-tab-content');
    
    // 学习工具使用
    $toolBtns.on('click', function() {
      const toolName = $(this).closest('.tool-card').find('h4').text();
      
      // 模拟工具打开
      $(this).html('<i class="fas fa-spinner fa-spin"></i> 加载中...');
      $(this).prop('disabled', true);
      
      setTimeout(() => {
        alert(`打开 ${toolName}\n\n工具将在新标签页中打开，支持在线编辑和保存`);
        $(this).html('立即使用');
        $(this).prop('disabled', false);
      }, 800);
    });
    
    // 社区标签切换
    $communityTabBtns.on('click', function() {
      const tabId = $(this).data('tab');
      
      // 更新按钮状态
      $communityTabBtns.removeClass('active');
      $(this).addClass('active');
      
      // 显示对应内容
      $communityTabContents.removeClass('active');
      $(`#tab-${tabId}`).addClass('active');
      
      console.log(`切换到 ${$(this).text()} 标签`);
    });
    
    // 提问按钮
    $('.btn-ask-question').on('click', function() {
      alert('我要提问\n\n将打开提问表单，填写问题描述、所属课程、悬赏积分等信息');
    });
    
    // 领取悬赏
    $('.btn-claim-bounty').on('click', function() {
      const $bountyItem = $(this).closest('.bounty-item');
      const bountyName = $bountyItem.find('h4').text();
      const reward = $bountyItem.find('.reward-amount').text();
      
      alert(`领取悬赏: ${bountyName}\n\n悬赏金额: ${reward}\n\n您需要上传相关资料，通过审核后即可获得积分`);
    });
    
    // 发布悬赏
    $('.btn-post-bounty').on('click', function() {
      alert('发布悬赏\n\n将打开发布表单，填写所需资料描述、悬赏积分、截止时间等信息');
    });
    
    console.log('学习工具交互初始化完成');
  }
  
  // ===== 7. 上传资料CTA =====
  function initUploadCTA() {
    $('.btn-upload-cta').on('click', function() {
      alert('上传资料\n\n将打开上传页面，支持多文件上传、分类选择、积分设置等功能');
    });
    
    // 学院卡片点击
    $('.view-college-btn').on('click', function() {
      const collegeName = $(this).closest('.college-card').find('h3').text();
      alert(`查看 ${collegeName} 全部课程资料\n\n将跳转到该学院的专属页面`);
    });
  }
  
  // ===== 8. 辅助功能 =====
  function addToSearchHistory(query) {
    const $historyTags = $('.history-tags');
    const existingTags = $historyTags.find('.history-tag').map(function() {
      return $(this).text();
    }).get();
    
    // 如果已经存在，不重复添加
    if (!existingTags.includes(query)) {
      const $newTag = $(`<span class="history-tag">${query}</span>`);
      
      // 限制最多显示6个历史记录
      if ($historyTags.children().length >= 6) {
        $historyTags.children().last().remove();
      }
      
      $historyTags.prepend($newTag);
      
      // 为新标签添加点击事件
      $newTag.on('click', function() {
        $('.search-input').val(query);
        $('.search-btn').click();
      });
    }
  }
  
  // ===== 9. 页面加载动画 =====
  function initPageAnimations() {
    // 卡片入场动画
    $('.college-card, .note-card, .tool-card, .recommendation-card').each(function(index) {
      $(this).css({
        'opacity': '0',
        'transform': 'translateY(20px)'
      });
      
      setTimeout(() => {
        $(this).css({
          'opacity': '1',
          'transform': 'translateY(0)',
          'transition': 'all 0.5s ease'
        });
      }, index * 100);
    });
    
    // 标签云动画
    setTimeout(() => {
      $('.tag-lg, .tag-md, .tag-sm').each(function(index) {
        $(this).css({
          'opacity': '0',
          'transform': 'scale(0.5)'
        });
        
        setTimeout(() => {
          $(this).css({
            'opacity': '1',
            'transform': 'scale(1)',
            'transition': 'all 0.3s ease'
          });
        }, index * 50);
      });
    }, 500);
  }
  
  // ===== 10. 添加返回顶部按钮 =====
  function addBackToTopButton() {
    const $backToTop = $('<button class="back-to-top" title="返回顶部"><i class="fas fa-chevron-up"></i></button>');
    $('body').append($backToTop);
    
    // 添加样式
    $('<style>').text(`
      .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-teal), var(--primary-teal-dark));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(26, 188, 156, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
      }
      
      .back-to-top:hover {
        background: linear-gradient(135deg, var(--primary-teal-dark), var(--primary-teal));
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(26, 188, 156, 0.4);
      }
      
      .back-to-top.show {
        display: flex;
      }
    `).appendTo('head');
    
    // 滚动显示/隐藏
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 300) {
        $backToTop.addClass('show');
      } else {
        $backToTop.removeClass('show');
      }
    });
    
    // 点击返回顶部
    $backToTop.on('click', function() {
      $('html, body').animate({ scrollTop: 0 }, 600);
      return false;
    });
  }
  
  // ===== 初始化所有功能 =====
  function initAllFeatures() {
    initCategoryTabs();
    initTagCloud();
    initNotesFilter();
    initTimelineNavigation();
    initSmartSearch();
    initLearningTools();
    initUploadCTA();
    initPageAnimations();
    addBackToTopButton();
    
    console.log('课程资料库所有交互功能初始化完成');
  }
  
  // 页面加载完成后初始化
  setTimeout(initAllFeatures, 100);
  
  // ===== 添加页面加载进度条 =====
  function addLoadingProgress() {
    const $progressBar = $('<div class="page-loading-progress"></div>');
    $('body').prepend($progressBar);
    
    // 添加样式
    $('<style>').text(`
      .page-loading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, var(--primary-teal), var(--secondary-blue));
        z-index: 9999;
        transition: width 0.3s ease;
      }
    `).appendTo('head');
    
    // 模拟加载进度
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          $progressBar.fadeOut(300, function() {
            $(this).remove();
          });
        }, 300);
      }
      $progressBar.css('width', progress + '%');
    }, 100);
  }
  
  // 添加加载进度条
  addLoadingProgress();
});