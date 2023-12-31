//The whole idea about searching for our user's statistics revolves arounf
//piecing together a URL that we can then send through the Riot Games'
//API


//Riot Games API key. Required to access their data.
var API_key = "RGAPI-04e1c54a-bf5f-4613-ac35-6179f8edfcfd";
var summoner_name = "";
var server = "";
//Array storing the URL to different regions.
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

//This funtion is called on pressing the search button on our different viewing stats pages.
//It calls other functions to create the required URL.
//It also clears the table using clearStats().
//Lastly, it checks to see if the user has two summoners in the table and if so, 
//displays the CompareSummoners() button.
async function Search_summoner(){
  clearStats();
  document.getElementById("error").innerHTML = "";
  summoner_name = document.getElementById("summoner_name").value;
  chooseRegion();
  await data();
  await compareButtonCheck();

  document.getElementById('result').style.display = 'table';
  document.getElementById('result').classList.add('fadeIn');
}

//This function works with the region choosing box.
//Each region is associated with a specific URL.
function chooseRegion(){

  var selectElement = document.getElementById("choose_region");
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

//The data() function is the function that ultimately pieces together the 
//information for the URL and sends it to the Riot Games API.
//There are specific pieces of information that have to be added to the Riot Games
//API URL so that the correct information is returned. 
async function data(){
  var summonerNameURL = "/lol/summoner/v4/summoners/by-name/"+summoner_name;
  var fullSummonerURL = server + summonerNameURL + "?api_key=" + API_key;
  var summoner_choice = document.getElementById("chooseSummonerNumber").value;

  //Try/Catch to catch errors when fetching the information from the URL
  try{
  const dataSummoner = await fetch(fullSummonerURL);
  const dataSummonerJSON = await dataSummoner.json();
  console.log(dataSummonerJSON);

  //Summoner's profile picture
  var profile_pic_id_number = dataSummonerJSON.profileIconId;
  var profile_pic_url = "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/"+profile_pic_id_number+".png";
  var imgTag = '<img crossorigin="anonymous" src="' + profile_pic_url + '" alt="Summoner Profile Picture">';
  if(summoner_choice == "Summoner 1"){
    document.getElementById("imageCell1").innerHTML = imgTag;
  }
  if(summoner_choice == "Summoner 2"){
    document.getElementById("imageCell2").innerHTML = imgTag;
  }
  
  //Summoner's name
  var summoner_profile_name = dataSummonerJSON.name;
  if(summoner_choice == "Summoner 1"){
    document.getElementById("name1").innerHTML = summoner_profile_name;
  }
  if(summoner_choice == "Summoner 2"){
    document.getElementById("name2").innerHTML = summoner_profile_name;
  }
  

  //Summoner's level
  var summoner_level = dataSummonerJSON.summonerLevel;
  if(summoner_choice == "Summoner 1"){
    document.getElementById("level1").innerHTML= summoner_level;
  }
  if(summoner_choice == "Summoner 2"){
    document.getElementById("level2").innerHTML= summoner_level;
  }
  

  }catch(error){
    console.log("Error: "+error);
    if(summoner_choice == "Summoner 1"){
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
      document.getElementById("veteran1").innerHTML = ""; }

    if(summoner_choice == "Summoner 2"){
      document.getElementById("error").innerHTML = "User not found within this region.";
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
    var leagueURL = server+"/lol/league/v4/entries/by-summoner/"+summonerID+"?api_key="+API_key;
    const leagueSummoner = await fetch(leagueURL);
    const leagueSummonerJSON = await leagueSummoner.json();
    console.log(leagueSummonerJSON);
    //Ranked Wins
    var summoner_wins = leagueSummonerJSON[0].wins;
    if(summoner_choice == "Summoner 1"){
      document.getElementById("wins1").innerHTML = summoner_wins;
    }
    if(summoner_choice == "Summoner 2"){
      document.getElementById("wins2").innerHTML = summoner_wins;
    }

    //Ranked Losses
    var summoner_losses = leagueSummonerJSON[0].losses;
    if(summoner_choice == "Summoner 1"){
      document.getElementById("losses1").innerHTML = summoner_losses;
    }
    if(summoner_choice == "Summoner 2"){
      document.getElementById("losses2").innerHTML = summoner_losses;
    }

    //Win/Loss Ratio
    if(summoner_choice == "Summoner 1"){
      document.getElementById("winloss1").innerHTML = calculateSimplestRatio(summoner_wins, summoner_losses);
    }
    if(summoner_choice == "Summoner 2"){
      document.getElementById("winloss2").innerHTML = calculateSimplestRatio(summoner_wins, summoner_losses);
    }
    
    //League Points
    var summoner_leaguePoints = leagueSummonerJSON[0].leaguePoints;
    if(summoner_choice == "Summoner 1"){
      document.getElementById("leaguePoints1").innerHTML =summoner_leaguePoints;
    }
    if(summoner_choice == "Summoner 2"){
      document.getElementById("leaguePoints2").innerHTML =summoner_leaguePoints;
    }
    
    //Rank
    var summoner_rank = leagueSummonerJSON[0].rank;
    if(summoner_choice == "Summoner 1"){
      document.getElementById("rank1").innerHTML = summoner_rank;
    }
    if(summoner_choice == "Summoner 2"){
      document.getElementById("rank2").innerHTML = summoner_rank;
    }

    //Tier
    var summoner_tier = leagueSummonerJSON[0].tier;
    if(summoner_choice == "Summoner 1"){
      document.getElementById("tier1").innerHTML = summoner_tier;
    }
    if(summoner_choice == "Summoner 2"){
      document.getElementById("tier2").innerHTML = summoner_tier;
    }

    //Veteran
    var summoner_veteran = leagueSummonerJSON[0].veteran;
    if(summoner_choice == "Summoner 1"){
      document.getElementById("veteran1").innerHTML = summoner_veteran;
    }
    if(summoner_choice == "Summoner 2"){
      document.getElementById("veteran2").innerHTML = summoner_veteran;
    }
    

  }catch(error){
    console.log("Error: "+error);
    if(summoner_choice == "Summoner 1"){
      document.getElementById("wins1").innerHTML = "";
      document.getElementById("losses1").innerHTML = "";
      document.getElementById("winloss1").innerHTML ="";
      document.getElementById("leaguePoints1").innerHTML = "";
      document.getElementById("rank1").innerHTML= "";
      document.getElementById("tier1").innerHTML = "";
      document.getElementById("veteran1").innerHTML = ""; }
    if(summoner_choice == "Summoner 2"){
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


//This function checks to see if the table is populated with two users.
//If so, it displays the compare summoners button.
async function compareButtonCheck() {
  var check1 = document.getElementById("level1");
  var check2 = document.getElementById("level2");

  if (check1.innerHTML.trim() !== "" && check2.innerHTML.trim() !== "") {
    compare.style.display = "block"; // Show the button
  } else {
    compare.style.display = "none"; // Hide the button
  }
}

//The compareSummoners() function simply retrieves the information from the table and 
//performs a mathematical comparison on them and displays the correct information on the
//right hand side of the table.
function compareSummoners(){
  //level comparison
  var level1 = document.getElementById("level1").innerHTML;
  var level2 = document.getElementById("level2").innerHTML;
  var levelDifference;

  if(level1 !== "" && level2 !== ""){
    if(level1 > level2){
      levelDifference = level1 - level2;
      document.getElementById("sum1level").innerHTML = "↑ " + levelDifference;
      document.getElementById("sum2level").innerHTML = "↓ " + levelDifference;
    }else if(level1 < level2){
      levelDifference = level2 - level1;
      document.getElementById("sum1level").innerHTML = "↓ " + levelDifference;
      document.getElementById("sum2level").innerHTML = "↑ " + levelDifference;
    }else{
      levelDifference = 0;
      document.getElementById("sum1level").innerHTML = "= " + levelDifference;
      document.getElementById("sum2level").innerHTML = "= " + levelDifference;
    }
  }

  //wins comparison
  var wins1 = document.getElementById("wins1").innerHTML;
  var wins2 = document.getElementById("wins2").innerHTML;
  var winsDifference;

  if(wins1 !== "" && wins2 !== ""){
    if(wins1 > wins2){
      winsDifference = wins1 - wins2;
      document.getElementById("sum1wins").innerHTML = "↑ " + winsDifference;
      document.getElementById("sum2wins").innerHTML = "↓ " + winsDifference;
    }else if(level1 < level2){
      winsDifference = wins2 - wins1;
      document.getElementById("sum1wins").innerHTML = "↓ " + winsDifference;
      document.getElementById("sum2wins").innerHTML = "↑ " + winsDifference;
    }
    else{
      winsDifference = 0;
      document.getElementById("sum1wins").innerHTML = "= " + winsDifference;
      document.getElementById("sum2wins").innerHTML = "= " + winsDifference;
    }
  }
  //losses comparison
  var losses1 = document.getElementById("losses1").innerHTML;
  var losses2 = document.getElementById("losses2").innerHTML;
  var lossesDifference;

  if(losses1 != "" && losses2 != ""){
    if(losses1 > losses2){
      lossesDifference = losses1 - losses2;
      document.getElementById("sum1losses").innerHTML = "↑ " + lossesDifference;
      document.getElementById("sum2losses").innerHTML = "↓ " + lossesDifference;
    }else if(losses1 < losses2){
      lossesDifference = losses2 - losses1;
      document.getElementById("sum1losses").innerHTML = "↓ " + lossesDifference;
      document.getElementById("sum2losses").innerHTML = "↑ " + lossesDifference;
    }else{
      lossesDifference = 0;
      document.getElementById("sum1losses").innerHTML = "= " + lossesDifference;
      document.getElementById("sum2losses").innerHTML = "= " + lossesDifference;
    }
  }
  //Win/Loss Ratio Comparison

  if(wins1 !== "" && wins2 !== "" && losses1 !== "" && losses2 !== ""){
    var ratio1 = calculateSimplestRatio(wins1, losses1);
    var ratio2 = calculateSimplestRatio(wins2, losses2);
    console.log(ratio1+" "+ratio2);
    var compareRatio = compareRatios(ratio1, ratio2);

    if(compareRatio === "Greater"){
      document.getElementById("sum1winloss").innerHTML = "↑ Greater";
      document.getElementById("sum2winloss").innerHTML = "↓ Less";
    }
    else if(compareRatio === "Less"){
      document.getElementById("sum1winloss").innerHTML = "↓ Less";
      document.getElementById("sum2winloss").innerHTML = "↑ Greater";
    }
    else{
      document.getElementById("sum1winloss").innerHTML = "= Equal";
      document.getElementById("sum2winloss").innerHTML = "= Equal";
    }
  }

  //league points comparison
  var points1 = document.getElementById("leaguePoints1").innerHTML;
  var points2 = document.getElementById("leaguePoints2").innerHTML;
  var pointsDifference;

  if(points1 !== "" && points2 !== ""){
    if(points1 > points2){
      pointsDifference = points1 - points2;
      document.getElementById("sum1leaguePoints").innerHTML = "↑ " + pointsDifference;
      document.getElementById("sum2leaguePoints").innerHTML = "↓ " + pointsDifference;
    }else if(points1 < points2){
      pointsDifference = points2 - points1;
      document.getElementById("sum1leaguePoints").innerHTML = "↓ " + pointsDifference;
      document.getElementById("sum2leaguePoints").innerHTML = "↑ " + pointsDifference;
    }else{
      pointsDifference = 0;
      document.getElementById("sum1leaguePoints").innerHTML = "= " + pointsDifference;
      document.getElementById("sum2leaguePoints").innerHTML = "= " + pointsDifference;
    }
  }
}

//Clears the table of information.
function clearStats(){
  document.getElementById("sum1level").innerHTML = "";
  document.getElementById("sum2level").innerHTML = "";
  document.getElementById("sum1wins").innerHTML = "";
  document.getElementById("sum2wins").innerHTML = "";
  document.getElementById("sum1losses").innerHTML = "";
  document.getElementById("sum2losses").innerHTML = "";
  document.getElementById("sum1winloss").innerHTML ="";
  document.getElementById("sum2winloss").innerHTML ="";
  document.getElementById("sum1leaguePoints").innerHTML = "";
  document.getElementById("sum2leaguePoints").innerHTML = "";
}

//Calculates the ratio of wins and losses
function calculateSimplestRatio(a, b) {
  
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));

  function gcd(a, b) {
    if (b === 0) {
      return a;
    } else {
      return gcd(b, a % b);
    }
  }

 
  const commonDivisor = gcd(a, b);

  
  const simplifiedA = a / commonDivisor;
  const simplifiedB = b / commonDivisor;

  return `${simplifiedA}:${simplifiedB}`;
  }

//Comapres ratios
function compareRatios(ratio1, ratio2) {
  // Split each ratio into its parts
  const [numerator1, denominator1] = ratio1.split(":").map(Number);
  const [numerator2, denominator2] = ratio2.split(":").map(Number);

  // Convert both ratios to a common denominator
  const commonDenominator = denominator1 * denominator2;
  const convertedNumerator1 = numerator1 * denominator2;
  const convertedNumerator2 = numerator2 * denominator1;

  // Compare the numerators
  if (convertedNumerator1 === convertedNumerator2) {
    return "Equal";
  } else if (convertedNumerator1 > convertedNumerator2) {
    return "Greater";
  } else {
    return "Less";
  }
}
