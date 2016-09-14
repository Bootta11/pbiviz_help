module powerbi.extensibility.visual.PBI_CV_724FCDDA_CF7B_4C78_B73A_24704A8598F3  {

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


        public update(options: VisualUpdateOptions) {
            let dataViews = options.dataViews; //options: VisualUpdateOptions
            let table = dataViews[0].table;
            let dataValues = table.rows;


            if (!options.dataViews && !options.dataViews[0]) {
                return;
            }

            this.dataView = options.dataViews[0];
            console.log("cp update 1");
            const data = Visual.converter(this.dataView);  //if we comment this line code after will execute
            console.log("cp update 2", data);

            var htmlSelect = "";
            htmlSelect += "<select id='dateSelector'>";
            htmlSelect += "<option value='#'>-- select --</option>";
            for (var i = 0; i < dataViews[0].table.rows.length; i++) {
                htmlSelect += "<option value=\"" + dataViews[0].table.rows[i].toString() + "\">" + dataViews[0].table.rows[i].toString() + "</option>";
            }
            htmlSelect += "</select>";
            this.target.innerHTML = htmlSelect;
        }

        public destroy(): void {
            console.log('destroy called');
        }
    }
}