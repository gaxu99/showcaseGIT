sap.ui.define([
		"sap/ui/base/Object"
	],
	function (BaseObject) {
		"use strict";
		return BaseObject.extend("showcase.ZGBLM001.util.DataManager", {

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the data manager object is to be created.
			 * @public
			 */
			constructor: function (aComponent) {
				"use strict";
				// this.oModel = new sap.ui.model.odata.ODataModel("sap/opu/odata/sap/ZGBLMTORDER_SRV/", true);
                this.oDataModel = aComponent.getModel("ZGBLMTORDER_SRV");
            },

			// getMasterList: function () {
			// 	var aOrderList = [];
			// 	var sFilterSt = "/ENTITY001Set?$expand=ENTITY002";
			// 	// call the odata request
			// 	this.oModel.read(sFilterSt, {
			// 		context: null,
			// 		urlParameters: null,
			// 		async: false,
			// 		// filters: aFilters,
			// 		success: function (oDataRecieved, responce) {
			// 			aOrderList = oDataRecieved.results;
			// 		},
			// 		error: function (err) {}
			// 	});
			// 	return aOrderList;
            // },
            
            getMasterList: function () {
				// var oDataModel = this.oModel;
				var pMasterList = new Promise(function (resolve, reject) {
					this.oDataModel.read("/ENTITY001Set", {
                        urlParameters: {
                            "$expand" : "ENTITY002"
                        },
						success: function (oDataRecieved, responce) {
							resolve(oDataRecieved["results"]);
						},
						error: function (err) {
							reject(err);
						}
					});
				}.bind(this));
				return pMasterList;
            },
            

			getProductID: function () {
				//product number
				var oDataModel = this.oModel;
				var sFilterSt = "/ENTITY002Set?$select=productID";
				var pProductId = new Promise(function (resolve, reject) {
					oDataModel.read(sFilterSt, {
						context: null,
						urlParameters: null,
						async: false,
						success: function (oDataRecieved, responce) {
							resolve(oDataRecieved.results);
						},
						error: function (err) {
							reject();
						}
					});
				});
				return pProductId;
			},

			getCustomerNo: function () {
				//customer number
				var oDataModel = this.oModel;
				var sFilterSt = "/ENTITY003Set?$select=customerNo";
				var pCustomerNo = new Promise(function (resolve, reject) {
					oDataModel.read(sFilterSt, {
						context: null,
						urlParameters: null,
						async: false,
						success: function (oDataRecieved, responce) {
							resolve(oDataRecieved.results);
						},
						error: function (err) {
							reject();
						}
					});
				});
				return pCustomerNo;
			},

			getRepairPerson: function () {
				//repair person number
				var oDataModel = this.oModel;
				var sFilterSt = "/ENTITY004Set?$select=repPersonNo";
				var pRepairNo = new Promise(function (resolve, reject) {
					oDataModel.read(sFilterSt, {
						context: null,
						urlParameters: null,
						async: false,
						success: function (oDataRecieved, responce) {
							resolve(oDataRecieved.results);
						},
						error: function (err) {
							reject();
						}
					});
				});
				return pRepairNo;
			},

			getFilterOrder: function (oDataFilter, oSorter, that) {
				var sRequst = "/ENTITY001Set";
				var oDataResult = {};
				this.oModel.read(sRequst, {
					context: null,
					urlParameters: null,
					filters: oDataFilter,
					sorters: oSorter,
					async: false,
					success: function (oDataRecieved, responce) {
						oDataResult = oDataRecieved;
					},
					error: function (err) {
						var sMessage = that._PraseError(err);
						that._ShowMessageBox(sMessage);
					}
				});
				return oDataResult;
			},

			getDetailOrder: function (sFilterSt) {
				var oDataModel = this.oModel;
				var pDetailOrder = new Promise(function (resolve, reject) {
					oDataModel.read(sFilterSt, {
						context: null,
						urlParameters: null,
						async: false,
						success: function (oDataRecieved, responce) {
							resolve(oDataRecieved);
						},
						error: function (err) {
							reject();
						}
					});
				});
				return pDetailOrder;
			},

			getDetailRepair: function () {
				var sFilterSt = "ENTITY004Set";
				var aRepairResult = [];
				this.oModel.read(sFilterSt, {
					context: null,
					urlParameters: null,
					async: false,
					success: function (oDataRecieved, responce) {
						aRepairResult = oDataRecieved.results;
					},
					error: function (err) {}
				});
				return aRepairResult;
			},

			updateOrder: function (sOptions, oUpdateOrder, that) {
				this.oModel.update(sOptions, oUpdateOrder, {
					context: null,
					async: false,
					success: function (oData, responce) {
						that._onLoad(oUpdateOrder.orderNo, that);
						that._MasterRefresh();
					},
					error: function (err) {
						var sMessage = that._PraseError(err);
						that._ShowMessageBox(sMessage);
					}
				});
			},

			getCreateProduct: function () {
				var sFilterSt = "ENTITY002Set";
				var aProductResult = [];
				this.oModel.read(sFilterSt, {
					context: null,
					urlParameters: null,
					async: false,
					success: function (oDataRecieved, responce) {
						aProductResult = oDataRecieved.results;
					},
					error: function (err) {}
				});
				return aProductResult;
			},

			getCreateCustomer: function () {
				var sFilterSt = "ENTITY003Set";
				var aCustomerResult = [];
				this.oModel.read(sFilterSt, {
					context: null,
					urlParameters: null,
					async: false,
					success: function (oDataRecieved, responce) {
						aCustomerResult = oDataRecieved.results;
					},
					error: function (err) {}
				});
				return aCustomerResult;
			},

			createOrder: function (oTempData) {
				var oDataModel = this.oModel;
				var pCreateOrder = new Promise(function (resolve, reject) {
					oDataModel.create("/ENTITY001Set", oTempData, {
						context: null,
						async: false,
						success: function (oData, responce) {
							resolve();
						},
						error: function (err) {
							reject(err);
						}
					});
				});
				return pCreateOrder;
			}

		});
	});