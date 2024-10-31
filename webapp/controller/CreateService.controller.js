sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter"
],
    function (BaseController, JSONModel, formatter) {
        "use strict";

        return BaseController.extend("extraservices.controller.CreateService", {

            formatter: formatter,

            onInit: function () {
                var oViewModel = new JSONModel({
                    busy: false,
                    delay: 0,
                });

                this.setModel(oViewModel, "createService");
            },

            onAfterRendering: function () {
                if (this.getModel("appView").getProperty("/fromLaunchpad")) {
                    var that = this;
                    sessionStorage.setItem("goToLaunchpad", "");
                    window.addEventListener("message", function (event) {
                        var data = event.data;
                        if (data.action == "goToMainPage") {
                            that.onNavBack();
                        }
                    });
                }
            },

            onCreateService: function () {
                var aControl = [],
                    aContainers = [],
                    oEntry;

                aControl.push(sap.m.Input, sap.m.DatePicker, sap.m.Select, sap.m.TimePicker);
                aContainers.push("GeneralInfoContainer");

                var oHeaderFieldsChecked = this.checkEmptyFields(aControl, aContainers, ""),
                    oURLParams = new URLSearchParams(window.location.search),
                    oToken = oURLParams.get('token');

                oEntry = {
                    service_type: this.byId("service_type").getSelectedKey(),
                    shipping_unit_identification: '',
                    init_date: this.byId("init_date").getDateValue(),
                    end_date: this.byId("end_date").getDateValue(),
                    nr_ordem_cliente: this.byId("nr_ordem_cliente").getSelectedKey()
                };

                if (this.byId("service_type").getSelectedKey() == '1') {
                    oEntry.shipping_unit_identification = this.byId("shipping_unit_identification").getValue();
                }

                if (oHeaderFieldsChecked && oEntry) {
                    this.onCreate("/xTQAxEXTRA_SERVICES_DD", oEntry, oToken);
                }
            },

            onChangeType: function (oEvent) {
                var oInputs = [],
                    oInputsHide = [],
                    oShipping = {
                        id: "shipping_unit_identification",
                        visible: true
                    },
                    oInitDate = {
                        id: "init_date",
                        visible: true
                    },
                    oEndDate = {
                        id: "end_date",
                        visible: true
                    },
                    oOrderClient = {
                        id: "nr_ordem_cliente",
                        visible: true
                    };

                oInputsHide.push(oShipping, oInitDate, oEndDate, oOrderClient);
                this.onHideInputs(oInputsHide);

                if (this.byId("service_type").getSelectedKey() == '1') {
                    oInputs.push(oShipping, oInitDate, oEndDate);
                } else if (this.byId("service_type").getSelectedKey() == '2') {
                    oInputs.push(oEndDate);
                } else if (this.byId("service_type").getSelectedKey() == '3') {
                    oInputs.push(oOrderClient);
                }

                this.onShowInputs(oInputs);
            },

            onShowInputs: function (oInputs) {
                oInputs.forEach(oInput => {
                    this.byId(oInput.id).setProperty("visible", oInput.visible);
                });
            },

            onHideInputs: function (oInputs) {
                oInputs.forEach(oInput => {
                    this.byId(oInput.id).setProperty("visible", false);
                    this.byId(oInput.id).setValue("");
                });
            }

        });
    });
