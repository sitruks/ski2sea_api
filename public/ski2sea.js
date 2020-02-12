(function () {
    'use strict';
    //------------- Tableau WDC code -------------//
    // Create tableau connector, should be called first
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        // Schema for results data
        var results_cols = [
            { id: "year", alias: "Year", dataType: tableau.dataTypeEnum.int },
            { id: "leg", alias: "Leg", dataType: tableau.dataTypeEnum.string },
            { id: "pa", alias: "Place After", dataType: tableau.dataTypeEnum.int },
            { id: "dq", alias: "DQ or DNF", dataType: tableau.dataTypeEnum.bool },
            { id: "tn", alias: "Team Number", dataType: tableau.dataTypeEnum.int },
            { id: "dr", alias: "Division Place", dataType: tableau.dataTypeEnum.int },
            { id: "du", alias: "Elapsed Time", dataType: tableau.dataTypeEnum.datetime },
            { id: "rn", alias: "Leg Place", dataType: tableau.dataTypeEnum.int },
            { id: "st", alias: "Start Time", dataType: tableau.dataTypeEnum.datetime },
            { id: "ed", alias: "End Time", dataType: tableau.dataTypeEnum.datetime }
        ];
        var resultsTable = {
            id: "results", alias: "Results Data", columns: results_cols
        };
        // Schema for teams data
        var teams_cols = [
            { id: "teamId", alias: "Team ID", dataType: tableau.dataTypeEnum.int },
            { id: "leg", alias: "Race Leg", dataType: tableau.dataTypeEnum.string },
            { id: "n", alias: "Name", dataType: tableau.dataTypeEnum.string },
            { id: "g", alias: "Gender", dataType: tableau.dataTypeEnum.string },
            { id: "tn", alias: "Team Name", dataType: tableau.dataTypeEnum.string },
            { id: "dc", alias: "Division", dataType: tableau.dataTypeEnum.string }
        ];
        var teamsTable = {
            id: "teams", alias: "Teams Data", columns: teams_cols
        };
        // Schema for divisions data
        var divisions_cols = [
            { id: "code", alias: "Code", dataType: tableau.dataTypeEnum.string },
            { id: "long_name", alias: "Long Name", dataType: tableau.dataTypeEnum.string }
        ];
        var divisionsTable = {
            id: "divisions", alias: "Divisions Data", columns: divisions_cols
        };
        // Schema for legs data
        var legs_cols = [
            { id: "code", alias: "Code", dataType: tableau.dataTypeEnum.string },
            { id: "short_name", alias: "Short Name", dataType: tableau.dataTypeEnum.string },
            { id: "long_name", alias: "Long Name", dataType: tableau.dataTypeEnum.string }
        ];
        var legsTable = {
            id: "legs", alias: "Legs Data", columns: legs_cols
        };
        // // Create a promise to get our Standard Connections List from a JSON file. This increases code readability since we no longer need to define the lengthy object within our javascript itself.
        // var standardConnections = new Promise(function (resolve, reject) {
        //     loadJSON("skiToSeaDataJoins", function (json) {
        //         var obj = JSON.parse(json);
        //         var connectionList = [];
        //         for (var connection in obj.connections) {
        //             connectionList.push(obj.connections[connection]);
        //         }
        //         resolve(connectionList);
        //     }, true);
        // });
        // // Once all our promises are resolved, we can call the schemaCallback to send this info to Tableau
        // Promise.all(
        //     [resultsTable, teamsTable, divisionsTable, legsTable, standardConnections]).then(function (data) {
        //         schemaCallback(data[0], data[1], data[2], data[3], data[4]);
        //     });
        schemaCallback([resultsTable, teamsTable, divisionsTable, legsTable]);
    };

    myConnector.getData = function (table, doneCallback) {
        // var url_beg = "http://results.skitosea.com/api/v1/";
        // var url_end = "/results";
        var url_dev = "http://localhost:3333/";
        var tableData = [];
        var patches = JSON.parse(tableau.connectionData).patches;
        patches = patches.map(function (item) {
            var url = url_dev + item;
            // var url = url_beg + item + url_end;
            console.log(url);
            $.getJSON(url, function (resp) {
                var results = resp.results,
                    teams = resp.teams,
                    divisions = resp.divisions,
                    legs = resp.legs,
                    tableData = [];
                    
                    if (table.tableInfo.id == "results") {
                    console.log(item, results);
                    var i, j
                    for (i in results) {
                        for (j in results[i]) {
                            tableData.push({
                                "year": item,
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
                    var i, j, k;
                    for (i in teams) {
                        for (j in teams[i].rs) {
                            for (k in teams[i].rs[j]) {
                                tableData.push({
                                    "teamId": i,
                                    "tn": teams[i].tn,
                                    "dc": teams[i].dc,
                                    "leg": j,
                                    "n": teams[i].rs[j][k].n,
                                    "g": teams[i].rs[j][k].g
                                });
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
        });
    };
    // Register the tableau connector, call this last
    tableau.registerConnector(myConnector);
})();

// Helper function that loads a json and a callback to call once that file is loaded
function loadJSON(path, cb, isLocal) {
    var obj = new XMLHttpRequest();
    obj.overrideMimeType("application/json");
    if (isLocal) {
        obj.open("GET", "./json/" + path + ".json", true);
    }
    obj.onreadystatechange = function () {
        if (obj.readyState == 4 && obj.status == "200") {
            cb(obj.responseText);
        }
    }
    obj.send(null);
};

$(document).ready(function () {
    $("#getracedata").click(function () {
        // Get selected patch versions from web form.
        var patches = [];
        $('#patches :selected').each(function () {
            patches.push($(this).text())
        });
        // Store patches in connection data object to build url in myConnector.getData.
        var conn_data = {
            patches: patches,
        };
        tableau.connectionData = JSON.stringify(conn_data);
        tableau.connectionName = "Ski to Sea Race Results Data";
        tableau.submit();
    });
});