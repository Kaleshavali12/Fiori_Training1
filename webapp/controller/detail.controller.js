sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageBox"
    ],
    function(Controller, Filter, FilterOperator,JSONModel, MessageBox,MessageToast) {
      "use strict";
  
      return Controller.extend("com.odata.northwindassignment.controller.detail", {
        onInit: function() {
          var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("Routedetail").attachPatternMatched(this._onObjectMatched, this);
},

_onObjectMatched: function (oEvent) {
    var sEmployeeID = oEvent.getParameter("arguments").empid;
    this._loadData(sEmployeeID);
    // var parameter =oEvent.getParameters();
    // var paramvalue = parameter.arguments;
},
_loadData: function (sEmployeeID) {
  var aFilter = [];
  var oModel = this.getView().getModel();
  var sPath = "/Employees"
  aFilter.push(new Filter("EmployeeID", FilterOperator.EQ, sEmployeeID));
  
  oModel.read(sPath, {
      filters: aFilter,
      success: function (oData) {
          // this.getView().getModel().setProperty("/detail", oData);
          var iModel = new JSONModel();
          iModel.setData(oData);
          this.getView().setModel(iModel,"kal");

      }.bind(this),
      error: function (oError) {
          // Handle error
      }
  });
},

//with out reuse 

// onObjectMatched(oEvent) {
//   var scustomerId = oEvent.getParameter("arguments").productId;
//    var sPath="/Customers";
//    var oModel = this.getView().getModel();
//    var aFilter=[];
//    aFilter.push(new Filter("CustomerID", FilterOperator.EQ,scustomerId));
 
//    oModel.read(sPath,{
//       filters: aFilter,
//       success:function(oData){
//         var iModel = new JSONModel();
//         iModel.setData(oData);
//         this.getView().setModel(iModel,"products1");
//       }.bind(this),
//       error(err){
//           console.log("erri");
//       }
 
//    })
// },

 //fragment and dialog code
 onCreate: function() {
  var oView = this.getView();
  this._pDialog = this.loadFragment({
      name: "com.odata.northwindassignment.fragment.fragment"
      }).then(function (oDialog) {
      oView.addDependent(oDialog);
      oDialog.open();
  }.bind(this));
},

onCancelPressed: function() {
  var oDialog = this.getView().byId("idCreateProduct");
  oDialog.close();
  oDialog.destroy();
},


  //if you want to take i18n text on this time you should take onAfterRendering hook.
  onAfterRendering: function() {
    this._oBundle = this.getView().getModel("i18n").getResourceBundle();
},

onSubmitPressed: function(){
    // Display by using messageToast 
    // MessageToast.show(this._oBundle.getText("submitMsg"));
    // this.onClose();

   // Display by using message box
      MessageBox.success(this._oBundle.getText("submitMsg"));
   // this.onClose();

  //Disply by using this is for taking msg from input  
  //  var inputText1 = this.byId("inputText").getValue();
  //  MessageToast.show(inputText1);
  //  this.onClose();
    
}


      });
    }
  );