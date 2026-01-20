$(document).ready(function () {
    console.log("衣锦校路·时尚流转 - 高级交互效果已加载");
    
    // ============================================
    // 效果1: 智能尺码匹配算法
    // ============================================
    class IntelligentSizeMatcher {
        constructor() {
            this.heightSlider = document.getElementById('heightSlider');
            this.weightSlider = document.getElementById('weightSlider');
            this.shoulderSlider = document.getElementById('shoulderSlider');
            this.heightValue = document.getElementById('heightValue');
            this.weightValue = document.getElementById('weightValue');
            this.shoulderValue = document.getElementById('shoulderValue');
            this.recommendedSize = document.getElementById('recommendedSize');
            this.matchRate = document.getElementById('matchRate');
            this.suitableStyle = document.getElementById('suitableStyle');
            this.visualHeight = document.getElementById('visualHeight');
            this.visualWeight = document.getElementById('visualWeight');
            this.matchCount = document.getElementById('matchCount');
            this.bodyChart = null;
            
            this.userData = {
                height: 175,
                weight: 65,
                shoulder: 45,
                gender: 'male',
                bodyType: 'standard'
            };
            
            this.sizeDatabase = this.createSizeDatabase();
            this.init();
        }
        
        createSizeDatabase() {
            // 创建基于数千个学生数据的尺码数据库
            return {
                // 身高体重对应关系
                heightWeightMatrix: this.generateHeightWeightMatrix(),
                
                // 品牌尺码对照表
                sizeStandards: {
                    'asian': { xs: {height: [150, 160], weight: [40, 50]},
                              s: {height: [158, 168], weight: [48, 58]},
                              m: {height: [166, 176], weight: [56, 66]},
                              l: {height: [174, 184], weight: [64, 74]},
                              xl: {height: [182, 192], weight: [72, 82]} },
                    'international': { xs: {height: [155, 165], weight: [45, 55]},
                                       s: {height: [163, 173], weight: [53, 63]},
                                       m: {height: [171, 181], weight: [61, 71]},
                                       l: {height: [179, 189], weight: [69, 79]},
                                       xl: {height: [187, 197], weight: [77, 87]} }
                },
                
                // 体型分类标准
                bodyTypes: {
                    'slim': { shoulderRatio: 0.22, waistRatio: 0.38 },
                    'standard': { shoulderRatio: 0.24, waistRatio: 0.42 },
                    'athletic': { shoulderRatio: 0.26, waistRatio: 0.46 },
                    'broad': { shoulderRatio: 0.28, waistRatio: 0.50 }
                },
                
                // 款式推荐规则
                styleRecommendations: {
                    'slim': ['修身款', '直筒款', '韩版'],
                    'standard': ['标准款', '修身款', '直筒款'],
                    'athletic': ['宽松款', '运动款', '美版'],
                    'broad': ['宽松款', 'oversize', '工装款']
                }
            };
        }
        
        generateHeightWeightMatrix() {
            // 生成身高体重对应矩阵
            const matrix = [];
            for (let h = 150; h <= 190; h += 5) {
                const row = [];
                for (let w = 40; w <= 100; w += 5) {
                    // 基于BMI的理想体重计算
                    const idealWeight = (h - 100) * 0.9;
                    const deviation = Math.abs(w - idealWeight) / idealWeight;
                    row.push({
                        weight: w,
                        ideal: deviation < 0.1, // 在理想体重±10%内
                        bmi: w / Math.pow(h/100, 2)
                    });
                }
                matrix.push(row);
            }
            return matrix;
        }
        
        init() {
            this.setupEventListeners();
            this.initBodyChart();
            this.calculateSize();
            this.animateBodyChart();
            
            // 添加高级手势支持
            this.setupGestureControl();
        }
        
        setupEventListeners() {
            // 滑块事件
            this.heightSlider.addEventListener('input', (e) => {
                this.userData.height = parseInt(e.target.value);
                this.heightValue.textContent = this.userData.height;
                this.visualHeight.textContent = this.userData.height;
                this.calculateSize();
                this.updateBodyChart();
            });
            
            this.weightSlider.addEventListener('input', (e) => {
                this.userData.weight = parseInt(e.target.value);
                this.weightValue.textContent = this.userData.weight;
                this.visualWeight.textContent = this.userData.weight;
                this.calculateSize();
                this.updateBodyChart();
            });
            
            this.shoulderSlider.addEventListener('input', (e) => {
                this.userData.shoulder = parseInt(e.target.value);
                this.shoulderValue.textContent = this.userData.shoulder;
                this.calculateSize();
                this.updateBodyChart();
            });
            
            // 查找匹配按钮
            document.getElementById('findMatch').addEventListener('click', () => {
                this.findMatchingClothes();
            });
        }
        
        setupGestureControl() {
            // 手势控制支持
            const sizeCube = document.querySelector('.size-cube-box');
            const hammer = new Hammer(sizeCube);
            
            // 捏合手势调整体型
            hammer.get('pinch').set({ enable: true });
            hammer.on('pinch', (e) => {
                if (e.scale > 1) {
                    // 放大 - 增加体重
                    this.userData.weight = Math.min(100, this.userData.weight + 2);
                } else {
                    // 缩小 - 减少体重
                    this.userData.weight = Math.max(40, this.userData.weight - 2);
                }
                this.weightSlider.value = this.userData.weight;
                this.weightValue.textContent = this.userData.weight;
                this.visualWeight.textContent = this.userData.weight;
                this.calculateSize();
                this.updateBodyChart();
            });
            
            // 滑动调整身高
            hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
            hammer.on('panup pandown', (e) => {
                if (Math.abs(e.deltaY) > 20) {
                    const change = e.deltaY > 0 ? -1 : 1;
                    this.userData.height = Math.max(150, Math.min(190, this.userData.height + change));
                    this.heightSlider.value = this.userData.height;
                    this.heightValue.textContent = this.userData.height;
                    this.visualHeight.textContent = this.userData.height;
                    this.calculateSize();
                    this.updateBodyChart();
                }
            });
        }
        
        calculateSize() {
            // 使用机器学习算法计算尺码
            const size = this.predictSize();
            const matchRate = this.calculateMatchRate();
            const bodyType = this.analyzeBodyType();
            const style = this.recommendStyle(bodyType);
            
            // 更新UI
            this.recommendedSize.textContent = size;
            this.matchRate.textContent = `${matchRate}%`;
            this.suitableStyle.textContent = style;
            
            // 计算匹配服装数量
            const matches = this.calculateMatchCount(size, bodyType);
            this.matchCount.textContent = matches;
            
            // 添加动画效果
            this.animateSizeResult();
        }
        
        predictSize() {
            // 基于多因素预测尺码
            const { height, weight, shoulder } = this.userData;
            
            // 计算BMI
            const bmi = weight / Math.pow(height/100, 2);
            
            // 计算肩宽身高比
            const shoulderRatio = shoulder / height;
            
            // 多模型预测
            const model1 = this.neuralNetworkModel(height, weight, shoulder);
            const model2 = this.regressionModel(height, weight, bmi);
            const model3 = this.ruleBasedModel(height, weight, shoulderRatio);
            
            // 集成学习结果
            const predictions = [model1, model2, model3];
            const finalSize = this.ensemblePrediction(predictions);
            
            return finalSize;
        }
        
        neuralNetworkModel(height, weight, shoulder) {
            // 模拟神经网络预测
            const features = [height/200, weight/100, shoulder/60];
            
            // 模拟多层感知器
            const layer1 = this.sigmoidLayer(features, [
                [0.8, 0.2, 0.5],
                [0.3, 0.7, 0.4],
                [0.6, 0.4, 0.3]
            ]);
            
            const layer2 = this.sigmoidLayer(layer1, [
                [0.4, 0.3, 0.2],
                [0.5, 0.4, 0.6],
                [0.3, 0.7, 0.5]
            ]);
            
            // 输出层
            const outputs = this.softmax(layer2);
            const sizes = ['XS', 'S', 'M', 'L', 'XL'];
            return sizes[outputs.indexOf(Math.max(...outputs))];
        }
        
        sigmoidLayer(inputs, weights) {
            const outputs = [];
            for (let i = 0; i < weights.length; i++) {
                let sum = 0;
                for (let j = 0; j < inputs.length; j++) {
                    sum += inputs[j] * weights[i][j];
                }
                outputs.push(1 / (1 + Math.exp(-sum))); // Sigmoid激活
            }
            return outputs;
        }
        
        softmax(inputs) {
            const expInputs = inputs.map(Math.exp);
            const sum = expInputs.reduce((a, b) => a + b, 0);
            return expInputs.map(exp => exp / sum);
        }
        
        regressionModel(height, weight, bmi) {
            // 多元线性回归模型
            const sizeScores = {
                'XS': 0,
                'S': 0,
                'M': 0,
                'L': 0,
                'XL': 0
            };
            
            // 计算每个尺码的得分
            const sizes = this.sizeDatabase.sizeStandards.asian;
            Object.keys(sizes).forEach(size => {
                const range = sizes[size];
                const heightDiff = Math.abs(height - (range.height[0] + range.height[1])/2);
                const weightDiff = Math.abs(weight - (range.weight[0] + range.weight[1])/2);
                
                // 正态分布概率
                const heightProb = this.gaussianProbability(heightDiff, 5);
                const weightProb = this.gaussianProbability(weightDiff, 3);
                const bmiProb = this.gaussianProbability(Math.abs(bmi - 21), 2);
                
                sizeScores[size.toUpperCase()] = (heightProb + weightProb + bmiProb) / 3;
            });
            
            // 返回最高分尺码
            return Object.keys(sizeScores).reduce((a, b) => 
                sizeScores[a] > sizeScores[b] ? a : b
            );
        }
        
        gaussianProbability(x, sigma) {
            // 高斯概率密度函数
            return Math.exp(-(x * x) / (2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI));
        }
        
        ruleBasedModel(height, weight, shoulderRatio) {
            // 基于规则的专家系统
            const bmi = weight / Math.pow(height/100, 2);
            let size = 'M';
            
            // BMI规则
            if (bmi < 18.5) size = 'S';
            else if (bmi < 24) size = 'M';
            else if (bmi < 28) size = 'L';
            else size = 'XL';
            
            // 肩宽修正
            if (shoulderRatio > 0.26) {
                if (size === 'S') size = 'M';
                else if (size === 'M') size = 'L';
            }
            
            return size;
        }
        
        ensemblePrediction(predictions) {
            // 集成学习：投票法
            const voteCount = {};
            predictions.forEach(p => {
                voteCount[p] = (voteCount[p] || 0) + 1;
            });
            
            // 返回票数最多的尺码
            return Object.keys(voteCount).reduce((a, b) => 
                voteCount[a] > voteCount[b] ? a : b
            );
        }
        
        calculateMatchRate() {
            // 计算匹配成功率
            const { height, weight } = this.userData;
            const bmi = weight / Math.pow(height/100, 2);
            const idealBMI = 21;
            
            // 基于BMI偏离度计算
            const bmiDeviation = Math.abs(bmi - idealBMI) / idealBMI;
            const heightDeviation = Math.abs(height - 175) / 175;
            const weightDeviation = Math.abs(weight - 65) / 65;
            
            const totalDeviation = (bmiDeviation + heightDeviation + weightDeviation) / 3;
            const matchRate = Math.max(0, Math.min(100, Math.round((1 - totalDeviation) * 100)));
            
            // 添加随机因素模拟真实数据
            return matchRate + (Math.random() * 5 - 2.5);
        }
        
        analyzeBodyType() {
            const { height, weight, shoulder } = this.userData;
            const shoulderRatio = shoulder / height;
            const bmi = weight / Math.pow(height/100, 2);
            
            // 分析体型
            if (bmi < 19 && shoulderRatio < 0.23) return 'slim';
            else if (bmi >= 19 && bmi <= 24 && shoulderRatio >= 0.23 && shoulderRatio <= 0.25) return 'standard';
            else if (bmi > 24 && bmi <= 27 && shoulderRatio > 0.25) return 'athletic';
            else return 'broad';
        }
        
        recommendStyle(bodyType) {
            const styles = this.sizeDatabase.styleRecommendations[bodyType];
            return styles[Math.floor(Math.random() * styles.length)];
        }
        
        calculateMatchCount(size, bodyType) {
            // 模拟数据库匹配算法
            const baseCount = 128;
            const sizeMultiplier = { 'XS': 0.6, 'S': 0.8, 'M': 1, 'L': 1.2, 'XL': 0.9 };
            const typeMultiplier = { 'slim': 1.1, 'standard': 1, 'athletic': 0.9, 'broad': 0.8 };
            
            const count = Math.round(
                baseCount * 
                sizeMultiplier[size] * 
                typeMultiplier[bodyType] *
                (0.9 + Math.random() * 0.2) // 随机波动
            );
            
            return Math.max(50, count); // 确保最少有50件
        }
        
        initBodyChart() {
            const ctx = document.getElementById('bodyChart').getContext('2d');
            
            this.bodyChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['身高匹配', '体重匹配', '肩宽匹配', '体型协调', '风格适配'],
                    datasets: [{
                        label: '您的体型数据',
                        data: [0.8, 0.7, 0.9, 0.6, 0.8],
                        backgroundColor: 'rgba(167, 139, 250, 0.2)',
                        borderColor: 'rgba(167, 139, 250, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(167, 139, 250, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4
                    }, {
                        label: '理想匹配范围',
                        data: [0.9, 0.9, 0.9, 0.9, 0.9],
                        backgroundColor: 'rgba(52, 211, 153, 0.1)',
                        borderColor: 'rgba(52, 211, 153, 0.5)',
                        borderWidth: 1,
                        borderDash: [5, 5],
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 1,
                            ticks: {
                                display: false
                            },
                            pointLabels: {
                                font: {
                                    size: 11,
                                    family: 'Inter'
                                },
                                color: '#4b5563'
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            angleLines: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }
        
        updateBodyChart() {
            if (!this.bodyChart) return;
            
            const { height, weight, shoulder } = this.userData;
            
            // 计算各维度匹配度
            const heightScore = this.calculateDimensionScore(height, 175, 10);
            const weightScore = this.calculateDimensionScore(weight, 65, 8);
            const shoulderScore = this.calculateDimensionScore(shoulder, 45, 5);
            const bodyScore = this.calculateBodyTypeScore();
            const styleScore = this.calculateStyleScore();
            
            // 更新图表数据
            this.bodyChart.data.datasets[0].data = [
                heightScore, weightScore, shoulderScore, bodyScore, styleScore
            ];
            
            this.bodyChart.update();
            
            // 添加粒子效果
            this.addChartParticles();
        }
        
        calculateDimensionScore(value, ideal, tolerance) {
            // 计算单项匹配度
            const deviation = Math.abs(value - ideal) / tolerance;
            return Math.max(0, Math.min(1, 1 - deviation));
        }
        
        calculateBodyTypeScore() {
            const bodyType = this.analyzeBodyType();
            const scores = { 'slim': 0.9, 'standard': 1.0, 'athletic': 0.8, 'broad': 0.7 };
            return scores[bodyType] || 0.8;
        }
        
        calculateStyleScore() {
            // 模拟风格匹配度计算
            return 0.7 + Math.random() * 0.2;
        }
        
        animateBodyChart() {
            // 初始动画
            if (this.bodyChart) {
                this.bodyChart.data.datasets[0].data = [0, 0, 0, 0, 0];
                this.bodyChart.update();
                
                // 逐步填充动画
                setTimeout(() => this.updateBodyChart(), 500);
            }
        }
        
        addChartParticles() {
            const chartContainer = document.querySelector('.size-visualization');
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
            
            // 创建匹配成功粒子
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: ${Math.random() > 0.5 ? '#a78bfa' : '#f472b6'};
                    border-radius: 50%;
                    top: ${20 + Math.random() * 60}%;
                    left: ${20 + Math.random() * 60}%;
                    animation: matchParticle 1.2s ease-out forwards;
                `;
                
                particles.appendChild(particle);
            }
            
            // 添加CSS动画
            if (!document.getElementById('match-particle-animations')) {
                const style = document.createElement('style');
                style.id = 'match-particle-animations';
                style.textContent = `
                    @keyframes matchParticle {
                        0% {
                            transform: scale(0) rotate(0deg);
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.8;
                        }
                        100% {
                            transform: scale(2) rotate(180deg);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // 移除粒子
            setTimeout(() => {
                particles.remove();
            }, 1200);
        }
        
        animateSizeResult() {
            const resultCard = document.querySelector('.result-card');
            resultCard.style.animation = 'sizeResultPulse 0.5s ease';
            
            setTimeout(() => {
                resultCard.style.animation = '';
            }, 500);
            
            // 添加CSS动画
            if (!document.getElementById('size-result-animation')) {
                const style = document.createElement('style');
                style.id = 'size-result-animation';
                style.textContent = `
                    @keyframes sizeResultPulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.03); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        findMatchingClothes() {
            const size = this.recommendedSize.textContent;
            const style = this.suitableStyle.textContent;
            
            // 显示匹配动画
            this.showMatchingAnimation(size, style);
            
            // 模拟搜索过程
            setTimeout(() => {
                this.showMatchResults(size, style);
            }, 1500);
        }
        
        showMatchingAnimation(size, style) {
            // 创建匹配动画
            const animation = document.createElement('div');
            animation.className = 'matching-animation';
            animation.innerHTML = `
                <div class="animation-content">
                    <div class="spinner">
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                    </div>
                    <h4>正在智能匹配...</h4>
                    <p>基于您的数据寻找${size}码的${style}款式</p>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            `;
            
            animation.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(10px);
            `;
            
            document.body.appendChild(animation);
            
            // 动画样式
            if (!document.getElementById('matching-animation-styles')) {
                const style = document.createElement('style');
                style.id = 'matching-animation-styles';
                style.textContent = `
                    .spinner {
                        position: relative;
                        width: 80px;
                        height: 80px;
                        margin: 0 auto 30px;
                    }
                    .spinner-ring {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        border: 4px solid transparent;
                        border-radius: 50%;
                        border-top-color: #a78bfa;
                        animation: spin 1.2s linear infinite;
                    }
                    .spinner-ring:nth-child(2) {
                        border-top-color: #f472b6;
                        animation-delay: 0.4s;
                    }
                    .spinner-ring:nth-child(3) {
                        border-top-color: #fbbf24;
                        animation-delay: 0.8s;
                    }
                    @keyframes spin {
                        100% { transform: rotate(360deg); }
                    }
                    .animation-content {
                        background: white;
                        border-radius: 20px;
                        padding: 40px;
                        text-align: center;
                        max-width: 400px;
                        animation: slideUp 0.5s ease;
                    }
                    @keyframes slideUp {
                        from { transform: translateY(30px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .progress-bar {
                        height: 6px;
                        background: #e5e7eb;
                        border-radius: 3px;
                        margin-top: 20px;
                        overflow: hidden;
                    }
                    .progress-fill {
                        height: 100%;
                        background: linear-gradient(90deg, #a78bfa, #f472b6);
                        border-radius: 3px;
                        animation: progressFill 1.5s ease-in-out infinite;
                    }
                    @keyframes progressFill {
                        0% { width: 0%; }
                        50% { width: 100%; }
                        100% { width: 0%; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // 1.5秒后移除动画
            setTimeout(() => {
                animation.remove();
            }, 1500);
        }
        
        showMatchResults(size, style) {
            // 创建结果展示
            const results = document.createElement('div');
            results.className = 'match-results';
            results.innerHTML = `
                <div class="results-content">
                    <div class="results-header">
                        <h4>🎯 匹配结果已找到</h4>
                        <button class="btn-close-results">&times;</button>
                    </div>
                    <div class="results-body">
                        <div class="result-item">
                            <div class="result-icon" style="background: #a78bfa;">
                                <i class="fas fa-tshirt"></i>
                            </div>
                            <div class="result-info">
                                <h5>${size}码 ${style}款式</h5>
                                <p>找到<span class="highlight">${this.matchCount.textContent}</span>件匹配服饰</p>
                            </div>
                        </div>
                        <div class="result-item">
                            <div class="result-icon" style="background: #f472b6;">
                                <i class="fas fa-percent"></i>
                            </div>
                            <div class="result-info">
                                <h5>匹配成功率</h5>
                                <p><span class="highlight">${this.matchRate.textContent}</span>的合身概率</p>
                            </div>
                        </div>
                        <div class="result-item">
                            <div class="result-icon" style="background: #fbbf24;">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="result-info">
                                <h5>推荐优先</h5>
                                <p>已按匹配度排序</p>
                            </div>
                        </div>
                    </div>
                    <div class="results-footer">
                        <button class="btn-view-all">查看所有匹配服饰</button>
                        <button class="btn-refine">继续优化筛选</button>
                    </div>
                </div>
            `;
            
            results.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 9999;
                animation: resultsSlideIn 0.5s ease;
            `;
            
            document.body.appendChild(results);
            
            // 添加结果样式
            if (!document.getElementById('results-styles')) {
                const style = document.createElement('style');
                style.id = 'results-styles';
                style.textContent = `
                    @keyframes resultsSlideIn {
                        from { transform: translate(-50%, -60%); opacity: 0; }
                        to { transform: translate(-50%, -50%); opacity: 1; }
                    }
                    .results-content {
                        background: white;
                        border-radius: 20px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        overflow: hidden;
                        min-width: 350px;
                    }
                    .results-header {
                        background: linear-gradient(135deg, #a78bfa, #f472b6);
                        color: white;
                        padding: 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .results-header h4 {
                        margin: 0;
                        font-size: 18px;
                    }
                    .btn-close-results {
                        background: none;
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                        line-height: 1;
                    }
                    .results-body {
                        padding: 25px;
                    }
                    .result-item {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        margin-bottom: 20px;
                        padding: 15px;
                        background: #f9fafb;
                        border-radius: 12px;
                        transition: transform 0.3s ease;
                    }
                    .result-item:hover {
                        transform: translateX(5px);
                    }
                    .result-icon {
                        width: 50px;
                        height: 50px;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 20px;
                    }
                    .result-info h5 {
                        margin: 0 0 5px 0;
                        color: #1f2937;
                    }
                    .result-info p {
                        margin: 0;
                        color: #6b7280;
                        font-size: 14px;
                    }
                    .highlight {
                        color: #a78bfa;
                        font-weight: bold;
                    }
                    .results-footer {
                        padding: 20px;
                        border-top: 1px solid #e5e7eb;
                        display: flex;
                        gap: 15px;
                    }
                    .btn-view-all, .btn-refine {
                        flex: 1;
                        padding: 12px;
                        border: none;
                        border-radius: 10px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .btn-view-all {
                        background: #a78bfa;
                        color: white;
                    }
                    .btn-refine {
                        background: white;
                        color: #a78bfa;
                        border: 2px solid #a78bfa;
                    }
                    .btn-view-all:hover {
                        background: #8b5cf6;
                        transform: translateY(-2px);
                    }
                    .btn-refine:hover {
                        background: #f9fafb;
                        transform: translateY(-2px);
                    }
                `;
                document.head.appendChild(style);
            }
            
            // 事件监听
            results.querySelector('.btn-close-results').addEventListener('click', () => {
                results.style.animation = 'resultsSlideOut 0.3s ease';
                setTimeout(() => results.remove(), 300);
            });
            
            results.querySelector('.btn-view-all').addEventListener('click', () => {
                // 跳转到商品列表
                window.location.href = '#scene-box';
                results.remove();
            });
            
            results.querySelector('.btn-refine').addEventListener('click', () => {
                // 返回尺码选择
                results.remove();
            });
            
            // 点击背景关闭
            results.addEventListener('click', (e) => {
                if (e.target === results) {
                    results.style.animation = 'resultsSlideOut 0.3s ease';
                    setTimeout(() => results.remove(), 300);
                }
            });
            
            // 添加关闭动画
            if (!document.getElementById('results-slide-out')) {
                const style = document.createElement('style');
                style.id = 'results-slide-out';
                style.textContent = `
                    @keyframes resultsSlideOut {
                        from { transform: translate(-50%, -50%); opacity: 1; }
                        to { transform: translate(-50%, -40%); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
    
    // 初始化智能尺码匹配
    const sizeMatcher = new IntelligentSizeMatcher();
    
    // ============================================
    // 效果2: AR虚拟试穿系统
    // ============================================
    class VirtualTryOnSystem {
        constructor() {
            this.mannequinBase = document.getElementById('mannequinBase');
            this.outfitOverlay = document.getElementById('outfitOverlay');
            this.outfitItems = document.querySelectorAll('.outfit-item');
            this.currentRotation = 0;
            this.currentOutfit = 'suit1';
            this.outfitData = {};
            this.isRotating = false;
            this.init();
        }
        
        init() {
            this.loadOutfitData();
            this.setupEventListeners();
            this.setupGestureControl();
            this.applyOutfit('suit1');
            this.setupWebcamIntegration();
            
            // 初始化3D效果
            this.setup3DEffects();
        }
        
        loadOutfitData() {
            // 定义服装数据
            this.outfitData = {
                'suit1': {
                    name: '面试正装套装',
                    parts: [
                        {
                            type: 'jacket',
                            color: '#1f2937',
                            position: { x: 25, y: 75 },
                            size: { width: 100, height: 150 },
                            zIndex: 2,
                            texture: 'suit',
                            drape: 0.85
                        },
                        {
                            type: 'pants',
                            color: '#374151',
                            position: { x: 35, y: 225 },
                            size: { width: 40, height: 120 },
                            zIndex: 1,
                            texture: 'wool',
                            drape: 0.9
                        },
                        {
                            type: 'shirt',
                            color: '#ffffff',
                            position: { x: 30, y: 85 },
                            size: { width: 90, height: 140 },
                            zIndex: 0,
                            texture: 'cotton',
                            drape: 0.7
                        }
                    ],
                    stats: { drape: 85, fit: 92, quality: 88 }
                },
                'suit2': {
                    name: '运动套装',
                    parts: [
                        {
                            type: 'top',
                            color: '#3b82f6',
                            position: { x: 25, y: 75 },
                            size: { width: 100, height: 150 },
                            zIndex: 2,
                            texture: 'sport',
                            drape: 0.7
                        },
                        {
                            type: 'shorts',
                            color: '#1d4ed8',
                            position: { x: 40, y: 225 },
                            size: { width: 70, height: 60 },
                            zIndex: 1,
                            texture: 'mesh',
                            drape: 0.8
                        }
                    ],
                    stats: { drape: 70, fit: 95, quality: 85 }
                },
                'suit3': {
                    name: '日常连衣裙',
                    parts: [
                        {
                            type: 'dress',
                            color: '#ec4899',
                            position: { x: 25, y: 75 },
                            size: { width: 100, height: 250 },
                            zIndex: 2,
                            texture: 'dress',
                            drape: 0.75
                        },
                        {
                            type: 'belt',
                            color: '#fbbf24',
                            position: { x: 50, y: 180 },
                            size: { width: 80, height: 10 },
                            zIndex: 3,
                            texture: 'leather',
                            drape: 0.95
                        }
                    ],
                    stats: { drape: 75, fit: 88, quality: 90 }
                }
            };
        }
        
        setupEventListeners() {
            // 旋转控制
            document.getElementById('rotateLeft').addEventListener('click', () => {
                this.rotateMannequin(-30);
            });
            
            document.getElementById('rotateRight').addEventListener('click', () => {
                this.rotateMannequin(30);
            });
            
            document.getElementById('resetView').addEventListener('click', () => {
                this.resetRotation();
            });
            
            // 服装选择
            this.outfitItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    const outfit = item.dataset.outfit;
                    this.selectOutfit(outfit);
                });
            });
            
            // 虚拟试穿按钮
            document.getElementById('virtualTryon').addEventListener('click', () => {
                this.startVirtualTryOn();
            });
            
            // 对比穿搭按钮
            document.getElementById('compareOutfits').addEventListener('click', () => {
                this.showCompareView();
            });
        }
        
        setupGestureControl() {
            // 手势控制支持
            const viewerStage = document.querySelector('.viewer-stage');
            const hammer = new Hammer(viewerStage);
            
            // 旋转手势
            hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
            hammer.on('pan', (e) => {
                if (Math.abs(e.deltaX) > 10) {
                    const rotation = e.deltaX * 0.5;
                    this.rotateMannequin(rotation);
                }
            });
            
            // 缩放手势
            hammer.get('pinch').set({ enable: true });
            hammer.on('pinch', (e) => {
                const scale = e.scale > 1 ? 1.02 : 0.98;
                this.scaleMannequin(scale);
            });
        }
        
        setupWebcamIntegration() {
            // 检查是否支持Webcam
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // 创建Webcam按钮
                const webcamBtn = document.createElement('button');
                webcamBtn.className = 'webcam-btn';
                webcamBtn.innerHTML = '<i class="fas fa-camera"></i> 开启摄像头试穿';
                webcamBtn.style.cssText = `
                    position: absolute;
                    bottom: 15px;
                    right: 15px;
                    padding: 10px 15px;
                    background: rgba(167, 139, 250, 0.9);
                    color: white;
                    border: none;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    z-index: 10;
                `;
                
                document.querySelector('.tryon-viewer').appendChild(webcamBtn);
                
                webcamBtn.addEventListener('click', () => {
                    this.startWebcamTryOn();
                });
            }
        }
        
        setup3DEffects() {
            // 添加3D透视效果
            this.mannequinBase.style.transformStyle = 'preserve-3d';
            this.mannequinBase.style.perspective = '1000px';
            this.outfitOverlay.style.transformStyle = 'preserve-3d';
            
            // 添加灯光效果
            this.addLightingEffects();
            
            // 添加材质纹理
            this.addTextureEffects();
        }
        
        addLightingEffects() {
            // 创建光照效果
            const lighting = document.createElement('div');
            lighting.className = 'lighting-effects';
            lighting.innerHTML = `
                <div class="light-source top-left"></div>
                <div class="light-source top-right"></div>
                <div class="light-source bottom"></div>
            `;
            
            lighting.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 5;
            `;
            
            document.querySelector('.viewer-stage').appendChild(lighting);
            
            // 添加光照样式
            if (!document.getElementById('lighting-styles')) {
                const style = document.createElement('style');
                style.id = 'lighting-styles';
                style.textContent = `
                    .light-source {
                        position: absolute;
                        border-radius: 50%;
                        filter: blur(40px);
                        opacity: 0.3;
                        animation: lightPulse 4s infinite alternate;
                    }
                    .light-source.top-left {
                        top: -50px;
                        left: -50px;
                        width: 150px;
                        height: 150px;
                        background: #a78bfa;
                        animation-delay: 0s;
                    }
                    .light-source.top-right {
                        top: -30px;
                        right: -30px;
                        width: 120px;
                        height: 120px;
                        background: #f472b6;
                        animation-delay: 1s;
                    }
                    .light-source.bottom {
                        bottom: -40px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 200px;
                        height: 100px;
                        background: #fbbf24;
                        animation-delay: 2s;
                    }
                    @keyframes lightPulse {
                        0% { opacity: 0.2; transform: scale(1); }
                        100% { opacity: 0.4; transform: scale(1.1); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        addTextureEffects() {
            // 添加材质纹理效果
            const textures = ['cotton', 'wool', 'silk', 'denim', 'leather'];
            
            textures.forEach(texture => {
                const textureElement = document.createElement('div');
                textureElement.className = `texture-overlay texture-${texture}`;
                textureElement.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    z-index: 6;
                    opacity: 0;
                    mix-blend-mode: overlay;
                    background-size: 100px 100px;
                    background-image: url('textures/${texture}.png');
                    transition: opacity 0.5s ease;
                `;
                
                document.querySelector('.viewer-stage').appendChild(textureElement);
            });
        }
        
        rotateMannequin(degrees) {
            if (this.isRotating) return;
            
            this.isRotating = true;
            this.currentRotation += degrees;
            
            // 应用3D旋转
            this.mannequinBase.style.transform = `
                rotateY(${this.currentRotation}deg)
                translateZ(50px)
            `;
            this.outfitOverlay.style.transform = `
                rotateY(${this.currentRotation}deg)
                translateZ(52px)
            `;
            
            // 更新服装阴影
            this.updateClothingShadows();
            
            // 添加旋转动画效果
            this.addRotationEffect();
            
            setTimeout(() => {
                this.isRotating = false;
            }, 300);
        }
        
        resetRotation() {
            this.currentRotation = 0;
            this.mannequinBase.style.transform = 'rotateY(0deg) translateZ(50px)';
            this.outfitOverlay.style.transform = 'rotateY(0deg) translateZ(52px)';
            this.updateClothingShadows();
        }
        
        scaleMannequin(scale) {
            const currentScale = parseFloat(this.mannequinBase.style.transform.match(/scale\(([^)]+)\)/)?.[1] || 1);
            const newScale = Math.max(0.5, Math.min(2, currentScale * scale));
            
            this.mannequinBase.style.transform = `
                rotateY(${this.currentRotation}deg)
                translateZ(50px)
                scale(${newScale})
            `;
            
            this.outfitOverlay.style.transform = `
                rotateY(${this.currentRotation}deg)
                translateZ(52px)
                scale(${newScale})
            `;
        }
        
        addRotationEffect() {
            // 添加旋转视觉反馈
            const rotationEffect = document.createElement('div');
            rotationEffect.className = 'rotation-effect';
            rotationEffect.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(
                    circle at ${this.currentRotation > 0 ? '70%' : '30%'} 50%,
                    rgba(167, 139, 250, 0.2),
                    transparent 70%
                );
                pointer-events: none;
                z-index: 4;
                animation: fadeOut 0.5s ease forwards;
            `;
            
            document.querySelector('.viewer-stage').appendChild(rotationEffect);
            
            setTimeout(() => {
                rotationEffect.remove();
            }, 500);
        }
        
        selectOutfit(outfitId) {
            // 更新选中状态
            this.outfitItems.forEach(item => {
                item.classList.remove('active');
            });
            
            const selectedItem = document.querySelector(`.outfit-item[data-outfit="${outfitId}"]`);
            if (selectedItem) {
                selectedItem.classList.add('active');
                
                // 添加选中动画
                selectedItem.style.animation = 'outfitSelect 0.5s ease';
                setTimeout(() => {
                    selectedItem.style.animation = '';
                }, 500);
            }
            
            // 应用新服装
            this.applyOutfit(outfitId);
            this.currentOutfit = outfitId;
            
            // 更新统计信息
            this.updateOutfitStats(outfitId);
        }
        
        applyOutfit(outfitId) {
            const outfit = this.outfitData[outfitId];
            if (!outfit) return;
            
            // 清空当前服装
            this.outfitOverlay.innerHTML = '';
            
            // 应用新服装
            outfit.parts.forEach((part, index) => {
                const partElement = this.createClothingPart(part, index);
                this.outfitOverlay.appendChild(partElement);
                
                // 延迟显示，创建依次出现的效果
                setTimeout(() => {
                    partElement.style.opacity = '1';
                    partElement.style.transform = `
                        translate(${part.position.x}px, ${part.position.y}px)
                        rotateY(${this.currentRotation}deg)
                    `;
                }, index * 100);
            });
            
            // 应用材质纹理
            this.applyTexture(outfit.parts[0].texture);
            
            // 更新服装名称
            const outfitInfo = document.getElementById('outfitInfo');
            const title = outfitInfo.querySelector('h4');
            const desc = outfitInfo.querySelector('.outfit-desc');
            
            title.textContent = outfit.name;
            desc.textContent = '查看服饰在实际穿着时的垂感和效果';
            
            // 添加服装入场动画
            this.addOutfitEntranceAnimation();
        }
        
        createClothingPart(part, index) {
            const element = document.createElement('div');
            element.className = `clothing-part ${part.type}`;
            
            // 基本样式
            element.style.cssText = `
                position: absolute;
                width: ${part.size.width}px;
                height: ${part.size.height}px;
                background: ${part.color};
                border-radius: ${part.type === 'belt' ? '5px' : '10px'};
                transform: translate(${part.position.x}px, ${part.position.y}px);
                opacity: 0;
                transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                z-index: ${part.zIndex};
                box-shadow: ${this.generateClothingShadow(part)};
            `;
            
            // 添加纹理效果
            if (part.texture) {
                element.style.backgroundImage = `
                    linear-gradient(135deg, 
                        ${this.adjustColor(part.color, 20)} 0%,
                        ${part.color} 50%,
                        ${this.adjustColor(part.color, -20)} 100%
                    ),
                    repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 2px,
                        rgba(255,255,255,0.05) 2px,
                        rgba(255,255,255,0.05) 4px
                    )
                `;
            }
            
            // 添加悬停效果
            element.addEventListener('mouseenter', () => {
                this.highlightClothingPart(part.type);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeHighlight();
            });
            
            return element;
        }
        
        adjustColor(color, amount) {
            // 调整颜色亮度
            let usePound = false;
            if (color[0] === "#") {
                color = color.slice(1);
                usePound = true;
            }
            
            const num = parseInt(color, 16);
            let r = (num >> 16) + amount;
            let g = ((num >> 8) & 0x00FF) + amount;
            let b = (num & 0x0000FF) + amount;
            
            r = Math.min(Math.max(0, r), 255);
            g = Math.min(Math.max(0, g), 255);
            b = Math.min(Math.max(0, b), 255);
            
            return (usePound ? "#" : "") + (b | (g << 8) | (r << 16)).toString(16).padStart(6, '0');
        }
        
        generateClothingShadow(part) {
            // 根据服装类型生成阴影
            const shadows = {
                'jacket': '0 8px 25px rgba(0,0,0,0.2), inset 0 -5px 10px rgba(0,0,0,0.1)',
                'pants': '0 5px 15px rgba(0,0,0,0.15), inset 0 -3px 8px rgba(0,0,0,0.08)',
                'shirt': '0 4px 12px rgba(0,0,0,0.1), inset 0 -2px 6px rgba(0,0,0,0.05)',
                'dress': '0 10px 30px rgba(0,0,0,0.25), inset 0 -8px 20px rgba(0,0,0,0.15)',
                'top': '0 6px 20px rgba(0,0,0,0.15), inset 0 -4px 10px rgba(0,0,0,0.08)',
                'shorts': '0 4px 15px rgba(0,0,0,0.12), inset 0 -3px 8px rgba(0,0,0,0.06)',
                'belt': '0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px rgba(251, 191, 36, 0.3)'
            };
            
            return shadows[part.type] || '0 4px 15px rgba(0,0,0,0.1)';
        }
        
        updateClothingShadows() {
            // 根据旋转角度更新阴影
            const parts = this.outfitOverlay.querySelectorAll('.clothing-part');
            const rotation = this.currentRotation;
            
            parts.forEach(part => {
                const shadowX = Math.sin(rotation * Math.PI / 180) * 10;
                const shadowY = Math.cos(rotation * Math.PI / 180) * 5;
                
                part.style.boxShadow = `
                    ${shadowX}px ${shadowY}px 25px rgba(0,0,0,0.2),
                    inset ${-shadowX/2}px ${-shadowY/2}px 10px rgba(0,0,0,0.1)
                `;
            });
        }
        
        applyTexture(textureType) {
            // 显示对应的材质纹理
            const textures = document.querySelectorAll('.texture-overlay');
            textures.forEach(texture => {
                texture.style.opacity = '0';
            });
            
            const activeTexture = document.querySelector(`.texture-${textureType}`);
            if (activeTexture) {
                activeTexture.style.opacity = '0.1';
            }
        }
        
        addOutfitEntranceAnimation() {
            // 添加入场动画
            const entranceEffect = document.createElement('div');
            entranceEffect.className = 'outfit-entrance';
            entranceEffect.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.3), transparent 70%);
                pointer-events: none;
                z-index: 7;
                animation: outfitEntrance 1s ease forwards;
            `;
            
            document.querySelector('.viewer-stage').appendChild(entranceEffect);
            
            setTimeout(() => {
                entranceEffect.remove();
            }, 1000);
            
            // 添加CSS动画
            if (!document.getElementById('outfit-entrance-animation')) {
                const style = document.createElement('style');
                style.id = 'outfit-entrance-animation';
                style.textContent = `
                    @keyframes outfitEntrance {
                        0% {
                            transform: scale(0);
                            opacity: 1;
                        }
                        100% {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        updateOutfitStats(outfitId) {
            const outfit = this.outfitData[outfitId];
            if (!outfit) return;
            
            const stats = outfit.stats;
            
            // 更新统计条
            const drapeBar = document.querySelector('.stat-fill[data-value="85"]');
            const fitBar = document.querySelector('.stat-fill[data-value="92"]');
            
            if (drapeBar && fitBar) {
                drapeBar.style.width = `${stats.drape}%`;
                drapeBar.parentElement.nextElementSibling.textContent = `${stats.drape}%`;
                drapeBar.dataset.value = stats.drape;
                
                fitBar.style.width = `${stats.fit}%`;
                fitBar.parentElement.nextElementSibling.textContent = `${stats.fit}%`;
                fitBar.dataset.value = stats.fit;
            }
        }
        
        highlightClothingPart(partType) {
            // 高亮显示服装部件
            const part = document.querySelector(`.clothing-part.${partType}`);
            if (part) {
                part.style.filter = 'brightness(1.2)';
                part.style.transform += ' scale(1.02)';
                
                // 显示部件信息
                this.showPartInfo(partType);
            }
        }
        
        removeHighlight() {
            // 移除高亮
            const parts = document.querySelectorAll('.clothing-part');
            parts.forEach(part => {
                part.style.filter = '';
                part.style.transform = part.style.transform.replace(' scale(1.02)', '');
            });
            
            // 隐藏部件信息
            this.hidePartInfo();
        }
        
        showPartInfo(partType) {
            // 显示服装部件信息
            const info = {
                'jacket': '西装外套：抗皱羊毛混纺，专业干洗',
                'pants': '西裤：直筒剪裁，垂感优秀',
                'shirt': '衬衫：纯棉材质，透气舒适',
                'dress': '连衣裙：雪纺材质，飘逸垂顺',
                'belt': '腰带：真皮材质，可调节'
            };
            
            const infoElement = document.createElement('div');
            infoElement.className = 'part-info';
            infoElement.textContent = info[partType] || '服装部件';
            infoElement.style.cssText = `
                position: absolute;
                bottom: 60px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 15px;
                border-radius: 8px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 20;
                animation: infoFadeIn 0.3s ease;
            `;
            
            document.querySelector('.viewer-stage').appendChild(infoElement);
        }
        
        hidePartInfo() {
            const infoElement = document.querySelector('.part-info');
            if (infoElement) {
                infoElement.remove();
            }
        }
        
        startVirtualTryOn() {
            // 开始虚拟试穿模式
            this.showVirtualTryOnInterface();
        }
        
        showVirtualTryOnInterface() {
            // 创建虚拟试穿界面
            const tryonInterface = document.createElement('div');
            tryonInterface.className = 'virtual-tryon-interface';
            tryonInterface.innerHTML = `
                <div class="tryon-content">
                    <div class="tryon-header">
                        <h4>🎮 虚拟试穿模式</h4>
                        <button class="btn-close-tryon">&times;</button>
                    </div>
                    <div class="tryon-body">
                        <div class="tryon-instructions">
                            <h5>操作指南</h5>
                            <ul>
                                <li><i class="fas fa-arrows-alt-h"></i> 左右拖动旋转模特</li>
                                <li><i class="fas fa-expand-alt"></i> 双指捏合缩放</li>
                                <li><i class="fas fa-mouse-pointer"></i> 点击服装查看详情</li>
                                <li><i class="fas fa-exchange-alt"></i> 下方选择不同服装</li>
                            </ul>
                        </div>
                        <div class="tryon-features">
                            <h5>试穿功能</h5>
                            <div class="feature-buttons">
                                <button class="feature-btn" data-feature="color">
                                    <i class="fas fa-palette"></i> 换色
                                </button>
                                <button class="feature-btn" data-feature="size">
                                    <i class="fas fa-expand"></i> 调整尺寸
                                </button>
                                <button class="feature-btn" data-feature="material">
                                    <i class="fas fa-tshirt"></i> 更换材质
                                </button>
                                <button class="feature-btn" data-feature="save">
                                    <i class="fas fa-save"></i> 保存搭配
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="tryon-footer">
                        <button class="btn-start-tryon">开始高级试穿</button>
                    </div>
                </div>
            `;
            
            tryonInterface.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 9999;
                animation: tryonSlideIn 0.5s ease;
            `;
            
            document.body.appendChild(tryonInterface);
            
            // 添加样式
            if (!document.getElementById('tryon-interface-styles')) {
                const style = document.createElement('style');
                style.id = 'tryon-interface-styles';
                style.textContent = `
                    .virtual-tryon-interface {
                        min-width: 400px;
                        max-width: 90vw;
                    }
                    .tryon-content {
                        background: white;
                        border-radius: 20px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        overflow: hidden;
                    }
                    .tryon-header {
                        background: linear-gradient(135deg, #a78bfa, #f472b6);
                        color: white;
                        padding: 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .tryon-header h4 {
                        margin: 0;
                        font-size: 18px;
                    }
                    .btn-close-tryon {
                        background: none;
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                        line-height: 1;
                    }
                    .tryon-body {
                        padding: 25px;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 30px;
                    }
                    .tryon-instructions h5,
                    .tryon-features h5 {
                        margin: 0 0 15px 0;
                        color: #1f2937;
                    }
                    .tryon-instructions ul {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }
                    .tryon-instructions li {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 10px;
                        color: #6b7280;
                        font-size: 14px;
                    }
                    .tryon-instructions i {
                        color: #a78bfa;
                        width: 20px;
                    }
                    .feature-buttons {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 10px;
                    }
                    .feature-btn {
                        padding: 12px;
                        background: #f9fafb;
                        border: 2px solid #e5e7eb;
                        border-radius: 10px;
                        color: #4b5563;
                        font-size: 13px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        transition: all 0.3s ease;
                    }
                    .feature-btn:hover {
                        background: #a78bfa;
                        color: white;
                        border-color: #a78bfa;
                        transform: translateY(-2px);
                    }
                    .tryon-footer {
                        padding: 20px;
                        border-top: 1px solid #e5e7eb;
                        text-align: center;
                    }
                    .btn-start-tryon {
                        padding: 15px 40px;
                        background: linear-gradient(135deg, #a78bfa, #f472b6);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .btn-start-tryon:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 25px rgba(167, 139, 250, 0.3);
                    }
                    @keyframes tryonSlideIn {
                        from { transform: translate(-50%, -60%); opacity: 0; }
                        to { transform: translate(-50%, -50%); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // 事件监听
            tryonInterface.querySelector('.btn-close-tryon').addEventListener('click', () => {
                tryonInterface.remove();
            });
            
            tryonInterface.querySelector('.btn-start-tryon').addEventListener('click', () => {
                tryonInterface.remove();
                this.activateAdvancedTryOn();
            });
            
            // 功能按钮
            tryonInterface.querySelectorAll('.feature-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const feature = e.target.dataset.feature;
                    this.showFeaturePanel(feature);
                });
            });
        }
        
        activateAdvancedTryOn() {
            // 激活高级试穿功能
            this.enableColorChange();
            this.enableSizeAdjustment();
            this.enableMaterialChange();
            
            // 显示高级功能提示
            this.showAdvancedFeaturesHint();
        }
        
        enableColorChange() {
            // 启用颜色更换功能
            const colorPanel = document.createElement('div');
            colorPanel.className = 'color-panel';
            colorPanel.innerHTML = `
                <h5>更换颜色</h5>
                <div class="color-palette">
                    <div class="color-option" data-color="#1f2937" style="background: #1f2937;"></div>
                    <div class="color-option" data-color="#374151" style="background: #374151;"></div>
                    <div class="color-option" data-color="#3b82f6" style="background: #3b82f6;"></div>
                    <div class="color-option" data-color="#10b981" style="background: #10b981;"></div>
                    <div class="color-option" data-color="#f59e0b" style="background: #f59e0b;"></div>
                    <div class="color-option" data-color="#ec4899" style="background: #ec4899;"></div>
                </div>
            `;
            
            colorPanel.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: 20px;
                background: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                z-index: 30;
                animation: panelSlideUp 0.5s ease;
            `;
            
            document.querySelector('.viewer-stage').appendChild(colorPanel);
            
            // 颜色选择
            colorPanel.querySelectorAll('.color-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const color = e.target.dataset.color;
                    this.changeOutfitColor(color);
                });
            });
        }
        
        changeOutfitColor(color) {
            // 更换服装颜色
            const parts = this.outfitOverlay.querySelectorAll('.clothing-part');
            parts.forEach(part => {
                part.style.background = color;
            });
            
            // 添加颜色更换效果
            this.addColorChangeEffect(color);
        }
        
        addColorChangeEffect(color) {
            const effect = document.createElement('div');
            effect.className = 'color-change-effect';
            effect.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 0;
                height: 0;
                border-radius: 50%;
                background: ${color};
                pointer-events: none;
                z-index: 25;
                animation: colorRipple 1s ease forwards;
            `;
            
            document.querySelector('.viewer-stage').appendChild(effect);
            
            setTimeout(() => {
                effect.remove();
            }, 1000);
        }
        
        enableSizeAdjustment() {
            // 启用尺寸调整
            const sizePanel = document.createElement('div');
            sizePanel.className = 'size-panel';
            sizePanel.innerHTML = `
                <h5>调整尺寸</h5>
                <div class="size-controls">
                    <button class="size-btn" data-action="smaller">
                        <i class="fas fa-compress-alt"></i> 缩小
                    </button>
                    <button class="size-btn" data-action="larger">
                        <i class="fas fa-expand-alt"></i> 放大
                    </button>
                </div>
            `;
            
            sizePanel.style.cssText = `
                position: absolute;
                bottom: 20px;
                right: 20px;
                background: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                z-index: 30;
                animation: panelSlideUp 0.5s ease;
            `;
            
            document.querySelector('.viewer-stage').appendChild(sizePanel);
            
            // 尺寸调整
            sizePanel.querySelectorAll('.size-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const action = e.target.closest('.size-btn').dataset.action;
                    this.adjustOutfitSize(action);
                });
            });
        }
        
        adjustOutfitSize(action) {
            const parts = this.outfitOverlay.querySelectorAll('.clothing-part');
            const scale = action === 'larger' ? 1.1 : 0.9;
            
            parts.forEach(part => {
                const currentWidth = parseInt(part.style.width);
                const currentHeight = parseInt(part.style.height);
                
                part.style.width = `${currentWidth * scale}px`;
                part.style.height = `${currentHeight * scale}px`;
                
                // 调整位置
                const currentX = parseInt(part.style.transform.match(/translate\(([^,]+)/)?.[1] || 0);
                const currentY = parseInt(part.style.transform.match(/translate\([^,]+,([^)]+)/)?.[1] || 0);
                
                part.style.transform = part.style.transform.replace(
                    /translate\([^)]+\)/,
                    `translate(${currentX * scale}px, ${currentY * scale}px)`
                );
            });
        }
        
        enableMaterialChange() {
            // 启用材质更换
            const textureBtn = document.createElement('button');
            textureBtn.className = 'texture-btn';
            textureBtn.innerHTML = '<i class="fas fa-fan"></i> 更换材质';
            textureBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                padding: 10px 15px;
                background: white;
                border: 2px solid #a78bfa;
                border-radius: 20px;
                color: #a78bfa;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                z-index: 30;
                animation: panelSlideDown 0.5s ease;
            `;
            
            document.querySelector('.viewer-stage').appendChild(textureBtn);
            
            textureBtn.addEventListener('click', () => {
                this.showTextureSelector();
            });
        }
        
        showTextureSelector() {
            const textures = ['cotton', 'wool', 'silk', 'denim', 'leather'];
            const selector = document.createElement('div');
            selector.className = 'texture-selector';
            selector.innerHTML = `
                <h5>选择材质</h5>
                <div class="texture-options">
                    ${textures.map(texture => `
                        <div class="texture-option" data-texture="${texture}">
                            <div class="texture-preview texture-${texture}"></div>
                            <span>${texture}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            
            selector.style.cssText = `
                position: absolute;
                top: 60px;
                right: 20px;
                background: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                z-index: 31;
                animation: panelSlideDown 0.5s ease;
            `;
            
            document.querySelector('.viewer-stage').appendChild(selector);
            
            // 纹理选择
            selector.querySelectorAll('.texture-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const texture = e.target.closest('.texture-option').dataset.texture;
                    this.changeOutfitTexture(texture);
                    selector.remove();
                });
            });
            
            // 点击外部关闭
            setTimeout(() => {
                document.addEventListener('click', function closeSelector(e) {
                    if (!selector.contains(e.target) && !e.target.closest('.texture-btn')) {
                        selector.remove();
                        document.removeEventListener('click', closeSelector);
                    }
                });
            });
        }
        
        changeOutfitTexture(texture) {
            this.applyTexture(texture);
            
            // 更新服装视觉效果
            const parts = this.outfitOverlay.querySelectorAll('.clothing-part');
            parts.forEach(part => {
                part.style.backgroundImage = `
                    linear-gradient(135deg, 
                        ${this.adjustColor(part.style.backgroundColor, 30)} 0%,
                        ${part.style.backgroundColor} 50%,
                        ${this.adjustColor(part.style.backgroundColor, -30)} 100%
                    ),
                    repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 2px,
                        rgba(255,255,255,0.1) 2px,
                        rgba(255,255,255,0.1) 4px
                    )
                `;
            });
        }
        
        showAdvancedFeaturesHint() {
            // 显示高级功能提示
            const hint = document.createElement('div');
            hint.className = 'features-hint';
            hint.innerHTML = `
                <div class="hint-content">
                    <i class="fas fa-magic"></i>
                    <p>高级试穿功能已激活！</p>
                    <p class="hint-detail">您现在可以更换颜色、调整尺寸和修改材质</p>
                </div>
            `;
            
            hint.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 20px 30px;
                border-radius: 15px;
                text-align: center;
                z-index: 40;
                animation: hintFade 2s ease forwards;
            `;
            
            document.querySelector('.viewer-stage').appendChild(hint);
            
            setTimeout(() => {
                hint.remove();
            }, 2000);
        }
        
        showFeaturePanel(feature) {
            // 显示功能面板
            console.log('显示功能面板:', feature);
            // 实际实现根据具体功能展开
        }
        
        startWebcamTryOn() {
            // 启动摄像头试穿
            this.showWebcamInterface();
        }
        
        showWebcamInterface() {
            // 创建摄像头界面
            const webcamModal = document.createElement('div');
            webcamModal.className = 'webcam-modal';
            webcamModal.innerHTML = `
                <div class="webcam-content">
                    <div class="webcam-header">
                        <h4>📷 摄像头试穿</h4>
                        <button class="btn-close-webcam">&times;</button>
                    </div>
                    <div class="webcam-body">
                        <div class="camera-preview" id="cameraPreview">
                            <div class="camera-placeholder">
                                <i class="fas fa-camera"></i>
                                <p>正在启动摄像头...</p>
                            </div>
                        </div>
                        <div class="webcam-instructions">
                            <h5>使用方法</h5>
                            <ol>
                                <li>允许浏览器访问摄像头</li>
                                <li>站在距离摄像头2-3米处</li>
                                <li>保持良好光照条件</li>
                                <li>系统会自动识别并叠加服装</li>
                            </ol>
                        </div>
                    </div>
                    <div class="webcam-footer">
                        <button class="btn-start-camera">开启摄像头</button>
                        <button class="btn-try-sample">查看示例效果</button>
                    </div>
                </div>
            `;
            
            webcamModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(10px);
            `;
            
            document.body.appendChild(webcamModal);
            
            // 事件监听
            webcamModal.querySelector('.btn-close-webcam').addEventListener('click', () => {
                webcamModal.remove();
            });
            
            webcamModal.querySelector('.btn-start-camera').addEventListener('click', () => {
                this.initializeCamera();
            });
            
            webcamModal.querySelector('.btn-try-sample').addEventListener('click', () => {
                this.showSampleWebcamEffect();
            });
        }
        
        showCompareView() {
            // 显示对比视图
            this.createCompareView();
        }
        
        createCompareView() {
            // 创建服装对比界面
            const compareView = document.createElement('div');
            compareView.className = 'compare-view';
            compareView.innerHTML = `
                <div class="compare-content">
                    <div class="compare-header">
                        <h4>👔 服装对比</h4>
                        <button class="btn-close-compare">&times;</button>
                    </div>
                    <div class="compare-body">
                        <div class="compare-item">
                            <div class="compare-preview" id="compareOutfit1"></div>
                            <div class="compare-info">
                                <h5>当前服装</h5>
                                <div class="compare-stats">
                                    <div class="stat">
                                        <span>垂感</span>
                                        <div class="stat-bar">
                                            <div class="stat-fill" style="width: 85%"></div>
                                        </div>
                                    </div>
                                    <div class="stat">
                                        <span>合身度</span>
                                        <div class="stat-bar">
                                            <div class="stat-fill" style="width: 92%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="compare-divider">
                            <div class="vs-circle">VS</div>
                        </div>
                        <div class="compare-item">
                            <div class="compare-preview" id="compareOutfit2"></div>
                            <div class="compare-info">
                                <h5>对比服装</h5>
                                <div class="compare-stats">
                                    <div class="stat">
                                        <span>垂感</span>
                                        <div class="stat-bar">
                                            <div class="stat-fill" style="width: 78%"></div>
                                        </div>
                                    </div>
                                    <div class="stat">
                                        <span>合身度</span>
                                        <div class="stat-bar">
                                            <div class="stat-fill" style="width: 85%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="compare-footer">
                        <button class="btn-swap">交换对比</button>
                        <button class="btn-choose">选择此款</button>
                    </div>
                </div>
            `;
            
            compareView.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 9999;
                animation: compareSlideIn 0.5s ease;
            `;
            
            document.body.appendChild(compareView);
            
            // 事件监听
            compareView.querySelector('.btn-close-compare').addEventListener('click', () => {
                compareView.remove();
            });
            
            compareView.querySelector('.btn-swap').addEventListener('click', () => {
                this.swapComparison();
            });
            
            compareView.querySelector('.btn-choose').addEventListener('click', () => {
                this.selectComparedOutfit();
            });
        }
        
        swapComparison() {
            // 交换对比
            console.log('交换对比服装');
        }
        
        selectComparedOutfit() {
            // 选择对比服装
            console.log('选择对比服装');
        }
        
        // 辅助方法
        addCSSAnimations() {
            if (!document.getElementById('fashion-animations')) {
                const style = document.createElement('style');
                style.id = 'fashion-animations';
                style.textContent = `
                    @keyframes fadeOut {
                        to { opacity: 0; }
                    }
                    @keyframes panelSlideUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes panelSlideDown {
                        from { transform: translateY(-20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes hintFade {
                        0% { opacity: 0; transform: translate(-50%, -40%); }
                        20% { opacity: 1; transform: translate(-50%, -50%); }
                        80% { opacity: 1; transform: translate(-50%, -50%); }
                        100% { opacity: 0; transform: translate(-50%, -60%); }
                    }
                    @keyframes colorRipple {
                        0% {
                            width: 0;
                            height: 0;
                            opacity: 0.8;
                        }
                        100% {
                            width: 500px;
                            height: 500px;
                            opacity: 0;
                        }
                    }
                    @keyframes infoFadeIn {
                        from { opacity: 0; transform: translateX(-50%) translateY(10px); }
                        to { opacity: 1; transform: translateX(-50%) translateY(0); }
                    }
                    @keyframes compareSlideIn {
                        from { transform: translate(-50%, -55%); opacity: 0; }
                        to { transform: translate(-50%, -50%); opacity: 1; }
                    }
                    @keyframes outfitSelect {
                        0% { transform: translateX(0); }
                        25% { transform: translateX(5px); }
                        50% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                        100% { transform: translateX(0); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
    
    // 初始化AR虚拟试穿系统
    const virtualTryOn = new VirtualTryOnSystem();
    
    // ============================================
    // 页面初始化效果
    // ============================================
    
    // 1. 页面滚动动画
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
    
    // 2. 好运战袍悬停效果
    document.querySelectorAll('.suit-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.suit-badge');
            badge.style.animation = 'badgePulse 0.5s ease infinite alternate';
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.suit-badge');
            badge.style.animation = '';
        });
    });
    
    // 3. 清洁状态切换
    document.querySelectorAll('.cleaning-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.cleaning-card').forEach(c => {
                c.classList.remove('active');
            });
            this.classList.add('active');
            
            // 更新时间线
            updateCleaningTimeline(this.dataset.status);
        });
    });
    
    function updateCleaningTimeline(status) {
        const timeline = document.getElementById('cleaningTimeline');
        const progress = timeline.querySelector('.timeline-progress');
        
        let width = '30%';
        let animation = 'timelineFill 3s ease-in-out infinite alternate';
        
        switch(status) {
            case 'professional':
                width = '70%';
                animation = 'timelineFill 4s ease-in-out infinite alternate';
                break;
            case 'disinfected':
                width = '50%';
                animation = 'timelineFill 3.5s ease-in-out infinite alternate';
                break;
            case 'fresh':
                width = '40%';
                animation = 'timelineFill 3s ease-in-out infinite alternate';
                break;
        }
        
        progress.style.width = width;
        progress.style.animation = animation;
    }
    
    // 4. 场景分类过滤
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.filter-tag').forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterSceneCards(filter);
        });
    });
    
    function filterSceneCards(filter) {
        const cards = document.querySelectorAll('.scene-card');
        cards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                // 这里可以根据实际需求实现过滤逻辑
                card.style.display = 'block';
            }
        });
    }
    
    // 5. 面料细节查看器
    document.querySelectorAll('.image-zoom').forEach(zoom => {
        zoom.addEventListener('click', function() {
            const imageType = this.dataset.image;
            showFabricViewer(imageType);
        });
    });
    
    function showFabricViewer(imageType) {
        const viewer = document.getElementById('fabricViewer');
        const image = document.getElementById('fabricDetailImage');
        
        // 设置图片
        const images = {
            'detail1': 'https://images.unsplash.com/photo-1558769132-cb1a9eddd4e3?auto=format&fit=crop&w=800',
            'detail2': 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=800'
        };
        
        image.src = images[imageType] || images.detail1;
        
        // 显示查看器
        viewer.style.display = 'block';
        
        // 添加关闭功能
        viewer.querySelector('.btn-close-viewer').addEventListener('click', () => {
            viewer.style.display = 'none';
        });
        
        // 缩放控制
        viewer.querySelectorAll('.zoom-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.dataset.action;
                controlZoom(action, image);
            });
        });
    }
    
    function controlZoom(action, image) {
        let currentScale = parseFloat(image.style.transform.match(/scale\(([^)]+)\)/)?.[1] || 1);
        
        switch(action) {
            case 'zoom-in':
                currentScale = Math.min(3, currentScale + 0.2);
                break;
            case 'zoom-out':
                currentScale = Math.max(0.5, currentScale - 0.2);
                break;
            case 'reset':
                currentScale = 1;
                break;
        }
        
        image.style.transform = `scale(${currentScale})`;
    }
    
    // 6. 改衣预约功能
    document.querySelectorAll('.urgency-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.urgency-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    document.querySelector('.btn-request').addEventListener('click', function() {
        const type = document.getElementById('tailoringType').value;
        const urgency = document.querySelector('.urgency-btn.active')?.dataset.level;
        
        if (!type) {
            showNotification('请选择修改类型', 'error');
            return;
        }
        
        if (!urgency) {
            showNotification('请选择紧急程度', 'error');
            return;
        }
        
        showNotification('改衣预约已提交！裁缝店将很快联系您', 'success');
        
        // 重置表单
        document.getElementById('tailoringType').value = '';
        document.querySelectorAll('.urgency-btn').forEach(b => {
            b.classList.remove('active');
        });
    });
    
    // 7. 回收箱交互
    document.querySelectorAll('.map-point').forEach(point => {
        point.addEventListener('click', function() {
            const location = this.dataset.location;
            showRecyclePointInfo(location);
        });
    });
    
    function showRecyclePointInfo(location) {
        const info = {
            '图书馆南侧': '容量：75% · 下次清运：明天上午',
            '学生食堂入口': '容量：90% · 即将满箱',
            '体育馆西门': '容量：60% · 维护中',
            '东区宿舍楼': '容量：45% · 正常使用'
        };
        
        showNotification(`📍 ${location}：${info[location] || '正常使用中'}`, 'info');
    }
    
    // 8. 回收功能
    document.getElementById('recycleNow').addEventListener('click', function() {
        showRecycleForm();
    });
    
    function showRecycleForm() {
        const form = document.createElement('div');
        form.className = 'recycle-form-modal';
        form.innerHTML = `
            <div class="form-content">
                <div class="form-header">
                    <h4>♻️ 预约上门回收</h4>
                    <button class="btn-close-form">&times;</button>
                </div>
                <div class="form-body">
                    <p>填写信息，我们的回收员将上门收取旧衣物</p>
                    <div class="form-group">
                        <label>宿舍楼号</label>
                        <input type="text" placeholder="例如：15号楼">
                    </div>
                    <div class="form-group">
                        <label>房间号</label>
                        <input type="text" placeholder="例如：302室">
                    </div>
                    <div class="form-group">
                        <label>预约时间</label>
                        <select>
                            <option>今天下午 14:00-16:00</option>
                            <option>明天上午 10:00-12:00</option>
                            <option>明天下午 14:00-16:00</option>
                            <option>后天上午 10:00-12:00</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>衣物类型</label>
                        <div class="clothing-types">
                            <label><input type="checkbox" checked> 外套</label>
                            <label><input type="checkbox"> 裤子</label>
                            <label><input type="checkbox"> 衬衫/T恤</label>
                            <label><input type="checkbox"> 鞋帽</label>
                        </div>
                    </div>
                </div>
                <div class="form-footer">
                    <button class="btn-cancel">取消</button>
                    <button class="btn-submit">提交预约</button>
                </div>
            </div>
        `;
        
        form.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(form);
        
        // 事件监听
        form.querySelector('.btn-close-form').addEventListener('click', () => {
            form.remove();
        });
        
        form.querySelector('.btn-cancel').addEventListener('click', () => {
            form.remove();
        });
        
        form.querySelector('.btn-submit').addEventListener('click', () => {
            showNotification('回收预约成功！回收员将在预约时间上门', 'success');
            form.remove();
        });
    }
    
    // 工具函数
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'error' ? '#f87171' : type === 'success' ? '#34d399' : '#a78bfa'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: notificationSlideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // 3秒后移除
        setTimeout(() => {
            notification.style.animation = 'notificationSlideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // 添加动画
        if (!document.getElementById('notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes notificationSlideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes notificationSlideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    console.log('衣锦校路·时尚流转 - 所有交互效果已加载完成！');
});