$(document).ready(
  function (){

    var date = "2018-01-01";

    var momentDate = moment(date);

    var month = momentDate.format('M') - 1;

    printCalendar(momentDate);

    $(".prev").click(function(){
      if(momentDate.format("M") == 1){
        alert("Non puoi tornare indietro")
      }else{
        momentDate.subtract(1, 'months');
        printCalendar(momentDate);
        stampaRisultato(momentDate);
      }
    });


    $(".next").click(function(){
      if(momentDate.format("M") == 12){
        alert("Non puoi andare avanti")
      }else{
        momentDate.add(1, 'months');
        printCalendar(momentDate);
        stampaRisultato(momentDate);

      }

      // var thisM = $('h1').attr('data-date');
      // var nextM = momentDate.add(1, 'months');
      // printCalendar(momentDate);
      // stampaRisultato(momentDate);

    });




    function printCalendar (momentDate){
      $("#days").html("");

      $("h1").text(momentDate.format("MMMM YYYY"));

      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);

      var dateCompleteMoment = moment(date);

      for (var i = 1; i <= momentDate.daysInMonth(); i++){

        var context = {
          "day" : i,
          "month" : momentDate.format("MMMM"),
          "dateComplete" : dateCompleteMoment.format("YYYY-MM-DD")
        };

        var html = template(context);

        $("#days").append(html);


        dateCompleteMoment.add(1, 'day');

      }

      stampaRisultato(momentDate);

    }


    function stampaRisultato(){

      $.ajax(
      {
        url: "https://flynn.boolean.careers/exercises/api/holidays",
        "data" : {
          "year": 2018,
          "month" : month
        },

        "method": "GET",
        "success": function (data, stato) {
          var holidays = data.response;
          for (var i = 0; i < holidays.length; i++) {

            var holidayDate = holidays[i].date;
            var holidayName = holidays[i].name;

            var item = $(".day[data-date = '"+holidayDate+"']");

            item.addClass("holiday");
            item.children(".holidayType").text("- " +holidayName);

          }
        },
        error: function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
        }
      });
    }



  });
