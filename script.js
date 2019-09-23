

  Vue.component('session', {
    data: () => ({ count: 10 }),
    props: ['session'],
    template: `
      <div class="time-block">
        <div class="block-title">{{count}}</div>
        <div class="block-title">{{ session.module.name }}</div>
        <div class="block-location">{{ session.location.name }}</div>
      </div>
    `
  })

  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      sessions: {"start_time":"09:00","end_time":"11:00","duration":120,"module":{"module_id":"COMP0016","name":"Systems Engineering","department_id":"COMPS_ENG","department_name":"Computer Science","lecturer":{"name":"MOHAMEDALLY, Dean (Dr)","email":"ucacdmo@ucl.ac.uk","department_id":"COMPS_ENG","department_name":"Computer Science"}},"location":{"name":"Royal National - Galleon C","capacity":240,"type":"CB","address":["38-51 Bedford Way, Russel Square","London","WC1H 0DG",""],"site_name":"Royal National Hotel","coordinates":{"lat":null,"lng":null}},"session_title":" Projects kick off session","session_type":"L","session_type_str":"Lecture","contact":"Dr Dean Mohamedally","instance":{"delivery":{"fheq_level":5,"is_undergraduate":true,"student_type":"Campus-based, numeric mark scheme"},"periods":{"teaching_periods":{"term_1":true,"term_2":true,"term_3":false,"term_1_next_year":false,"summer":false},"year_long":false,"lsr":false,"summer_school":{"is_summer_school":false,"sessions":{"session_1":false,"session_2":false}}},"instance_code":"A5U-T1\/2"},"session_group":null}
    }
  })
