//variables for api which will let us connect to the database this needs to be changed every 24 hours as it expires , will need to find a way to stop that from happening 
// variable for url this is the start of the url link we need so that we cant send a conenction msg to the website
var API_key = "RGAPI-2df81382-5827-4349-8907-8459aa3be126";
var server_url = "";
var RegionNumber = "";
var summoner_name = "";
// different region url array
const Regions = ['br1.api.riotgames.com' ,
'eun1.api.riotgames.com',
'euw1.api.riotgames.com',
'jp1.api.riotgames.com',
'kr.api.riotgames.com',
'la1.api.riotgames.com',
'la2.api.riotgames.com',
'na1.api.riotgames.com',
'oc1.api.riotgames.com',
'tr1.api.riotgames.com',
'ru.api.riotgames.com',
'ph2.api.riotgames.com',
'sg2.api.riotgames.com',
'th2.api.riotgames.com',
'tw2.api.riotgames.com',
'vn2.api.riotgames.com'
]

// this functions allows the user to search for specific regions in the game
function chooseRegion(){
    RegionNumber = document.getElementById("choose_region").value;
    server_url = Regions[RegionNumber];
}

//this function is made so that we can search for a player using of "summoner" as they are called in game using their user name ("summoner name")
function Search_summoner(){

    //get element by id takes the string we input into the serch bar and logs it to the console then calls the data function
    //data function then connects to the LOL database to extract data
    summoner_name = document.getElementById("summoner_name").value;
    console.log(summoner_name);
    chooseRegion();
    data();
}

async function data(){

    // the summonerNameUrl variable is used to attach the user name onto the link so that we can find the user we want
    var summonerNameUrl = "/lol/summoner/v4/summoners/by-name/"+summoner_name;
    //FullsommonerNameUrl puts together the url variable, the SUmmonernameUrl variable and the api key variable to create a full link
    var fullSummonerNameUrl = "https://"+server_url+summonerNameUrl+"?api_key="+API_key;
    console.log(fullSummonerNameUrl);

    //datasummoner_1 and 2 use the link to connect to the LOL website then fetch the user information and logs it to console 
    const dataSummoner_1 = await fetch(fullSummonerNameUrl);
    const dataSummoner_Full = await dataSummoner_1.json();
    console.log(dataSummoner_Full);

    //extract the users name from console and send it to the front end to be displayed
    summoner_name = dataSummoner_Full.name;
    document.getElementById("summoner_name_data").innerHTML = "Summoner's name: "+summoner_name;

    //extract the users level from console and send it to the front end to be displayed
    var summoner_Level = dataSummoner_Full.summonerLevel;
    console.log(summoner_Level);

    document.getElementById("summonerlevel_data").innerHTML = summoner_name+" Summoner level is: "+summoner_Level;
    

    //Extracts the users profile picture id and attaches it to a url which is then uses to etract the users profile piture from the database 
    // the users profile picture is then sent to the front end to be displayed to screen
    var profile_pic_number = dataSummoner_Full.profileIconId;
    var profile_pic_url = "http://ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/"+profile_pic_number+".png";
    document.getElementById("summonerprofilepic_picture").src = profile_pic_url;

    //Rank
    var summoner_id = dataSummoner_Full.id;
    var summonernameUrl_2 ="/lol/league/v4/entries/by-summoner/";
    var ranked_summoner_url = "https://"+server_url+summonernameUrl_2+summoner_id+"?api_key="+API_key;
    const rankedSummoner1 = await fetch(ranked_summoner_url);
    const rankedSummoner_Full = await rankedSummoner1.json();
    console.log(rankedSummoner_Full);

    // there are different types of rank in league of legens this lets us specify which one we want to see
    queue = document.getElementById("choose_ranked_queue").value;
    const rankedSUmmoner_data = rankedSummoner_Full[queue];
    //code for win loss ratio
    var summoner_Win = rankedSUmmoner_data.wins;
    var summoner_Loss = rankedSUmmoner_data.losses;
    console.log(summoner_Win);
    document.getElementById("ranked_win").innerHTML = "W: " + summoner_Win;
    document.getElementById("ranked_lose").innerHTML = "L: " + summoner_Loss;
    var summoner_winratio = Math.round(summoner_Win/(summoner_Win+summoner_Loss) * 100);
    document.getElementById("ranked_winratio").innerHTML = "win ratio: "+ summoner_winratio +"%";
    //code to display the players rank and their how much elo points they have
    var division = rankedSUmmoner_data.tier+" "+rankedSUmmoner_data.rank+" "+"LP: "+rankedSUmmoner_data.leaguePoints;;
    document.getElementById("ranked_division").innerHTML = division;

    
}




