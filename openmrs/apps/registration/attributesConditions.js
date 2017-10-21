Bahmni.Registration.AttributesConditions.rules = {
    'patientType': function(patient) {
        return showOrHideServiceInfoSection(patient);
    },
    'identifierDocument': function(patient) {
        if (patient['identifierDocument']) {
            switch (patient['identifierDocument'].conceptUuid) {
                case "c74c7f3b-954f-41e1-ba26-b595906020b5":
                    Bahmni.Registration.customValidator = {
                        "primaryIdentifier.registrationNumber": {
                            method: function (name, value) {
                                return value.match(/[0-9]{13}/);
                            },
                            errorMessage: "REGISTRATION_ID_TEXT_ERROR_KEY"
                        }
                    };
                    break;
                
                case "dafa2194-f468-4b6e-9b3f-97fbb181de55":
                    Bahmni.Registration.customValidator = {
                        "primaryIdentifier.registrationNumber": {
                            method: function (name, value) {
                                return value.match(/[0-9]{15}/);
                            },
                            errorMessage: "REGISTRATION_RESIDENCE_TEXT_ERROR_KEY"
                        }
                    };
                    break;
            
                default:
                    Bahmni.Registration.customValidator = {
                        "primaryIdentifier.registrationNumber": {
                            method: function (name, value) {
                                return value.match(/[a-zA-Z\-0-9]+/);
                            },
                            errorMessage: "REGISTRATION_PASSPORT_TEXT_ERROR_KEY"
                        }
                    };
                    break;
            }
        }
        
        return true;
    }
};

var showOrHideServiceInfoSection = function (patient) {
    var returnValues = {
        show: [],
        hide: []
    };
    
    var patientAttribute = patient["patientType"];
    
    if(patientAttribute){
        if (patientAttribute.conceptUuid === "ab73372f-0148-4f1d-b91b-d4a45dc94117") {
            returnValues.show.push("serviceInfo");
        } else {
            returnValues.hide.push("serviceInfo");
        }
    }else {
        returnValues.hide.push("serviceInfo");
    }
    return returnValues;
};