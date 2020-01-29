(function () {
    'use strict';
    $(document).ready(function () {

        $("#getracedata").click(function () {
            tableau.connectionName = "Ski to Sea Race Results Data";
            tableau.submit();
        });
    });

    //------------- Tableau WDC code -------------//
    // Create tableau connector, should be called first
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        // Schema for results data
        var results_cols = [{
            id: "leg", alias: "Leg", dataType: tableau.dataTypeEnum.string
        }, {
            id: "pa", alias: "Place After", dataType: tableau.dataTypeEnum.float
        }, {
            id: "dq", alias: "DQ or DNF", dataType: tableau.dataTypeEnum.bool
        }, {
            id: "tn", alias: "Team Number", dataType: tableau.dataTypeEnum.float
        }, {
            id: "dr", alias: "Division Place", dataType: tableau.dataTypeEnum.float
        }, {
            id: "du", alias: "Elapsed Time", dataType: tableau.dataTypeEnum.date
        }, {
            id: "rn", alias: "Leg Place", dataType: tableau.dataTypeEnum.float
        }, {
            id: "st", alias: "Start Time", dataType: tableau.dataTypeEnum.date
        }, {
            id: "ed", alias: "End Time", dataType: tableau.dataTypeEnum.date
        }];

        var resultsTable = {
            id: "results", alias: "Results Data", columns: results_cols
        };

        // Schema for teams data
        var teams_cols = [{
            id: "teamId", alias: "Team ID", dataType: tableau.dataTypeEnum.float
        }, {
            id: "ca1_n", alias: "Canoe 1 Name", dataType: tableau.dataTypeEnum.string
        }, {
            id: "ca1_g", alias: "Canoe 1 Gender", dataType: tableau.dataTypeEnum.string
        }, {
            id: "ca2_n", alias: "Canoe 2 Name", dataType: tableau.dataTypeEnum.string
        }, {
            id: "ca2_g", alias: "Canoe 2 Gender", dataType: tableau.dataTypeEnum.string
        }, {
            id: "rb_n", alias: "RD Bike Name", dataType: tableau.dataTypeEnum.string
        }, {
            id: "rb_g", alias: "RD Bike Gender", dataType: tableau.dataTypeEnum.string
        }, {
            id: "ru_n", alias: "Run Name", dataType: tableau.dataTypeEnum.string
        }, {
            id: "ru_g", alias: "Run Gender", dataType: tableau.dataTypeEnum.string
        }, {
            id: "xc_n", alias: "XC Ski Name", dataType: tableau.dataTypeEnum.string
        }, {
            id: "xc_g", alias: "XC Ski Gender", dataType: tableau.dataTypeEnum.string
        }, {
            id: "dh_n", alias: "DH Ski Name", dataType: tableau.dataTypeEnum.string
        }, {
            id: "dh_g", alias: "DH Ski Gender", dataType: tableau.dataTypeEnum.string
        }, {
            id: "ka_n", alias: "Kayak Name", dataType: tableau.dataTypeEnum.string
        }, {
            id: "ka_g", alias: "Kayak Gender", dataType: tableau.dataTypeEnum.string
        }, {
            id: "mb_n", alias: "XC Bike Name", dataType: tableau.dataTypeEnum.string
        }, {
            id: "mb_g", alias: "XC Bike Gender", dataType: tableau.dataTypeEnum.string
        }, {
            id: "tn", alias: "Team Name", dataType: tableau.dataTypeEnum.string
        }, {
            id: "dc", alias: "Division", dataType: tableau.dataTypeEnum.string
        }];

        var teamsTable = {
            id: "teams", alias: "Teams Data", columns: teams_cols
        };

        // Schema for divisions data
        var divisions_cols = [{
            id: "code", alias: "Code", dataType: tableau.dataTypeEnum.string
        }, {
            id: "long_name", alias: "Long Name", dataType: tableau.dataTypeEnum.string
        }];

        var divisionsTable = {
            id: "divisions", alias: "Divisions Data", columns: divisions_cols
        };

        // Schema for legs data
        var legs_cols = [{
            id: "code", alias: "Code", dataType: tableau.dataTypeEnum.string
        }, {
            id: "short_name", alias: "Short Name", dataType: tableau.dataTypeEnum.string
        }, {
            id: "long_name", alias: "Long Name", dataType: tableau.dataTypeEnum.string
        }];

        var legsTable = {
            id: "legs", alias: "Legs Data", columns: legs_cols
        };

        schemaCallback([resultsTable, teamsTable, divisionsTable, legsTable]);
    };

    // Download the data
    myConnector.getData = function (table, doneCallback) {
        // var yearsArray = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
        var apiCall = "http://localhost:3333/output";

        $.getJSON(apiCall, function (resp) {
            var results = resp.results,
                teams = resp.teams,
                divisions = resp.divisions,
                legs = resp.legs,
                tableData = [];

            if (table.tableInfo.id == "results") {
                console.log(results);
                var i, j
                for (i in results) {
                    for (j in results[i]) {
                        tableData.push({
                            "leg": i,
                            "pa": results[i][j].pa,
                            "dq": results[i][j].dq,
                            "tn": results[i][j].tn,
                            "dr": results[i][j].dr,
                            "du": results[i][j].du,
                            "rn": results[i][j].rn,
                            "st": results[i][j].st,
                            "ed": results[i][j].ed
                        });
                    }
                }
            }
            if (table.tableInfo.id == "teams") {
                console.log(teams);
                var i, j;
                for (i in teams) {
                    for (j in teams[i].rs.ca) {
                        for (j in teams[i].rs.rb) {
                            for (j in teams[i].rs.ru) {
                                for (j in teams[i].rs.xc) {
                                    for (j in teams[i].rs.dh) {
                                        for (j in teams[i].rs.ka) {
                                            for (j in teams[i].rs.mb) {
                                                tableData.push({
                                                    "teamId": i,
                                                    "tn": teams[i].tn,
                                                    "dc": teams[i].dc,
                                                    "ca1_n": teams[i].rs.ca[0].n,
                                                    "ca1_g": teams[i].rs.ca[0].g,
                                                    "ca2_n": teams[i].rs.ca[1].n,
                                                    "ca2_g": teams[i].rs.ca[1].g,
                                                    "rb_n": teams[i].rs.rb[j].n,
                                                    "rb_g": teams[i].rs.rb[j].g,
                                                    "ru_n": teams[i].rs.ru[j].n,
                                                    "ru_g": teams[i].rs.ru[j].g,
                                                    "xc_n": teams[i].rs.xc[j].n,
                                                    "xc_g": teams[i].rs.xc[j].g,
                                                    "dh_n": teams[i].rs.dh[j].n,
                                                    "dh_g": teams[i].rs.dh[j].g,
                                                    "ka_n": teams[i].rs.ka[j].n,
                                                    "ka_g": teams[i].rs.ka[j].g,
                                                    "mb_n": teams[i].rs.mb[j].n,
                                                    "mb_g": teams[i].rs.mb[j].g
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (table.tableInfo.id == "divisions") {
                console.log(divisions);
                var i;
                for (i in divisions) {
                    tableData.push({
                        "code": i,
                        "long_name": divisions[i]
                    });
                }
            }
            if (table.tableInfo.id == "legs") {
                console.log(legs);
                for (var i = 0, len = legs.length; i < len; i++) {
                    tableData.push({
                        "code": legs[i].code,
                        "short_name": legs[i].short_name,
                        "long_name": legs[i].long_name
                    });
                }
            }

            table.appendRows(tableData);
            console.log(tableData);

            doneCallback();
        });
    };



    // // Declare the data to Tableau that we are returning from Foursquare
    // myConnector.getSchema = function (schemaCallback) {
    //     // Create a promise to get our Standard Connections List from a JSON file. This increases code readability since we
    //     // no longer need to define the lengthy object within our javascript itself.
    //     var standardConnections = new Promise(function (resolve, reject) {
    //         loadJSON("skiToSeaDataJoins", function (json) {
    //             var obj = JSON.parse(json);
    //             var connectionList = [];
    //             for (var connection in obj.connections) {
    //                 connectionList.push(obj.connections[connection]);
    //             }
    //             resolve(connectionList);
    //         }, true);
    //     });
    //     // Create a promise to get our table schema info as well, just like above
    //     var tables = new Promise(function (resolve, reject) {
    //         loadJSON("skiToSeaTableInfoData", function (json) {
    //             var obj = JSON.parse(json);
    //             var tableList = [];
    //             for (var table in obj.tables) {
    //                 tableList.push(obj.tables[table]);
    //             }
    //             resolve(tableList);
    //         }, true);
    //     });
    //     // Once all our promises are resolved, we can call the schemaCallback to send this info to Tableau
    //     Promise.all([tables, standardConnections]).then(function (data) {
    //         schemaCallback(data[0], data[1]);
    //     });
    // }

    // // This function actually make the foursquare API call and
    // // parses the results and passes them back to Tableau
    // myConnector.getData = function (table, doneCallback) {
    //     // Load our data from the API. Multiple tables for WDC work by calling getData multiple times with a different id
    //     // so we want to make sure we are getting the correct table data per getData call
    //     loadJSON(table.tableInfo.id, function (data) {
    //         var obj = JSON.parse(data);
    //         console.log(obj);
    //         console.log(obj.divisions);
    //         var tableData = [];
    //         // Iterate through the data and build our table
    //         for (var i = 0; i < obj.length; i++) {
    //             var tableEntry = {};
    //             var ref = obj[i];
    //             // We can use this handy shortcut because our JSON column names match our schema's column names perfectly
    //             Object.getOwnPropertyNames(ref).forEach(function (val, idx, array) {
    //                 // Handle specific cases by checking the name of the property
    //                 switch (val) {
    //                     case "divisions":
    //                         tableEntry.divisions = ref[val];
    //                         break;
    //                     // case "address":
    //                     //   tableEntry.lat = ref[val].geo.lat;
    //                     //   tableEntry.lng = ref[val].geo.lng;
    //                     //   tableEntry.zipcode = ref[val].zipcode;
    //                     //   break;
    //                     // case "company":
    //                     //   tableEntry.companyname = ref[val].name;
    //                     //   tableEntry.catchPhrase = ref[val].catchPhrase;
    //                     //   tableEntry.bs = ref[val].bs;
    //                     //   break;
    //                     default:
    //                         tableEntry[val] = ref[val];
    //                 }
    //             });
    //             tableData.push(tableEntry);
    //         }
    //         // Once we have all the data parsed, we send it to the Tableau table object
    //         table.appendRows(tableData);
    //         doneCallback();
    //     });
    // }

    // Register the tableau connector, call this last
    tableau.registerConnector(myConnector);
})();

// // Helper function that loads a json and a callback to call once that file is loaded
// function loadJSON(path, cb, isLocal) {
//     var obj = new XMLHttpRequest();
//     // var url = "http://localhost:3333/results";
//     var url = "http://jsonplaceholder.typicode.com/" + path;
//     obj.overrideMimeType("application/json");
//     if (isLocal) {
//         obj.open("GET", "../json/" + path + ".json", true);
//     }
//     else {
//         obj.open("GET", url, true);
//     }
//     obj.onreadystatechange = function () {
//         if (obj.readyState == 4 && obj.status == "200") {
//             cb(obj.responseText);
//         }
//     }
//     obj.send(null);
// }

function send() {
    tableau.submit();
}