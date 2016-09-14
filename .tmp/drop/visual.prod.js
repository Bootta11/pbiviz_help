var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var PBI_CV_724FCDDA_CF7B_4C78_B73A_24704A8598F3;
            (function (PBI_CV_724FCDDA_CF7B_4C78_B73A_24704A8598F3) {
                var Visual = (function () {
                    //private static vis: Visual;
                    function Visual(options) {
                        console.log('Visual constructor', options);
                        Visual.host = options.host;
                        this.selectionIdBuilder = options.host.createSelectionIdBuilder();
                        this.target = options.element;
                        this.selectionManager = options.host.createSelectionManager();
                        //Visual.vis = this;
                    }
                    Visual.converter = function (dataView) {
                        var _a = dataView.table, columns = _a.columns, rows = _a.rows;
                        console.log("cp before datas", dataView);
                        var datas = rows.map(function (row, idx) {
                            var data = row.reduce(function (d, v, i) {
                                d[columns[i].displayName] = v;
                                return d;
                            }, {});
                            console.log("cp after data: ", data);
                            console.log("cp rows", dataView.table.rows);
                            var sb2 = data.identity.createSelectionIdBuilder();
                            data.identity = sb2
                                .withSeries(dataView.table.rows, this.rows[idx])
                                .createSelectionId();
                            console.log("Data conv: " + data);
                            return data;
                        });
                        return datas;
                    };
                    Visual.prototype.update = function (options) {
                        var dataViews = options.dataViews; //options: VisualUpdateOptions
                        var table = dataViews[0].table;
                        var dataValues = table.rows;
                        if (!options.dataViews && !options.dataViews[0]) {
                            return;
                        }
                        this.dataView = options.dataViews[0];
                        console.log("cp update 1");
                        var data = Visual.converter(this.dataView); //if we comment this line code after will execute
                        console.log("cp update 2", data);
                        var htmlSelect = "";
                        htmlSelect += "<select id='dateSelector'>";
                        htmlSelect += "<option value='#'>-- select --</option>";
                        for (var i = 0; i < dataViews[0].table.rows.length; i++) {
                            htmlSelect += "<option value=\"" + dataViews[0].table.rows[i].toString() + "\">" + dataViews[0].table.rows[i].toString() + "</option>";
                        }
                        htmlSelect += "</select>";
                        this.target.innerHTML = htmlSelect;
                    };
                    Visual.prototype.destroy = function () {
                        console.log('destroy called');
                    };
                    return Visual;
                }());
                PBI_CV_724FCDDA_CF7B_4C78_B73A_24704A8598F3.Visual = Visual;
            })(PBI_CV_724FCDDA_CF7B_4C78_B73A_24704A8598F3 = visual.PBI_CV_724FCDDA_CF7B_4C78_B73A_24704A8598F3 || (visual.PBI_CV_724FCDDA_CF7B_4C78_B73A_24704A8598F3 = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var plugins;
        (function (plugins) {
            plugins.PBI_CV_724FCDDA_CF7B_4C78_B73A_24704A8598F3_DEBUG = {
                name: 'PBI_CV_724FCDDA_CF7B_4C78_B73A_24704A8598F3_DEBUG',
                displayName: 'testopet',
                class: 'Visual',
                version: '1.0.0',
                apiVersion: '1.1.0',
                create: function (options) { return new powerbi.extensibility.visual.PBI_CV_724FCDDA_CF7B_4C78_B73A_24704A8598F3.Visual(options); },
                custom: true
            };
        })(plugins = visuals.plugins || (visuals.plugins = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
//# sourceMappingURL=visual.js.map