  const dateFormat = 'YYYY-MM-DD';
  const todayDateConst = moment().format(dateFormat);

  const CHINESE = { today: "今日",
                    next: "下一周",
                    prev: "上一周",
                    info: "Timetable 信息由 UCL API 提供。数据仅供参考，为以防万一，重要课程请查阅UCL官网。",
                    loading: "我们正在努力获取您最新的完整课表，请稍等...",
                    resync: "立即重新同步"
                  }
  const ENGLISH = { today: "Today",
                    next: "Next",
                    prev: "Prev",
                    info: "Timetable data is provided by UCL API, for reference only. For important courses, please visit timetable.ucl.ac.uk for a more accurate data.",
                    loading: "Just a moment while we are fetching your full timetable...",
                    resync: "Resync Now"
                  }
  
  
  let ifanrId = findGetParameter("id")
  // Vue.config.devtools = true

  Vue.component('session', {
    props: ['session', 'date'],
    template: `
      <div class="post"  @click="openSidePanel(session,date)" style="display:flex; flex-direction: horizontal;vertical-align:middle;">
      <div style="width:20%;text-align:center; font-size: 17px; padding-top: 5px; color:#f48641">
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
      todayDate: todayDateConst,
      loaded: false,
      current: null,
      currentDate: null,
      LANG: ENGLISH,
      spcoverStyle: null,
      isSidePanelOpen: false,
      notice: null
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



  function openSidePanel(session,date) {
    app.current = session
    app.currentDate = date
    toggleBackCover(true)
    document.getElementById("sidepannel").style.top = "20%";
    document.getElementById("closebtn").style.top = "22%";
    app.isSidePanelOpen = true

    //ga report
    gtag('event', date, {
      'event_category': 'timetable-detail-opened',
      'event_label': `id=${ifanrId}&date=${date}&session=${session.session_title}`,
      'value': 0
    });
  }
  
  function closeSidePanel() {
      toggleBackCover(false)
      document.getElementById("sidepannel").style.top = "100%";
      document.getElementById("closebtn").style.top = "-5%";
      app.isSidePanelOpen = false
  }

  function toggleBackCover(isVisible){
    app.spcoverStyle = isVisible ? {opacity:0.5, visibility:"visible"} : {opacity:0, visibility:"hidden"};
  }

  function showNotice(text) {
    app.notice = text
    toggleBackCover(true)
    document.getElementById("info").style.top = "20%";
    //ga report
    gtag('event', 'loading-notice-showed', {
      'event_category': 'timetable-notice',
      'event_label': `id=${ifanrId}&date=${date}`,
      'value': 0
    });
  }
  
  function hideNotice() {
      toggleBackCover(false)
      document.getElementById("info").style.top = "-20%";
  }
  
  function getMondayOfDate(dateString){
    return moment(dateString).startOf('week').add(1,'day').format(dateFormat);
  }


  function getFromLocalStorage(dateString){
    console.log(localStorage.getItem("last_updated"))
    return JSON.parse(localStorage.getItem(getMondayOfDate(dateString)))
  }

  function setToLocalStorage(dateString, sessions){
    console.log(`stored `+dateString)
    localStorage.setItem("last_updated", moment().toISOString())
    return localStorage.setItem(getMondayOfDate(dateString), sessions)
  }


  function scrollTo(id, dontCheckIfScrolled) {
    console.log("scorll")
    if(!dontCheckIfScrolled && (document.documentElement.scrollTop || document.body.scrollTop) != 0){
      return
    }
    let elmnt = document.getElementById(id);
    if(elmnt){
        elmnt.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
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
  

  let xhttp = null;

  function requestTimetable(date, doResync){
      app.timetable = null
      app.loaded = false

      hideNotice()

      let timeout = setTimeout(()=>{showNotice(app.LANG.loading)},3000)

      //find if there are a local stored version
      let cached = getFromLocalStorage(date);
      if (cached && !doResync) {
        app.timetable = cached;
        scrollTo('today',true)
      }

      if(xhttp) xhttp.abort();

      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          //ga report
          gtag('event', date, {
            'event_category': 'request-timetable',
            'event_label': `id=${ifanrId}&date=${date}&resync=${doResync}`,
            'value': 0
          });


          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            clearTimeout(timeout)
            hideNotice()
            if(xhttp.responseText == -1){
              showNotice("Error getting your timetable, please check whether you have the correct permission.")
              return
            }
            
            console.log("load")
            app.timetable = JSON.parse(xhttp.responseText);
            app.loaded = true;
            setToLocalStorage(date, xhttp.responseText)
            console.log(app.timetable)

            scrollTo('today')

          }
      };

      doResync = doResync ? "true" : "false"

      xhttp.open("GET", `https://uclcssa.cn/post/get-timetable.php?id=${ifanrId}&date=${date}&resync=${doResync}`, true);
      xhttp.send();
  }
requestTimetable(todayDateConst)


//change language based on browser
  console.log(navigator.language)
  if(navigator.language.search('zh') != -1){
    app.LANG = CHINESE
  }