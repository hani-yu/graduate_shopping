$(document).ready(function () {
    // JavaScript交互效果1: 笔记预览功能
    // 笔记预览交互
    const noteButtons = document.querySelectorAll('.note-control-btn');
    const noteSamples = document.querySelectorAll('.note-sample');
    const book3d = document.getElementById('book3d');

    noteButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            // 隐藏所有笔记样本
            noteSamples.forEach(note => {
                note.classList.remove('active');
            });

            // 显示对应的笔记样本
            const noteId = this.getAttribute('data-note');
            const targetNote = document.getElementById(noteId);
            if (targetNote) {
                targetNote.classList.add('active');
            }

            // 添加书籍动画
            book3d.style.transform = 'translate(-50%, -50%) rotateY(-10deg) scale(1.05)';

            // 添加按钮高亮
            noteButtons.forEach(btn => btn.style.backgroundColor = '#f5f1e8');
            this.style.backgroundColor = '#e8e0c8';
        });
    });

    // 鼠标离开书籍区域时重置
    book3d.addEventListener('mouseleave', function () {
        this.style.transform = 'translate(-50%, -50%) rotateY(-20deg)';
        noteSamples.forEach(note => note.classList.remove('active'));
        noteButtons.forEach(btn => btn.style.backgroundColor = '#f5f1e8');
    });

    // JavaScript交互效果2: 类目检索交互
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function () {
            // 移除所有卡片的激活状态
            categoryCards.forEach(c => {
                c.style.transform = 'scale(1)';
                c.style.borderColor = 'transparent';
            });

            // 为当前卡片添加激活效果
            this.style.transform = 'scale(1.1)';
            this.style.borderColor = 'var(--primary-color)';

            // 获取类别
            const category = this.getAttribute('data-category');
            let categoryName = '';

            switch (category) {
                case 'kaoyan': categoryName = '考研资料'; break;
                case 'major': categoryName = '专业课教材'; break;
                case 'elective': categoryName = '公选课轻松读'; break;
                case 'language': categoryName = '语言考证'; break;
            }

            // 显示提示
            showNotification(`正在筛选 ${categoryName} 类别的教材...`);

            // 3秒后重置
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                this.style.borderColor = 'var(--primary-color)';
            }, 3000);
        });
    });

    // 赠书按钮交互
    const claimButton = document.getElementById('claimBooks');
    claimButton.addEventListener('click', function () {
        this.innerHTML = '<i class="fas fa-check"></i> 申请已提交，等待确认';
        this.style.backgroundColor = '#5daf34';
        this.disabled = true;

        showNotification('赠书申请已提交！请等待书主确认后，按照指定地点自提。');
    });

    // 价格天平动画
    const balanceScale = document.querySelector('.balance-scale i');
    setInterval(() => {
        balanceScale.style.animation = 'none';
        setTimeout(() => {
            balanceScale.style.animation = 'balance 3s infinite ease-in-out';
        }, 10);
    }, 3000);

    // 显示通知函数
    function showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background-color: var(--primary-color);
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 9999;
                    font-weight: 500;
                    animation: slideIn 0.3s ease;
                `;

        document.body.appendChild(notification);

        // 3秒后移除通知
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
    document.head.appendChild(style);

    // 购物车交互
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 3;

    cartBtn.addEventListener('click', function () {
        showNotification(`购物车中有 ${cartItems} 件商品，快去结算吧！`);
    });

    // 模块悬停效果增强
    const modules = document.querySelectorAll('.module');
    modules.forEach(module => {
        module.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        module.addEventListener('mouseleave', function () {
            this.style.zIndex = '1';
        });
    });

});