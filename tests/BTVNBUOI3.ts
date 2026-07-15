//bai 1
const orderStatus: string = 'shipped';
if (orderStatus === 'pending') {
    console.log('Đơn hàng đang chờ xử lý.');
} else if (orderStatus === 'shipped') {
    console.log('Đơn hàng đã giao cho vận chuyển.');
}else if (orderStatus === 'delivered') {
    console.log('Đơn hàng đã được giao thành công.');
}else if (orderStatus === 'cancelled') {
    console.log('Đơn hàng đã bị hủy.');
}else {
    console.log('Trạng thái không xác định.');
}
//bai 2

const dailyRevenue: number[] = [150000, 230000, 0, 180000, 350000, 420000, 0];

let totalRevenue = 0;
let offDays = 0;
const formattedDaily: string[] = [];


const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
};

for (const revenue of dailyRevenue) {

  totalRevenue += revenue;

  if (revenue === 0) {
    offDays++;
  }

  formattedDaily.push(formatVND(revenue));
}

// 3. In kết quả 
console.log(`📊 Doanh thu từng ngày: ${formattedDaily.join(', ')}`);
console.log(`💰 Tổng doanh thu: ${formatVND(totalRevenue)}`);
console.log(`📅 Số ngày nghỉ: ${offDays}`);