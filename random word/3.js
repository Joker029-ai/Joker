document.addEventListener('DOMContentLoaded', () => {
    const infoPool = [
        '骑行', '养花', '书法', '滑板', '钓鱼', '绘画', '摄影', '烘焙', '编织', '园艺',
        '舞蹈', '音乐', '旅行', '登山', '跑步', '游泳', '写作', '瑜伽', '健身', '陶艺',
        '手工', '编程', '语言', '烹饪', '表演', '魔术', '模型', '收藏', '阅读',
        '打球', '飞机', '潜水', '滑雪', '攀岩', '羽毛球', '网球', '钓鱼', '骑马',
        '桌游', '打牌', '义工', '历史', '天文', '赏鸟', '冥想', '乐队', '木工',
        '香皂', '蜡烛', '空翻', '识车', '穿搭', '相声','书法','口技','格斗','骑行','言谈',
        '飞镖','轮椅','黑客','历史','诗词','心理','石头','看海','扩列','拍照','记录',
        '数码','笑话','调酒','烹饪','穴位','推理','养生','写信','摄影','vlog','射箭',
        '化学','人文','蹦极','跳伞','cosplay','露营','风筝','识枪','刀剑','断舍离',
        '股票','上市','债券','政治','能源','医疗','保险','刑法','交际','围棋','象棋','法医',
        '挑战','影评','清理','纹身','非遗','动物','能源','电影','痕迹','日记','书签','滑冰',
        '启蒙','药理','乐理','经脉','减肥','副业','性知识','旅游','录歌','探店','学车','辩论',
        '维修','咖啡','手表','珠宝','算卦','人体系统','演讲','CG','开船','火山','跑酷','监视',
    ];

    let usedInfo = [];
    let drawCount = 0;
    const maxDrawsPerDay = 3;
    const displayBox = document.getElementById('displayBox');
    const drawButton = document.getElementById('drawButton');
    const resultUl = document.getElementById('resultUl');
    const resultList = document.getElementById('resultList');
    const downloadButton = document.createElement('button');
    downloadButton.textContent = '下载今日数据';
    downloadButton.style.display = 'none';
    downloadButton.style.margin = '20px auto';
    downloadButton.style.display = 'block';  // 居中
    resultList.appendChild(downloadButton);

    const resetButton = document.createElement('button');
    resetButton.textContent = '重置';
    resetButton.style.position = 'fixed';
    resetButton.style.bottom = '10px';
    resetButton.style.right = '10px';
    resetButton.style.padding = '5px 10px';
    resetButton.style.fontSize = '12px';
    resetButton.style.display = 'none';  // 初始隐藏
    document.body.appendChild(resetButton);

    // 检查是否需要重置每日计数
    const lastDrawDate = localStorage.getItem('lastDrawDate');
    const currentDate = new Date().toLocaleDateString();

    if (lastDrawDate !== currentDate) {
        drawCount = 0;
        localStorage.setItem('lastDrawDate', currentDate);
        localStorage.setItem('drawCount', drawCount);
        usedInfo = [];
        localStorage.setItem('usedInfo', JSON.stringify(usedInfo));
        resultUl.innerHTML = '';  // 清空结果列表
        downloadButton.style.display = 'none';  // 隐藏下载按钮
    } else {
        drawCount = parseInt(localStorage.getItem('drawCount'), 10) || 0;
        usedInfo = JSON.parse(localStorage.getItem('usedInfo')) || [];
        renderResults();  // 渲染已保存的结果
    }

    drawButton.addEventListener('click', () => {
        if (drawCount >= maxDrawsPerDay) {
            alert('今日投掷次数已用完！');
            resultList.style.display = 'block';  // 确保结果列表一直显示
            downloadButton.style.display = 'block';  // 显示下载按钮
            return;
        }

        if (usedInfo.length === infoPool.length) {
            alert('所有信息都已经展示过了！');
            return;
        }

        let intervalId;

        displayBox.classList.remove('fadeIn');
        displayBox.classList.add('fadeOut');

        // 清除之前的动画
        clearInterval(intervalId);

        let scrollIndex = 0;

        // 开始滚动显示信息
        intervalId = setInterval(() => {
            displayBox.textContent = infoPool[scrollIndex];
            scrollIndex = (scrollIndex + 1) % infoPool.length;
        }, 10); // 每10毫秒切换一次

        // 滚动3秒后停止并显示最终结果
        setTimeout(() => {
            clearInterval(intervalId); // 停止滚动
            
            let randomInfo;
            do {
                const randomIndex = Math.floor(Math.random() * infoPool.length);
                randomInfo = infoPool[randomIndex];
            } while (usedInfo.includes(randomInfo));

            usedInfo.push(randomInfo);
            drawCount++;
            localStorage.setItem('drawCount', drawCount);
            localStorage.setItem('usedInfo', JSON.stringify(usedInfo));

            // 添加抽取结果到结果目录
            const listItem = document.createElement('li');
            const now = new Date();
            listItem.innerHTML = `
                ${usedInfo.length}. ${randomInfo} - ${now.toLocaleString()}
                <br>
                <input type="text" data-index="${usedInfo.length - 1}" placeholder="详细记录" value="${localStorage.getItem('input_' + (usedInfo.length - 1)) || ''}">
            `;
            resultUl.appendChild(listItem);

            // 显示结果列表
            resultList.style.display = 'block';

            displayBox.textContent = randomInfo;

            displayBox.classList.remove('fadeOut');
            displayBox.classList.add('fadeIn');

            // 显示下载按钮
            if (drawCount >= maxDrawsPerDay) {
                downloadButton.style.display = 'block';
                resetButton.style.display = 'block';  // 显示重置按钮
            }
        }, 300); // 滚动3秒后停止并显示最终结果
    });

    // 下载按钮点击事件
    downloadButton.addEventListener('click', () => {
        const textToDownload = usedInfo.map((info, index) => {
            const now = new Date();
            const detailInput = document.querySelector(`input[data-index="${index}"]`);
            const detail = detailInput ? detailInput.value : '';
                return `${index + 1}. ${info} - ${now.toLocaleString()} - ${detail}`;
        }).join('\n');
        const blob = new Blob([textToDownload], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `今日投掷数据_${currentDate}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // 重置按钮点击事件
    resetButton.addEventListener('click', () => {
        drawCount = 0;
        localStorage.setItem('drawCount', drawCount);
        usedInfo = [];
        localStorage.setItem('usedInfo', JSON.stringify(usedInfo));
        resultUl.innerHTML = '';  // 清空结果列表
        downloadButton.style.display = 'none';  // 隐藏下载按钮
        alert('今日的抽取次数已重置！');
    });

    function renderResults() {
        usedInfo.forEach((info, index) => {
            const listItem = document.createElement('li');
            const now = new Date();
            const detail = localStorage.getItem('input_' + index) || '';
            listItem.innerHTML = `
                ${index + 1}. ${info} - ${now.toLocaleString()} - ${detail}
                <br>
                <input type="text" data-index="${index}" placeholder="详细记录" value="${detail}">
            `;
            resultUl.appendChild(listItem);
        });
        if (drawCount >= maxDrawsPerDay) {
            resultList.style.display = 'block';  // 显示结果列表
            downloadButton.style.display = 'block';  // 显示下载按钮
            resetButton.style.display = 'block';  // 显示重置按钮
        }
    }
    
});

// 鼠标移动特效样式
const style = document.createElement('style');
style.innerHTML = `
.mouse-effect {
    position: absolute;
    width: 10px;
    height: 10px;
    background: rgba(0, 123, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    animation: pulse 1s ease-out;
}
`;
document.head.appendChild(style);