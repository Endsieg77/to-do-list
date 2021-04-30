let StateHub = {
    titles: [],
    current: 0,
    listLen: 0,
    arrayOfArray: [],
    completeState: []
};

let protoType = {
    titles: [],
    current: 0,
    listLen: 0,
    arrayOfArray: [],
    completeState: []
};

let info = localStorage.getItem('StateHubInfo');

if(info == null)
    localStorage.setItem('StateHubInfo', JSON.stringify(StateHub));
else StateHub = JSON.parse(info);

export { protoType };

export default StateHub;