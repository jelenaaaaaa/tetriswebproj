document.getElementById("showbutton").addEventListener('click',function(){loadData(1,'showScores')});
document.getElementById("showbuttonlast").addEventListener('click',function(){loadData(2,'showScoresLast')});

function insertData() // this is used for inserting data
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {

        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("showAllScores").innerHTML=xmlhttp.responseText;
        }
    };

    var uname=name;
    var currentscore=document.cookie;

    xmlhttp.open("POST","insert_scores.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("uname="+uname+"&currentscore="+currentscore);
}

function loadData(sql,div) //function for displaying data
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {

        document.getElementById(div).innerHTML='<img src="ajax_loader.gif"';
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById(div).innerHTML=xmlhttp.responseText;
        }
    };

    xmlhttp.open("GET","get_scores.php?sql="+sql,true);
    xmlhttp.send();

}

function clearData1() //functions for clearing out the divs
{
    document.getElementById('showScores').innerHTML = "";
}

function clearData2()
{
    document.getElementById('showScoresLast').innerHTML = "";
}
