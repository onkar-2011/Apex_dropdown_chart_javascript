function prepare_pie_data(cdata) {
    //colsole.log(list_of_y);
    var list_of_y = cdata.series
    if (list_of_y.length > 1) {
        var s = [];
        var l = [];
        for (i = 0; i < list_of_y.length; i++) {
            s[i] = list_of_y[i].data.reduce((partialSum, a) => partialSum + a, 0);
            l[i] = list_of_y[i].name
        }
        return { data: s, labels: l }
    }
    return { data: list_of_y[0].data, labels: cdata.x_data }
}


function getChartData(cdata) {
    var pie_d = prepare_pie_data(cdata);
    cdata["seriesPie"] = pie_d.data;
    cdata["labelsPie"] = pie_d.labels;
    //console.log(cdata)
    mydata = {
        chartSeries: [],
        chartOptions: {
            chart: {
                id: 'vuechart-examplettttt',
                //type: 'radar'
            },
            colors: cdata.color,
            yaxis: {
                title: {
                    text: cdata.y_label,
                    style: {
                        fonySize: '12px'
                    },
                },
                axisBorder: {
                    show: true
                },
                labels: {
                    show: true,

                }
            },
        },
        zzType: "",
        is_horizontal: '',
        is_curve: '',
        zzOrgType: "",
        is_stack: "a",

        OO: cdata,
    };
    return mydata
}

function getMethod() {
    m = {

        subCharts(ctype) {
            if (ctype == "stack_bar") {
                this.is_stack = true;
                this.is_datalabels = false;
                return "bar"
            }
            else if (ctype == "line") {
                this.is_datalabels = false;

                return "line"
            }
            else if (ctype == "bar") {
                this.is_datalabels = false;
                this.is_horizontal = false;
                return "bar"
            }
            else if (ctype == "scatter") {
                this.is_datalabels = false;
                return "scatter"
            }
            else if (ctype == "polarArea") {
                this.is_datalabels = false;
                return "polarArea"
            }
            else if (ctype == "area") {
                this.is_datalabels = false;
                return "area"
            }
            //else if (ctype == "area"){
            //this.is_datalabels = false;
            //this.is_datalabels = false;
            //return "area"
            //}
            else if (ctype == "h_bar") {
                this.is_horizontal = true;
                this.is_datalabels = false;
                return "bar"
            }
            else if (ctype == "heatmap") {
                this.is_horizontal = false;
                this.is_datalabels = true;
                return "heatmap"
            }
            else {
                console.log(this.is_stack);
                return ctype
            }
        },

        setType(type) {
            console.log(type);
            this.zzOrgType = type;
            this.is_stack = false;
            this.is_datalabels = true;
            this.is_horizontal = false;

            this.is_curve = 'straight';


            this.zzType = this.subCharts(type);

        },
        getSeries() {
            if (this.zzType == "pie" || this.zzType == "donut" || this.zzType == "polarArea") return this.OO.seriesPie;
            else return this.OO.series;
        },
        getXlabels() {
            return this.OO.x_label;
        },
        getLabels() {
            if (this.zzType == "pie" || this.zzType == "donut" || this.zzType == "polarArea") return this.OO.labelsPie;
            else return this.OO.x_data;
        },

        changeDataType() {
            this.chartSeries = this.getSeries();
            this.chartOptions = {
                ...this.chartOptions, ...{
                    chart: {
                        // type: "line",
                        stacked: this.is_stack,
                        stroke: {

                            curve: this.is_curve,
                        },
                        plotOptions: {
                            bar: {
                                horizontal: this.is_horizontal
                            }
                        },
                        //horizontal: this.is_horizontal
                    },
                    dataLabels: {
                        enabled: this.is_datalabels,


                        style: {
                            fontSize: '12px',
                        }
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 4,
                            horizontal: this.is_horizontal,
                        }
                    },
                    xaxis: {
                        categories: this.getLabels(),

                        tickPlacement: 'between',

                        title: {
                            text: this.getXlabels(),
                            position: 'bottom',
                            style: {
                                fontSize: '12px',
                            },
                        },
                        offsetX: 0,
                        offsetY: 0,
                    },
                    labels: this.getLabels()
                }
            }
        }
    }
    return m
}

// function apex_hbar(data) {
//     data = {

//         series: data.series,
//         chartOptions: {
//             chart: {
//                 type: 'bar',
//                 height: 150,
//                 stacked: true,
//                 stackType: '100%'
//             },
//             colour: data.color,
//             plotOptions: {
//                 bar: {
//                     horizontal: true,
//                 }
//             },
//             title: {
//                 text: data.title
//             },
//             xaxis: {

//                 categories: data.labels, show: false,
//                 show: false,
//                 labels: {

//                     show: false
//                 },

//                 axisBorder: {

//                     show: false,
//                 },

//                 axisTicks: {
//                     shw: true,
//                 },

//             },
//             yaxis: {

//                 show: false,
//                 labels: {

//                     show: false
//                 },

//                 axisBorder: {
//                     show: false,

//                     axisTicks: {
//                         show: false,

//                     },

//                 },
//             },

//             grid: {
//                 show: false,
//             },
//             legend: {
//                 position: 'top',
//                 horizontalAlign: 'left',
//                 offsetX: 3
//             }
//         },
//     }
//     return data
// }



