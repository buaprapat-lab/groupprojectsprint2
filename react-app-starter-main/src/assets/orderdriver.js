export const deliveryTasks = [
  { id: "CK-212224", status: "Ready for Delivery", canStart: true },
  { id: "CK-212225", status: "Ready for Delivery", canStart: true },
  { id: "CK-212226", status: "Preparing", canStart: false },
  { id: "CK-212227", status: "Preparing", canStart: false },
];

export const orderDetail = {
  orderId: "CK-212227",
  time: "12:15 PM",
  items: [
    { id: 1, name: "Menu - name", qty: 2, price: 1000 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
    { id: 2, name: "Menu - name", qty: 1, price: 399 },
  ],
  total: 3499,
  customer: {
    name: "Jane BP",
    contact: "(+66)99-746-0452",
    address: "34 G Tower, Rama 9 Soi 11 Rama 9 Road, Din Daeng, Bangkok 10220"
  },
  note: "Please leave at receptionist. the building entrance is near the traffic light.",
  currentStage: 1
};