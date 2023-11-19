var API_key = "RGAPI-3a247eb4-e920-4493-b727-bb89cd3fec99";
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

const ranks = ['IRON IV',
'IRON III',
'IRON II',
'IRON I',
'BRONZE IV',
'BRONZE III',
'BRONZE II',
'BRONZE I',
'SILVER IV',
'SILVER III',
'SILVER II',
'SILVER I',
'GOLD IV',
'GOLD III',
'GOLD II',
'GOLD I',
'PLATINUM IV',
'PLATINUM III',
'PLATINUM II',
'PLATINUM I',
'EMERALD IV',
'EMERALD III',
'EMERALD II',
'EMERALD I',
'DIAMOND III',
'DIAMOND II',
'DIAMOND I',
'MASTER',
'GRANDMASTER',
'CHALLENGER'

];


function showTable1() {
  // Hide the input fields and image
  document.getElementById("choose_region").style.display = "none";
  document.getElementById("summoner_name").style.display = "none";
  document.getElementById("search_button").style.display = "none";
  document.getElementById("image").style.display = "none";

  // Show the table for the first player
  document.getElementById("result").style.display = "table";

  // Show the search bar for second player
  document.getElementById("input-container2").style.display = "block";
}


function showTable2() {
  // Hide the search bar for second player
  document.getElementById("input-container2").style.display = "none";

  //Show the table for the second player
  document.getElementById("result2").style.display = "table";

  // Show the compare button
  document.getElementById("compare").style.display = "block";
}


async function Search_summoner(num){
  clearStats(num);
  
  //get element by id takes the string we input into the serch bar and logs it to the console then calls the data function
  //data function then connects to the LOL database to extract data
  if(num == 1){
      summoner_name = document.getElementById("summoner_name").value;
      console.log(summoner_name);

  }
  if(num == 2){
      summoner_name = document.getElementById("summoner_name2").value;
      console.log(summoner_name);
    
  }

  chooseRegion(num);
  await data(num);
}


function chooseRegion(num){
    
  if(num == 1){
      RegionNumber = document.getElementById("choose_region").value;
      server_url = Regions[RegionNumber];

  }
  if(num == 2){
      RegionNumber = document.getElementById("choose_region2").value;
      server_url = Regions[RegionNumber];
  }
  
}

function clearStats(num){
  document.getElementById("sum1level").innerHTML = " ";
  document.getElementById("sum2level").innerHTML = " ";
  document.getElementById("sum1wins").innerHTML = " ";
  document.getElementById("sum2wins").innerHTML = " ";
  document.getElementById("sum1losses").innerHTML = " ";
  document.getElementById("sum2losses").innerHTML = " ";
  document.getElementById("sum1division").innerHTML = " ";
  document.getElementById("sum2division").innerHTML = " ";
  document.getElementById("sum1leaguePoints").innerHTML = " ";
  document.getElementById("sum2leaguePoints").innerHTML = " ";
  document.getElementById("sum1winloss").innerHTML = " ";
  document.getElementById("sum2winloss").innerHTML = " ";
  if(num == 1){
      document.getElementById("ranked_win").innerHTML = " ";
      document.getElementById("ranked_lose").innerHTML = " ";
      document.getElementById("ranked_winratio").innerHTML = " ";
      document.getElementById("ranked_division").innerHTML = " ";
      document.getElementById("ranked_points1").innerHTML = " ";
      }
      if(num == 2){
          document.getElementById("ranked_win2").innerHTML = " ";
          document.getElementById("ranked_lose2").innerHTML = " ";
          document.getElementById("ranked_winratio2").innerHTML = " ";
          document.getElementById("ranked_division2").innerHTML = " ";
          document.getElementById("ranked_points2").innerHTML = " ";
          }
    
}


