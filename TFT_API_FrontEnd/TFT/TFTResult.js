var API_key = "RGAPI-2eabe40e-2887-401f-bbea-b9faa70d4bc7";
var summoner_name = "";
var server = "";
const Regions = [
  'https://br1.api.riotgames.com',
  'https://eun1.api.riotgames.com',
  'https://euw1.api.riotgames.com',
  'https://jp1.api.riotgames.com',
  'https://kr.api.riotgames.com',
  'https://la1.api.riotgames.com',
  'https://la2.api.riotgames.com',
  'https://na1.api.riotgames.com',
  'https://oc1.api.riotgames.com',
  'https://tr1.api.riotgames.com',
  'https://ru.api.riotgames.com',
  'https://ph2.api.riotgames.com',
  'https://sg2.api.riotgames.com',
  'https://th2.api.riotgames.com',
  'https://tw2.api.riotgames.com',
  'https://vn2.api.riotgames.com'

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
  if(num == 1){
    document.getElementById("error").innerHTML = "";
    summoner_name = document.getElementById("summoner_name").value;
  }
  else if(num == 2){
    document.getElementById("error2").innerHTML = "";
    summoner_name = document.getElementById("summoner_name2").value;
  }

  chooseRegion(num);
  await data(num);
}


function chooseRegion(num){
  if(num == 1){
    var selectElement = document.getElementById("choose_region");
  }
  else if(num == 2){
    var selectElement = document.getElementById("choose_region2");
  }
  
  var selectedValue = selectElement.value;

  switch(selectedValue){
    case "BR1":
      server = Regions[0];
      break;
    case "EUN1":
      server = Regions[1];
      break;
    case "EUW1":
      server = Regions[2];
      break;
    case "JP1":
      server = Regions[3];
      break;
    case "KR":
      server = Regions[4];
      break;
    case "LA1":
      server = Regions[5];
      break;
    case "LA2":
      server = Regions[6];
      break;
    case "NA1":
      server = Regions[7];
      break;
    case "OC1":
      server = Regions[8];
      break;
    case "TR1":
      server = Regions[9];
      break;
    case "RU":
      server = Regions[10];
      break;
    case "PH2":
      server = Regions[11];
      break;
    case "SG2":
      server = Regions[12];
      break;
    case "TH2":
      server = Regions[13];
      break;
    case "TW2":
      server = Regions[14];
      break;
    case "VN2":
      server = Regions[15];
      break;
    default:
      server = Regions[0];
  }
}


