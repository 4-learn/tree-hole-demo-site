// 初始化樹洞為全黑
function initHollow() {
    const hollowInner = document.getElementById('hollowInner');
    if (hollowInner) {
        hollowInner.style.fill = '#000000';
        hollowInner.style.filter = 'none';
    }
}

// 更新樹洞顏色和發光效果
function updateHollowLight(r, g, b) {
    const hollowInner = document.getElementById('hollowInner');
    if (!hollowInner) return;

    // 如果RGB全為0，保持全黑無發光狀態
    if (r === 0 && g === 0 && b === 0) {
        hollowInner.style.fill = '#000000';
        hollowInner.style.filter = 'none';
        return;
    }

    const color = `rgb(${r}, ${g}, ${b})`;
    hollowInner.style.fill = color;

    // 計算亮度並調整發光效果
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    if (brightness > 0) {
        hollowInner.style.filter = 'url(#hollowGlow)';
        const filter = document.querySelector('#hollowGlow feGaussianBlur');
        const blurAmount = Math.max(3, Math.min(8, brightness / 32));
        filter.setAttribute('stdDeviation', blurAmount);
    }
}

// 讀取顏色配置
function fetchColor() {
    fetch('/static/config/color.json')
        .then(response => response.json())
        .then(data => {
            updateHollowLight(data.R, data.G, data.B);
        })
        .catch(error => {
            console.error('Error fetching color:', error);
            updateHollowLight(0, 0, 0); // 錯誤時恢復為黑色
        });
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
    initHollow();
    fetchColor(); // 立即執行一次
    setInterval(fetchColor, 5000); // 每 5 秒更新一次
});