async function data(num){

  // the summonerNameUrl variable is used to attach the user name onto the link so that we can find the user we want
  var summonerNameUrl = "/lol/summoner/v4/summoners/by-name/"+summoner_name;
  //FullsommonerNameUrl puts together the url variable, the SUmmonernameUrl variable and the api key variable to create a full link
  var fullSummonerNameUrl = "https://"+server_url+summonerNameUrl+"?api_key="+API_key;
  console.log(fullSummonerNameUrl);


  try{
      //datasummoner_1 and 2 use the link to connect to the LOL website then fetch the user information and logs it to console 
      const dataSummoner_1 = await fetch(fullSummonerNameUrl);
      const dataSummoner_Full = await dataSummoner_1.json();
      console.log(dataSummoner_Full);


      //profile picture 
      //Extracts the users profile picture id and attaches it to a url which is then uses to etract the users profile piture from the database 
      // the users profile picture is then sent to the front end to be displayed to screen
      var profile_pic_number = dataSummoner_Full.profileIconId;
      var profile_pic_url = "http://ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/"+profile_pic_number+".png";
      

      if(num ==1){
          document.getElementById("summonerprofilepic_picture").src = profile_pic_url;

      }
      if(num == 2){
          document.getElementById("summonerprofilepic_picture2").src = profile_pic_url;
      }

      //summoner name

      //extract the users name from console and send it to the front end to be displayed
      summoner_name = dataSummoner_Full.name;

      if(num == 1){
          document.getElementById("summoner_name_data").innerHTML = summoner_name;

      }
      if(num == 2){
          document.getElementById("summoner_name_data2").innerHTML = summoner_name;

      }

      //level
          //extract the users level from console and send it to the front end to be displayed
      var summoner_Level = dataSummoner_Full.summonerLevel;
      console.log(summoner_Level);
      if(num == 1){
          
          document.getElementById("summonerlevel_data").innerHTML = summoner_Level;
      }
      if(num == 2){
          
          document.getElementById("summonerlevel_data2").innerHTML = summoner_Level;
      }

      //Rank
      var summoner_id = dataSummoner_Full.id;
      var summonernameUrl_2 ="/lol/league/v4/entries/by-summoner/";
      var ranked_summoner_url = "https://"+server_url+summonernameUrl_2+summoner_id+"?api_key="+API_key;
      const rankedSummoner1 = await fetch(ranked_summoner_url);
      const rankedSummoner_Full = await rankedSummoner1.json();
      console.log(rankedSummoner_Full);

      ///rank type

      if(num == 1)
      {
          queue = document.getElementById("choose_ranked_queue").value;
          const rankedSUmmoner_data = rankedSummoner_Full[queue];
          // there are different types of rank in league of legens this lets us specify which one we want to see
          var summoner_Win = rankedSUmmoner_data.wins;
          var summoner_Loss = rankedSUmmoner_data.losses;
         


          document.getElementById("ranked_win").innerHTML =  summoner_Win;
          document.getElementById("ranked_lose").innerHTML = summoner_Loss;
          var summoner_winratio = Math.round(summoner_Win/(summoner_Win+summoner_Loss) * 100);
          document.getElementById("ranked_winratio").innerHTML =  summoner_winratio ;
          //code to display the players rank and their how much elo points they have
          if(rankedSUmmoner_data.tier == "MASTER" || rankedSUmmoner_data.tier == "GRANDMASTER" || rankedSUmmoner_data.tier == "CHALLENGER" ){
              var division = rankedSUmmoner_data.tier
              document.getElementById("ranked_division").innerHTML = division;
          }
          else{
              var division = rankedSUmmoner_data.tier+" "+rankedSUmmoner_data.rank;
         
              document.getElementById("ranked_division").innerHTML = division;

          }
          
          var lolpoints = rankedSUmmoner_data.leaguePoints;
          
          document.getElementById("ranked_points1").innerHTML = lolpoints;
          
      }
      if(num == 2)
      {
          queue = document.getElementById("choose_ranked_queue2").value;
          const rankedSUmmoner_data = rankedSummoner_Full[queue];
          var summoner_Win = rankedSUmmoner_data.wins;
          var summoner_Loss = rankedSUmmoner_data.losses;
          document.getElementById("ranked_win2").innerHTML =  summoner_Win;
          document.getElementById("ranked_lose2").innerHTML = summoner_Loss;
  
          var summoner_winratio = Math.round(summoner_Win/(summoner_Win+summoner_Loss) * 100);
          document.getElementById("ranked_winratio2").innerHTML =  summoner_winratio;

          if(rankedSUmmoner_data.tier == "MASTER" || rankedSUmmoner_data.tier == "GRANDMASTER" || rankedSUmmoner_data.tier == "CHALLENGER" ){
              var division = rankedSUmmoner_data.tier
              document.getElementById("ranked_division2").innerHTML = division;
          }
          else{
              var division = rankedSUmmoner_data.tier+" "+rankedSUmmoner_data.rank;
         
              document.getElementById("ranked_division2").innerHTML = division;

          }

          //code to display the players rank and their how much elo points they have
          var lolpoints = rankedSUmmoner_data.leaguePoints;
          
          document.getElementById("ranked_points2").innerHTML = lolpoints;


          

      }
 

  }
  catch(error){
    console.log("Error: "+error);
    if(num == 1){
      document.getElementById("error").style.display = "block";
      document.getElementById("error").innerHTML = "User not found within this region.";
      document.getElementById("summonerprofilepic_picture").innerHTML = "";
      document.getElementById("summoner_name_data").innerHTML = "";
      document.getElementById("summonerlevel_data").innerHTML= "";
      document.getElementById("ranked_win").innerHTML = "";
      document.getElementById("ranked_lose").innerHTML = "";
      document.getElementById("ranked_winratio").innerHTML ="";
      document.getElementById("ranked_points").innerHTML = "";
      document.getElementById("ranked_division").innerHTML= "";
    }

    if(num == 2){
      document.getElementById("error").style.display = "block";
      document.getElementById("error").innerHTML = "User not found within this region.";
      document.getElementById("summonerprofilepic_picture2").innerHTML = "";
      document.getElementById("summoner_name_data2").innerHTML = "";
      document.getElementById("summonerlevel_data2").innerHTML= "";
      document.getElementById("ranked_win2").innerHTML = "";
      document.getElementById("ranked_lose2").innerHTML = "";
      document.getElementById("ranked_winratio2").innerHTML ="";
      document.getElementById("ranked_points2").innerHTML = "";
      document.getElementById("ranked_division2").innerHTML= "";
    }
  }

  



}



