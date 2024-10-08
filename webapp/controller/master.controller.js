sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("com.odata.northwindassignment.controller.master", {
        onInit: function () {
            var kal = this;
            var odataemployee = this.getOwnerComponent().getModel();
            odataemployee.read("/Employees",{
                success(odata,response){
                    var odatamodel = new JSONModel();
                odatamodel.setData(odata);
                kal.getView().setModel(odatamodel,"empitems");
                },
                error(err){
        
                }
            })
        },

        onPress(oEvent) {
           var k = oEvent.getSource();
           var s= k.getBindingContext("empitems");
           var sEmpId= s.getObject();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Routedetail", {
                 empid: sEmpId.EmployeeID
            }
        );
        }
     });
});
