const timeoutMilliSec = 90000;
export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    if (typeof(action) === 'undefined') {
        console.error('Invalid action in utils/index');
        return;
    }
    return reducer ? reducer(state, action.payload) : state;
  };
}

export function bindListener(listener,action) {
    let prevState = {};
    return listener(newState => {
        if(prevState === newState) return;
        prevState = newState;
        action(newState);
    });
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function makeId(length) {
    var text = "";
    var possible = "0123456789";
    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dateString = date => monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

function addDays(date, days) {
	return new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate() + days,
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	);
}

export function delay(ms, promise) {
    let p = new Promise(function (resolve, _){
        promise.then((value) => {
            setTimeout(resolve, ms, value);
        });
    });
    return p;
}

export function quoteDates(expiresIn) {
    return {
        creation:dateString(new Date()),
        expiry:dateString(addDays(new Date(), expiresIn))
    };
}

/*WAIT AND CHECK FOR A VALUE*/
export function nav(store,nav,complete) {
    if(!store.getState()[nav].transitioning) complete();
    else {
        const unsub = store.subscribe(()=>{
            if(!store.getState()[nav].transitioning) {
                complete();
                unsub();
            }
        });
    }
}



let hide_all_logs = false,
    show_log = true && !hide_all_logs,
    show_warn = true && !hide_all_logs,
    show_error = true && !hide_all_logs;

let log = (m) => {
    if (!show_log) {return;}
    let t = m.type.toString(),
        n = t.indexOf('Symbol') < 0 ?
            t :
            t.substr(7+6,t.length-6-7-1);
    console.log(n, '[', m.payload.meta.endpoint, ']', m.payload);
}

let warn = (m) => {
    if (!show_warn) {return;}
    let t = m.type.toString(),
        n = t.indexOf('Symbol') < 0 ?
            t :
            t.substr(7+6,t.length-6-7-1);
    console.warn(n, '[', m.payload.meta.endpoint, ']', m.payload);
}

let error = (m) => {
    if (!show_error) {return;}
    let t = m.type.toString(),
        n = t.indexOf('Symbol') < 0 ?
            t :
            t.substr(7+6,t.length-6-7-1);
    console.error(n, '[', m.payload.meta.endpoint, ']', m.payload);
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

export function formatMoney(value, decimals, def) {
        if (typeof(value) === 'undefined') { value = def; }
        let n = value,
            c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }

export function toNumber(val) {
    if (!val) { return 0; }
    if (!isNaN(val)) { val = val + ''; }
    let r;
    try {
        r = parseFloat(val.replace(/[^0-9-.]/g, '')); // 12345.99
    } catch(ex) {
        r = parseFloat("0.0");
    }
    if (isNaN(r)) r = parseFloat("0.0");
    return r;
}

export function numberWithCommas(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function cleanXSS(str) {
    return str.replace(/((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>)/i, "");
}