function compareSummoners(){
  //level comparison
  var level1 = document.getElementById("summonerlevel_data").innerHTML;
  var level2 = document.getElementById("summonerlevel_data2").innerHTML;
  var levelDifference;

  if(level1 !== "" && level2 !== ""){
    if(level1 > level2){
      levelDifference = level1 - level2;
      document.getElementById("sum1level").innerHTML = "↑ " + levelDifference;
      document.getElementById("sum2level").innerHTML = "↓ " + levelDifference;
      document.getElementById("sum1level").classList.add("green");
      document.getElementById("sum2level").classList.add("red");
    }else if(level1 < level2){
      levelDifference = level2 - level1;
      document.getElementById("sum1level").innerHTML = "↓ " + levelDifference;
      document.getElementById("sum2level").innerHTML = "↑ " + levelDifference;
      document.getElementById("sum1level").classList.add("red");
      document.getElementById("sum2level").classList.add("green");
    }else{
      levelDifference = 0;
      document.getElementById("sum1level").innerHTML = "= " + levelDifference;
      document.getElementById("sum2level").innerHTML = "= " + levelDifference;
    }
  }

  //wins comparison
  var wins1 = document.getElementById("ranked_win").innerHTML;
  var wins2 = document.getElementById("ranked_win2").innerHTML;
  var winsDifference;

  if(wins1 !== "" && wins2 !== ""){
    if(wins1 > wins2){
      winsDifference = wins2 - wins1;
      document.getElementById("sum1wins").innerHTML = "↑ " + winsDifference;
      document.getElementById("sum2wins").innerHTML = "↓ " + winsDifference;
      document.getElementById("sum1wins").classList.add("green");
      document.getElementById("sum2wins").classList.add("red");
    }else if(level1 < level2){
      winsDifference = wins1 - wins2;
      document.getElementById("sum1wins").innerHTML = "↓ " + winsDifference;
      document.getElementById("sum2wins").innerHTML = "↑ " + winsDifference;
      document.getElementById("sum1wins").classList.add("red");
      document.getElementById("sum2wins").classList.add("green");
    }
    else{
      winsDifference = 0;
      document.getElementById("sum1wins").innerHTML = "= " + winsDifference;
      document.getElementById("sum2wins").innerHTML = "= " + winsDifference;
    }
  }
  //losses comparison
  var losses1 = document.getElementById("ranked_lose").innerHTML;
  var losses2 = document.getElementById("ranked_lose2").innerHTML;
  var lossesDifference;

  if(losses1 != "" && losses2 != ""){
    if(losses1 > losses2){
      lossesDifference = losses2 - losses1;
      document.getElementById("sum1losses").innerHTML = "↑ " + lossesDifference;
      document.getElementById("sum2losses").innerHTML = "↓ " + lossesDifference;
      document.getElementById("sum1losses").classList.add("red");
      document.getElementById("sum2losses").classList.add("green");
    }else if(losses2 > losses1){
      lossesDifference = losses1 - losses2;
      document.getElementById("sum1losses").innerHTML = "↓ " + lossesDifference;
      document.getElementById("sum2losses").innerHTML = "↑ " + lossesDifference;
      document.getElementById("sum1losses").classList.add("green");
      document.getElementById("sum2losses").classList.add("red");
    }else{
      lossesDifference = 0;
      document.getElementById("sum1losses").innerHTML = "= " + lossesDifference;
      document.getElementById("sum2losses").innerHTML = "= " + lossesDifference;
    }
  }
  //Win/Loss Ratio Comparison
  var ratio1 = document.getElementById("ranked_winratio").innerHTML;
  var ratio2 = document.getElementById("ranked_winratio2").innerHTML;
  var compareRatio;
  if(ratio1 != "" && ratio2 != ""){
    if(ratio1 > ratio2){
      compareRatio = ratio2 - ratio1;
      document.getElementById("sum1winloss").innerHTML = "↑ " + compareRatio;
      document.getElementById("sum2winloss").innerHTML = "↓ " + compareRatio;
      document.getElementById("sum1winloss").classList.add("green");
      document.getElementById("sum2winloss").classList.add("red");
    }
    else if(ratio1 < ratio2){
      compareRatio = ratio2 - ratio1;
      document.getElementById("sum1winloss").innerHTML = "↓ " + compareRatio;
      document.getElementById("sum2winloss").innerHTML = "↑ " + compareRatio;
      document.getElementById("sum1winloss").classList.add("red");
      document.getElementById("sum2winloss").classList.add("green");
    }
    else{
      compareRatio = 0;
      document.getElementById("sum1winloss").innerHTML = "= " + compareRatio;
      document.getElementById("sum2winloss").innerHTML = "= " + compareRatio;
    }
  }

  //league points comparison
  var points1 = document.getElementById("ranked_points1").innerHTML;
  var points2 = document.getElementById("ranked_points2").innerHTML;
  var pointsDifference;

  if(points1 !== "" && points2 !== ""){
    if(points1 > points2){
      pointsDifference = points1 - points2;
      document.getElementById("sum1leaguePoints").innerHTML = "↑ " + pointsDifference;
      document.getElementById("sum2leaguePoints").innerHTML = "↓ " + pointsDifference;
      document.getElementById("sum1leaguePoints").classList.add("green");
      document.getElementById("sum2leaguePoints").classList.add("red");
    }else if(points1 < points2){
      pointsDifference = points2 - points1;
      document.getElementById("sum1leaguePoints").innerHTML = "↓ " + pointsDifference;
      document.getElementById("sum2leaguePoints").innerHTML = "↑ " + pointsDifference;
      document.getElementById("sum1leaguePoints").classList.add("red");
      document.getElementById("sum2leaguePoints").classList.add("green");
    }else{
      pointsDifference = 0;
      document.getElementById("sum1leaguePoints").innerHTML = "= " + pointsDifference;
      document.getElementById("sum2leaguePoints").innerHTML = "= " + pointsDifference;
    }
  }

  // rank compare
  var ranktier1;
  var ranktier2;
  var rankDifference;
  for(var i = 0; i<= ranks.length;i++){
      if(document.getElementById("ranked_division").innerHTML == ranks[i])
      {
          ranktier1 = i;
      }
      if(document.getElementById("ranked_division2").innerHTML == ranks[i]){
          ranktier2 = i;
      }
  }
  if(ranktier1!== "" && ranktier2 !== ""){
      if(ranktier1 > ranktier2){
        rankDifference = ranktier1 - ranktier2;
        document.getElementById("sum1division").innerHTML = "↑ " + rankDifference;
        document.getElementById("sum2division").innerHTML = "↓ " + rankDifference;
        document.getElementById("sum1division").classList.add("green");
        document.getElementById("sum2division").classList.add("red");
      }else if(ranktier1 < ranktier2){
          rankDifference = ranktier2 - ranktier1;
        document.getElementById("sum1division").innerHTML = "↓ " + rankDifference;
        document.getElementById("sum2division").innerHTML = "↑ " + rankDifference;
        document.getElementById("sum1division").classList.add("red");
        document.getElementById("sum2division").classList.add("green");
      }else{
        rankDifference = 0;
        document.getElementById("sum1division").innerHTML = "= " + rankDifference;
        document.getElementById("sum2division").innerHTML = "= " + rankDifference;
      }
    }
  
    document.getElementById("compare").style.display = "none";
}


