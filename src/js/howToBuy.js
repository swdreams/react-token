import jquery from "jquery";
import {BASE_TOKEN_ADDRESS, PANCAKE_LINK} from "./web3/config";

export default function howToBuy() {
    return {
        init() {
            console.log("How to buy initializing....");
            jquery('#address').val(BASE_TOKEN_ADDRESS);
            jquery('#address-desc').html(BASE_TOKEN_ADDRESS);
            jquery('#pancake-link').attr('href', PANCAKE_LINK);
        }
    };
}