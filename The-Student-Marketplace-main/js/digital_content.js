$(document).ready(function () {
    console.log("极客仓库·数码续篇 - 高级交互效果已加载");
    
    // ============================================
    // 效果1: 实时3D产品查看器（高级WebGL模拟）
    // ============================================
    class Product3DViewer {
        constructor() {
            this.container = document.getElementById('product3d');
            this.rotation = { x: -15, y: 0 };
            this.isDragging = false;
            this.lastMouseX = 0;
            this.lastMouseY = 0;
            this.accessories = [];
            this.selectedAccessories = new Set(['box', 'charger', 'case']);
            this.init();
        }
        
        init() {
            // 创建3D场景的基础元素
            this.createBaseModel();
            this.setupEventListeners();
            this.setupAccessoryElements();
            this.update3DView();
            
            // 添加陀螺仪支持（移动端）
            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
            }
        }
        
        createBaseModel() {
            // 创建更复杂的3D结构
            this.base = document.createElement('div');
            this.base.className = 'product-model';
            this.base.innerHTML = `
                <div class="product-screen-3d"></div>
                <div class="product-body-3d"></div>
                <div class="product-camera"></div>
                <div class="product-buttons"></div>
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                .product-model {
                    position: absolute;
                    width: 200px;
                    height: 280px;
                    transform-style: preserve-3d;
                    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .product-screen-3d {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    right: 10px;
                    bottom: 40px;
                    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                    border-radius: 8px;
                    transform: translateZ(2px);
                    overflow: hidden;
                }
                .product-screen-3d::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        45deg,
                        transparent 30%,
                        rgba(59, 130, 246, 0.1) 50%,
                        transparent 70%
                    );
                    animation: screenShine 3s infinite linear;
                }
                @keyframes screenShine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .product-body-3d {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, #cbd5e1, #94a3b8);
                    border-radius: 12px;
                    transform: translateZ(0);
                    box-shadow: 
                        inset 0 0 20px rgba(0,0,0,0.1),
                        0 5px 15px rgba(0,0,0,0.2);
                }
                .product-camera {
                    position: absolute;
                    top: 15px;
                    left: 50%;
                    transform: translateX(-50%) translateZ(5px);
                    width: 8px;
                    height: 8px;
                    background: #1e293b;
                    border-radius: 50%;
                }
                .product-buttons {
                    position: absolute;
                    right: 5px;
                    top: 60px;
                    width: 3px;
                    height: 40px;
                    background: #64748b;
                    border-radius: 2px;
                    transform: translateZ(3px);
                }
            `;
            document.head.appendChild(style);
            
            this.container.appendChild(this.base);
        }
        
        setupAccessoryElements() {
            // 定义配件元素
            this.accessoryElements = {
                'box': this.createAccessoryElement('box', `
                    position: absolute;
                    width: 240px;
                    height: 320px;
                    background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                    border: 2px dashed #cbd5e1;
                    border-radius: 15px;
                    transform: translateZ(-30px) rotateX(5deg);
                `),
                'charger': this.createAccessoryElement('charger', `
                    position: absolute;
                    top: 150px;
                    right: -40px;
                    width: 60px;
                    height: 30px;
                    background: linear-gradient(135deg, #4b5563, #6b7280);
                    border-radius: 6px;
                    transform: translateZ(5px);
                `),
                'screenProtector': this.createAccessoryElement('screenProtector', `
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    right: 10px;
                    bottom: 40px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    transform: translateZ(5px);
                    backdrop-filter: blur(2px);
                `),
                'adapter': this.createAccessoryElement('adapter', `
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%) translateZ(5px);
                    width: 40px;
                    height: 20px;
                    background: linear-gradient(135deg, #374151, #4b5563);
                    border-radius: 4px;
                `),
                'case': this.createAccessoryElement('case', `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(59, 130, 246, 0.1);
                    border: 2px solid rgba(59, 130, 246, 0.3);
                    border-radius: 14px;
                    transform: translateZ(-2px);
                `)
            };
        }
        
        createAccessoryElement(id, style) {
            const element = document.createElement('div');
            element.className = `accessory-3d accessory-${id}`;
            element.style.cssText = style;
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            this.base.appendChild(element);
            return element;
        }
        
        setupEventListeners() {
            // 鼠标拖拽旋转
            this.container.addEventListener('mousedown', this.startDrag.bind(this));
            document.addEventListener('mousemove', this.drag.bind(this));
            document.addEventListener('mouseup', this.stopDrag.bind(this));
            
            // 触摸屏支持
            this.container.addEventListener('touchstart', this.startTouch.bind(this));
            document.addEventListener('touchmove', this.touchMove.bind(this));
            document.addEventListener('touchend', this.stopTouch.bind(this));
            
            // 鼠标滚轮缩放
            this.container.addEventListener('wheel', this.handleWheel.bind(this));
            
            // 监听配件选择变化
            document.querySelectorAll('.accessory-checkbox input').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const accessoryId = e.target.id;
                    if (e.target.checked) {
                        this.selectedAccessories.add(accessoryId);
                    } else {
                        this.selectedAccessories.delete(accessoryId);
                    }
                    this.update3DView();
                    this.updateSummary();
                });
            });
        }
        
        startDrag(e) {
            this.isDragging = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            e.preventDefault();
        }
        
        drag(e) {
            if (!this.isDragging) return;
            
            const deltaX = e.clientX - this.lastMouseX;
            const deltaY = e.clientY - this.lastMouseY;
            
            this.rotation.y += deltaX * 0.5;
            this.rotation.x = Math.max(-60, Math.min(60, this.rotation.x + deltaY * 0.3));
            
            this.updateRotation();
            
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        }
        
        stopDrag() {
            this.isDragging = false;
            
            // 添加惯性效果
            this.applyInertia();
        }
        
        startTouch(e) {
            if (e.touches.length === 1) {
                this.isDragging = true;
                this.lastMouseX = e.touches[0].clientX;
                this.lastMouseY = e.touches[0].clientY;
            }
        }
        
        touchMove(e) {
            if (!this.isDragging || e.touches.length !== 1) return;
            
            const deltaX = e.touches[0].clientX - this.lastMouseX;
            const deltaY = e.touches[0].clientY - this.lastMouseY;
            
            this.rotation.y += deltaX * 0.5;
            this.rotation.x = Math.max(-60, Math.min(60, this.rotation.x + deltaY * 0.3));
            
            this.updateRotation();
            
            this.lastMouseX = e.touches[0].clientX;
            this.lastMouseY = e.touches[0].clientY;
        }
        
        stopTouch() {
            this.isDragging = false;
            this.applyInertia();
        }
        
        handleWheel(e) {
            e.preventDefault();
            
            // 模拟缩放效果
            const scale = e.deltaY > 0 ? 0.9 : 1.1;
            const currentTransform = this.base.style.transform;
            const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
            const currentScale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
            const newScale = Math.max(0.5, Math.min(2, currentScale * scale));
            
            this.base.style.transform = `
                rotateX(${this.rotation.x}deg) 
                rotateY(${this.rotation.y}deg) 
                scale(${newScale})
            `;
        }
        
        handleOrientation(e) {
            // 使用设备陀螺仪控制旋转
            if (!this.isDragging) {
                const beta = e.beta || 0;  // 前后倾斜
                const gamma = e.gamma || 0; // 左右倾斜
                
                this.rotation.x = Math.max(-60, Math.min(60, beta * 0.5));
                this.rotation.y = gamma * 0.5;
                
                this.updateRotation();
            }
        }
        
        applyInertia() {
            // 惯性滑动效果
            let speedX = 0;
            let speedY = 0;
            const friction = 0.95;
            
            const animate = () => {
                if (Math.abs(speedX) < 0.1 && Math.abs(speedY) < 0.1) return;
                
                this.rotation.y += speedX;
                this.rotation.x = Math.max(-60, Math.min(60, this.rotation.x + speedY));
                
                speedX *= friction;
                speedY *= friction;
                
                this.updateRotation();
                
                requestAnimationFrame(animate);
            };
            
            animate();
        }
        
        updateRotation() {
            this.base.style.transform = `
                rotateX(${this.rotation.x}deg) 
                rotateY(${this.rotation.y}deg)
            `;
        }
        
        update3DView() {
            // 显示/隐藏配件
            Object.entries(this.accessoryElements).forEach(([id, element]) => {
                if (this.selectedAccessories.has(id)) {
                    element.style.opacity = '1';
                    
                    // 添加入场动画
                    element.style.transform = element.style.transform.replace(/scale\([^)]+\)/, 'scale(1)');
                } else {
                    element.style.opacity = '0';
                    element.style.transform = element.style.transform.replace(/scale\([^)]+\)/, 'scale(0.8)');
                }
            });
        }
        
        updateSummary() {
            const count = this.selectedAccessories.size;
            const countElement = document.getElementById('selectedCount');
            const itemsElement = document.getElementById('selectedItems');
            
            if (countElement) countElement.textContent = count;
            
            // 更新已选配件列表
            itemsElement.innerHTML = '';
            this.selectedAccessories.forEach(id => {
                const accessoryNames = {
                    'box': '原装包装盒',
                    'charger': '原装充电套装',
                    'screenProtector': '已贴高清膜',
                    'adapter': '转接头',
                    'case': '保护壳'
                };
                
                const item = document.createElement('div');
                item.className = 'selected-item';
                item.innerHTML = `
                    <i class="fas fa-check"></i>
                    ${accessoryNames[id]}
                `;
                itemsElement.appendChild(item);
            });
        }
    }
    
    // 初始化3D查看器
    const productViewer = new Product3DViewer();
    
    // ============================================
    // 效果2: 动态价格趋势预测算法（模拟机器学习）
    // ============================================
    class PriceTrendPredictor {
        constructor() {
            this.chart = null;
            this.currentDevice = 'ipad';
            this.currentRange = 7;
            this.priceData = {};
            this.predictionModel = null;
            this.init();
        }
        
        init() {
            this.generateHistoricalData();
            this.initChart();
            this.setupEventListeners();
            this.trainPredictionModel();
            this.updateChart();
            
            // 添加实时数据更新
            setInterval(() => this.updateLiveData(), 10000);
        }
        
        generateHistoricalData() {
            // 模拟历史价格数据
            const devices = ['ipad', 'macbook', 'display', 'iphone'];
            const basePrices = {
                'ipad': 5200,
                'macbook': 8500,
                'display': 1800,
                'iphone': 6800
            };
            
            devices.forEach(device => {
                const basePrice = basePrices[device];
                const volatility = basePrice * 0.1; // 10%波动
                const data = [];
                
                // 生成90天的历史数据
                for (let i = 90; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    
                    // 模拟价格波动（工作日/周末效应，季节性）
                    const dayOfWeek = date.getDay();
                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                    const seasonalFactor = 1 + 0.05 * Math.sin(i / 30 * Math.PI);
                    const randomFactor = 1 + (Math.random() - 0.5) * 0.02;
                    const weekendDiscount = isWeekend ? 0.98 : 1;
                    
                    const price = basePrice * seasonalFactor * weekendDiscount * randomFactor;
                    
                    data.push({
                        date: date.toISOString().split('T')[0],
                        price: Math.round(price),
                        volume: Math.floor(Math.random() * 5) + 1
                    });
                }
                
                this.priceData[device] = data;
            });
        }
        
        trainPredictionModel() {
            // 模拟机器学习价格预测模型
            this.predictionModel = {
                predict: (device, days) => {
                    const base = this.priceData[device][this.priceData[device].length - 1].price;
                    const predictions = [];
                    
                    for (let i = 1; i <= days; i++) {
                        // 模拟复杂的预测算法
                        const trend = 1 + 0.0005 * i; // 轻微上涨趋势
                        const seasonality = 1 + 0.02 * Math.sin((this.priceData[device].length + i) / 30 * Math.PI);
                        const noise = 1 + (Math.random() - 0.5) * 0.01;
                        const dayOfWeek = (new Date().getDay() + i) % 7;
                        const weekendEffect = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.995 : 1;
                        
                        const predictedPrice = base * trend * seasonality * weekendEffect * noise;
                        predictions.push(Math.round(predictedPrice));
                    }
                    
                    return predictions;
                },
                
                calculateMetrics: (device, range) => {
                    const data = this.getFilteredData(device, range);
                    const prices = data.map(d => d.price);
                    
                    // 计算统计指标
                    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
                    const min = Math.min(...prices);
                    const max = Math.max(...prices);
                    const volatility = ((max - min) / avg * 100).toFixed(1);
                    
                    // 计算趋势
                    const firstPrice = prices[0];
                    const lastPrice = prices[prices.length - 1];
                    const trend = ((lastPrice - firstPrice) / firstPrice * 100).toFixed(1);
                    
                    return {
                        average: avg,
                        trend: parseFloat(trend),
                        volatility: parseFloat(volatility),
                        totalVolume: data.reduce((sum, d) => sum + d.volume, 0)
                    };
                }
            };
        }
        
        initChart() {
            const ctx = document.getElementById('priceTrendChart').getContext('2d');
            
            // 注册渐变色插件
            this.registerGradientPlugin(ctx);
            
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '成交均价',
                        data: [],
                        borderColor: 'rgba(37, 99, 235, 1)',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                        pointBorderColor: 'white',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8
                    }, {
                        label: '预测趋势',
                        data: [],
                        borderColor: 'rgba(139, 92, 246, 0.7)',
                        borderDash: [5, 5],
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: '#475569',
                                font: {
                                    family: 'Inter',
                                    size: 12
                                },
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(30, 41, 59, 0.9)',
                            titleColor: '#f8fafc',
                            bodyColor: '#cbd5e1',
                            borderColor: 'rgba(37, 99, 235, 0.5)',
                            borderWidth: 1,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                                label: (context) => {
                                    const value = context.parsed.y;
                                    const index = context.dataIndex;
                                    const datasetLabel = context.dataset.label;
                                    
                                    if (datasetLabel === '预测趋势') {
                                        return `预测: ¥${value}`;
                                    }
                                    
                                    const data = this.getFilteredData(this.currentDevice, this.currentRange);
                                    const volume = data[index]?.volume || 0;
                                    return `¥${value} (成交${volume}件)`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(226, 232, 240, 0.5)'
                            },
                            ticks: {
                                color: '#64748b',
                                font: {
                                    family: 'Inter'
                                },
                                maxRotation: 45
                            }
                        },
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(226, 232, 240, 0.5)'
                            },
                            ticks: {
                                color: '#64748b',
                                font: {
                                    family: 'Inter'
                                },
                                callback: (value) => `¥${value}`
                            }
                        }
                    },
                    animations: {
                        tension: {
                            duration: 1000,
                            easing: 'easeInOutQuart'
                        }
                    }
                }
            });
        }
        
        registerGradientPlugin(ctx) {
            // 创建渐变背景
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
            gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
            
            Chart.register({
                id: 'customGradient',
                beforeDatasetsDraw: (chart) => {
                    const dataset = chart.data.datasets[0];
                    if (dataset) {
                        dataset.backgroundColor = gradient;
                    }
                }
            });
        }
        
        setupEventListeners() {
            // 设备选择
            document.getElementById('deviceSelect').addEventListener('change', (e) => {
                this.currentDevice = e.target.value;
                this.updateChart();
            });
            
            // 时间范围选择
            document.querySelectorAll('.time-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentRange = parseInt(e.target.dataset.range);
                    this.updateChart();
                });
            });
        }
        
        getFilteredData(device, range) {
            const data = this.priceData[device];
            return data.slice(-range);
        }
        
        updateChart() {
            const data = this.getFilteredData(this.currentDevice, this.currentRange);
            const metrics = this.predictionModel.calculateMetrics(this.currentDevice, this.currentRange);
            
            // 更新图表数据
            this.chart.data.labels = data.map(d => {
                const date = new Date(d.date);
                return `${date.getMonth() + 1}/${date.getDate()}`;
            });
            
            this.chart.data.datasets[0].data = data.map(d => d.price);
            
            // 添加预测数据
            const predictions = this.predictionModel.predict(this.currentDevice, 7);
            const allLabels = [...this.chart.data.labels];
            const allData = [...data.map(d => d.price)];
            
            // 生成预测日期的标签
            for (let i = 1; i <= 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                allLabels.push(`${date.getMonth() + 1}/${date.getDate()}`);
                allData.push(null); // 主数据集不显示预测
            }
            
            // 预测数据集
            const predictionData = new Array(data.length).fill(null).concat(predictions);
            
            this.chart.data.labels = allLabels;
            this.chart.data.datasets[1].data = predictionData;
            
            // 更新统计信息
            document.getElementById('avgPrice').textContent = `¥${metrics.average}`;
            
            const trendElement = document.getElementById('priceChange');
            trendElement.textContent = `${metrics.trend >= 0 ? '+' : ''}${metrics.trend}%`;
            trendElement.style.color = metrics.trend >= 0 ? '#10b981' : '#ef4444';
            
            document.getElementById('tradeVolume').textContent = `${metrics.totalVolume}件`;
            
            // 添加动画效果
            this.chart.update('active');
            
            // 触发粒子效果
            this.triggerChartAnimation();
        }
        
        updateLiveData() {
            // 模拟实时数据更新
            const devices = ['ipad', 'macbook', 'display', 'iphone'];
            devices.forEach(device => {
                const lastData = this.priceData[device][this.priceData[device].length - 1];
                const newDate = new Date();
                newDate.setDate(newDate.getDate() + 1);
                
                // 模拟新交易
                const newPrice = lastData.price * (1 + (Math.random() - 0.5) * 0.01);
                const newVolume = Math.floor(Math.random() * 3) + 1;
                
                this.priceData[device].push({
                    date: newDate.toISOString().split('T')[0],
                    price: Math.round(newPrice),
                    volume: newVolume
                });
                
                // 保持数据长度
                if (this.priceData[device].length > 100) {
                    this.priceData[device].shift();
                }
            });
            
            // 如果当前设备正在显示，更新图表
            this.updateChart();
        }
        
        triggerChartAnimation() {
            // 创建价格变化动画效果
            const chartContainer = document.querySelector('.trend-chart-container');
            const particles = document.createElement('div');
            particles.className = 'chart-particles';
            particles.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 1;
            `;
            
            chartContainer.appendChild(particles);
            
            // 创建粒子
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: ${Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6'};
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: floatParticle 1.5s ease-out forwards;
                `;
                
                particles.appendChild(particle);
            }
            
            // 添加CSS动画
            if (!document.getElementById('particle-animations')) {
                const style = document.createElement('style');
                style.id = 'particle-animations';
                style.textContent = `
                    @keyframes floatParticle {
                        0% {
                            transform: translate(0, 0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(${Math.random() * 100 - 50}px, -50px) scale(0);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // 移除粒子
            setTimeout(() => {
                particles.remove();
            }, 1500);
        }
    }
    
    // 初始化价格趋势预测器
    const pricePredictor = new PriceTrendPredictor();
    
    // ============================================
    // 效果3: 高级视频播放器与设备预览
    // ============================================
    class AdvancedVideoPreview {
        constructor() {
            this.currentVideo = 1;
            this.videoPlayer = document.getElementById('deviceVideo');
            this.videoTitle = document.getElementById('videoTitle');
            this.videoDesc = document.getElementById('videoDesc');
            this.videoPlaceholder = document.querySelector('.video-placeholder');
            this.videoPlayerContainer = document.getElementById('videoPlayer');
            this.deviceItems = document.querySelectorAll('.device-item');
            this.init();
        }
        
        init() {
            this.setupEventListeners();
            this.setupVideoAnalytics();
            this.setupQualitySelector();
        }
        
        setupEventListeners() {
            // 设备选择
            this.deviceItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    const videoId = item.dataset.video;
                    const title = item.dataset.title;
                    const desc = item.dataset.desc;
                    
                    // 更新选中状态
                    this.deviceItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    
                    // 播放视频
                    this.playVideo(videoId, title, desc);
                    
                    // 添加点击效果
                    this.addClickEffect(e);
                });
            });
            
            // 视频播放事件
            this.videoPlayer.addEventListener('play', () => {
                this.trackVideoPlay();
                this.showPlaybackControls();
            });
            
            this.videoPlayer.addEventListener('ended', () => {
                this.showNextVideoSuggestion();
            });
        }
        
        playVideo(videoId, title, desc) {
            this.currentVideo = parseInt(videoId);
            
            // 更新视频信息
            this.videoTitle.textContent = title;
            this.videoDesc.textContent = desc;
            
            // 隐藏占位符，显示播放器
            this.videoPlaceholder.style.display = 'none';
            this.videoPlayerContainer.style.display = 'block';
            
            // 模拟加载不同视频（实际项目中会切换视频源）
            this.simulateVideoLoading();
            
            // 添加设备特定效果
            this.addDeviceSpecificEffects(videoId);
        }
        
        simulateVideoLoading() {
            // 模拟视频加载效果
            const videoContainer = document.querySelector('.video-preview');
            videoContainer.classList.add('loading');
            
            // 创建加载动画
            const loader = document.createElement('div');
            loader.className = 'video-loader';
            loader.innerHTML = `
                <div class="loader-spinner"></div>
                <p>正在加载设备测试视频...</p>
            `;
            
            videoContainer.appendChild(loader);
            
            // 模拟网络延迟
            setTimeout(() => {
                videoContainer.classList.remove('loading');
                loader.remove();
                
                // 开始播放视频
                this.videoPlayer.play().catch(e => {
                    console.log('自动播放被阻止:', e);
                    this.showPlayButton();
                });
            }, 1500);
        }
        
        addDeviceSpecificEffects(videoId) {
            // 根据设备类型添加特效
            const effects = {
                '1': 'ipad-effect',
                '2': 'macbook-effect',
                '3': 'display-effect'
            };
            
            // 移除之前的特效
            document.querySelectorAll('.device-effect').forEach(el => el.remove());
            
            // 添加新特效
            const effect = document.createElement('div');
            effect.className = `device-effect ${effects[videoId]}`;
            effect.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 2;
                opacity: 0;
                animation: fadeInEffect 0.5s ease forwards;
            `;
            
            document.querySelector('.video-preview').appendChild(effect);
            
            // 添加特效样式
            if (!document.getElementById('device-effects')) {
                const style = document.createElement('style');
                style.id = 'device-effects';
                style.textContent = `
                    @keyframes fadeInEffect {
                        to { opacity: 0.3; }
                    }
                    .ipad-effect {
                        background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.2), transparent 50%);
                    }
                    .macbook-effect {
                        background: radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.2), transparent 50%);
                    }
                    .display-effect {
                        background: radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.2), transparent 60%);
                    }
                    .video-loader {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        text-align: center;
                        color: white;
                        z-index: 3;
                    }
                    .loader-spinner {
                        width: 40px;
                        height: 40px;
                        border: 3px solid rgba(255,255,255,0.3);
                        border-top-color: #3b82f6;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 15px;
                    }
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        setupVideoAnalytics() {
            // 模拟视频分析数据收集
            let watchTime = 0;
            const interval = setInterval(() => {
                if (!this.videoPlayer.paused && !this.videoPlayer.ended) {
                    watchTime++;
                    
                    // 记录观看进度
                    if (watchTime % 5 === 0) {
                        this.logAnalytics('video_progress', {
                            videoId: this.currentVideo,
                            progress: Math.round((this.videoPlayer.currentTime / this.videoPlayer.duration) * 100),
                            watchTime: watchTime
                        });
                    }
                }
            }, 1000);
            
            // 视频质量切换事件
            this.videoPlayer.addEventListener('ratechange', () => {
                this.logAnalytics('playback_speed_change', {
                    videoId: this.currentVideo,
                    speed: this.videoPlayer.playbackRate
                });
            });
        }
        
        setupQualitySelector() {
            // 创建视频质量选择器
            const qualitySelector = document.createElement('div');
            qualitySelector.className = 'video-quality-selector';
            qualitySelector.innerHTML = `
                <span>画质:</span>
                <select id="videoQuality">
                    <option value="auto">自动</option>
                    <option value="720">720p</option>
                    <option value="1080">1080p</option>
                    <option value="4k">4K</option>
                </select>
            `;
            
            document.querySelector('.video-info').appendChild(qualitySelector);
            
            // 监听质量切换
            document.getElementById('videoQuality').addEventListener('change', (e) => {
                this.changeVideoQuality(e.target.value);
            });
        }
        
        changeVideoQuality(quality) {
            // 模拟质量切换效果
            const videoContainer = document.querySelector('.video-preview');
            videoContainer.classList.add('quality-changing');
            
            // 显示质量切换提示
            const notification = document.createElement('div');
            notification.className = 'quality-notification';
            notification.textContent = `正在切换到${quality}画质...`;
            videoContainer.appendChild(notification);
            
            setTimeout(() => {
                videoContainer.classList.remove('quality-changing');
                notification.remove();
                
                // 模拟画质变化
                if (quality !== 'auto') {
                    this.applyQualityFilter(quality);
                }
                
                this.logAnalytics('quality_change', {
                    videoId: this.currentVideo,
                    quality: quality
                });
            }, 1000);
        }
        
        applyQualityFilter(quality) {
            const filters = {
                '720': 'blur(0.5px)',
                '1080': 'blur(0.2px)',
                '4k': 'blur(0px)'
            };
            
            this.videoPlayer.style.filter = filters[quality] || 'none';
        }
        
        trackVideoPlay() {
            this.logAnalytics('video_play', {
                videoId: this.currentVideo,
                timestamp: new Date().toISOString(),
                deviceType: this.getDeviceType(this.currentVideo)
            });
        }
        
        showPlaybackControls() {
            // 创建自定义播放控件
            const controls = document.createElement('div');
            controls.className = 'custom-controls';
            controls.innerHTML = `
                <button class="control-btn" id="rewind10">
                    <i class="fas fa-backward"></i> 10s
                </button>
                <button class="control-btn" id="speedControl">
                    1.0x
                </button>
                <button class="control-btn" id="frameCapture">
                    <i class="fas fa-camera"></i>
                </button>
            `;
            
            document.querySelector('.video-info').appendChild(controls);
            
            // 添加控制功能
            document.getElementById('rewind10').addEventListener('click', () => {
                this.videoPlayer.currentTime = Math.max(0, this.videoPlayer.currentTime - 10);
            });
            
            document.getElementById('speedControl').addEventListener('click', () => {
                const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
                const currentSpeed = this.videoPlayer.playbackRate;
                const currentIndex = speeds.indexOf(currentSpeed);
                const nextIndex = (currentIndex + 1) % speeds.length;
                this.videoPlayer.playbackRate = speeds[nextIndex];
                document.getElementById('speedControl').textContent = `${speeds[nextIndex]}x`;
            });
            
            document.getElementById('frameCapture').addEventListener('click', () => {
                this.captureVideoFrame();
            });
        }
        
        captureVideoFrame() {
            // 模拟截图功能
            const canvas = document.createElement('canvas');
            canvas.width = this.videoPlayer.videoWidth;
            canvas.height = this.videoPlayer.videoHeight;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this.videoPlayer, 0, 0);
            
            // 显示截图预览
            const preview = document.createElement('div');
            preview.className = 'frame-preview';
            preview.innerHTML = `
                <div class="preview-content">
                    <h5>截图已保存</h5>
                    <p>设备测试截图已添加到检测报告</p>
                    <button class="btn-download">下载截图</button>
                </div>
            `;
            
            document.querySelector('.video-preview').appendChild(preview);
            
            setTimeout(() => {
                preview.remove();
            }, 3000);
            
            this.logAnalytics('frame_capture', {
                videoId: this.currentVideo,
                timestamp: this.videoPlayer.currentTime
            });
        }
        
        showNextVideoSuggestion() {
            // 视频结束时显示下一个建议
            const nextIndex = (this.currentVideo % 3) + 1;
            const nextDevice = document.querySelector(`.device-item[data-video="${nextIndex}"]`);
            
            if (nextDevice) {
                const suggestion = document.createElement('div');
                suggestion.className = 'next-video-suggestion';
                suggestion.innerHTML = `
                    <div class="suggestion-content">
                        <h5>继续观看</h5>
                        <p>${nextDevice.dataset.title}</p>
                        <button class="btn-play-next" data-video="${nextIndex}">
                            播放下一个测试视频
                        </button>
                    </div>
                `;
                
                document.querySelector('.video-preview').appendChild(suggestion);
                
                // 绑定播放事件
                suggestion.querySelector('.btn-play-next').addEventListener('click', (e) => {
                    nextDevice.click();
                    suggestion.remove();
                });
                
                // 5秒后自动隐藏
                setTimeout(() => {
                    if (suggestion.parentNode) {
                        suggestion.remove();
                    }
                }, 5000);
            }
        }
        
        showPlayButton() {
            // 如果自动播放失败，显示播放按钮
            const playBtn = document.createElement('button');
            playBtn.className = 'big-play-button';
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.addEventListener('click', () => {
                this.videoPlayer.play();
                playBtn.remove();
            });
            
            document.querySelector('.video-preview').appendChild(playBtn);
        }
        
        addClickEffect(event) {
            // 添加点击涟漪效果
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            event.currentTarget.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        
        getDeviceType(videoId) {
            const types = {
                '1': 'tablet',
                '2': 'laptop',
                '3': 'display'
            };
            return types[videoId] || 'unknown';
        }
        
        logAnalytics(event, data) {
            // 模拟发送分析数据
            console.log(`[Video Analytics] ${event}:`, data);
            
            // 实际项目中会发送到分析服务器
            // fetch('/api/analytics', {
            //     method: 'POST',
            //     body: JSON.stringify({ event, data })
            // });
        }
    }
    
    // 初始化高级视频预览
    const videoPreview = new AdvancedVideoPreview();
    
    // ============================================
    // 效果4: 求购公告实时通信系统
    // ============================================
    class WantedBoardSystem {
        constructor() {
            this.posts = [];
            this.socket = null;
            this.init();
        }
        
        init() {
            this.loadInitialPosts();
            this.setupEventListeners();
            this.setupRealTimeUpdates();
            this.setupAutoRefresh();
        }
        
        loadInitialPosts() {
            // 初始求购数据
            this.posts = [
                {
                    id: 1,
                    user: '张同学',
                    item: '27寸4K显示器',
                    detail: '需要IPS面板，预算1500左右，最好有原装支架',
                    time: '2分钟前',
                    avatar: '张'
                },
                {
                    id: 2,
                    user: '李学姐',
                    item: 'iPad Pro 2021款',
                    detail: '准备考研用，希望成色好一点，电池健康度90%以上',
                    time: '15分钟前',
                    avatar: '李'
                },
                {
                    id: 3,
                    user: '王学长',
                    item: '机械键盘',
                    detail: '青轴或茶轴，RGB背光，预算300以内',
                    time: '半小时前',
                    avatar: '王'
                }
            ];
            
            this.renderPosts();
        }
        
        renderPosts() {
            const container = document.getElementById('wantedPosts');
            container.innerHTML = '';
            
            this.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'wanted-post';
                postElement.dataset.id = post.id;
                postElement.innerHTML = `
                    <div class="post-header">
                        <div class="post-user">
                            <div class="user-avatar">${post.avatar}</div>
                            <div>
                                <div class="user-name">${post.user}</div>
                                <div class="post-time">${post.time}</div>
                            </div>
                        </div>
                        <button class="btn-contact-user" data-user="${post.user}">
                            <i class="fas fa-comment"></i>
                        </button>
                    </div>
                    <div class="post-content">
                        <i class="fas fa-search"></i> 求购：${post.item}
                    </div>
                    <div class="post-detail">${post.detail}</div>
                    <div class="post-actions">
                        <button class="btn-like" data-id="${post.id}">
                            <i class="far fa-heart"></i> <span class="like-count">0</span>
                        </button>
                        <button class="btn-offer" data-id="${post.id}">
                            <i class="fas fa-handshake"></i> 我有货
                        </button>
                    </div>
                `;
                
                container.appendChild(postElement);
            });
            
            // 添加互动功能
            this.setupPostInteractions();
        }
        
        setupPostInteractions() {
            // 点赞功能
            document.querySelectorAll('.btn-like').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const postId = parseInt(btn.dataset.id);
                    this.handleLike(postId, btn);
                });
            });
            
            // 我有货功能
            document.querySelectorAll('.btn-offer').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const postId = parseInt(btn.dataset.id);
                    this.showOfferModal(postId);
                });
            });
            
            // 联系用户
            document.querySelectorAll('.btn-contact-user').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const user = btn.dataset.user;
                    this.startChat(user);
                });
            });
            
            // 悬停效果
            document.querySelectorAll('.wanted-post').forEach(post => {
                post.addEventListener('mouseenter', () => {
                    post.style.transform = 'translateX(5px)';
                    post.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                });
                
                post.addEventListener('mouseleave', () => {
                    post.style.transform = 'translateX(0)';
                    post.style.boxShadow = 'none';
                });
            });
        }
        
        handleLike(postId, button) {
            const likeCount = button.querySelector('.like-count');
            const currentCount = parseInt(likeCount.textContent);
            const isLiked = button.classList.contains('liked');
            
            if (isLiked) {
                likeCount.textContent = currentCount - 1;
                button.classList.remove('liked');
                button.querySelector('i').className = 'far fa-heart';
            } else {
                likeCount.textContent = currentCount + 1;
                button.classList.add('liked');
                button.querySelector('i').className = 'fas fa-heart';
                
                // 添加点赞动画
                this.createLikeAnimation(button);
            }
            
            // 保存到本地存储
            this.saveLikeState(postId, !isLiked);
        }
        
        createLikeAnimation(button) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                font-size: 16px;
                animation: floatUp 1s ease-out forwards;
                pointer-events: none;
            `;
            
            button.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
            
            // 添加CSS动画
            if (!document.getElementById('like-animation')) {
                const style = document.createElement('style');
                style.id = 'like-animation';
                style.textContent = `
                    @keyframes floatUp {
                        0% {
                            transform: translateY(0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(-30px) scale(1.5);
                            opacity: 0;
                        }
                    }
                    .btn-like.liked i {
                        color: #ef4444 !important;
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        showOfferModal(postId) {
            const post = this.posts.find(p => p.id === postId);
            if (!post) return;
            
            // 创建模态框
            const modal = document.createElement('div');
            modal.className = 'offer-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>向${post.user}提供商品</h4>
                        <button class="btn-close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>您正在响应求购：<strong>${post.item}</strong></p>
                        
                        <div class="form-group">
                            <label>您的商品信息</label>
                            <input type="text" class="offer-title" placeholder="商品标题" maxlength="50">
                        </div>
                        
                        <div class="form-group">
                            <label>商品描述</label>
                            <textarea class="offer-desc" placeholder="详细描述您的商品..." rows="3"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>价格</label>
                            <input type="number" class="offer-price" placeholder="报价" min="0">
                        </div>
                        
                        <div class="form-group">
                            <label>联系方式</label>
                            <input type="text" class="offer-contact" placeholder="微信/电话" maxlength="30">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-cancel">取消</button>
                        <button class="btn-submit-offer">发送报价</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // 添加模态框样式
            this.addModalStyles();
            
            // 事件监听
            modal.querySelector('.btn-close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.querySelector('.btn-cancel').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.querySelector('.btn-submit-offer').addEventListener('click', () => {
                this.submitOffer(postId, modal);
            });
            
            // 点击背景关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
        
        addModalStyles() {
            if (!document.getElementById('modal-styles')) {
                const style = document.createElement('style');
                style.id = 'modal-styles';
                style.textContent = `
                    .offer-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                        backdrop-filter: blur(5px);
                        animation: fadeIn 0.3s ease;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .modal-content {
                        background: white;
                        border-radius: 16px;
                        width: 90%;
                        max-width: 500px;
                        max-height: 90vh;
                        overflow-y: auto;
                        animation: slideUp 0.3s ease;
                    }
                    @keyframes slideUp {
                        from { transform: translateY(30px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .modal-header {
                        padding: 20px;
                        border-bottom: 1px solid #e2e8f0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .modal-header h4 {
                        margin: 0;
                        color: #1e293b;
                    }
                    .btn-close-modal {
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #64748b;
                    }
                    .modal-body {
                        padding: 20px;
                    }
                    .modal-footer {
                        padding: 20px;
                        border-top: 1px solid #e2e8f0;
                        display: flex;
                        justify-content: flex-end;
                        gap: 10px;
                    }
                    .form-group {
                        margin-bottom: 15px;
                    }
                    .form-group label {
                        display: block;
                        margin-bottom: 5px;
                        color: #475569;
                        font-weight: 500;
                    }
                    .form-group input,
                    .form-group textarea {
                        width: 100%;
                        padding: 10px;
                        border: 2px solid #e2e8f0;
                        border-radius: 8px;
                        font-family: inherit;
                    }
                    .form-group input:focus,
                    .form-group textarea:focus {
                        outline: none;
                        border-color: #3b82f6;
                    }
                    .btn-cancel,
                    .btn-submit-offer {
                        padding: 10px 20px;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .btn-cancel {
                        background: #f1f5f9;
                        color: #64748b;
                        border: 2px solid #e2e8f0;
                    }
                    .btn-submit-offer {
                        background: #3b82f6;
                        color: white;
                        border: none;
                    }
                    .btn-cancel:hover {
                        background: #e2e8f0;
                    }
                    .btn-submit-offer:hover {
                        background: #2563eb;
                        transform: translateY(-2px);
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        submitOffer(postId, modal) {
            const title = modal.querySelector('.offer-title').value;
            const desc = modal.querySelector('.offer-desc').value;
            const price = modal.querySelector('.offer-price').value;
            const contact = modal.querySelector('.offer-contact').value;
            
            if (!title || !desc || !price || !contact) {
                this.showNotification('请填写所有必填字段', 'error');
                return;
            }
            
            // 模拟发送报价
            this.showNotification('报价已发送给求购者！', 'success');
            
            // 记录报价
            this.logOffer(postId, { title, desc, price, contact });
            
            // 关闭模态框
            modal.remove();
        }
        
        startChat(user) {
            // 模拟开始聊天
            this.showNotification(`正在与${user}建立聊天...`, 'info');
            
            // 模拟打开聊天窗口
            setTimeout(() => {
                this.showChatWindow(user);
            }, 1000);
        }
        
        showChatWindow(user) {
            // 创建聊天窗口
            const chatWindow = document.createElement('div');
            chatWindow.className = 'chat-window';
            chatWindow.innerHTML = `
                <div class="chat-header">
                    <div class="chat-user">
                        <div class="user-avatar-small">${user.charAt(0)}</div>
                        <div class="user-name">${user}</div>
                    </div>
                    <button class="btn-close-chat">&times;</button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="message received">
                        <div class="message-content">
                            你好！我对你发布的求购信息感兴趣
                        </div>
                        <div class="message-time">现在</div>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="输入消息..." id="chatInput" maxlength="200">
                    <button id="sendMessage">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            `;
            
            document.body.appendChild(chatWindow);
            
            // 添加聊天样式
            this.addChatStyles();
            
            // 事件监听
            chatWindow.querySelector('.btn-close-chat').addEventListener('click', () => {
                chatWindow.remove();
            });
            
            const chatInput = chatWindow.querySelector('#chatInput');
            const sendBtn = chatWindow.querySelector('#sendMessage');
            
            sendBtn.addEventListener('click', () => {
                this.sendChatMessage(chatInput.value, chatWindow);
                chatInput.value = '';
            });
            
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage(chatInput.value, chatWindow);
                    chatInput.value = '';
                }
            });
            
            // 自动聚焦输入框
            setTimeout(() => {
                chatInput.focus();
            }, 100);
        }
        
        sendChatMessage(message, chatWindow) {
            if (!message.trim()) return;
            
            const messagesContainer = chatWindow.querySelector('#chatMessages');
            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            messageElement.innerHTML = `
                <div class="message-content">${message}</div>
                <div class="message-time">现在</div>
            `;
            
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // 模拟对方回复
            setTimeout(() => {
                const replyElement = document.createElement('div');
                replyElement.className = 'message received';
                replyElement.innerHTML = `
                    <div class="message-content">好的，我们可以约个时间看货</div>
                    <div class="message-time">现在</div>
                `;
                messagesContainer.appendChild(replyElement);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1500);
        }
        
        addChatStyles() {
            if (!document.getElementById('chat-styles')) {
                const style = document.createElement('style');
                style.id = 'chat-styles';
                style.textContent = `
                    .chat-window {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        width: 350px;
                        height: 500px;
                        background: white;
                        border-radius: 16px;
                        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                        display: flex;
                        flex-direction: column;
                        z-index: 9998;
                        animation: slideInUp 0.3s ease;
                    }
                    @keyframes slideInUp {
                        from { transform: translateY(100px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .chat-header {
                        padding: 15px;
                        border-bottom: 1px solid #e2e8f0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background: #3b82f6;
                        color: white;
                        border-radius: 16px 16px 0 0;
                    }
                    .chat-user {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .user-avatar-small {
                        width: 32px;
                        height: 32px;
                        background: white;
                        color: #3b82f6;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                    }
                    .btn-close-chat {
                        background: none;
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                    }
                    .chat-messages {
                        flex: 1;
                        padding: 15px;
                        overflow-y: auto;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .message {
                        max-width: 80%;
                        padding: 10px 15px;
                        border-radius: 18px;
                        animation: fadeIn 0.3s ease;
                    }
                    .message.sent {
                        align-self: flex-end;
                        background: #3b82f6;
                        color: white;
                        border-radius: 18px 18px 4px 18px;
                    }
                    .message.received {
                        align-self: flex-start;
                        background: #f1f5f9;
                        color: #1e293b;
                        border-radius: 18px 18px 18px 4px;
                    }
                    .message-time {
                        font-size: 11px;
                        color: rgba(255,255,255,0.7);
                        margin-top: 4px;
                        text-align: right;
                    }
                    .message.received .message-time {
                        color: #64748b;
                    }
                    .chat-input {
                        padding: 15px;
                        border-top: 1px solid #e2e8f0;
                        display: flex;
                        gap: 10px;
                    }
                    .chat-input input {
                        flex: 1;
                        padding: 10px 15px;
                        border: 2px solid #e2e8f0;
                        border-radius: 25px;
                        outline: none;
                    }
                    .chat-input input:focus {
                        border-color: #3b82f6;
                    }
                    .chat-input button {
                        width: 44px;
                        height: 44px;
                        background: #3b82f6;
                        color: white;
                        border: none;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        setupEventListeners() {
            // 发布求购
            document.getElementById('postWanted').addEventListener('click', () => {
                this.postNewWanted();
            });
            
            // 字符计数
            const wantedItemInput = document.getElementById('wantedItem');
            const charCountElement = document.getElementById('charCount');
            
            wantedItemInput.addEventListener('input', () => {
                charCountElement.textContent = wantedItemInput.value.length;
            });
            
            // 输入框特效
            wantedItemInput.addEventListener('focus', () => {
                wantedItemInput.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
            });
            
            wantedItemInput.addEventListener('blur', () => {
                wantedItemInput.style.boxShadow = 'none';
            });
        }
        
        postNewWanted() {
            const item = document.getElementById('wantedItem').value;
            const detail = document.getElementById('wantedDetail').value;
            
            if (!item.trim()) {
                this.showNotification('请输入求购物品', 'error');
                return;
            }
            
            // 创建新求购
            const newPost = {
                id: Date.now(),
                user: '我',
                item: item,
                detail: detail || '无详细描述',
                time: '刚刚',
                avatar: '我'
            };
            
            // 添加到顶部
            this.posts.unshift(newPost);
            this.renderPosts();
            
            // 清空表单
            document.getElementById('wantedItem').value = '';
            document.getElementById('wantedDetail').value = '';
            document.getElementById('charCount').textContent = '0';
            
            // 显示成功通知
            this.showNotification('求购信息已发布！', 'success');
            
            // 添加发布动画
            this.addPostAnimation(newPost);
            
            // 模拟推送给其他用户
            this.simulatePushNotification(newPost);
        }
        
        addPostAnimation(post) {
            const container = document.getElementById('wantedPosts');
            const firstPost = container.querySelector('.wanted-post');
            
            if (firstPost) {
                firstPost.style.animation = 'pulse 1s ease';
                
                // 添加CSS动画
                if (!document.getElementById('post-animation')) {
                    const style = document.createElement('style');
                    style.id = 'post-animation';
                    style.textContent = `
                        @keyframes pulse {
                            0% { transform: scale(1); box-shadow: none; }
                            50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
                            100% { transform: scale(1); box-shadow: none; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        }
        
        simulatePushNotification(post) {
            // 模拟推送通知
            if (Notification.permission === 'granted') {
                new Notification('新求购信息', {
                    body: `${post.user}正在求购：${post.item}`,
                    icon: '/favicon.ico'
                });
            }
        }
        
        setupRealTimeUpdates() {
            // 模拟WebSocket连接
            this.socket = {
                send: (data) => {
                    console.log('[WebSocket] Send:', data);
                },
                close: () => {}
            };
            
            // 模拟接收新求购
            setInterval(() => {
                if (Math.random() > 0.7) { // 30%概率收到新求购
                    this.receiveNewPost();
                }
            }, 30000); // 每30秒检查一次
        }
        
        receiveNewPost() {
            const users = ['赵同学', '钱学姐', '孙学长', '李同学'];
            const items = [
                '蓝牙耳机',
                '游戏鼠标',
                '外接硬盘',
                '平板支架',
                'Type-C扩展坞',
                '便携显示器'
            ];
            
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomItem = items[Math.floor(Math.random() * items.length)];
            
            const newPost = {
                id: Date.now(),
                user: randomUser,
                item: randomItem,
                detail: '来自系统模拟的求购信息',
                time: '刚刚',
                avatar: randomUser.charAt(0)
            };
            
            this.posts.unshift(newPost);
            this.renderPosts();
            
            // 显示新消息提示
            this.showNewPostIndicator(newPost);
        }
        
        showNewPostIndicator(post) {
            const indicator = document.createElement('div');
            indicator.className = 'new-post-indicator';
            indicator.innerHTML = `
                <span>📢 ${post.user}发布了新求购：${post.item}</span>
                <button class="btn-dismiss">×</button>
            `;
            
            indicator.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                color: white;
                padding: 12px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(59, 130, 246, 0.3);
                z-index: 9997;
                display: flex;
                align-items: center;
                gap: 15px;
                animation: slideInRight 0.5s ease;
            `;
            
            document.body.appendChild(indicator);
            
            // 添加动画
            if (!document.getElementById('indicator-animation')) {
                const style = document.createElement('style');
                style.id = 'indicator-animation';
                style.textContent = `
                    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // 关闭按钮
            indicator.querySelector('.btn-dismiss').addEventListener('click', () => {
                indicator.style.animation = 'slideOutRight 0.5s ease forwards';
                setTimeout(() => indicator.remove(), 500);
            });
            
            // 5秒后自动消失
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.style.animation = 'slideOutRight 0.5s ease forwards';
                    setTimeout(() => indicator.remove(), 500);
                }
            }, 5000);
        }
        
        setupAutoRefresh() {
            // 每2分钟刷新一次数据
            setInterval(() => {
                this.refreshPosts();
            }, 120000);
        }
        
        refreshPosts() {
            // 模拟刷新数据
            this.showNotification('求购信息已更新', 'info');
            this.renderPosts();
        }
        
        saveLikeState(postId, liked) {
            // 保存到localStorage
            const likes = JSON.parse(localStorage.getItem('wanted_likes') || '{}');
            likes[postId] = liked;
            localStorage.setItem('wanted_likes', JSON.stringify(likes));
        }
        
        logOffer(postId, offer) {
            // 记录报价
            const offers = JSON.parse(localStorage.getItem('wanted_offers') || '[]');
            offers.push({
                postId,
                offer,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('wanted_offers', JSON.stringify(offers));
        }
        
        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
                color: white;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            // 3秒后移除
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    }
    
    // 初始化求购公告系统
    const wantedBoard = new WantedBoardSystem();
    
    // ============================================
    // 页面初始化特效
    // ============================================
    
    // 1. 粒子背景效果
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#3b82f6" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#8b5cf6",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        },
        retina_detect: true
    });
    
    // 2. 页面滚动动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有模块
    document.querySelectorAll('.module').forEach(module => {
        observer.observe(module);
    });
    
    // 3. 性能监控
    if ('performance' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 100) {
                    console.warn('慢操作检测:', entry.name, entry.duration);
                }
            }
        });
        
        perfObserver.observe({ entryTypes: ['measure', 'longtask'] });
    }
    
    // 4. 电池健康度图表
    setTimeout(() => {
        const batteryCtx = document.getElementById('batteryChart').getContext('2d');
        new Chart(batteryCtx, {
            type: 'doughnut',
            data: {
                labels: ['优秀 (90-100%)', '良好 (80-89%)', '一般 (70-79%)', '较差 (<70%)'],
                datasets: [{
                    data: [35, 45, 15, 5],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'white',
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }, 1000);
    
    console.log('所有高级交互效果已加载完成！');
});