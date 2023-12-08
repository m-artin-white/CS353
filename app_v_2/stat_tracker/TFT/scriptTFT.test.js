const {
    Search_summoner,
    chooseRegion,
    data,
    clearStats,
  } = require('./scriptTFT.js');


  test('chooseRegion sets the correct server based on the selected region', () => {
    const selectElement = { value: 'NA1' };
    chooseRegion.call({ document: { getElementById: jest.fn().mockReturnValue(selectElement) } });
    expect(server).toBe('https://na1.api.riotgames.com');
  });

  test('chooseRegion sets the correct server based on the selected region', () => {
    const selectElement = { value: 'KR' };
    chooseRegion.call({ document: { getElementById: jest.fn().mockReturnValue(selectElement) } });
    expect(server).toBe('https://kr.api.riotgames.com');
  });

  test('Search_summoner clears stats and displays table', async () => {
    document.getElementById = jest.fn().mockReturnValue({ innerHTML: '' });
    await Search_summoner();
    expect(clearStats).toHaveBeenCalled();
    expect(document.getElementById).toHaveBeenCalledWith('result');
    expect(document.getElementById('result').style.display).toBe('table');
    expect(document.getElementById('result').classList).toContain('fadeIn');
  });


  global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        profileIconId: 123,
        name: 'SummonerName',
        summonerLevel: 30,
        id: 'summonerId123',
      }),
  })
);


document.getElementById = jest.fn();

describe('data() function', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
  });

  test('data() fetches data and updates DOM elements for Summoner 1', async () => {
  
    document.getElementById.mockReturnValue({
      value: 'SummonerName',
    });

    await data();

    expect(fetch).toHaveBeenCalledWith(
      'https://br1.api.riotgames.com/tft/summoner/v1/summoners/by-name/SummonerName?api_key=RGAPI-5ea86ede-14a3-47f2-8e80-e727c3c331cd'
    );

    expect(document.getElementById).toHaveBeenCalledWith('imageCell1');
    expect(document.getElementById).toHaveBeenCalledWith('name1');
    expect(document.getElementById).toHaveBeenCalledWith('level1');

  });

});