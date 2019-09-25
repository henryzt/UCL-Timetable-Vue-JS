  const dateFormat = 'YYYY-MM-DD';
  const todayDateConst = moment().format(dateFormat);

  Vue.component('session', {
    data: () => ({ count: 10 }),
    props: ['session'],
    template: `
      <div class="post" style="display:flex; flex-direction: horizontal;vertical-align:middle;">
      <div style="width:20%;text-align:center; color:#f48641">
        <div>{{session.start_time}}</div>
        <div>{{session.end_time}}</div>
      </div>
      
      <div style='width:80%;'>
        <div class="name">
          {{session.session_title}}  

        </div> 

        <div class="post_title">
            {{session.location.name}} - {{session.location.site_name}}
        </div>
        <div class="post_title">
            {{session.module.lecturer.name}}    
        </div>

        <div>
          <div class="additional-info">{{" "+session.session_type_str}}</div>
        </div>

        </div>
      </div>  `
  })

  var app = new Vue({
    el: '#app',
    data: {
      timetable: null,
      date: todayDateConst,
      todayDate: todayDateConst
    },
    methods: {
      seekNextWeek: function(){
        this.date = moment(this.date).add(7, 'days').format(dateFormat)
        requestTimetable(this.date)
      },
  
      seekPreviousWeek: function(){
        this.date = moment(this.date).subtract(7, 'days').format(dateFormat)
        requestTimetable(this.date)
      },
  
      returnToday: function () {
        this.date = this.todayDate
        requestTimetable(this.date)
      }
    }
  })


  var sidePanelOpen;

  function openSidePanel() {
    sidePanelOpen = true;
    document.getElementById("sidepannel").style.top = "10%";
    document.getElementById("spcover").style.opacity=0.5;
    document.getElementById("spcover").style.visibility="visible";
    document.getElementById("closebtn").setAttribute("class","closebtn");
  }
  
  function closeSidePanel() {
      sidePanelOpen = false;
      document.getElementById("sidepannel").style.top = "100%";
      document.getElementById("spcover").style.opacity=0;
      document.getElementById("spcover").style.visibility="gone";
      document.getElementById("closebtn").setAttribute("class","hidden");
  }
  
  



  //ref https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
  function findGetParameter(parameterName) {
      var result = null,
          tmp = [];
      location.search
          .substr(1)
          .split("&")
          .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
          });
      return result;
  }

  let ifanrId = findGetParameter("id")

  let xhttp = null;

  function requestTimetable(date){
      app.timetable = null

      if(xhttp) xhttp.abort();

      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          //ga report
          gtag('event', 'request-timetable', {
            'event_category': 'timetable',
            'event_label': date,
            'value': `id=${ifanrId}&date=${date}`
          });


          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            app.timetable = JSON.parse(xhttp.responseText);
            console.log(app.timetable)

          }
      };
      xhttp.open("GET", `https://uclcssa.cn/post/get-timetable.php?id=${ifanrId}&date=${date}`, true);
      xhttp.send();
  }
requestTimetable(todayDateConst)