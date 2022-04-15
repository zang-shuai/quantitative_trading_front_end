import $store from "@/store";

export function create_stock_table(id, ts_code) {
    // Each item: open，close，lowest，highest
    let daily = $store.state.stock.stock_daily[ts_code]

}