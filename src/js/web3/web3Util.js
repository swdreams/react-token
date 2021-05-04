import Web3 from "web3";
import jquery from "jquery";
import {BASE_TOKEN_ADDRESS, HODL_TOKEN_ADDRESS, PANCAKE_INFO_API_URL} from "./config";
import _ from 'lodash';
import BigNumber from "bignumber.js";

export default function web3Util() {
    return {
        fetchData() {
            jquery.ajax({
                url: PANCAKE_INFO_API_URL,
                type: 'get',
                dataType: 'json',
                success: res => {
                    if (res && res.data) {
                        const key = `${BASE_TOKEN_ADDRESS}_${HODL_TOKEN_ADDRESS}`.toLowerCase();

                        let info = null;
                        for (let k in res.data) {
                            if (k.toLowerCase() == key) {
                                info = res.data[k];
                                break;
                            }
                        }
                        if (info) {
                            const {
                                quote_name,
                                quote_symbol,
                                price,
                                base_volume,
                                quote_volume,
                                liquidity,
                                liquidity_BNB,
                            } = info;

                            console.log("INfo = ", info, Number(price), new BigNumber('0.00045').toString());
                            const nPrice = Number(price);
                            const bnPrice = new BigNumber(price);
                            const bnVolume = new BigNumber(quote_volume);
                            const bnLiquidity = new BigNumber(liquidity);

                            let unit = new BigNumber(quote_symbol)
                            if (unit.isNaN()) unit = 1;

                            jquery('#current-price').html('$' + bnPrice.toFormat(10));
                            jquery('#supply').html(bnVolume.multipliedBy(unit).toFormat(1));
                            jquery('#market-cap').html('$' + bnVolume.multipliedBy(nPrice).multipliedBy(unit).toFormat(2));
                            jquery('#liquidity').html('$' + bnLiquidity.toFormat(2));
                        }
                    }
                }
            });
        },
        initWeb3() {
            console.log("Start initialization....");
            this.fetchData();
            setInterval(() => {
                this.fetchData();
            }, 1000 * 60);
        }
    }
}