async function data(num){
  var summonerNameURL = "/tft/summoner/v1/summoners/by-name/"+summoner_name;
  var fullSummonerURL = server + summonerNameURL + "?api_key=" + API_key;

  try{
  const dataSummoner = await fetch(fullSummonerURL);
  const dataSummonerJSON = await dataSummoner.json();
  console.log(dataSummonerJSON);

  //Summoner's profile picture
  var profile_pic_id_number = dataSummonerJSON.profileIconId;
  var profile_pic_url = "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/"+profile_pic_id_number+".png";
  var imgTag = '<img src="' + profile_pic_url + '" alt="Summoner Profile Picture">';
  if(num == 1){
    document.getElementById("imageCell1").innerHTML = imgTag;
  }
  if(num == 2){
    document.getElementById("imageCell2").innerHTML = imgTag;
  }
  
  //Summoner's name
  var summoner_profile_name = dataSummonerJSON.name;
  if(num == 1){
    document.getElementById("name1").innerHTML = summoner_profile_name;
  }
  else if(num == 2){
    document.getElementById("name2").innerHTML = summoner_profile_name;
  }
  
  //Summoner's level
  var summoner_level = dataSummonerJSON.summonerLevel;
  if(num == 1){
    document.getElementById("level1").innerHTML= summoner_level;
  }
  else if(num == 2){
    document.getElementById("level2").innerHTML= summoner_level;
  }
  
  }catch(error){
    console.log("Error: "+error);
    if(num == 1){
      document.getElementById("error").style.display = "block";
      document.getElementById("error").innerHTML = "User not found within this region.";
      document.getElementById("imageCell1").innerHTML = "";
      document.getElementById("name1").innerHTML = "";
      document.getElementById("level1").innerHTML= "";
      document.getElementById("wins1").innerHTML = "";
      document.getElementById("losses1").innerHTML = "";
      document.getElementById("winloss1").innerHTML ="";
      document.getElementById("leaguePoints1").innerHTML = "";
      document.getElementById("rank1").innerHTML= "";
      document.getElementById("tier1").innerHTML = "";
      document.getElementById("veteran1").innerHTML = ""; 
    }

    if(num == 2){
      document.getElementById("error2").style.display = "block";
      document.getElementById("error2").innerHTML = "User not found within this region.";
      document.getElementById("imageCell2").innerHTML = "";
      document.getElementById("name2").innerHTML = "";
      document.getElementById("level2").innerHTML= "";
      document.getElementById("wins2").innerHTML = "";
      document.getElementById("losses2").innerHTML = "";
      document.getElementById("winloss2").innerHTML ="";
      document.getElementById("leaguePoints2").innerHTML = "";
      document.getElementById("rank2").innerHTML= "";
      document.getElementById("tier2").innerHTML = "";
      document.getElementById("veteran2").innerHTML = "";
    }
  }

  try{
    const dataSummoner = await fetch(fullSummonerURL);
    const dataSummonerJSON = await dataSummoner.json();

    //Summoner Ranked Data Below (League):
    var summonerID = dataSummonerJSON.id;
    var leagueURL = server+"/tft/league/v1/entries/by-summoner/"+summonerID+"?api_key="+API_key;
    const leagueSummoner = await fetch(leagueURL);
    const leagueSummonerJSON = await leagueSummoner.json();
    console.log(leagueSummonerJSON);
    //Ranked Wins
    var summoner_wins = leagueSummonerJSON[0].wins;
    if(num == 1){
      document.getElementById("wins1").innerHTML = summoner_wins;
    }
    else if(num == 2){
      document.getElementById("wins2").innerHTML = summoner_wins;
    }

    //Ranked Losses
    var summoner_losses = leagueSummonerJSON[0].losses;
    if(num == 1){
      document.getElementById("losses1").innerHTML = summoner_losses;
    }
    else if(num == 2){
      document.getElementById("losses2").innerHTML = summoner_losses;
    }

    //Win/Loss Ratio
    if(num == 1){
      document.getElementById("winloss1").innerHTML = calculateRatio(summoner_wins, summoner_losses) + " %";
    }
    else if(num == 2){
      document.getElementById("winloss2").innerHTML = calculateRatio(summoner_wins, summoner_losses) + "%";
    }
    
    //League Points
    var summoner_leaguePoints = leagueSummonerJSON[0].leaguePoints;
    if(num == 1){
      document.getElementById("leaguePoints1").innerHTML =summoner_leaguePoints;
    }
    else if(num == 2){
      document.getElementById("leaguePoints2").innerHTML =summoner_leaguePoints;
    }
    
    //Rank
    var summoner_rank = leagueSummonerJSON[0].rank;
    if(num == 1){
      document.getElementById("rank1").innerHTML = summoner_rank;
    }
    else if(num == 2){
      document.getElementById("rank2").innerHTML = summoner_rank;
    }

    //Tier
    var summoner_tier = leagueSummonerJSON[0].tier;
    if(num == 1){
      document.getElementById("tier1").innerHTML = summoner_tier;
    }
    else if(num == 2){
      document.getElementById("tier2").innerHTML = summoner_tier;
    }

    //Veteran
    var summoner_veteran = leagueSummonerJSON[0].veteran;
    if(num == 1){
      document.getElementById("veteran1").innerHTML = summoner_veteran;
    }
    else if(num == 2){
      document.getElementById("veteran2").innerHTML = summoner_veteran;
    }
    
    if(num == 1){
      showTable1();
    }
    else if (num == 2){
      showTable2();
    }

  }catch(error){
    console.log("Error: "+error);
    if(num == 1){
      document.getElementById("wins1").innerHTML = "";
      document.getElementById("losses1").innerHTML = "";
      document.getElementById("winloss1").innerHTML ="";
      document.getElementById("leaguePoints1").innerHTML = "";
      document.getElementById("rank1").innerHTML= "";
      document.getElementById("tier1").innerHTML = "";
      document.getElementById("veteran1").innerHTML = ""; 
    }
    else if(num == 2){
      document.getElementById("wins2").innerHTML = "";
      document.getElementById("losses2").innerHTML = "";
      document.getElementById("winloss2").innerHTML ="";
      document.getElementById("leaguePoints2").innerHTML = "";
      document.getElementById("rank2").innerHTML= "";
      document.getElementById("tier2").innerHTML = "";
      document.getElementById("veteran2").innerHTML = "";
    }
  }
  
}


