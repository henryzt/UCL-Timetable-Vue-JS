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
          <text class="additional-info">{{" "+session.session_type_str}}</text>
        </div>

        </div>
      </div>  `
  })

  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      today: {"date":"Tuesday 2019-10-01","today":false,"sessions":[{"start_time":"09:00","end_time":"11:00","duration":120,"module":{"module_id":"COMP0016","name":"Systems Engineering","department_id":"COMPS_ENG","department_name":"Computer Science","lecturer":{"name":"EVANS, Chris (Dr)","email":"ucaccev@ucl.ac.uk","department_id":"COMPS_ENG","department_name":"Computer Science"}},"location":{"name":"Roberts Building G06 Sir Ambrose Fleming LT","capacity":181,"type":"CB","address":["Torrington Place","London","WC1E 7JE",""],"site_name":"Roberts Building","coordinates":{"lat":"51.5229","lng":"-0.1321"}},"session_title":" Systems Engineering HCI Lecture","session_type":"L","session_type_str":"Lecture","contact":"Dr Chris Evans","instance":{"delivery":{"fheq_level":5,"is_undergraduate":true,"student_type":"Campus-based, numeric mark scheme"},"periods":{"teaching_periods":{"term_1":true,"term_2":true,"term_3":false,"term_1_next_year":false,"summer":false},"year_long":false,"lsr":false,"summer_school":{"is_summer_school":false,"sessions":{"session_1":false,"session_2":false}}},"instance_code":"A5U-T1\/2"},"session_group":null},{"start_time":"11:00","end_time":"13:00","duration":120,"module":{"module_id":"COMP0010","name":"Software Engineering","department_id":"COMPS_ENG","department_name":"Computer Science","lecturer":{"name":"MECHTAEV, Sergey (Mr)","email":"ucacmec@ucl.ac.uk","department_id":"COMPS_ENG","department_name":"Computer Science"}},"location":{"name":"Anatomy G29 J Z Young LT","capacity":186,"type":"CB","address":["Gower Street","London","WC1E 6BT",""],"site_name":"Medical Sciences and Anatomy","coordinates":{"lat":"51.523755","lng":"-0.133306"}},"session_title":"Software Engineering","session_type":"L","session_type_str":"Lecture","contact":"Mr Sergey Mechtaev","instance":{"delivery":{"fheq_level":5,"is_undergraduate":true,"student_type":"Campus-based, numeric mark scheme"},"periods":{"teaching_periods":{"term_1":true,"term_2":false,"term_3":false,"term_1_next_year":false,"summer":false},"year_long":false,"lsr":false,"summer_school":{"is_summer_school":false,"sessions":{"session_1":false,"session_2":false}}},"instance_code":"A5U-T1"},"session_group":null},{"start_time":"14:00","end_time":"16:00","duration":120,"module":{"module_id":"COMP0016","name":"Systems Engineering","department_id":"COMPS_ENG","department_name":"Computer Science","lecturer":{"name":"MOHAMEDALLY, Dean (Dr)","email":"ucacdmo@ucl.ac.uk","department_id":"COMPS_ENG","department_name":"Computer Science"}},"location":{"name":"Malet Place Engineering Building 1.05","capacity":25,"type":"DB","address":["Gower Street","London","WC1E 6BT",""],"site_name":"Malet Place Engineering Building","coordinates":{"lat":"51.5231","lng":"-0.1323"}},"session_title":"Systems Engineering (LABC)","session_type":"P","session_type_str":"Practical","contact":"Dr Dean Mohamedally \/ Dr Yun Fu","instance":{"delivery":{"fheq_level":5,"is_undergraduate":true,"student_type":"Campus-based, numeric mark scheme"},"periods":{"teaching_periods":{"term_1":true,"term_2":true,"term_3":false,"term_1_next_year":false,"summer":false},"year_long":false,"lsr":false,"summer_school":{"is_summer_school":false,"sessions":{"session_1":false,"session_2":false}}},"instance_code":"A5U-T1\/2"},"session_group":"LABC"}]}
            }
  })
