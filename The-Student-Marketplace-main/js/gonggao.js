$(document).ready(function() {

    // 点击公告卡或按钮跳转到 detail 页面
    $('.announcement-card, .btn-detail').on('click', function(e) {
        let url = $(this).closest('.announcement-card').data('url');
        window.location.href = url;
    });

    // 滚动时淡入动画
    function revealOnScroll() {
        $('.announcement-card').each(function(index) {
            let top_of_element = $(this).offset().top;
            let bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > top_of_element + 50) {
                let that = $(this);
                setTimeout(function() {
                    that.addClass('show');
                }, index * 150); // 阶梯式动画
            }
        });
    }

    $(window).on('scroll', revealOnScroll);
    revealOnScroll(); // 页面加载时触发一次
});
