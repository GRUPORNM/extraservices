sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter"
],
    function (BaseController, JSONModel, formatter) {
        "use strict";

        var aContainerFields = [
            {
                id: "type",
                control: "sap.m.Text",
                value: "{type}",
                enabled: false,
                name: "type",
                service: ""
            },
            {
                id: "shipping_unit_identification",
                control: "sap.m.Text",
                value: "{shipping_unit_identification}",
                name: "shipping_unit_identification",
                service: "1"
            },
            {
                id: "init_date",
                control: "sap.m.DatePicker",
                value: "{init_date}",
                formatter: "true",
                name: "init_date",
                service: "1"
            },
            {
                id: "end_date",
                control: "sap.m.DatePicker",
                value: "{end_date}",
                formatter: "true",
                name: "end_date",
                service: "1"
            },
            {
                id: "end_date",
                control: "sap.m.DatePicker",
                value: "{end_date}",
                formatter: "true",
                name: "end_date",
                service: "2"
            },
            {
                id: "nr_ordem_cliente",
                control: "sap.m.Select",
                path: "/xTQAxSHIPS_VH",
                key: "{nr_ordem_cliente}",
                text: "{nr_ordem_cliente}",
                selectedKey: "{nr_ordem_cliente}",
                value: "{nr_ordem_cliente}",
                name: "nr_ordem_cliente",
                service: "3"
            },
            {
                id: "created_at",
                control: "sap.m.DatePicker",
                value: "{created_at}",
                enabled: false,
                formatter: "true",
                name: "created_at",
                service: ""
            },
            {
                id: "created_by",
                control: "sap.m.Text",
                value: "{created_by}",
                enabled: false,
                name: "created_by",
                service: ""
            },
            {
                id: "changed_at",
                control: "sap.m.DatePicker",
                value: "{changed_at}",
                enabled: false,
                formatter: "true",
                name: "changed_at",
                service: ""
            },
            {
                id: "changed_by",
                control: "sap.m.Text",
                value: "{changed_by}",
                enabled: false,
                name: "changed_by",
                service: ""
            },
        ];

        var aContainerFieldLabels = [
            {
                id: "type",
                labelText: "type"
            },
            {
                id: "shipping_unit_identification",
                labelText: "shipping_unit_identification"
            },
            {
                id: "init_date",
                labelText: "init_date"
            },
            {
                id: "end_date",
                labelText: "end_date"
            },
            {
                id: "nr_ordem_cliente",
                labelText: "nr_ordem_cliente"
            },
            {
                id: "created_at",
                labelText: "created_at"
            },
            {
                id: "created_by",
                labelText: "created_by"
            },
            {
                id: "changed_at",
                labelText: "changed_at"
            },
            {
                id: "changed_by",
                labelText: "changed_by"
            }
        ]

        return BaseController.extend("extraservices.controller.ServiceDetail", {

            formatter: formatter,

            onInit: function () {
                var oViewModel = new JSONModel({
                    delay: 0,
                    busy: false,
                });

                this.sPath;

                this.setModel(oViewModel, "serviceDetail");
                sap.ui.core.UIComponent.getRouterFor(this).getRoute("serviceDetail").attachPatternMatched(this.onPatternMatched, this);
            },

            onAfterRendering: function () {
                if (this.getModel("appView").getProperty("/fromLaunchpad")) {
                    var that = this;
                    sessionStorage.setItem("goToLaunchpad", "");
                    window.addEventListener("message", function (event) {
                        var data = event.data;
                        if (data.action == "goToMainPage") {
                            that.onNavBackDetail();
                        }
                    });
                } else {

                }
            },

            onBuildGeneralDataSimpleForm: function (oAction) {
                var oSimpleForm = this.byId("GeneralInfo");

                oSimpleForm.destroyContent();

                var oToolbar = new sap.m.Toolbar({ ariaLabelledBy: "Title2" });

                oToolbar.addContent(new sap.m.ToolbarSpacer());

                var oConfirmButton = new sap.m.Button({
                    id: "ConfirmButton",
                    text: this.getResourceBundle().getText("confirmEditServiceHeader"),
                    type: sap.m.ButtonType.Emphasized,
                    press: this.onPressConfirmServiceHeaderButton.bind(this)
                });

                var oCancelButton = new sap.m.Button({
                    id: "CancelButton",
                    text: this.getResourceBundle().getText("cancelEditServiceHeader"),
                    press: this.onPressCancelServiceHeaderButton.bind(this)
                });

                var oBtChange = new sap.m.Button({
                    id: "EditButton",
                    text: this.getResourceBundle().getText("editServiceHeader"),
                    press: this.onPressEditServiceHeaderButton.bind(this)
                });

                if (oAction == 1) {
                    oConfirmButton.setVisible(false);
                    oCancelButton.setVisible(false);
                    oBtChange.setVisible(true);

                } else {
                    oConfirmButton.setVisible(true);
                    oCancelButton.setVisible(true);
                    oBtChange.setVisible(false);
                }

                oToolbar.addContent(oConfirmButton);
                oToolbar.addContent(oCancelButton);
                oToolbar.addContent(oBtChange);

                oSimpleForm.addContent(oToolbar);

                var oObject = this.getModel().getObject(this.sPath);

                aContainerFields.forEach(oField => {
                    switch (oAction) {
                        case 1:
                            if (oObject.service_type == oField.service || oField.service == "") {
                                oSimpleForm.addContent(new sap.m.Label({
                                    text: this.getResourceBundle().getText(aContainerFieldLabels.find(({ id }) => id === oField.id).labelText)
                                }));

                                if (oField.formatter) {
                                    oSimpleForm.addContent(
                                        new sap.m.Text({
                                            id: oField.id,
                                            text: {
                                                path: oField.value.replace("{", "").replace("}", ""),
                                                type: 'sap.ui.model.type.DateTime',
                                                formatOptions: {
                                                    style: 'short',
                                                    strictParsing: true,
                                                    pattern: "dd.MM.yyyy, HH:mm",
                                                }
                                            }
                                        })
                                    );
                                } else {
                                    oSimpleForm.addContent(
                                        new sap.m.Text({
                                            id: oField.id,
                                            text: oField.value,
                                        })
                                    );
                                }
                            }
                            break;
                        case 2:
                            switch (oField.control) {
                                case "sap.m.Text":
                                    oSimpleForm.addContent(new sap.m.Label({
                                        text: this.getResourceBundle().getText(aContainerFieldLabels.find(({ id }) => id === oField.id).labelText)
                                    }));

                                    if (oField.id == "created_at" || oField.id == "changed_at" || oField.id == "changed_by" || oField.id == "created_by") {
                                        oSimpleForm.addContent(
                                            new sap.m.Input({
                                                id: oField.id,
                                                name: oField.name,
                                                value: oField.value,
                                                required: true,
                                                enabled: oField.enabled,
                                                visible: oField.enabled
                                            })
                                        );
                                    } else if (oObject.service_type == oField.service || oField.service == "") {
                                        oSimpleForm.addContent(
                                            new sap.m.Input({
                                                id: oField.id,
                                                name: oField.name,
                                                value: oField.value,
                                                required: true,
                                                enabled: oField.enabled
                                            })
                                        );
                                    }
                                    break;
                                case "sap.m.DatePicker":
                                    if (oObject.service_type == oField.service) {
                                        oSimpleForm.addContent(new sap.m.Label({
                                            text: this.getResourceBundle().getText(aContainerFieldLabels.find(({ id }) => id === oField.id).labelText)
                                        }));

                                        if (oField.id == "created_at" || oField.id == "changed_at" || oField.id == "changed_by" || oField.id == "created_by") {
                                            oSimpleForm.addContent(
                                                new sap.m.DateTimePicker({
                                                    id: oField.id,
                                                    name: oField.name,
                                                    showCurrentTimeButton: true,
                                                    required: true,
                                                    enabled: oField.enabled,
                                                    value: {
                                                        path: oField.value.replace("{", "").replace("}", ""),
                                                        type: 'sap.ui.model.type.DateTime',
                                                        formatOptions: {
                                                            style: 'short',
                                                            strictParsing: true,
                                                            pattern: "dd.MM.yyyy"
                                                        },
                                                        valueFormat: "yyyy-MM-dd"
                                                    },
                                                })
                                            );
                                        } else {
                                            oSimpleForm.addContent(
                                                new sap.m.DateTimePicker({
                                                    id: oField.id,
                                                    name: oField.name,
                                                    showTimezone: true,
                                                    showCurrentTimeButton: true,
                                                    required: true,
                                                    value: {
                                                        path: oField.value.replace("{", "").replace("}", ""),
                                                        type: 'sap.ui.model.type.DateTime',
                                                        formatOptions: {
                                                            style: 'short',
                                                            strictParsing: true,
                                                            pattern: "dd.MM.yyyy, HH:mm"
                                                        },
                                                        valueFormat: "yyyy-MM-ddPTHH:mm:ssZ"
                                                    },
                                                })
                                            );
                                        }
                                    }
                                    break;
                                case "sap.m.Select":
                                    oSimpleForm.addContent(new sap.m.Label({
                                        text: this.getResourceBundle().getText(aContainerFieldLabels.find(({ id }) => id === oField.id).labelText)
                                    }));

                                    this.oSelect = new sap.m.Select({
                                        id: oField.id,
                                        name: oField.name,
                                        required: true,
                                        forceSelection: false,
                                        items: {
                                            path: oField.path,
                                            template: new sap.ui.core.ListItem({
                                                key: oField.key,
                                                text: oField.text
                                            }),
                                        },
                                        selectedKey: oField.selectedKey
                                    });

                                    this.oSelect.setModel(this.getModel());
                                    oSimpleForm.addContent(this.oSelect);
                                    break;
                            }
                            break;
                    }

                });
            },

            onPatternMatched: function (oEvent) {
                this.onBindViewDetail("/" + oEvent.getParameter("config").pattern.replace("/{objectId}", "") + oEvent.getParameter("arguments").objectId);
            },

            onBindViewDetail: function (sObjectPath, bForceRefresh) {
                this.sPath = sObjectPath;

                this.getView().bindElement({
                    path: sObjectPath,
                    change: this.onBindingChange.bind(this),
                    events: {
                        dataRequested: function () {
                            this.getModel("appView").setProperty("/busy", true);
                        }.bind(this),
                        dataReceived: function () {
                            this.getModel("appView").setProperty("/busy", false);
                            this.onBuildGeneralDataSimpleForm(1);
                        }.bind(this)
                    }
                });

                if (bForceRefresh) {
                    this.getView().getModel().refresh();
                }
            },

            onNavBackDetail: function () {
                sessionStorage.setItem("goToLaunchpad", "X");
                var that = this,
                    oService = this.getModel().getObject(this.getView().getBindingContext().getPath()),
                    sEdited = this.onValidateEditedFieldsHeader("GeneralInfo", oService);

                if (sEdited) {
                    new sap.m.MessageBox.warning(this.getResourceBundle().getText("editServiceHeaderDataText"), {
                        title: this.getResourceBundle().getText("editServiceHeaderDataTitle"),
                        actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                        emphasizedAction: sap.m.MessageBox.Action.OK,
                        onClose: function (oAction) {
                            if (oAction === sap.m.MessageBox.Action.OK) {
                                that.onBuildGeneralDataSimpleForm(1);
                                that.onNavigation("", "RouteMain", "");
                            }
                        }
                    });
                } else {
                    this.onNavigation("", "RouteMain", "");
                }
            },

            onPressConfirmServiceHeaderButton: function () {
                var oService = this.getModel().getObject(this.getView().getBindingContext().getPath()),
                    sEdited = this.onValidateEditedFields("GeneralInfo", oService);

                if (sEdited) {
                    var aControls = [sap.m.Input, sap.m.Select, sap.m.DatePicker],
                        aContainers = ["GeneralInfo"],
                        oMainControl = "";

                    var oChecked = this.checkEmptyFields(aControls, aContainers, oMainControl);

                    if (oChecked) {
                        var sPath = this.getView().getBindingContext().getPath(),
                            oService = this.getModel().getObject(sPath),
                            oURLParams = new URLSearchParams(window.location.search),
                            oToken = oURLParams.get('token');

                        var oEntry = this.buildEntry(oService.service_type);

                        if (oEntry) {
                            this.onUpdate(sPath, oEntry, oToken);
                        } else {
                            this.showError("noPossibleServiceHeaderText", "noPossibleServiceHeaderTitle");
                        }
                        this.onBuildGeneralDataSimpleForm(1);
                    }
                } else {
                    this.showWarning("noDataEditedServiceHeaderText", "noDataEditedServiceHeaderTitle");
                }
            },

            buildEntry: function (serviceType) {
                var oEntry = {
                    shipping_unit_identification: '',
                    nr_ordem_cliente: ''
                };

                var fieldMap = {
                    "1": ["shipping_unit_identification", "init_date", "end_date"],
                    "2": ["end_date"],
                    "3": ["nr_ordem_cliente"]
                };

                var fields = fieldMap[serviceType];

                if (fields) {
                    fields.forEach(function (field) {
                        if (field.includes("date")) {
                            oEntry[field] = sap.ui.getCore().byId(field).getDateValue();
                        } else if (field.includes("ordem")) {
                            oEntry[field] = sap.ui.getCore().byId(field).getSelectedKey();
                        } else {
                            oEntry[field] = sap.ui.getCore().byId(field).getValue();
                        }
                    });
                }

                return oEntry;
            },

            onPressEditServiceHeaderButton: function () {
                this.onBuildGeneralDataSimpleForm(2);
            },

            onPressCancelServiceHeaderButton: function () {
                var that = this,
                    oService = this.getModel().getObject(this.getView().getBindingContext().getPath()),
                    sEdited = this.onValidateEditedFieldsHeader("GeneralInfo", oService);

                if (sEdited) {
                    new sap.m.MessageBox.warning(this.getResourceBundle().getText("editServiceHeaderDataText"), {
                        title: this.getResourceBundle().getText("editServiceHeaderDataTitle"),
                        actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                        emphasizedAction: sap.m.MessageBox.Action.OK,
                        onClose: function (oAction) {
                            if (oAction === sap.m.MessageBox.Action.OK) {
                                that.onBuildGeneralDataSimpleForm(1);
                            }
                        }
                    });
                } else {
                    this.onBuildGeneralDataSimpleForm(1);
                }
            },
        });
    });
