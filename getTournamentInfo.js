const puppeteer = require("puppeteer");
const fs = require("fs");
const search = "https://www.hltv.org/search?query=";
const tournaments = [
  "BLAST Pro Series Madrid 2019",
  "ESL Pro League Season 9 Europe",
  "BLAST Pro Series Miami 2019",
  "BLAST Pro Series São Paulo 2019",
  "ECS Season 7 Europe Week 1",
  "IEM Katowice 2019",
  "iBUYPOWER Masters 2019",
  "BLAST Pro Series Lisbon 2018",
  "ESL Pro League Season 8 Finals",
  "ECS Season 6 Finals",
  "ESL Pro League Season 8 Europe",
  "IEM Chicago 2018",
  "BLAST Pro Series Copenhagen 2018",
  "ECS Season 6 Europe",
  "BLAST Pro Series Istanbul 2018",
  "FACEIT Major 2018",
  "FACEIT Major 2018 Main Qualifier",
  "DreamHack Masters Stockholm 2018",
  "ELEAGUE CS:GO Premier 2018",
  "ESL One Cologne 2018",
  "ECS Season 5 Finals",
  "ESL Pro League Season 7 Finals",
  "ECS Season 5 Europe",
  "IEM Sydney 2018",
  "ESL Pro League Season 7 Europe",
  "DreamHack Masters Marseille 2018",
  "IEM Sydney 2018 Europe Closed Qualifier",
  "IEM Katowice 2018",
  "StarSeries i-League Season 4",
  "ELEAGUE Major 2018",
  "ECS Season 7 North America Week 5",
  "cs_summit 4",
  "ECS Season 7 North America Week 4",
  "IEM Sydney 2019",
  "ESL Pro League Season 9 Americas",
  "ECS Season 7 North America Week 1",
  "SuperNova CS:GO Malta",
  "ESL Pro League Season 8 North America",
  "ECS Season 6 North America",
  "EPICENTER 2018",
  "ESL One New York 2018",
  "ESL One Belo Horizonte 2018",
  "StarSeries i-League Season 5",
  "ECS Season 5 North America",
  "ESL Pro League Season 7 North America",
  "IEM Sydney 2018 North America Closed Qualifier",
  "iBUYPOWER Invitational Spring 2018",
  "cs_summit 2",
  "StarSeries i-League Season 4 North America Qualifier",
  "IEM Katowice 2018 North America Closed Qualifier",
  "ELEAGUE Major 2018 Main Qualifier",
  "StarSeries i-League Season 7",
  "GG.BET ICE Challenge",
  "CS:GO Asia Championships 2018",
  "ECS Season 5 Europe Challenger Cup",
  "Farmskins Championship #2 - IEM Katowice 2018 Qualifier",
  "ESL Pro League Season 6 Europe Relegation",
  "IEM Katowice 2018 Europe Closed Qualifier",
  "ECS Season 7 Europe Week 5",
  "ECS Season 7 Europe Week 4",
  "ELEAGUE CS:GO Invitational 2019",
  "V4 Future Sports Festival",
  "ESEA MDL Season 31 Europe",
  "ESEA MDL Season 30 Europe",
  "IEM Katowice 2019 Main Qualifier",
  "ASUS ROG Winter 2019",
  "Europe Minor - IEM Katowice 2019",
  "Europe Minor Closed Qualifier - IEM Katowice 2019",
  "DreamHack Open Winter 2018",
  "WESG 2018 North Europe Qualifier 2",
  "WESG 2018 North Europe Qualifier 1",
  "ESEA MDL Season 29 Europe",
  "Assembly GameXpo 2018",
  "GG.BET Shuffle - IEM Chicago Qualifier",
  "StarSeries i-League Season 6",
  "ECS Season 6 Europe Qualifier 1",
  "DreamHack Open Montreal 2018",
  "ESEA MDL Season 28 Europe Relegation",
  "EPICENTER 2018 Europe Closed Qualifier",
  "IEM Chicago 2018 Europe Closed Qualifier",
  "Finnish Championships 2018",
  "ESEA Advanced Season 28 Europe",
  "Europe Minor - FACEIT Major 2018",
  "Europe Minor Closed Qualifier - FACEIT Major 2018",
  "DreamHack Masters Stockholm 2018 Europe Open Qualifier",
  "Europe Minor Open Qualifier 4 - FACEIT Major 2018",
  "Vectorama LAN 2018",
  "GG.BET Majestic - ESL One Cologne Qualifier",
  "GG.BET Majestic Closed Qualifier",
  "DreamHack Open Valencia 2018 Europe Closed Qualifier",
  "DreamHack Open Valencia 2018 Europe Open Qualifier",
  "ESL One Belo Horizonte Europe Open Qualifier",
  "ECS Season 7 Europe Week 2",
  "WESG 2018 World Finals",
  "PLG Grand Slam 2018",
  "WESG 2017 World Finals",
  "Showmatch CS:GO",
  "ECS Season 6 North America Challenger Cup",
  "ZOTAC Cup Masters 2018 Grand Finals",
  "ECS Season 7 North America Week 2",
  "Americas Minor - IEM Katowice 2019",
  "Americas Minor North America Closed Qualifier - IEM Katowice 2019",
  "cs_summit 3",
  "EPICENTER 2018 North America Closed Qualifier",
  "IEM Shanghai 2018",
  "StarSeries i-League Season 6 North America Qualifier",
  "Americas Minor - FACEIT Major 2018",
  "ESL One New York 2018 North America Closed Qualifier",
  "Americas Minor North America Closed Qualifier - FACEIT Major 2018",
  "StarSeries i-League Season 5 North America Qualifier",
  "ESL One Belo Horizonte North America Closed Qualifier",
  "DreamHack Masters Marseille 2018 North America Closed Qualifier",
  "Asia Minor - IEM Katowice 2019",
  "Toyota Master Bangkok 2018",
  "Asia Minor Oceania Closed Qualifier - IEM Katowice 2019",
  "Asia Minor - FACEIT Major 2018",
  "DreamHack Open Summer 2018",
  "ESL One Cologne 2018 North America Closed Qualifier",
  "ESL One Cologne 2019 Europe Closed Qualifier",
  "ECS Season 7 Europe Week 3",
  "Charleroi Esports",
  "ECS Season 7 Europe Pinnacle Cup",
  "WePlay! Lock and Load",
  "ESEA MDL Season 29 Europe Relegation",
  "StarSeries i-League Season 7 Europe Qualifier",
  "WESG 2018 North-West Europe",
  "LOOT.BET Cup #3 Finals",
  "Europe Minor Open Qualifier 4 - IEM Katowice 2019",
  "DreamHack Open Atlanta 2018",
  "WESG 2018 North-West Europe Qualifier 1",
  "Europe Minor Open Qualifier 3 - IEM Katowice 2019",
  "LOOT.BET Cup #3",
  "DreamHack Open Winter 2018 Europe Open Qualifier",
  "Europe Minor Open Qualifier 1 - IEM Katowice 2019",
  "DreamHack Open Atlanta 2018 Europe Closed Qualifier",
  "DreamHack Open Tours 2019",
  "DreamHack Masters Dallas 2019 Europe Closed Qualifier",
  "IEM Sydney 2019 Europe Closed Qualifier",
  "WESG 2018 North-West Europe Qualifier 2",
  "DreamHack Open Valencia 2018",
  "WePlay! Forge of Masters Season 1 Finals",
  "ESL One Cologne 2019 Europe Open Qualifier 2",
  "DreamHack Open Rio 2019",
  "ESEA MDL Season 30 Europe Relegation",
  "LOOT.BET Season 1",
  "NoxFire League Season 2",
  "CIS Minor - IEM Katowice 2019",
  "Bucharest Gaming Week Invitational by ESL",
  "CIS Minor Closed Qualifier - IEM Katowice 2019",
  "Hellcase Cup 7",
  "EPICENTER 2018 CIS Closed Qualifier",
  "MSI MGA Finals",
  "ALTEL Cyber Games",
  "IEM Chicago 2018 Europe Open Qualifier",
  "CSGO.NET Cup 3",
  "MSI MGA CIS Closed Qualifier",
  "MSI MGA CIS Open Qualifier #1",
  "Thunderpick Invitational #2",
  "CIS Minor - FACEIT Major 2018",
  "X-BET.co Invitational 2",
  "CIS Minor Closed Qualifier - FACEIT Major 2018",
  "Adrenaline Cyber League 2018",
  "esportsbetting.com Launch Invitational",
  "Adrenaline Cyber League 2018 Qualifier",
  "GOCASE Challenge",
  "StarSeries i-League Season 5 CIS Qualifier",
  "ESL One Cologne 2018 Europe Open Qualifier",
  "DreamHack Open Summer 2018 Europe Open Qualifier",
  "ForceDrop.net Cup 1",
  "CSGO.NET Cup 2",
  "GG:Origin - IEM Sydney 2018 Qualifier",
  "M.Game League",
  "IEM Sydney 2018 Europe Open Qualifier",
  "DreamHack Masters Marseille 2018 Europe Open Qualifier",
  "Bets.net Challenger Series",
  "CSGOFAST.COM CUP 3",
  "Cybersport Festival Defender",
  "QIWI TEAM PLAY WINTER 2018",
  "IEM Katowice 2019 Minor Play-in",
  "ECS Season 6 Europe Challenger Cup",
  "ESL One New York 2018 Europe Closed Qualifier",
  "ESL One Cologne 2018 Europe Closed Qualifier",
  "DreamHack Open Tours 2018",
  "StarSeries i-League Season 5 Europe Qualifier",
  "ESL One Belo Horizonte Europe Closed Qualifier",
  "Bets.net Masters",
  "Copenhagen Games 2018",
  "DreamHack Masters Marseille 2018 Europe Closed Qualifier",
  "LOOT.BET Season 2",
  "LOOT.BET HotShot Series Season 2",
  "DreamHack Open Tours 2019 Europe Closed Qualifier",
  "United Masters League Finals",
  "United Masters League",
  "LOOT.BET HotShot Series Season 1",
  "IEM Sydney 2019 Europe Open Qualifier 1",
  "Rivalry.gg Rising Stars",
  "NoxFire League",
  "ESL Southeast Europe Championship Season 8 Finals",
  "WESG 2018 East Europe",
  "WESG 2018 East Europe Qualifier 1",
  "Grand Hotshots",
  "Europe Minor Open Qualifier 2 - IEM Katowice 2019",
  "OMEN by HP ComicCon Bulgaria 2018",
  "GG.BET Summer CIS + EU",
  "EPICENTER 2018 Europe Open Qualifier #3",
  "StarSeries i-League Season 6 Europe Qualifier",
  "Esports Balkan League Season 2",
  "ZOTAC Cup Masters 2018 Europe Regional Finals",
  "Good Game League 2018",
  "ZOTAC Cup Masters 2018 Europe Closed Qualifier",
  "ESEA Season 27 MDL Global Challenge",
  "ESL Pro League Season 7 Europe Relegation",
  "ESEA MDL Season 27 Europe Finals",
  "DreamHack Open Tours 2018 Europe Closed Qualifier",
  "ESEA MDL Season 27 Europe",
  "Copenhagen Games 2018 BYOC Qualifier",
  "Play2Live Cryptomasters",
  "ECS Season 5 Europe Closed Qualifier",
  "Play2Live Cryptomasters Qualifier",
  "ECS Season 5 South/East Europe Qualifier",
  "IEM Katowice 2018 Europe Open Qualifier #1",
  "ESEA MDL Season 31 North America",
  "ESL One Cologne 2019 North America Closed Qualifier",
  "ECS Season 7 North America Week 3",
  "ESL One Cologne 2019 North America Open Qualifier 2",
  "ESEA MDL Season 30 North America",
  "DreamHack Masters Dallas 2019 North America Closed Qualifier",
  "ECS Season 7 North America Pinnacle Cup",
  "NSG Eastern Conference Championship",
  "StarSeries i-League Season 7 North America Qualifier",
  "ESEA MDL Season 29 North America Relegation",
  "ESEA Advanced Season 29 North America",
  "PLG Grand Slam 2018 North America Open Qualifier",
  "DreamHack Open Winter 2018 North America Open Qualifier",
  "Americas Minor North America Open Qualifier 1 - IEM Katowice 2019",
  "DreamHack Open Atlanta 2018 North America Closed Qualifier",
  "DreamHack Open Atlanta 2018 North America Open Qualifier",
  "Toyota Master Bangkok 2018 North America Qualifier",
  "EPICENTER 2018 North America Open Qualifier #1",
  "MSI MGA North America Closed Qualifier",
  "MSI MGA North America Open Qualifier #1",
  "ZOTAC Cup Masters 2018 Americas Regional Finals",
  "ESL Brazil Premier League Season 5",
  "Alienware Liga Pro Gamers Club - MAY/18",
  "Americas Minor South America Open Qualifier 2 - FACEIT Major 2018",
  "Americas Minor South America Open Qualifier 1 - FACEIT Major 2018",
  "Aorus League Invitational",
  "GG.BET Ascensão",
  "ESL One Belo Horizonte South America Closed Qualifier",
  "Alienware Liga Pro Gamers Club - APR/18",
  "ESL Latin America League Season 1 Finals",
  "ZOTAC Cup Masters 2018 South America Open Qualifier",
  "ESL Latin America League Season 1",
  "ESEA Open Season 27 Brazil",
  "Alienware Liga Pro Gamers Club - MAR/18",
  "ESL Latin America League Season 1 Closed Qualifier",
  "Aorus League 2018 Season 1 Brazil Finals",
  "Aorus League 2018 Season 1 Brazil",
  "Alienware Liga Pro Gamers Club - FEB/18",
  "Alienware Liga Pro Gamers Club - JAN/18",
  "ESL One New York 2018 Europe Open Qualifier",
  "Qi Invitational",
  "Play2live Showmatch by GameAgents",
  "StarSeries i-League Season 4 Europe Qualifier",
  "ESL Pro League Season 9 Asia",
  "ESEA MDL Season 31 Australia",
  "IEM Sydney 2019 Oceania Closed Qualifier",
  "ESL Australia & NZ Championship Season 8",
  "Cobx Masters",
  "ESEA MDL Season 30 Australia",
  "ESEA MDL Season 29 Global Challenge",
  "PLG Grand Slam 2018 Oceania Open Qualifier",
  "ESL Australia & NZ Championship Season 7 Finals",
  "ESEA MDL Season 29 Australia",
  "LPL Pro ANZ Invitational",
  "ESL Pro League Season 8 Oceania",
  "ESL Australia & NZ Championship Season 7",
  "ESEA MDL Season 28 Australia",
  "DreamHack Masters Stockholm 2018 Asia Closed Qualifier",
  "AOC CyberGamer Premier League Winter 2018",
  "IEM Shanghai 2018 Oceania Closed Qualifier",
  "DreamHack Masters Stockholm 2018 Oceania Open Qualifier",
  "ESL Australia & NZ Championship Season 6 Finals",
  "Asia Minor Oceania Open Qualifier - FACEIT Major 2018",
  "ESL Pro League Season 7 Asia-Pacific",
  "IEM Sydney 2018 Oceania Closed Qualifier",
  "ESL Australia & NZ Championship Season 6",
  "ESL Pro League Season 7 Oceania Closed Qualifier",
  "CS:GO Asia Summit 2018",
  "Alpha Invitational Season 1 Finals",
  "Western Digital CyberGamer Premier League Autumn 2018",
  "ESEA MDL Season 27 Australia",
  "Alpha Invitational Season 1",
  "IEM Katowice 2018 Oceania Closed Qualifier",
  "DreamHack Open Summer 2019 Europe Closed Qualifier",
  "Bucharest Gaming Week Invitational by ESL Closed Qualifier",
  "A1 Adria League Season 2 Finals",
  "WESG 2018 Serbia",
  "A1 Adria League Season 2",
  "GG.BET Shuffle Closed Qualifier",
  "DreamHack Open Atlanta 2018 Europe Open Qualifier",
  "Ceh9 ES.BET Weekly #1",
  "ESEA MDL Season 28 Europe",
  "Europe Minor Open Qualifier 3 - FACEIT Major 2018",
  "Europe Minor Open Qualifier 2 - FACEIT Major 2018",
  "DreamHack Open Summer 2018 Europe Closed Qualifier",
  "ESEA Main Season 27 Europe",
  "ECS Season 5 Europe Qualifier #1",
  "IEM Katowice 2018 Europe Open Qualifier #2",
  "ESL One Cologne 2019 Europe Open Qualifier 1",
  "GG.BET Sydney Invitational",
  "DreamHack Masters Dallas 2019 Europe Open Qualifier",
  "ECS Season 7 Europe Challenger Cup Open Qualifier 4",
  "IEM Sydney 2019 Europe Open Qualifier 2",
  "Games Clash Masters 2018",
  "DreamHack Masters Stockholm 2018 Europe Closed Qualifier",
  "DreamHack Open Austin 2018",
  "ESL Pro League Season 8 Europe Relegation",
  "DreamHack Masters Marseille 2018 North America Open Qualifier",
  "UCC Summer Smash",
  "LOOT.BET HotShot Series Season 3",
  "Kalashnikov Cup Season 2",
  "DreamHack Open Summer 2019 Europe Open Qualifier",
  "Copenhagen Games 2019",
  "CS.Money Premier by EM",
  "ECS Season 7 Europe Challenger Cup Open Qualifier 1",
  "ESEA Advanced Season 29 Europe",
  "Kalashnikov CUP",
  "PLG Grand Slam 2018 Europe Open Qualifier",
  "CSGOFAST.COM Cup 4",
  "WESG 2018 Russia by OMEN LAN",
  "Toyota Master Bangkok 2018 CIS Qualifier",
  "WESG 2018 Russia by OMEN Closed Qualifier",
  "EPICENTER 2018 CIS Open Qualifier #1",
  "BravoBet Cup",
  "MSI MGA CIS Last Chance Qualifier",
  "MID.TV Cyber Cup",
  "QIWI TEAM PLAY Season 1",
  "M.Game League 2 Finals",
  "M.Game League 2",
  "EGB Battles",
  "Lotto Cup Winners' Cup",
  "Good Game League 2019 Qualifier 1 Warsaw",
  "Legend Series #5",
  "DreamHack Open Tours 2018 Europe Open Qualifier",
  "StarLadder ImbaTV Invitational Chongqing 2018",
  "ESL One Cologne 2019 Asia Closed Qualifier",
  "DreamHack Masters Dallas 2019 Asia Closed Qualifier",
  "ESL Pro League Season 9 China Closed Qualifier",
  "IEM Sydney 2019 East Asia Closed Qualifier",
  "Charleroi Esports Asia Qualifier",
  "StarSeries i-League Season 7 Asia Qualifier",
  "WESG 2018 East Asia",
  "Asia Minor East Asia Closed Qualifier - IEM Katowice 2019",
  "WESG 2018 East Asia Qualifier 1",
  "ESL Pro League Season 8 China Closed Qualifier",
  "eXTREMESLAND 2018 Asia Finals",
  "Toyota Master Bangkok 2018 SEA Qualifier",
  "eXTREMESLAND 2018 Korea Regional Finals",
  "IEM Chicago 2018 Asia Closed Qualifier",
  "StarSeries i-League Season 6 Asia Qualifier",
  "DreamHack Masters Stockholm 2018 East Asia Open Qualifier",
  "IEM Shanghai 2018 Asia Closed Qualifier",
  "ZOTAC Cup Masters 2018 Asia-Pacific Regional Finals",
  "ESL One Cologne 2018 Asia Closed Qualifier",
  "Asia Minor East Asia Open Qualifier - FACEIT Major 2018",
  "StarSeries i-League Season 5 Asian Qualifier",
  "ZOTAC Cup Masters 2018 Korea Open Qualifier",
  "IEM Sydney 2018 Asian Closed Qualifier",
  "ESL Pro League Season 7 China Closed Qualifier",
  "DreamHack Masters Marseille 2018 Asian Closed Qualifier",
  "DreamHack Masters Marseille 2018 East Asia Open Qualifier",
  "IEM Katowice 2018 Asia Closed Qualifier",
  "WESG 2017 Asia-Pacific Regional Finals",
  "Daddyskins Asia Super League",
  "IEM Katowice 2018 Asia Open Qualifier #1",
  "Letou Invitational",
  "StarSeries i-League Season 4 Asia Qualifier",
  "Good Game League 2019 Qualifier 3 Olsztyn",
  "ESL Meisterschaft Spring 2019 Finals",
  "Charleroi Esports Europe Qualifier 1",
  "ECS Season 7 Europe Challenger Cup Open Qualifier 2",
  "DreamHack Leipzig WinterNational",
  "ESL Meisterschaft Winter 2018 Finals",
  "Toyota Master Bangkok 2018 Europe Qualifier",
  "ESL Meisterschaft Summer 2018 Finals",
  "PMU Challenge 2018 Finals",
  "Fusion.bet Masters II",
  "PMU Challenge 2018",
  "DreamHack Open Austin 2018 Europe Closed Qualifier",
  "DreamHack Open Austin 2018 Europe Open Qualifier",
  "ECS Season 5 West/Central Europe Qualifier",
  "IEM Sydney 2019 North America Closed Qualifier",
  "MSI MGA North America Open Qualifier #2",
  "DreamHack Masters Stockholm 2018 North America Closed Qualifier",
  "ESL One New York 2018 North America Open Qualifier",
  "ZOTAC Cup Masters 2018 North America Closed Qualifier",
  "ESL Pro League Season 7 North America Relegation",
  "DreamHack Open Valencia 2018 North America Closed Qualifier",
  "ESL One Cologne 2018 North America Open Qualifier",
  "DreamHack Open Summer 2018 North America Closed Qualifier",
  "DreamHack Open Austin 2018 North America Closed Qualifier",
  "ESL One Belo Horizonte North America Open Qualifier",
  "DreamHack Open Tours 2018 North America Closed Qualifier",
  "ECS Season 5 North America Challenger Cup",
  "ECS Season 5 North America Qualifier #1",
  "IEM Katowice 2018 North America Open Qualifier #2",
  "IEM Katowice 2018 North America Open Qualifier #1",
  "GameAgents League Season 3",
  "Hunt Wave League",
  "WESG 2018 Poland",
  "Polish Esport League Season 4 Finals",
  "WESG 2018 Poland Qualifier 2",
  "WESG 2018 Poland Qualifier 1",
  "DreamHack Open Winter 2018 Europe Closed Qualifier",
  "ESL Pro European Championship",
  "ESL Polish Championship Season 17 Finals",
  "EPICENTER 2018 Europe Open Qualifier #1",
  "OGA Counter PIT Season 3",
  "Polish Esport League Season 3 Finals",
  "Fusion.bet Masters",
  "ESL Polish Championship Spring 2018 Finals",
  "V4 Future Sports Festival Poland Finals",
  "ESEA Season 26 MDL Global Challenge",
  "ESEA MDL Season 26 Europe Finals",
  "LOOT.BET Season 2 Closed Qualifier",
  "ESEA Advanced Season 30 Europe",
  "ECS Season 7 Europe Challenger Cup Open Qualifier 3",
  "QIWI Teamplay Season 3",
  "Geeks Gone Wild 24",
  "X-Bet.co Invitational 4",
  "NetParty Fyn 2018",
  "Cross Border Esport 2018",
  "Dust2.dk eOddset Masters #16",
  "GG.BET Summer Europe",
  "Europe Minor Open Qualifier 1 - FACEIT Major 2018",
  "DaddySkins Western League",
  "Geeks Gone Wild 23"
];

let scrape = async (page, tourn) => {
  // Get the number values array from a string including numbers
  await page.goto(search + tourn.replace(" ", "+"));
  const next = await page.evaluate(async () => {
    return document.querySelector("td a").href;
  });
  await page.goto(next);
  const result = await page.evaluate(async () => {
    let data = {};
    data.title = document.querySelector(".eventname").innerText;
    data.location = document.querySelector(".flag").title;
    data.prize_pool = document
      .querySelector("td.prizepool")
      .innerText.replace(",", "");
    data.teams_attending = document.querySelector("td.teamsNumber").innerText;
    return data;
  });
  return result;
};

async function processTournaments(tournaments) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  for (const t of tournaments) {
    const output = await scrape(page, t);
    let data = Object.values(output).join(",") + "\n";
    fs.appendFile("tournaments.csv", data, error => {
      error === null
        ? console.log("Successfully Added ")
        : console.log("Error:" + error);
    });
  }
  browser.close();
}

processTournaments(tournaments); //change to test-matches.txt or all-matches.txt
