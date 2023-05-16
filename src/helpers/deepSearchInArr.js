const nonAccentVietnamese = str => {
  if (!str) return '';
  let result = str.trim();
  result = result.toLowerCase();
  result = result.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  result = result.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  result = result.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  result = result.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  result = result.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  result = result.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  result = result.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  result = result.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  result = result.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return result;
};

const contains = (item, searchTxt) => {
  // item is an object
  if (typeof item == 'object' && item != null) {
    for (let key in item) {
      const value = item[key];
      if (contains(value, searchTxt)) {
        return true;
      }
    }
  }
  // string, number or boolean
  if (typeof item != 'object' && item != null && item != undefined) {
    const itemStringfied = nonAccentVietnamese(item.toString().toLowerCase());
    const searchTxtStringfied = nonAccentVietnamese(searchTxt.toString().toLowerCase());
    if (itemStringfied.includes(searchTxtStringfied)) {
      return true;
    }
  }
  return false;
};

export const deepSearchInArr = (query, arr) => {
  let array = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (contains(arr[i], query)) {
      array.push(arr[i]);
    } else {
      array.push(null);
    }
    if (i == arr.length - 1) {
      return array;
    }
  }
};
