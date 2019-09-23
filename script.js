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
      timetable: null
      }
  })




  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         app.timetable = JSON.parse(xhttp.responseText);
         console.log(app.timetable)

      }
  };
  xhttp.open("GET", "https://uclcssa.cn/post/get-timetable.php?id=21472135352675&date=2019-10-01", true);
  xhttp.send();