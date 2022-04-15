import * as echarts from "echarts";
// import axios from "axios";
import $store from "@/store";

export function k_line_graph(id, api, params) {
    let chartDom = document.getElementById(id);
    let myChart = echarts.init(chartDom);
    let option;
    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';

    // Each item: open，close，lowest，highest
    let daily = $store.state.stock.stock_daily[params['ts_code']]

    // daily = response.data.data
    const data0 = splitData(daily);

    function splitData(rawData) {
        const categoryData = [];
        const values = [];
        for (let i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i]);
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    function calculateMA(dayCount) {
        let result = [];
        for (let i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            let sum = 0;
            for (let j = 0; j < dayCount; j++) {
                sum += +data0.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    option = {
        title: {
            text: '上证指数',
            left: 0
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: data0.categoryData,
            boundaryGap: false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: true
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                top: '90%',
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                name: '日K',
                type: 'candlestick',
                data: data0.values,
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upBorderColor,
                    borderColor0: downBorderColor
                },
                markPoint: {
                    label: {
                        formatter: function (param) {
                            return param != null ? Math.round(param.value) + '' : '';
                        }
                    },
                    data: [
                        {
                            name: 'Mark',
                            coord: ['2013/5/31', 2300],
                            value: 2300,
                            itemStyle: {
                                color: 'rgb(41,60,85)'
                            }
                        },
                        {
                            name: 'highest value',
                            type: 'max',
                            valueDim: 'highest'
                        },
                        {
                            name: 'lowest value',
                            type: 'min',
                            valueDim: 'lowest'
                        },
                        {
                            name: 'average value on close',
                            type: 'average',
                            valueDim: 'close'
                        }
                    ],
                    tooltip: {
                        formatter: function (param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
                markLine: {
                    symbol: ['none', 'none'],
                    data: [
                        [
                            {
                                name: 'from lowest to highest',
                                type: 'min',
                                valueDim: 'lowest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    show: false
                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            {
                                type: 'max',
                                valueDim: 'highest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    show: false
                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    }
                                }
                            }
                        ],
                        {
                            name: 'min line on close',
                            type: 'min',
                            valueDim: 'close'
                        },
                        {
                            name: 'max line on close',
                            type: 'max',
                            valueDim: 'close'
                        }
                    ]
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            }
        ]
    };
    option && myChart.setOption(option);

    // axios.get('http://127.0.0.1:8080/api/' + api, {
    //     params: params
    // }).then(
    //     function (response) {
    //         // 如果数据库登录成功
    //         daily = response.data.data
    //         const data0 = splitData(daily);
    //
    //         function splitData(rawData) {
    //             const categoryData = [];
    //             const values = [];
    //             for (let i = 0; i < rawData.length; i++) {
    //                 categoryData.push(rawData[i].splice(0, 1)[0]);
    //                 values.push(rawData[i]);
    //             }
    //             return {
    //                 categoryData: categoryData,
    //                 values: values
    //             };
    //         }
    //
    //         function calculateMA(dayCount) {
    //             let result = [];
    //             for (let i = 0, len = data0.values.length; i < len; i++) {
    //                 if (i < dayCount) {
    //                     result.push('-');
    //                     continue;
    //                 }
    //                 let sum = 0;
    //                 for (let j = 0; j < dayCount; j++) {
    //                     sum += +data0.values[i - j][1];
    //                 }
    //                 result.push(sum / dayCount);
    //             }
    //             return result;
    //         }
    //
    //         option = {
    //             title: {
    //                 text: '上证指数',
    //                 left: 0
    //             },
    //             tooltip: {
    //                 trigger: 'axis',
    //                 axisPointer: {
    //                     type: 'cross'
    //                 }
    //             },
    //             legend: {
    //                 data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    //             },
    //             grid: {
    //                 left: '10%',
    //                 right: '10%',
    //                 bottom: '15%'
    //             },
    //             xAxis: {
    //                 type: 'category',
    //                 data: data0.categoryData,
    //                 boundaryGap: false,
    //                 axisLine: {onZero: false},
    //                 splitLine: {show: false},
    //                 min: 'dataMin',
    //                 max: 'dataMax'
    //             },
    //             yAxis: {
    //                 scale: true,
    //                 splitArea: {
    //                     show: true
    //                 }
    //             },
    //             dataZoom: [
    //                 {
    //                     type: 'inside',
    //                     start: 50,
    //                     end: 100
    //                 },
    //                 {
    //                     show: true,
    //                     type: 'slider',
    //                     top: '90%',
    //                     start: 50,
    //                     end: 100
    //                 }
    //             ],
    //             series: [
    //                 {
    //                     name: '日K',
    //                     type: 'candlestick',
    //                     data: data0.values,
    //                     itemStyle: {
    //                         color: upColor,
    //                         color0: downColor,
    //                         borderColor: upBorderColor,
    //                         borderColor0: downBorderColor
    //                     },
    //                     markPoint: {
    //                         label: {
    //                             formatter: function (param) {
    //                                 return param != null ? Math.round(param.value) + '' : '';
    //                             }
    //                         },
    //                         data: [
    //                             {
    //                                 name: 'Mark',
    //                                 coord: ['2013/5/31', 2300],
    //                                 value: 2300,
    //                                 itemStyle: {
    //                                     color: 'rgb(41,60,85)'
    //                                 }
    //                             },
    //                             {
    //                                 name: 'highest value',
    //                                 type: 'max',
    //                                 valueDim: 'highest'
    //                             },
    //                             {
    //                                 name: 'lowest value',
    //                                 type: 'min',
    //                                 valueDim: 'lowest'
    //                             },
    //                             {
    //                                 name: 'average value on close',
    //                                 type: 'average',
    //                                 valueDim: 'close'
    //                             }
    //                         ],
    //                         tooltip: {
    //                             formatter: function (param) {
    //                                 return param.name + '<br>' + (param.data.coord || '');
    //                             }
    //                         }
    //                     },
    //                     markLine: {
    //                         symbol: ['none', 'none'],
    //                         data: [
    //                             [
    //                                 {
    //                                     name: 'from lowest to highest',
    //                                     type: 'min',
    //                                     valueDim: 'lowest',
    //                                     symbol: 'circle',
    //                                     symbolSize: 10,
    //                                     label: {
    //                                         show: false
    //                                     },
    //                                     emphasis: {
    //                                         label: {
    //                                             show: false
    //                                         }
    //                                     }
    //                                 },
    //                                 {
    //                                     type: 'max',
    //                                     valueDim: 'highest',
    //                                     symbol: 'circle',
    //                                     symbolSize: 10,
    //                                     label: {
    //                                         show: false
    //                                     },
    //                                     emphasis: {
    //                                         label: {
    //                                             show: false
    //                                         }
    //                                     }
    //                                 }
    //                             ],
    //                             {
    //                                 name: 'min line on close',
    //                                 type: 'min',
    //                                 valueDim: 'close'
    //                             },
    //                             {
    //                                 name: 'max line on close',
    //                                 type: 'max',
    //                                 valueDim: 'close'
    //                             }
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     name: 'MA5',
    //                     type: 'line',
    //                     data: calculateMA(5),
    //                     smooth: true,
    //                     lineStyle: {
    //                         opacity: 0.5
    //                     }
    //                 },
    //                 {
    //                     name: 'MA10',
    //                     type: 'line',
    //                     data: calculateMA(10),
    //                     smooth: true,
    //                     lineStyle: {
    //                         opacity: 0.5
    //                     }
    //                 },
    //                 {
    //                     name: 'MA20',
    //                     type: 'line',
    //                     data: calculateMA(20),
    //                     smooth: true,
    //                     lineStyle: {
    //                         opacity: 0.5
    //                     }
    //                 },
    //                 {
    //                     name: 'MA30',
    //                     type: 'line',
    //                     data: calculateMA(30),
    //                     smooth: true,
    //                     lineStyle: {
    //                         opacity: 0.5
    //                     }
    //                 }
    //             ]
    //         };
    //         option && myChart.setOption(option);
    //     }
    // ).catch(function (error) {
    //     console.log(error)
    //     console.log('请求失败了', error.message)
    // })
}


export function create_k_image(id, ts_code) {
    let chartDom = document.getElementById(id);
    let myChart = echarts.init(chartDom);
    let option;
    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';


    let text = ''
    for (let i = 0; i < $store.state.stock.stock_basic.length; i++) {
        if ($store.state.stock.stock_basic[i][0] === ts_code) {
            text = $store.state.stock.stock_basic[i][2]
            break
        }
    }


    // Each item: open，close，lowest，highest

    const data0 = splitData($store.state.stock.stock_daily[ts_code]);

    function splitData(rawData) {
        const categoryData = [];
        const values = [];
        for (let i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i]['trade_date'])
            let raw = [rawData[i]['open'], rawData[i]['close'], rawData[i]['high'], rawData[i]['low']]
            values.push(raw);
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    function calculateMA(dayCount) {
        let result = [];
        for (let i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            let sum = 0;
            for (let j = 0; j < dayCount; j++) {
                sum += +data0.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    option = {
        title: {
            text: text,
            left: 0
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: data0.categoryData,
            boundaryGap: false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: true
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                top: '90%',
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                name: '日K',
                type: 'candlestick',
                data: data0.values,
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upBorderColor,
                    borderColor0: downBorderColor
                },
                markPoint: {
                    label: {
                        formatter: function (param) {
                            return param != null ? Math.round(param.value) + '' : '';
                        }
                    },
                    data: [
                        {
                            name: 'Mark',
                            coord: ['2013/5/31', 2300],
                            value: 2300,
                            itemStyle: {
                                color: 'rgb(41,60,85)'
                            }
                        },
                        {
                            name: 'highest value',
                            type: 'max',
                            valueDim: 'highest'
                        },
                        {
                            name: 'lowest value',
                            type: 'min',
                            valueDim: 'lowest'
                        },
                        {
                            name: 'average value on close',
                            type: 'average',
                            valueDim: 'close'
                        }
                    ],
                    tooltip: {
                        formatter: function (param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
                markLine: {
                    symbol: ['none', 'none'],
                    data: [
                        [
                            {
                                name: 'from lowest to highest',
                                type: 'min',
                                valueDim: 'lowest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    show: false
                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            {
                                type: 'max',
                                valueDim: 'highest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    show: false
                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    }
                                }
                            }
                        ],
                        {
                            name: 'min line on close',
                            type: 'min',
                            valueDim: 'close'
                        },
                        {
                            name: 'max line on close',
                            type: 'max',
                            valueDim: 'close'
                        }
                    ]
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            }
        ]
    };
    option && myChart.setOption(option);

}


export function create_line_chart(id, xAxis, Money, Market_index) {
    let chartDom = document.getElementById(id);
    let myChart = echarts.init(chartDom);
    let option;

    option = {
        title: {
            text: 'Stacked Line'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Money', 'Market index']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Money',
                type: 'line',
                stack: 'Total',
                data: Money
            },
            {
                name: 'Market index',
                type: 'line',
                stack: 'Total',
                data: Market_index
            }
        ]
    };

    option && myChart.setOption(option);

}