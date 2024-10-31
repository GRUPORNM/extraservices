sap.ui.define([], function () {
    "use strict";

    return {
        dateFormat: function (oDate) {
            if (oDate != null) {
                var oDate = (oDate instanceof Date) ? oDate : new Date(oDate);
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd.MM.yyyy" });

                return dateFormat.format(oDate);
            }
        },

        dateShort: function (oDate) {
            if (oDate != null) {
                var oDate = (oDate instanceof Date) ? oDate : new Date(oDate);
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd.MM.yyyy" });

                return dateFormat.format(oDate);

            }

        },

        documentStatus: function (oStatus) {
            switch (oStatus) {
                case '0001':
                    return "Success";
                    break;

                case '0002':
                    return "Error";
                    break;

                case '0003':
                    return "Warning";
                    break;
            }
        },

        citizencard: function (oCitizen) {
            if (oCitizen) {
                return true
            } else {
                return false
            }
        },

        myFormatter: function (oValue) {
            if (!oValue) {
                return "aaaqq";
            }
        },

        fieldVisibility: function (serviceType, fieldName) {
            switch (serviceType) {
                case "1":
                    return fieldName === "shipping_unit_identification" || fieldName === "nr_ordem_cliente";
                case "2":
                    return fieldName === "init_date" || fieldName === "end_date";
                default:
                    return true; // Adjust based on your requirements
            }
        }
    };
});