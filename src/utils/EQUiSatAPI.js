/**
 * An API library for interfacing with EQUiSat's data API.
 * See https://github.com/BrownSpaceEngineering/bse-api for
 * API details.
 */

var ENABLE_DUMMY_DATA = false;
var API_ROUTE_PREFIX = "http://api.brownspace.org/equisat/";

/*********************************************************/
// Direct API calls
//
// For information on which signals are present in which data table,
// see this spreadsheet (look under the "Sources" column for the desired signal):
// https://docs.google.com/spreadsheets/d/1sHQNTC5f5sg6j5DD4OKjuQykpIM3z16uetWT9YuB9PQ/edit#gid=589366724
//
// PARAMETERS:
//      - signals : the desired list of raw signal names
//      - success : a callback to be called with the requested data as the only argument
//      - error : a callback to be called if an error occurs, with a string error message
//                as the only argument
//      - num : (ONLY for quantity funcs) the maximum number of rows of data to return
//      - startTime : (ONLY for time funcs) the javascript date (unix timestamp in milliseconds) to mark the start time of
//                     returned data (based on database creation time)
//      - endTime : (ONLY for time funcs) the javascript date (unix timestamp in milliseconds) to mark the end time of
//                     returned data (based on database creation time)
//
// RETURN TYPES (passed to the success() callback):
// All calls of this type return a list of javascript objects,
// where each row is an object containing:
//      - The value of all requested signals, under their signal names
//      - A "created" field designating when the data in that row was received
//      - A "transmission_cuid" field designating the database ID of the transmission
//          this data came from.
// Any signals that are NOT valid names (aren't in the database schema) will
// have values of "undefined"
/*********************************************************/
var axios = require('axios');

// These functions returns up to num rows containing the given signals,
// sorted in order of their creation date.
// If signals is empty or null, all signals will be returned.
export function getCurrentInfoData(signals, num) {
    return fetchRouteLatest("current-infos", signals, num);
}

export function getPreambleData(signals, num) {
    return fetchRouteLatest("transmissions", signals, num);
}

export function getIdleData(signals, num) {
    return fetchRouteLatest("data/idle", signals, num);
}

export function getAttitudeData(signals, num) {
    return fetchRouteLatest("data/attitude", signals, num);
}

export function getFlashBurstData(signals, num) {
    return fetchRouteLatest("data/flashBurst", signals, num);
}

export function getFlashCompareData(signals, num) {
    return fetchRouteLatest("data/flashComp", signals, num);
}

export function getLowPowerData(signals, num) {
    return fetchRouteLatest("data/lowPower", signals, num);
}

// Returns up to num rows of error codes (with all fields present),
// sorted by creation date
export function getErrorCodes(num) {
    fetchRouteLatest("error-codes", [], num); // all "signals"
}

/*********************************************************/
//
// RETURN TYPES:
// All calls of this type return (at the top level) an object containing:
//      - The desired signals as keys to a simple list of all
//        that signal's values over time. All of these lists
//        will be the same length across signal values.
//
//      - A "timestamps" field containing a list of timestamps
//        (date objects) corresponding to the values of all the
//        sensors. Note this will also be the same length as
//        all signal lists. If one or more sensor is stored
//        more frequently than another, the less frequent sensors
//        will simply duplicate their most recent value for all
//        extra timestamps necessary to correspond with the
//        more frequent sensor.
//
// getSignalsLatest Example:
// Query:
//     getSignalsLatest(["LF1REF", "LED3SNS"], 3)
//    .then(function(result) {
//       console.log(result.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//   });
//
// Console Output:
// { LF1REF:
//    { timestamps: [ 1528862181440, 1528862181440, 1528862181440 ],
//      values: [ 3584, 3584, 3584 ] },
//   LED3SNS:
//    { timestamps: [ 1528862181440, 1528862181440, 1528862181440 ],
//      values: [ 200, 200, 167 ] } }
//
// getSignalsLatestSingle Example:
// Query:
//     getSignalsLatestSingle(["LF1REF", "LED3SNS"])
//    .then(function(result) {
//       console.log(result.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//   });
//
// Console Output:
//  { LF1REF: { timestamp: 1528862181440, value: 3584 },
//   LED3SNS: { timestamp: 1528862181440, value: 200 } }
//
// getSignalsInPeriod Example:
// Query:
//      getSignalsInPeriod(["LF1REF", "LED3SNS"], 1529996366626, new Date().getTime())
//       .then(function(result) {
//          console.log(result.data);
//        })
//        .catch(function (error) {
//          console.log(error);
//      });
//
// Console Output:
//          { LF1REF:
//               { timestamps:
//                [ 1529996366626,
//                  1529996366627 ],
//               values: [ 3638, 3584 ] },
//            LED3SNS:
//             { timestamps:
//                [ 1529996366638,
//                  1529996366638 ],
//               values: [ 200, 167 ] }
//          }


//
/*********************************************************/
export function getSignalsLatest(signals, num) {
    return fetchRouteLatest("signals", signals, num);
}

export function getSignalsLatestSingle(signals) {
    return fetchRouteLatestSingle("signals", signals);
}

export function getSignalsInPeriod(signals, startTime, endTime) {
    return fetchRouteTimePeriod("signals", signals, startTime, endTime);
}
/*********************************************************/
// API helpers
/*********************************************************/
function fetchRouteLatest (routeSuffix, signals, num) {
    if (ENABLE_DUMMY_DATA) {
        return getDummyData(signals, num);
    } else {
        const signalStr = (signals != null) ? signals.join(",") : [];
        const query = { "limit": num, "fields": signalStr };
        return axios({
            url: API_ROUTE_PREFIX + routeSuffix + "/latest",
            method: 'get',
            params: query,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}

function fetchRouteTimePeriod (routeSuffix, signals, startTime, endTime) {
    if (ENABLE_DUMMY_DATA) {
        return getDummyData(signals, 10);
    } else {
        const signalStr = (signals != null) ? signals.join(",") : [];
        const query = { "start_date": startTime, "end_date": endTime, "fields": signalStr };
        return axios({
            url: API_ROUTE_PREFIX + routeSuffix,
            method: 'get',
            params: query,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}

function fetchRouteLatestSingle (routeSuffix, signals) {
    if (ENABLE_DUMMY_DATA) {
        return getDummyData(signals, 1);
    } else {
        const signalStr = (signals != null) ? signals.join(",") : [];
        const query = { "fields": signalStr };
        return axios({
            url: API_ROUTE_PREFIX + routeSuffix + "/latest_single",
            method: 'get',
            params: query,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}

function getDummyData(signals, num) {
    const data = []
    for (var n = 0; n < num; n++) {
        data[n] = {}
        for (var i = 0; i < signals.length; i++) {
            data[n][signals[i]] = Math.random()*100;
        }
    }
    return data;
}
