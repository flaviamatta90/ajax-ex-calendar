// start
$(document).ready(
  function (){

    var date = "2018-01-01";

    var momentDate = moment(date);

    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 1; i <= momentDate.daysInMonth(); i++){

      var day = addZero(i);

      var dateComplete = momentDate.format("YYYY") + "-" + momentDate.format("MM") + "-" + day;

      var context = {
        "day" : i,
        "month" : momentDate.format("MMMM"),
        "dateComplete" : dateComplete
      };

      var html = template(context);

      $("#days").append(html);

    }



    $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays",
      "data" : {
        "year": 2018,
        "month" : 0
      },

      "method": "GET",
      "success": function (data, stato) {
        stampaRisultato(data.response);
      },
      error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
    }
  );

  function stampaRisultato(holidays) {

    if (holidays.lenght > 0) {
      for (var i = 0; i < holidays.length; i++) {

        var holidayDate = holidays[i].date;
        var holidayName = holidays[i].name;

        $(".day[data-date = '"+holidayDate+"']").addClass("holiday");
        $(".day[data-date = '"+holidayDate+"'] .holidayType").text("- " +holidayName);

      }
    }
  }

    function addZero(day){
      if(day < 10){
        return "0" + day;
      }
      return day;
  }

  });
