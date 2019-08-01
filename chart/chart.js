var dps = [];

var chart = new CanvasJS.Chart("chartContainer", {
    exportEnabled: true,
    title: {
        text: "Chart with Date Selector"
    },
    data: [{
        type: "line",
        dataPoints: dps
    }]
});

$.getJSON("http://localhost:3004/posts", function (chartData) {

    var tempArr = [];

    for (var i = 0; i < chartData.length; i++) {

        var cpuInfo = chartData[i].data[i].split("cpu: ");
        //console.log(cpuInfo);
        //needs work below

        //tempArr.push(chartData[i].data[i].split);

        //var test = (tempArr[i].date);
        //console.log(test);

        console.log(chartData[i].date);
        var timeStamp = (chartData[i].date).toString().match(/\.*[0-9]+/);
        var timeZone = (chartData[i].date).toString().match(/\.*-[0-9]+/);

        dps.push({
            x: new Date(parseInt(timeStamp) + parseInt(timeZone)),
            y: parseFloat(cpuInfo)
        });
    }
    chart.render();

    var axisXMin = chart.axisX[0].get("minimum");
    var axisXMax = chart.axisX[0].get("maximum");

    $(function () {
        $("#fromDate").val(CanvasJS.formatDate(axisXMin, "D MMM YYYY"));
        $("#toDate").val(CanvasJS.formatDate(axisXMax, "D MMM YYYY"));
        $("#fromDate").datepicker({
            dateFormat: "d M yy"
        });
        $("#toDate").datepicker({
            dateFormat: "d M yy"
        });
    });

    $("#date-selector").change(function () {
        var minValue = $("#fromDate").val();
        var maxValue = $("#toDate").val();

        if (new Date(minValue).getTime() < new Date(maxValue).getTime()) {
            chart.axisX[0].set("minimum", new Date(minValue));
            chart.axisX[0].set("maximum", new Date(maxValue));
        }
    });

    $(".period").click(function () {
        var period = this.id;
        var minValue;
        minValue = new Date(axisXMax);

        switch (period) {
            case "1m":
                minValue.setMonth(minValue.getMonth() - 1);
                break;
            case "3m":
                minValue.setMonth(minValue.getMonth() - 3);
                break;
            case "6m":
                minValue.setMonth(minValue.getMonth() - 6);
                break;
            case "1y":
                minValue.setYear(minValue.getFullYear() - 1);
                break;
            default:
                minValue = axisXMin;
        }

        chart.axisX[0].set("minimum", new Date(minValue));
        chart.axisX[0].set("maximum", new Date(axisXMax));
    });
});