function compareSummoners(){
  //level comparison
  var level1 = document.getElementById("level1").innerHTML;
  var level2 = document.getElementById("level2").innerHTML;
  var levelDifference;

  if(level1 !== "" && level2 !== ""){
    if(level1 > level2){
      levelDifference = level1 - level2;
      document.getElementById("level1").innerHTML = level1 + " ( ↑ " + levelDifference + " )";
      document.getElementById("level2").innerHTML = level2 + " ( ↓ " + levelDifference + " )";
      document.getElementById("level1").classList.add("green");
      document.getElementById("level2").classList.add("red");
    }else if(level1 < level2){
      levelDifference = level2 - level1;
      document.getElementById("level1").innerHTML = level1 + " ( ↓ " + levelDifference + " )";
      document.getElementById("level2").innerHTML = level2 + " ( ↑ " + levelDifference + " )";
      document.getElementById("level1").classList.add("red");
      document.getElementById("level2").classList.add("green");
    }else{
      levelDifference = 0;
      document.getElementById("level1").innerHTML = level1 + " ( = )";
      document.getElementById("level2").innerHTML = level2 + " ( = )";
    }
  }
  
  //wins comparison
  var wins1 = document.getElementById("wins1").innerHTML;
  var wins2 = document.getElementById("wins2").innerHTML;
  var winsDifference;

  if(wins1 !== "" && wins2 !== ""){
    if(wins1 > wins2){
      winsDifference = wins1 - wins2;
      document.getElementById("wins1").innerHTML = wins1 + " ( ↑ " + winsDifference + " )";
      document.getElementById("wins2").innerHTML = wins2 + " ( ↓ " + winsDifference + " )";
      document.getElementById("wins1").classList.add("green");
      document.getElementById("wins2").classList.add("red");
    }else if(level1 < level2){
      winsDifference = wins2 - wins1;
      document.getElementById("wins1").innerHTML = wins1 + " ( ↓ " + winsDifference + " )";
      document.getElementById("wins2").innerHTML = wins2 + " ( ↑ " + winsDifference + " )";
      document.getElementById("wins1").classList.add("red");
      document.getElementById("wins2").classList.add("green");
    }
    else{
      winsDifference = 0;
      document.getElementById("wins1").innerHTML = wins1 + " ( = )";
      document.getElementById("wins2").innerHTML = wins2 + " ( = )";
    }
  }
  
  //losses comparison
  var losses1 = document.getElementById("losses1").innerHTML;
  var losses2 = document.getElementById("losses2").innerHTML;
  var lossesDifference;

  if(losses1 != "" && losses2 != ""){
    if(losses1 > losses2){
      lossesDifference = losses1 - losses2;
      document.getElementById("losses1").innerHTML = losses1 + " ( ↑ " + lossesDifference + " )";
      document.getElementById("losses2").innerHTML = losses2 + " ( ↓ " + lossesDifference + " )";
      document.getElementById("losses1").classList.add("red");
      document.getElementById("losses2").classList.add("green");
    }else if(losses1 < losses2){
      lossesDifference = losses2 - losses1;
      document.getElementById("losses1").innerHTML = losses1 + " ( ↓ " + lossesDifference + " )";
      document.getElementById("losses2").innerHTML = losses2 + " ( ↑ " + lossesDifference + " )";
      document.getElementById("losses1").classList.add("green");
      document.getElementById("losses2").classList.add("red");
    }else{
      lossesDifference = 0;
      document.getElementById("losses1").innerHTML = losses1 + " ( = )";
      document.getElementById("losses2").innerHTML = losses2 + " ( = )";
    }
  }
  
  //Win/Loss Ratio Comparison
  if(wins1 !== "" && wins2 !== "" && losses1 !== "" && losses2 !== ""){
    var ratio1 = calculateRatio(wins1,losses1);
    var ratio2 = calculateRatio(wins2,losses2);
    var ratioDifference;

    if(ratio1 > ratio2){
      ratioDifference = ratio1 - ratio2;
      document.getElementById("winloss1").innerHTML = ratio1 + " ( ↑ " + ratioDifference + " )";
      document.getElementById("winloss2").innerHTML = ratio2 + " ( ↓ " + ratioDifference + " )";
      document.getElementById("winloss1").classList.add("green");
      document.getElementById("winloss2").classList.add("red");
    }
    else if(ratio1 < ratio2){
      ratioDifference = ratio2 - ratio1;
      document.getElementById("winloss1").innerHTML = ratio1 + " ( ↓ " + ratioDifference + " )";
      document.getElementById("winloss2").innerHTML = ratio2 + " ( ↑ " + ratioDifference + " )";
      document.getElementById("winloss1").classList.add("red");
      document.getElementById("winloss2").classList.add("green");
    }
    else{
      document.getElementById("winloss1").innerHTML = ratio1 + " ( = )";
      document.getElementById("winloss2").innerHTML = ratio2 + " ( = )";
    }
  }

  //league points comparison
  var points1 = document.getElementById("leaguePoints1").innerHTML;
  var points2 = document.getElementById("leaguePoints2").innerHTML;
  var pointsDifference;

  if(points1 !== "" && points2 !== ""){
    if(points1 > points2){
      pointsDifference = points1 - points2;
      document.getElementById("leaguePoints1").innerHTML = points1 + " ( ↑ " + pointsDifference + " )";
      document.getElementById("leaguePoints2").innerHTML = points2 + " ( ↓ " + pointsDifference + " )";
      document.getElementById("leaguePoints1").classList.add("green");
      document.getElementById("leaguePoints2").classList.add("red");
    }else if(points1 < points2){
      pointsDifference = points2 - points1;
      document.getElementById("leaguePoints1").innerHTML = points1 + " ( ↓ " + pointsDifference + " )";
      document.getElementById("leaguePoints2").innerHTML = points2 + " ( ↑ " + pointsDifference + " )";
      document.getElementById("leaguePoints1").classList.add("red");
      document.getElementById("leaguePoints2").classList.add("green");
    }else{
      pointsDifference = 0;
      document.getElementById("leaguePoints1").innerHTML = points1 + " ( = )";
      document.getElementById("leaguePoints2").innerHTML = points2 + " ( = )";
    }
  }

  // Hide the compare button
  document.getElementById("compare").style.display = "none";
  
}


function calculateRatio(a,b){
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));

  const precentage = Math.abs(Math.round(a / (a+b) * 100));
  console.log(precentage);
  return precentage;
}