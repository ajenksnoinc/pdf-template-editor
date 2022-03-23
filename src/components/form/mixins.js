import templates from "@paros-ui/react-forms/lib/templates";
// import { Input, Checkbox, Select, TextArea, Number, PhoneNumber, CreditCard, MandatoryLink } from "~/components/form/BasicInputs";
// import { Input, Checkbox, TextArea, Number } from "~/components/form/BasicInputs";
import { Input } from "~/components/form/BasicInputs";

import "./style.scss";

templates.addTemplates({
    // Really simple textbox
    "text": ({ output, template, templateProps }) => {
        if(output.Component === "input") {
            output.Component = Input;
        }

        templateProps.type = "text";
        template.forbidNull = true;
    }

    // "number": ({ output, template }) => {
    //     if(!output.Component) {
    //         output.Component = Number;
    //     }

    //     template.valueGetter = v => v;
    //     template.forbidNull = true;
    // },

    // Basic phone number input
    // "phone": ({ output, template }) => {
    //     if(!output.Component) {
    //         output.Component = PhoneNumber;
    //     }

    //     template.valueGetter = v => v;
    //     template.forbidNull = true;
    // },

    // Basic credit card input
    // "creditcard": ({ output, template }) => {
    //     if(!output.Component) {
    //         output.Component = CreditCard;
    //     }

    //     template.valueGetter = v => v;
    //     template.forbidNull = true;
    // },

    // Really simple textarea
    // "textarea": ({ output, template }) => {
    //     output.Component = TextArea;

    //     template.forbidNull = true;
    // },

    // Really simple checkbox
    // "checkbox": ({ output, template, templateProps }) => {
    //     if(output.Component === "input") {
    //         output.Component = Checkbox;
    //     }

    //     template.valueGetter = "target.checked";
    //     template.valueProp = "checked";
    //     templateProps.type = "checkbox";
    //     template.defaultValue = false;
    //     template.forbidNull = true;
    // }

    // react-select integration
    // "select": ({ output, template, props, templateProps }) => {
    //     if(!output.Component) {
    //         output.Component = Select;
    //     }

    //     templateProps.isDisabled = props.disabled || props.isDisabled; // Standardize `disabled` prop for all input types
    //     template.defaultValue = null;
    //     template.valueGetter = v => v;
    // },

    // Mandatory Link - for TOS
    // "link": ({ output, template }) => {
    //     if(!output.Component) {
    //         output.Component = MandatoryLink;
    //     }

    //     template.defaultValue = false;
    //     template.valueGetter = v => v;
    // }
});
