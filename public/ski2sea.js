(function () {
    'use strict';
    //------------- Tableau WDC code -------------//
    // Create tableau connector, should be called first
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function (schemaCallback) {

        // Schema for results data
        var results_cols = [
            { id: "leg", alias: "Leg", dataType: tableau.dataTypeEnum.string },
            { id: "pa", alias: "Place After", dataType: tableau.dataTypeEnum.int },
            { id: "dq", alias: "DQ or DNF", dataType: tableau.dataTypeEnum.bool },
            { id: "tn", alias: "Team Number", dataType: tableau.dataTypeEnum.int },
            { id: "dr", alias: "Division Place", dataType: tableau.dataTypeEnum.int },
            { id: "du", alias: "Elapsed Time", dataType: tableau.dataTypeEnum.date },
            { id: "rn", alias: "Leg Place", dataType: tableau.dataTypeEnum.int },
            { id: "st", alias: "Start Time", dataType: tableau.dataTypeEnum.date },
            { id: "ed", alias: "End Time", dataType: tableau.dataTypeEnum.date }
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

        schemaCallback([resultsTable, teamsTable, divisionsTable, legsTable]);
    }

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
            // xhr.open('GET', url);
            $.getJSON((url), function (resp) {
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
                // a way to visualize the race teams in one line, though there is a duplication issue, and also an output issue with this method when there is no racer, so it is not a preferred method
                // if (table.tableInfo.id == "teams") {
                //     console.log(teams);
                //     var i, j;
                //     for (i in teams) {
                //         for (j in teams[i].rs.ca) {
                //             if (!teams[i].rs.ca.hasOwnProperty(j)) {
                //                 continue;
                //             }
                //             for (j in teams[i].rs.rb) {
                //                 for (j in teams[i].rs.ru) {
                //                     for (j in teams[i].rs.xc) {
                //                         for (j in teams[i].rs.dh) {
                //                             for (j in teams[i].rs.ka) {
                //                                 for (j in teams[i].rs.mb) {
                //                                     tableData.push({
                //                                         "teamId": i,
                //                                         "tn": teams[i].tn,
                //                                         "dc": teams[i].dc,
                //                                         "ca1_n": teams[i].rs.ca[0].n,
                //                                         "ca1_g": teams[i].rs.ca[0].g,
                //                                         "ca2_n": teams[i].rs.ca[1].n,
                //                                         "ca2_g": teams[i].rs.ca[1].g,
                //                                         "rb_n": teams[i].rs.rb[j].n,
                //                                         "rb_g": teams[i].rs.rb[j].g,
                //                                         "ru_n": teams[i].rs.ru[j].n,
                //                                         "ru_g": teams[i].rs.ru[j].g,
                //                                         "xc_n": teams[i].rs.xc[j].n,
                //                                         "xc_g": teams[i].rs.xc[j].g,
                //                                         "dh_n": teams[i].rs.dh[j].n,
                //                                         "dh_g": teams[i].rs.dh[j].g,
                //                                         "ka_n": teams[i].rs.ka[j].n,
                //                                         "ka_g": teams[i].rs.ka[j].g,
                //                                         "mb_n": teams[i].rs.mb[j].n,
                //                                         "mb_g": teams[i].rs.mb[j].g
                //                                     });
                //                                 }
                //                             }
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
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