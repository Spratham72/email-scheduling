function convert(str){
var ar=str.split(",");
var date="";
var k=ar[0].split(" ");
for(var i=0; i<k[0].length; i++){
    if(!isNaN(+k[0][i])){
        date+=k[0][i]
    }
}
var month=[`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `december`];
date+="-";
if(month.indexOf(k[1])<10){
    date+=0;
}
date+=month.indexOf(k[1])+1;
date+="-";
date+=ar[1];
date=date.split("-").reverse().join("-");
date+="T";
k=ar[2].split(" ");
if(k[1]=="AM"){
    if(k[0][1]==":"){
        date+=0;
        date+=k[0];
    }else{
        date+=k[0];
    }
   

}
if(k[1]=="PM"){
    var hr=k[0].split(":");
    hr[0]=+hr[0]+12;
    
    date+=hr[0];
    date+=":";
    date+=hr[1];
}
date+=":00Z"

return new Date(date);
}
module.exports=convert;
