//輸入判斷
function value_check(value, min, max){
    var num = Number.isInteger(value); //是不是數字 (整數)

    //是不是合理範圍的數字
    if(num === true && value >= min && value <= max) {
        return value;
    }else{
        return false;
    }
}

// 計算持卡年期折扣
function card_year(years){
	// 持卡年限大於 5 年，打 95 折；如低於 5 年，則 年數 / 100 計算
	if(years>5){
		return 1 - (5 / 100);
	}else{
		return 1 - (years / 100);
	}
}

// 計算會員卡別折扣
// 原算式是先算出 "該被折扣掉的金額"，再用 "原始購物金額" 去扣除
// EX:
// 購物金額：3000
// 要扣掉折扣數：0.1 (10%) 也就是要打9折
// 要算出0.9的算法就是 1 (100%) - 0.1 (10%) = 0.9 (90%)
// 3000 * 0.9 = 2700
// 因為0.9是折扣後，所以不需要像原版的方式 再做一次減掉"被折扣金額"的算式

function card_type(cardtype){
	var result = 0;
	// const types = [{id:1, name: "普卡"}, {id:2, name: "金卡"}, {id:3, name: "白金卡"}, {id:4, name: "頂級卡"}]
	const cardtype_name = {"Lv1":1, "Lv2":2, "Lv3":3, "Lv4":4}
	switch(cardtype){
		// 卡別為 1：普卡 => 不折扣
        case cardtype_name.Lv1:
            result = 1;
            break;

        // 卡別為 2：金卡 => 金額 * (1 - 0.3) => 金額 * 0.9
        case cardtype_name.Lv2:
            result = 1 - 0.1;
            break;

        // 卡別為 3：白金卡 => 金額 * (1 - 0.3) => 金額 * 0.7
        case cardtype_name.Lv3:
            result = 1 - 0.3;
            break;

        // 卡別為 4：頂級卡 => 金額 * (1 - 0.5) => 金額 * 0.5
        case cardtype_name.Lv4:
            result = 1 - 0.5;
            break;
    }
    return result;
}

// 運算式
// 計算一般折扣 (持卡年期)
function year_discount(price, years) {
	var years = card_year(years); // 判斷持卡多久
	return price * years; // 購物金額 * 持卡折扣 = 一般折扣後金額
}

// 計算會員折扣 (會員卡別)
function card_discount(price, cardtype) {
	var type = card_type(cardtype); // 判斷是哪一個卡別
	return price * type; // 購物金額 * 會員別折扣 = 會員折扣後金額
}

// 計算所有折扣後金額
function discount_count(price, cardtype, years) {
	var year_dis = price - year_discount(price, years); // 會員別折扣的金額
	var card_dis = price - card_discount(price, cardtype); // 一般折扣的金額
	return price - card_dis - year_dis; // 購物金額 - 一般折扣 - 會員別折扣 = 所有折扣後金額
}

var discount = {
	Calculate: function(cart_price, cardtype, years){
		//1、判斷是不是數字 (整數)
		//2、判斷是不是合理範圍的數字
		var member_price = value_check(cart_price, 1, 100000);
		var member_type = value_check(cardtype, 1, 4);
		var member_years = value_check(years, 1, 50);

		// 將上面判斷完的數字 進行運算
        var total_discount = discount_count(member_price, member_type, member_years);

        alert("您的實際支付金額為"+total_discount);
    }
}

// discount.Calculate(3000,2,6);