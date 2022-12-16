let url = window.location.href;
function getParameters() {
    let n=0;
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    for(let pair of queryString.entries()) {
        console.log("Key is:" + pair[0]);
        console.log("Value is:" + pair[1]);
        if(pair[0]==='d'){
            let d = pair[1];
            if(d[4]==='-'){  // 2022-12-31T23:59
                deadline = new Date(d).getTime();
            }
            else if(d[2]===':'){ // only time
                const date = new Date();
                var dateRegex = /^(\d{4})-(\d{2})-(\d{2})T.*$/
                var dateData = dateRegex.exec(date.toJSON());
                let year = dateData[1];
                let month = dateData[2];
                let day = dateData[3];
                let dateString = year+"-"+leadingZero(month)+"-"+leadingZero(day);
                deadline = new Date(dateString + "T" + d).getTime();
            }
            else if(parseInt(d)>1000000){  // unix time stamp (seconds since Jan 01 1970. (UTC) )
                deadline = new Date(parseInt(d)*1000).getTime();
            }
            else if(parseInt(d, 36)>0){    // unix time stamp in base 36
                deadline = new Date(parseInt(d, 36)*1000).getTime();
            }
            n++;
        }
        if(pair[0]==='u'){
            max_time_unit = pair[1];
            n++;
        }
        if(pair[0]==="e"){
            document.getElementsByTagName("body")[0].setAttribute("bg", pair[1]);
            document.title = pair[1]; 
            n++;
        }
    }
    console.log(n);
    return n;
}

function inputDate() {
    let text;
    const date = new Date();
    var timeRegex = /^.*T(\d{2}):(\d{2}):(\d{2}).*$/
    var dateRegex = /^(\d{4})-(\d{2})-(\d{2})T.*$/
    var dateData = dateRegex.exec(date.toJSON());
    var timeData = timeRegex.exec(date.toJSON());
    console.log(timeData);
    let year = dateData[1];
    let month = dateData[2];
    let day = dateData[3];
    let hour = parseInt(timeData[1])-date.getTimezoneOffset()/60;
    let minute = timeData[2];

    year=input("year",year);
    month=input("month",month);
    day=input("day",day);
    hour=input("hour",hour);
    minute=input("minute",parseInt(minute)+2);
    
    let dateString = year+"-"+leadingZero(month)+"-"+leadingZero(day)+"T"+leadingZero(hour)+":"+leadingZero(minute);
    //alert(dateString);
    deadline = new Date(dateString).getTime();
    //alert(deadline);
    let newURL = window.location.href + "?d="+(deadline/1000).toString(36);
    alert(newURL);
    setTimeout(function(){window.location.href = newURL;},2000); 
    
  }

function input(what,predef="") {
    data = prompt("Please enter "+what+":", predef);
    if (data == null || data == "") {
        console.log("User cancelled the prompt.");
    } else {
        console.log(what+" = " + data);
    }
    return data;
}

function leadingZero(n){
    if (parseInt(n)<10)
        return "0"+parseInt(n);
    else
        return ""+parseInt(n);
}