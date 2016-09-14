/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 
declare var require: any;
var css=require('../css/datepicker.css');
var dtp=require('react');
*/

module powerbi.extensibility.visual {

    export class Visual implements IVisual {


        private selectionManager: ISelectionManager;
        private selectionIdBuilder: ISelectionIdBuilder;
        private dataView: DataView;
        private target: HTMLElement;
        private static host: IVisualHost;
        //private static vis: Visual;

        constructor(options: VisualConstructorOptions) {

            console.log('Visual constructor', options);

            Visual.host = options.host;
            this.selectionIdBuilder = options.host.createSelectionIdBuilder();
            this.target = options.element;
            this.selectionManager = options.host.createSelectionManager();
            //Visual.vis = this;
        }

        public static converter(dataView: DataView) {
            const {columns, rows} = dataView.table;

            console.log("cp before datas", dataView);
            const datas = rows.map(function (row, idx) {
                let data = row.reduce(function (d, v, i) {
                    d[columns[i].displayName] = v;
                    return d;
                }, {});
                console.log("cp after data: ", data);

                console.log("cp rows", dataView.table.rows);
                let sb2 = data.identity.createSelectionIdBuilder();
                data.identity = sb2
                    .withSeries(dataView.table.rows, this.rows[idx])
                    .createSelectionId();

                console.log("Data conv: " + data);
                return data;
            });

            return datas;
        }

        public static converter2(dataView: DataView) {
            const {columns, rows} = dataView.table;
            const c20 = d3.scale.category10();
            var datas = [];
            //console.log("columns rows: "+columns+ " "+rows);
            for (var i = 0; i < rows.length; i++) {
                //const datas = rows.map(function (row, idx) {
                console.log("row idx: " + rows[i] + " | " + i);
                let data = rows[i].reduce(function (d, v, i) {
                    d[columns[i].displayName] = v;
                    return d;
                }, {});
                console.log("Data val: " + data);
                //console.log("selbuild: "+data.identity.selectionIdBuilder());
                //debugger;
                data.identity = data.identity.selectionIdBuilder
                    .withSeries(rows, rows[i])
                    .createSelectionId();
                console.log("Data identity: " + data.identity);

                //data.color = c20(data.category);
                console.log("Data conv: " + data);
                datas.push(data);
                //return data;
                // });
            }
            return datas;
        }

        public update(options: VisualUpdateOptions) {
            let dataViews = options.dataViews; //options: VisualUpdateOptions
            let table = dataViews[0].table;
            let dataValues = table.rows;


            if (!options.dataViews && !options.dataViews[0]) {
                //console.log("no dataview");
                return;
            }
            //console.log("dataview exist");
            this.dataView = options.dataViews[0];
            console.log("dataview exist2");
            const data = Visual.converter(this.dataView);
            console.log("data converted: ", data);
            //const data = Visual.converter(this.dataView);

            //console.log("Data: " + data);
            /*
                        data.forEach(d => {
                            this.selectionManager.select(d.identity);
                        });
                        */

            //console.log('Visual update', options);
            //this.dataViews = options.dataViews;
            //var date1 = new Date(dataViews[0].table.rows[0].toString());
            //console.log("date1: "+date1);
            /*this.target.innerHTML = `<link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css"><div width="100%" style="overflow-y: scroll"><input type="range" min="0" max="50" value="25" /><br/>
            <input type="date"/><br/>
            <input type="text" id="datepicker">
            <input type="text"/><br/>
            <input type="text"/>
            </div>
            `;*/

            var htmlSelect = "";
            htmlSelect += "<select id='dateSelector'>";
            htmlSelect += "<option value='#'>-- select --</option>";
            for (var i = 0; i < dataViews[0].table.rows.length; i++) {
                htmlSelect += "<option value=\"" + dataViews[0].table.rows[i].toString() + "\">" + dataViews[0].table.rows[i].toString() + "</option>";
            }
            htmlSelect += "</select>";
            this.target.innerHTML = htmlSelect;
            $('#dateSelector').on('change', function () {
                console.log(this.value); // or $(this).val()
                //this.selectionManager.select(this.value).then((ids: ISelectionId[]) => {
                //    console.log("change then");
                //});
            });

            //$('mydate').glDatePicker();

            //$('#datepciker').DatePicker();
            //this.target.innerHTML = `<p>Update count: <em>${(this.updateCount++)}</em></p>`;

        }

        public destroy(): void {
            console.log('destroy called');
            //TODO: Perform any cleanup tasks here
        }
    }
}