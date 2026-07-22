//BAI1
// 1. Thẻ Tín dụng (Credit Card)
type CardData = {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  bankCode: string;
  cardType: 'credit' | 'debit' | 'atm';
}
// const creditCard: CardData = {
//   cardNumber: '4111222233334444',
//   cardHolder: 'NGUYEN VAN A',
//   expiryDate: '12/28',
//   cvv: '123',
//   bankCode: 'VCB', // Vietcombank
//   cardType: 'credit',
// };

// // 2. Thẻ Ghi nợ (Debit Card)
// const debitCard: CardData = {
//   cardNumber: '5123456789012345',
//   cardHolder: 'TRAN THI B',
//   expiryDate: '10/27',
//   cvv: '456',
//   bankCode: 'TCB', // Techcombank
//   cardType: 'debit',
// };

// // 3. Thẻ ATM (Thẻ nội địa)
// const atmCard: CardData = {
//   cardNumber: '9704123456789012',
//   cardHolder: 'LE VAN C',
//   expiryDate: '05/26',
//   cvv: '000',
//   bankCode: 'MBB', // MB Bank
//   cardType: 'atm',
// };
//BAI 2
// 1. Tạo mảng cardList chứa 3 thẻ
const cardList: CardData[] = [
  {
    cardNumber: '4111222233331234',
    cardHolder: 'NGUYEN VAN A',
    expiryDate: '12/28',
    cvv: '123',
    bankCode: 'VCB',
    cardType: 'credit',
  },
  {
    cardNumber: '5111222233335678',
    cardHolder: 'TRAN THI B',
    expiryDate: '10/27',
    cvv: '456',
    bankCode: 'TCB',
    cardType: 'debit',
  },
  {
    cardNumber: '6111222233339012',
    cardHolder: 'LE VAN C',
    expiryDate: '05/26',
    cvv: '789',
    bankCode: 'ACB',
    cardType: 'atm',
  },
];

// Hàm hỗ trợ định dạng/ẩn số thẻ (Masking)
function formatCardNumber(cardNumber: string): string {
  const first4 = cardNumber.slice(0, 4);
  const last4 = cardNumber.slice(-4);
  return `${first4}-****-****-${last4}`;
}

// 2. Dùng vòng lặp for...of để duyệt và in
let index = 1;
for (const card of cardList) {
  const maskedNumber = formatCardNumber(card.cardNumber);
  console.log(`💳 ${index}. ${maskedNumber} | ${card.bankCode} | ${card.cardType}`);
  index++;
}

// 3. In tổng số thẻ
console.log(`📊 Tổng: ${cardList.length} thẻ`);
//BAI 3
// Định nghĩa lại Type CardData từ Bài 1
type CardData = {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string; // Định dạng "MM/YY" hoặc "YYYY"
  cvv: string;
  bankCode: string;
  cardType: 'credit' | 'debit' | 'atm';
};

// 1. Định nghĩa hàm validateCard
function validateCard(card: CardData): string {
  // Trích xuất năm đầy đủ (VD: '12/28' -> '2028' hoặc giữ nguyên nếu đã là '2028')
  let fullYear = card.expiryDate;
  if (card.expiryDate.includes('/')) {
    const yearPart = card.expiryDate.split('/')[1]; // lấy chữ số năm sau dấu /
    fullYear = `20${yearPart}`;
  }

  // Kiểm tra điều kiện hết hạn (năm < '2027')
  const isExpired = fullYear < '2027';

  // Trả về chuỗi mô tả tương ứng
  if (isExpired) {
    return `❌ Thẻ ${card.cardType} ${card.bankCode} đã hết hạn`;
  } else {
    return `✅ Thẻ ${card.cardType} ${card.bankCode} còn hạn`;
  }
}

// 2. Tạo 3 object CardData khác nhau
const card1: CardData = {
  cardNumber: '4111222233331234',
  cardHolder: 'NGUYEN VAN A',
  expiryDate: '12/28', // Năm 2028 >= 2027 -> Còn hạn
  cvv: '123',
  bankCode: 'VCB',
  cardType: 'credit',
};

const card2: CardData = {
  cardNumber: '5111222233335678',
  cardHolder: 'TRAN THI B',
  expiryDate: '10/26', // Năm 2026 < 2027 -> Hết hạn
  cvv: '456',
  bankCode: 'TCB',
  cardType: 'debit',
};

const card3: CardData = {
  cardNumber: '6111222233339012',
  cardHolder: 'LE VAN C',
  expiryDate: '05/27', // Năm 2027 >= 2027 -> Còn hạn
  cvv: '789',
  bankCode: 'ACB',
  cardType: 'atm',
};

// 3. Gọi hàm validateCard() và in kết quả
console.log(validateCard(card1));
console.log(validateCard(card2));
console.log(validateCard(card3));