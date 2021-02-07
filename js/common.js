Chart.defaults.global.elements.rectangle.backgroundColor = 'rgba(0, 0, 0, 0.3)';

var danmu_content_select = ""


var LEGEND = {
    labels: {
        // This more specific font property overrides the global property
        fontSize: 20,
        fontColor: 'black'
    }
}

var SCALES = {
    yAxes: [{
        ticks: {
            fontSize: 20
        }
    }],
    xAxes: [{
        ticks: {
            fontSize: 20
        }
    }]
}

var OPTIONS1 = {
    legend: LEGEND,
    scales: SCALES,
    animation: {
        duration: 1000,
        onComplete: function () {
            var chartInstance = this.chart,
            ctx = chartInstance.ctx;
            ctx.font = 20;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    ctx.fillText(data, bar._model.x + 5 , bar._model.y - 20);
                });
            })
        }
    }
}


var COLORS2 = [
    // 浅粉， 紫罗兰， 适中的板岩暗蓝灰色, 深天蓝
    '#ff6384', '#EE82EE', '#7B68EE', '#00BFFF', '#2ECC71',
    '#ff6384', '#EE82EE', '#7B68EE', '#00BFFF', '#D4AC0D',
    '#ff6384', '#EE82EE', '#7B68EE', '#00BFFF', '#40E0D0',
    '#ff6384', '#EE82EE', '#7B68EE', '#00BFFF', '#40E0D0',
]


function get_random_color2() {
    return COLORS2[Math.floor(Math.random() * COLORS2.length)];
}

var OPTIONS2 = {
    legend: {
        labels: {
            fontSize: 20,
            fontColor: '#ff6384'
        }
    },
    scales: {
        yAxes: [{
            gridLines: {
                display: false
            },  
            ticks: {
                fontSize: 18,
                autoSkip: false,
                fontColor: COLORS2,
            },

        }],
        xAxes: [{
            ticks: {
                fontSize: 20,
            }
        }]
    },
    animation: {
        duration: 1000,
        onComplete: function () {  // show data value
            var chartInstance = this.chart,
            ctx = chartInstance.ctx;
            ctx.fontSize = 20;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    var width = ctx.measureText(data).width;
                    ctx.fillStyle = BACKGROUNDCOLOR;
                    var tx = bar._model.x + 30,
                        ty = bar._model.y + 12,
                        th = ctx.fontSize * 1.5;

                    ctx.globalCompositeOperation = "destination-over";
                    ctx.fillRect(tx - width / 2 - 5, ty - th + th / 6, width+10, th);

                    ctx.globalCompositeOperation = "source-over";
                    ctx.fillStyle = COLORS2[index];
                    ctx.fillText(data,  tx, ty);
                });
            })
        }
    }
}



var OPTIONS3 = {
    legend: {
        labels: {
            fontSize: 20,
            fontColor: '#ff6384'
        }
    },
    scales: {
        yAxes: [{
            gridLines: {
                display: false
            },  
            ticks: {
                fontSize: 18,
                autoSkip: false,
                fontColor: COLORS2,
                padding: 4,
            },

        }],
        xAxes: [{
            ticks: {
                fontSize: 20,
            }
        }]
    },
    animation: {
        duration: 1000,
        onComplete: function () {  // show data value
            var chartInstance = this.chart,
            ctx = chartInstance.ctx;
            ctx.fontSize = 20;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    var width = ctx.measureText(data).width;
                    ctx.fillStyle = BACKGROUNDCOLOR;
                    var tx = bar._model.x + 30,
                        ty = bar._model.y + 12,
                        th = ctx.fontSize * 1.5;

                    ctx.globalCompositeOperation = "destination-over";
                    ctx.fillRect(tx - width / 2 - 5, ty - th + th / 6, width+10, th);

                    ctx.globalCompositeOperation = "source-over";
                    ctx.fillStyle = COLORS2[index];
                    ctx.fillText(data,  tx, ty);
                });
            })


            // Chart.types.Line.prototype.draw.apply(this, arguments);

            ctx.save();
            ctx.fillStyle = BACKGROUNDCOLOR;
            ctx.globalCompositeOperation = "destination-over"

            var yaxis = this.scales["y-axis-0"]

            var yLabelGap = (yaxis._endPixel - yaxis._startPixel) / yaxis._valueRange,
                xStart = yaxis.right;
            Chart.helpers.each(yaxis._labelItems, function(label, index){
                var yLabelCenter = label.y;
                var width = ctx.measureText(label.label).width;
                // add some padding on the side - we don't need to increase the width because we use the width added by the extra space
                ctx.fillRect(xStart-width-10, yLabelCenter - ctx.fontSize * 1.5 / 2 + 4, width+4, yLabelGap-2);
            });

            ctx.save();
        }
    }
}


function custom_easing(el, i, total) {
    var ri = Math.floor((Math.random() * 4))
    return function(t) {
        var x = i / total;
        switch(ri){
            case 0: return t ;  // linear
            case 1: return Math.sin((t * Math.PI) / 2);  // easeOutSine
            case 2: return -(Math.cos(Math.PI * t) - 1) / 2;  // easeInOutSine
            case 3: return (1 - Math.cos((t * Math.PI) / 2));  // easeInSine
            case 4: return Math.pow(t, 2);  // easeInQuad
            case 5: return 1 - Math.pow(1 - t, 2);  // easeInQuad
            case 6: return t < 0.5 ? 2 * Math.pow(t, 2) : 1 - Math.pow(-2 * t + 2, 2) / 2;  // easeInOutQuad

            // case 7: return (1 - Math.cos((x * Math.PI) / 2)) * t;  // easeInSine
            // case 8: return (1 - Math.cos((x * Math.PI) / 2)) * t;  // easeInSine
            // case 9: return t;  // easeInSine
            default: return t;
        }
        
    }
}