// 移动端社交图标交互功能
(function() {
    // 检测是否为触摸设备
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (!isTouchDevice) {
        return;
    }
    
    const containers = document.querySelectorAll('.social-icon-container');
    const mobileHoverContainer = document.getElementById('mobile-hover-image-container');
    const mobileHoverImage = mobileHoverContainer ? mobileHoverContainer.querySelector('img') : null;
    
    if (!mobileHoverContainer || !mobileHoverImage) {
        return;
    }
    
    // 存储当前显示状态的图标容器
    let activeContainer = null;
    
    // 显示移动端悬停图片
    function showMobileHoverImage(container) {
        const hoverImage = container.dataset.hoverImage;
        const title = container.dataset.title;
        
        if (hoverImage) {
            mobileHoverImage.src = hoverImage;
            mobileHoverImage.alt = title + ' hover image';
            mobileHoverContainer.classList.add('active');
            activeContainer = container;
            container.classList.add('hover-active');
        }
    }
    
    // 隐藏移动端悬停图片
    function hideMobileHoverImage() {
        mobileHoverContainer.classList.remove('active');
        if (activeContainer) {
            activeContainer.classList.remove('hover-active');
            activeContainer = null;
        }
    }
    
    containers.forEach(container => {
        const url = container.dataset.url;
        const hoverImage = container.dataset.hoverImage;
        const link = container.querySelector('a');
        
        if (link) {
            // 有链接的图标
            link.addEventListener('click', (e) => {
                // 如果有悬停图片且当前未显示
                if (hoverImage && activeContainer !== container) {
                    e.preventDefault();
                    e.stopPropagation();
                    hideMobileHoverImage();
                    showMobileHoverImage(container);
                }
                // 如果已经显示了悬停图片，则允许默认跳转行为
            });
        } else {
            // 没有链接的图标
            const span = container.querySelector('.social-icon-no-link');
            if (span && hoverImage) {
                span.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (activeContainer === container) {
                        // 如果当前已显示，则隐藏
                        hideMobileHoverImage();
                    } else {
                        // 否则显示
                        hideMobileHoverImage();
                        showMobileHoverImage(container);
                    }
                });
            }
        }
    });
    
    // 点击页面其他地方关闭悬停图片
    document.addEventListener('click', (e) => {
        if (activeContainer && !e.target.closest('.social-icon-container') && !e.target.closest('.mobile-hover-image-container')) {
            hideMobileHoverImage();
        }
    });
    
    // 点击移动端悬停图片容器本身关闭
    mobileHoverContainer.addEventListener('click', (e) => {
        if (e.target === mobileHoverContainer) {
            hideMobileHoverImage();
        }
    });
})();
