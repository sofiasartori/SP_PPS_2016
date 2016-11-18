angular.module('starter.services', [])
.service('Torta', function (){

    this.CrearGrafico=CrearGrafico;
    function CrearGrafico()
    {
        $("#tbltorta").hide();

            $('#torta').highcharts({
                data: {
                    table: 'tbltorta' // id de la tabla
                },
                chart: {
                     type: 'column'
                    //type: 'pie' 
                },
                title: {
                    text: ''
                },
                yAxis: {
                   allowDecimals: false,
                    title: {
                        text: 'Cantidad'
                    }
                },
               
                tooltip: {
                    formatter: function () {
                        //return '<b>' + this.series.name + '</b><br/>' +'Cantidad:'+
                        return '<b>' + this.series.name + '</b><br/>' +
                            this.point.y +'<br/>'; //+ this.point.name.toLowerCase();
                    }
                }
            });
    }
        
})